"""DataUpdateCoordinator for Ladestellen Austria."""
from __future__ import annotations

import asyncio
import logging
from collections.abc import Callable
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
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from homeassistant.util import dt as dt_util
from homeassistant.util.location import distance

from .const import (
    API_BASE_URL,
    API_KEY_HEADER,
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
    REFERER_HEADER,
    REQUEST_TIMEOUT_SEC,
    SEARCH_PATH,
    USER_AGENT,
)

_LOGGER = logging.getLogger(__name__)

type LadestellenAustriaConfigEntry = ConfigEntry["LadestellenAustriaCoordinator"]


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
        """Initialise the coordinator."""
        config = {**entry.data, **entry.options}
        self._entry = entry
        self._api_key: str = config[CONF_API_KEY]
        self._domain: str = config[CONF_DOMAIN]
        self._latitude: float = float(config[CONF_LATITUDE])
        self._longitude: float = float(config[CONF_LONGITUDE])
        self._dynamic_entity: str | None = (
            config.get(CONF_DYNAMIC_ENTITY) or None
        )
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
            scan = config.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
            interval = timedelta(minutes=scan)
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=interval,
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
        return None

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
        """Build outbound request headers.

        Auth is split across two headers: `Apikey` carries the secret, and
        `Referer` must match the domain the user registered at ladestellen.at
        (gateway strips scheme/port/path before matching, so hard-coding https
        is safe regardless of how HA itself is served).
        """
        return {
            "User-Agent": USER_AGENT,
            API_KEY_HEADER: self._api_key,
            REFERER_HEADER: f"https://{self._domain}",
            "Accept": "application/json",
        }

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
            if err.status in (401, 403):
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
        stations.sort(key=lambda s: s.get("distance") or float("inf"))
        truncated = stations[:DEFAULT_MAX_RESULTS]

        if self.last_update_success is False:
            _LOGGER.info(
                "Ladestellen Austria API available again (%d stations)",
                len(truncated),
            )

        return {
            "stations": truncated,
            "count": len(truncated),
            "nearest": truncated[0] if truncated else None,
            "live_status_available": True,
        }
