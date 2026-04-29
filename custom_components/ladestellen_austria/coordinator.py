"""DataUpdateCoordinator for Ladestellen Austria."""
from __future__ import annotations

import asyncio
import contextlib
import logging
import os
from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Any

import aiohttp

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    CONF_LATITUDE,
    CONF_LONGITUDE,
    CONF_SCAN_INTERVAL,
)
from homeassistant.core import (
    Event,
    EventStateChangedData,
    HomeAssistant,
    State,
    callback,
)
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.debounce import Debouncer
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util
from homeassistant.util.location import distance

from .const import (
    API_BASE_URL,
    CONF_API_KEY,
    CONF_DOMAIN,
    CONF_DYNAMIC_ENTITY,
    DEFAULT_MAX_RESULTS,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    DOMAIN_LAST_API_CALL_KEY,
    DYNAMIC_COOLDOWN_MINUTES,
    DYNAMIC_DISTANCE_THRESHOLD_M,
    DYNAMIC_DOMAIN_COOLDOWN_MINUTES,
    DYNAMIC_SAFETY_INTERVAL_HOURS,
    EVENT_SLOT_STATUS_CHANGED,
    REQUEST_TIMEOUT_SEC,
    SEARCH_PATH,
    build_default_headers,
    classify_probe_status,
    normalize_status,
)

_LOGGER = logging.getLogger(__name__)

type LadestellenAustriaConfigEntry = ConfigEntry["LadestellenAustriaCoordinator"]


@dataclass(frozen=True, slots=True)
class _StationMeta:
    """Per-station scratch data carried alongside each indexed point.

    Indexed via `_index_points` for cheap status-transition diffing —
    the bus event payload needs the station's label + distance, but
    those don't belong inside the API-shaped point dict (mutating it
    with `_station_*` scratch keys was the previous shape). Pairing
    keeps the API payload pristine.
    """
    label: str | None
    distance: float | None


def _evse_sort_key(point: dict[str, Any]) -> tuple[int, int, str]:
    """Stable sort key for a station's points.

    EMSP-style evseIds carry a trailing per-station ordinal
    (e.g. `*AT*EAA*E5055*1` then `*AT*EAA*E5055*2`). We split on `*` and
    parse the last segment when it's numeric. The first tuple element
    is a parse-success flag so unparseable points sort AFTER numeric
    ones in stable form rather than colliding at the start; the third
    element is the full evseId, used both for tiebreaking when the
    trailing segment ties and as the lexical fallback when the suffix
    isn't numeric (so two non-numeric IDs sort deterministically).
    """
    raw = str(point.get("evseId") or "")
    suffix = raw.rsplit("*", 1)[-1] if "*" in raw else raw
    try:
        ordinal = int(suffix)
    except ValueError:
        return (1, 0, raw)
    return (0, ordinal, raw)


class LadestellenAustriaCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Poll E-Control's Ladestellenverzeichnis. The /search endpoint returns
    live per-point status inline (AVAILABLE / CHARGING / OCCUPIED / OUTOFORDER
    / BLOCKED / INOPERATIVE / UNKNOWN), so no separate live-status fetch is
    needed — the field is already live."""

    config_entry: LadestellenAustriaConfigEntry

    def __init__(
        self,
        hass: HomeAssistant,
        entry: LadestellenAustriaConfigEntry,
    ) -> None:
        """Initialise the coordinator.

        Credentials + location live in `entry.data` (written once by the
        config flow). Only `scan_interval` is editable through the
        options flow, so it's the one field we read with the
        `options → data → DEFAULT` precedence.
        """
        self._entry = entry
        self._api_key: str = entry.data[CONF_API_KEY]
        self._domain: str = entry.data[CONF_DOMAIN]
        self._latitude: float = float(entry.data[CONF_LATITUDE])
        self._longitude: float = float(entry.data[CONF_LONGITUDE])
        self._dynamic_entity: str | None = entry.data.get(CONF_DYNAMIC_ENTITY)
        self._session = async_get_clientsession(hass)

        self._issue_raised: bool = False
        self._tracker_issue_raised: bool = False
        self._unsub: list[Callable[[], None]] = []
        self._unsubscribe_tracker: Callable[[], None] | None = None

        # Dynamic-mode bookkeeping — the distance check in _should_update
        # needs the last known position, and the per-entry cooldown needs
        # the last refresh time.
        self._last_fetch_lat: float | None = None
        self._last_fetch_lng: float | None = None
        self._last_fetch_time: datetime | None = None

        # In dynamic mode the tracker's state change is the primary update
        # trigger; the timer only exists as a safety net when the device
        # doesn't move for hours. In static mode the user-configured
        # scan_interval still drives the polling cadence.
        if self._dynamic_entity:
            interval = timedelta(hours=DYNAMIC_SAFETY_INTERVAL_HOURS)
        else:
            # scan_interval is the only options-flow-editable field;
            # options take precedence over data, both fall back to the
            # default if neither is set.
            scan = entry.options.get(
                CONF_SCAN_INTERVAL,
                entry.data.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
            )
            interval = timedelta(minutes=scan)
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=interval,
            # Absorb request storms (options-flow save, manual reload,
            # dashboard edit-mode flip) so the /search endpoint isn't hit
            # multiple times in quick succession during routine UI activity.
            request_refresh_debouncer=Debouncer(
                hass,
                _LOGGER,
                cooldown=15,
                immediate=False,
            ),
        )

    @property
    def dynamic_mode(self) -> bool:
        """Return True when this entry is tracking a device_tracker entity."""
        return self._dynamic_entity is not None

    @property
    def dynamic_entity(self) -> str | None:
        """Return the tracked device_tracker entity_id, or None in static mode."""
        return self._dynamic_entity

    async def _async_setup(self) -> None:
        """One-shot setup hook invoked inside async_config_entry_first_refresh.

        In dynamic mode we subscribe to the tracker's state-change events
        here — not in __init__ because the coordinator may be instantiated
        in tests without ever calling first_refresh, and we only want the
        listener for live runs.
        """
        if self._dynamic_entity:
            self._unsubscribe_tracker = async_track_state_change_event(
                self.hass,
                [self._dynamic_entity],
                self._handle_tracker_update,
            )
            _LOGGER.debug(
                "Dynamic mode: watching %s for location changes",
                self._dynamic_entity,
            )

    @callback
    def async_teardown(self) -> None:
        """Cancel all listeners on unload."""
        for unsub in self._unsub:
            unsub()
        self._unsub.clear()
        if self._unsubscribe_tracker is not None:
            self._unsubscribe_tracker()
            self._unsubscribe_tracker = None

    # ------------------------------------------------------------------
    # Dynamic tracker mode — tankstellen-austria pattern port
    # ------------------------------------------------------------------

    @callback
    def _handle_tracker_update(
        self, event: Event[EventStateChangedData]
    ) -> None:
        """Fire a refresh when the tracker entity's state changes — subject
        to the three-tier rate-limit guards in _should_update."""
        new_state = event.data.get("new_state")
        lat, lng = self._get_entity_coords(new_state)
        if not self._should_update(lat, lng):
            return
        # Stamp the domain-wide timestamp before scheduling, so concurrent
        # entries that see the same tracker event back off on the next
        # tick instead of piling on.
        self.hass.data.setdefault(DOMAIN, {})[DOMAIN_LAST_API_CALL_KEY] = (
            dt_util.utcnow()
        )
        self.hass.async_create_task(self.async_refresh())

    def _get_entity_coords(self, state: State | None) -> tuple[float, float]:
        """Pull lat/lng from a device_tracker state's attributes.

        Always returns a usable pair — when the tracker has no coordinates
        we fall back to the entry's configured location (HA home if the
        user left it at defaults) and raise a Repairs issue. The fallback
        is necessary because a degraded tracker should not block refreshes
        entirely; the user just sees stale results near home until they
        fix the tracker.
        """
        if state is not None:
            lat = state.attributes.get("latitude")
            lng = state.attributes.get("longitude")
            if lat is not None and lng is not None:
                try:
                    lat_f = float(lat)
                    lng_f = float(lng)
                except (TypeError, ValueError):
                    pass
                else:
                    self._clear_tracker_issue()
                    return lat_f, lng_f
        if self._dynamic_entity:
            self._raise_tracker_issue()
        return self._latitude, self._longitude

    def _raise_tracker_issue(self) -> None:
        """Surface a Repairs issue when the tracker has no coordinates."""
        if self._tracker_issue_raised:
            return
        self._tracker_issue_raised = True
        _LOGGER.warning(
            "device_tracker %s unavailable or missing coordinates — "
            "falling back to the entry's configured location",
            self._dynamic_entity,
        )
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            f"tracker_missing_{self._entry.entry_id}",
            is_fixable=False,
            severity=ir.IssueSeverity.WARNING,
            translation_key="tracker_missing",
            translation_placeholders={
                "entity_id": self._dynamic_entity or "",
                "entry_title": self._entry.title,
            },
        )

    def _clear_tracker_issue(self) -> None:
        """Clear the tracker-missing Repairs issue once coordinates return."""
        if not self._tracker_issue_raised:
            return
        self._tracker_issue_raised = False
        ir.async_delete_issue(
            self.hass, DOMAIN, f"tracker_missing_{self._entry.entry_id}"
        )

    def _should_update(self, lat: float, lng: float) -> bool:
        """Three-tier rate-limit gate for tracker-triggered refreshes.

        1. Domain-wide cooldown — protects against multiple entries
           reacting to the same tracker event within seconds.
        2. Per-entry cooldown — the same tracker might fire many state
           changes while the user drives, but we only want one refresh
           per entry per cooldown window.
        3. Distance threshold — ignore micro-moves (GPS jitter, walking
           around inside a parking lot).
        """
        now = dt_util.utcnow()

        last_domain = self.hass.data.get(DOMAIN, {}).get(
            DOMAIN_LAST_API_CALL_KEY
        )
        if last_domain is not None:
            age_min = (now - last_domain).total_seconds() / 60
            if age_min < DYNAMIC_DOMAIN_COOLDOWN_MINUTES:
                _LOGGER.debug(
                    "Dynamic update skipped: domain cooldown (%.1f min left)",
                    DYNAMIC_DOMAIN_COOLDOWN_MINUTES - age_min,
                )
                return False

        if self._last_fetch_time is not None:
            age_min = (now - self._last_fetch_time).total_seconds() / 60
            if age_min < DYNAMIC_COOLDOWN_MINUTES:
                _LOGGER.debug(
                    "Dynamic update skipped: entry cooldown (%.1f min left)",
                    DYNAMIC_COOLDOWN_MINUTES - age_min,
                )
                return False

        if (
            self._last_fetch_lat is not None
            and self._last_fetch_lng is not None
        ):
            dist_m = distance(
                lat, lng, self._last_fetch_lat, self._last_fetch_lng
            )
            if dist_m is not None and dist_m < DYNAMIC_DISTANCE_THRESHOLD_M:
                _LOGGER.debug(
                    "Dynamic update skipped: only moved %.0f m (threshold %d)",
                    dist_m,
                    DYNAMIC_DISTANCE_THRESHOLD_M,
                )
                return False

        return True

    def _raise_degraded_issue(
        self, translation_key: str, **placeholders: str
    ) -> None:
        """Raise a Repairs issue for a user-actionable degraded condition."""
        if self._issue_raised:
            return
        self._issue_raised = True
        ir.async_create_issue(
            self.hass,
            DOMAIN,
            f"{translation_key}_{self._entry.entry_id}",
            is_fixable=False,
            severity=ir.IssueSeverity.WARNING,
            translation_key=translation_key,
            translation_placeholders={
                **placeholders,
                "entry_title": self._entry.title,
            },
        )

    def _clear_degraded_issue(self, translation_key: str) -> None:
        """Clear a previously-raised Repairs issue."""
        if not self._issue_raised:
            return
        self._issue_raised = False
        ir.async_delete_issue(
            self.hass, DOMAIN, f"{translation_key}_{self._entry.entry_id}"
        )

    def _build_headers(self) -> dict[str, str]:
        """Build outbound request headers via the shared helper."""
        return build_default_headers(self._api_key, self._domain)

    async def _fetch_search(
        self, latitude: float, longitude: float
    ) -> list[dict[str, Any]]:
        """Fetch nearest stations from /search. Raises UpdateFailed on failure.

        This call carries the auth contract — 401/403 responses here
        translate to ConfigEntryAuthFailed so HA drives the reauth flow.
        Latitude/longitude are passed in explicitly so dynamic mode can
        pass live tracker coords while static mode passes the fixed
        self._latitude/self._longitude.
        """
        url = f"{API_BASE_URL}{SEARCH_PATH}"
        params = {
            "latitude": str(latitude),
            "longitude": str(longitude),
        }
        timeout = aiohttp.ClientTimeout(total=REQUEST_TIMEOUT_SEC)
        try:
            resp = await self._session.get(
                url, headers=self._build_headers(), params=params, timeout=timeout,
            )
            resp.raise_for_status()
        except asyncio.TimeoutError as err:
            raise UpdateFailed(
                translation_domain=DOMAIN,
                translation_key="api_timeout",
                translation_placeholders={"seconds": str(REQUEST_TIMEOUT_SEC)},
            ) from err
        except aiohttp.ClientResponseError as err:
            # Single source of truth for "what does this status mean" lives
            # in classify_probe_status. Auth failures here drive HA's
            # reauth flow; everything else degrades to UpdateFailed.
            outcome = classify_probe_status(err.status)
            if outcome in ("invalid_auth", "domain_mismatch"):
                raise ConfigEntryAuthFailed(
                    translation_domain=DOMAIN,
                    translation_key="api_auth_error",
                    translation_placeholders={"status": str(err.status)},
                ) from err
            raise UpdateFailed(
                translation_domain=DOMAIN,
                translation_key="api_http_error",
                translation_placeholders={
                    "status": str(err.status),
                    "reason": err.message or "",
                },
            ) from err
        except aiohttp.ClientError as err:
            raise UpdateFailed(
                translation_domain=DOMAIN,
                translation_key="api_connection_error",
                translation_placeholders={
                    "error_type": type(err).__name__,
                    "error": str(err),
                },
            ) from err

        try:
            payload = await resp.json()
        except (aiohttp.ContentTypeError, ValueError) as err:
            raise UpdateFailed(
                translation_domain=DOMAIN,
                translation_key="api_invalid_response",
                translation_placeholders={
                    "status": str(resp.status),
                    "error": str(err),
                },
            ) from err

        if not isinstance(payload, list):
            raise UpdateFailed(
                translation_domain=DOMAIN,
                translation_key="api_invalid_response",
                translation_placeholders={
                    "status": str(resp.status),
                    "error": f"expected list, got {type(payload).__name__}",
                },
            )
        return [s for s in payload if isinstance(s, dict)]

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch nearest stations from /search and return.

        /search already carries live per-point status (AVAILABLE / CHARGING /
        OCCUPIED / OUTOFORDER / BLOCKED / INOPERATIVE / UNKNOWN), so there's
        no separate live-status fetch. `live_status_available` stays True as
        long as /search succeeded — the field is live by the time we see it.
        """
        # Resolve the request location — dynamic mode pulls live coords
        # from the tracker state; static mode uses the entry's configured
        # lat/lng. When dynamic coords are missing we fall back to the
        # configured location (and raise a Repairs issue).
        if self._dynamic_entity:
            state = self.hass.states.get(self._dynamic_entity)
            lat, lng = self._get_entity_coords(state)
            self._last_fetch_lat = lat
            self._last_fetch_lng = lng
            self._last_fetch_time = dt_util.utcnow()
        else:
            lat = self._latitude
            lng = self._longitude

        stations = await self._fetch_search(lat, lng)
        # Local-only dev hook: contributors export
        # `LADESTELLEN_AUSTRIA_DEV_FIXTURE=1` and drop a (gitignored)
        # `_dev_fixture.py` next to this file to prepend a synthetic
        # station that exercises every RefillPointStatusEnum value.
        # Production never sets the env var; tests don't set it either,
        # so snapshot diffs stay clean. ImportError is the production
        # path and is silent.
        if os.environ.get("LADESTELLEN_AUSTRIA_DEV_FIXTURE") == "1":
            with contextlib.suppress(ImportError):
                # _dev_fixture.py is gitignored — present in dev,
                # missing in CI / production. The compound ignore
                # silences both "attr-defined" (when CI's mypy can't
                # see the file) AND "unused-ignore" (when local mypy
                # resolves the file and would otherwise grumble that
                # the attr-defined ignore is unnecessary).
                from . import _dev_fixture  # type: ignore[attr-defined,unused-ignore]
                stations = [_dev_fixture.STATION, *stations]
        stations.sort(key=lambda s: s.get("distance") or float("inf"))
        truncated = stations[:DEFAULT_MAX_RESULTS]

        # Sort each station's points by the operator-issued ordinal that
        # lives in the trailing segment of the EMSP-style evseId
        # (e.g. *AT*EAA*E5055*1 before *AT*EAA*E5055*2). Doing this here
        # keeps the frontend dumb — the parking card and the rack render
        # `station.points` in array order without parsing IDs.
        for station in truncated:
            points = station.get("points")
            if isinstance(points, list):
                station["points"] = sorted(points, key=_evse_sort_key)

        if self.last_update_success is False:
            _LOGGER.info(
                "Ladestellen Austria API available again (%d stations)",
                len(truncated),
            )

        # Diff per-EVSE status between previous and current refresh; fire
        # one bus event per transition. Skipped on the first successful
        # refresh because `self.data` is None — there's nothing to diff.
        self._fire_status_transition_events(truncated)

        return {
            "stations": truncated,
            "count": len(truncated),
            "nearest": truncated[0] if truncated else None,
            "live_status_available": True,
        }

    def _fire_status_transition_events(
        self, current_stations: list[dict[str, Any]]
    ) -> None:
        """Compare `self.data` to the new station list and fire one
        ``ladestellen_austria_slot_status_changed`` event per EVSE whose
        status differs from the previous refresh.

        Skips the first successful refresh (no prior data to diff). Only
        fires when both old and new statuses are present and not equal —
        a point appearing for the first time, disappearing, or having a
        null status on either side does not fire (no signal to act on).

        Event data is documented for users in README; the schema is
        considered stable. Bumping it requires either a new event name
        or a versioned `version` field in the payload.
        """
        if not isinstance(self.data, dict):
            return
        prev = self._index_points(self.data.get("stations") or [])
        if not prev:
            return
        curr = self._index_points(current_stations)
        for key, (new_point, meta) in curr.items():
            old_entry = prev.get(key)
            if old_entry is None:
                continue
            old_point, _ = old_entry
            old_status = normalize_status(old_point.get("status"))
            new_status = normalize_status(new_point.get("status"))
            if not old_status or not new_status or old_status == new_status:
                continue
            station_id, evse_id = key
            self.hass.bus.async_fire(
                EVENT_SLOT_STATUS_CHANGED,
                {
                    "entry_id": self._entry.entry_id,
                    "station_id": station_id,
                    "station_label": meta.label,
                    "station_distance": meta.distance,
                    "evse_id": evse_id,
                    "old_status": old_point.get("status"),
                    "new_status": new_point.get("status"),
                },
            )

    @staticmethod
    def _index_points(
        stations: list[dict[str, Any]],
    ) -> dict[tuple[str, str], tuple[dict[str, Any], _StationMeta]]:
        """Index every point by (stationId, evseId) for fast diffing.

        Returns the API-shaped point dict alongside a `_StationMeta`
        carrying the station's label + distance — the diff loop needs
        both, but mutating the point dict with scratch keys was a code
        smell. Skips points with no evseId — without a stable identity
        we can't diff them across refreshes.
        """
        index: dict[tuple[str, str], tuple[dict[str, Any], _StationMeta]] = {}
        for station in stations:
            if not isinstance(station, dict):
                continue
            station_id = station.get("stationId") or ""
            meta = _StationMeta(
                label=station.get("label"),
                distance=station.get("distance"),
            )
            for point in station.get("points") or []:
                if not isinstance(point, dict):
                    continue
                evse_id = point.get("evseId") or ""
                if not evse_id:
                    continue
                index[(station_id, evse_id)] = (point, meta)
        return index
