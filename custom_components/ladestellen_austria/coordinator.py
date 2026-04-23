"""DataUpdateCoordinator for Ladestellen Austria."""
from __future__ import annotations

import asyncio
import logging
from collections.abc import Callable
from datetime import timedelta
from typing import Any

import aiohttp

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    CONF_LATITUDE,
    CONF_LONGITUDE,
    CONF_SCAN_INTERVAL,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    API_BASE_URL,
    API_KEY_HEADER,
    CONF_API_KEY,
    CONF_DOMAIN,
    DATEX_STATUS_PATH,
    DEFAULT_MAX_RESULTS,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    REFERER_HEADER,
    REQUEST_TIMEOUT_SEC,
    SEARCH_PATH,
    USER_AGENT,
)

_LOGGER = logging.getLogger(__name__)

type LadestellenAustriaConfigEntry = ConfigEntry["LadestellenAustriaCoordinator"]


class LadestellenAustriaCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Poll E-Control's Ladestellenverzeichnis + DATEX II status feed."""

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
        self._session = async_get_clientsession(hass)

        self._issue_raised: bool = False
        self._unsub: list[Callable[[], None]] = []

        scan = config.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=timedelta(minutes=scan),
        )

    async def _async_setup(self) -> None:
        """One-shot setup hook invoked inside async_config_entry_first_refresh."""
        return None

    @callback
    def async_teardown(self) -> None:
        """Cancel all listeners on unload."""
        for unsub in self._unsub:
            unsub()
        self._unsub.clear()

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

    async def _fetch_search(self) -> list[dict[str, Any]]:
        """Fetch nearest stations from /search. Raises UpdateFailed on failure.

        This call carries the auth contract — 401/403 responses here
        translate to ConfigEntryAuthFailed so HA drives the reauth flow.
        """
        url = f"{API_BASE_URL}{SEARCH_PATH}"
        params = {
            "latitude": str(self._latitude),
            "longitude": str(self._longitude),
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

    async def _fetch_live_status(self) -> dict[str, str]:
        """Fetch DATEX II status feed and return an evseId → status map.

        Best-effort: returns an empty dict on any failure rather than raising,
        so a DATEX II outage never prevents the /search data from reaching
        HA. The card keeps working with the /search-provided status values
        (which always read AVAILABLE pre-merge).
        """
        url = f"{API_BASE_URL}{DATEX_STATUS_PATH}"
        timeout = aiohttp.ClientTimeout(total=REQUEST_TIMEOUT_SEC)
        try:
            resp = await self._session.get(
                url, headers=self._build_headers(), timeout=timeout,
            )
            resp.raise_for_status()
            payload = await resp.json()
        except (
            asyncio.TimeoutError,
            aiohttp.ClientError,
            aiohttp.ContentTypeError,
            ValueError,
        ) as err:
            _LOGGER.info(
                "Ladestellen Austria live-status fetch skipped: %s", err
            )
            return {}

        return _index_live_status(payload)

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch nearest stations + live status, merge, and return."""
        # Parallel fetch. return_exceptions=True so a DATEX II failure doesn't
        # drop the /search result (which carries the auth contract and is the
        # primary data path).
        search_result, live_result = await asyncio.gather(
            self._fetch_search(),
            self._fetch_live_status(),
            return_exceptions=True,
        )

        if isinstance(search_result, BaseException):
            raise search_result

        stations: list[dict[str, Any]] = list(search_result)
        stations.sort(key=lambda s: s.get("distance") or float("inf"))
        truncated = stations[:DEFAULT_MAX_RESULTS]

        live_map: dict[str, str] = (
            live_result if isinstance(live_result, dict) else {}
        )
        if live_map:
            _merge_live_status(truncated, live_map)

        if self.last_update_success is False:
            _LOGGER.info(
                "Ladestellen Austria API available again (%d stations)",
                len(truncated),
            )

        return {
            "stations": truncated,
            "count": len(truncated),
            "nearest": truncated[0] if truncated else None,
            "live_status_available": bool(live_map),
        }


def _index_live_status(payload: Any) -> dict[str, str]:
    """Walk a DATEX II status publication and build an evseId → status map.

    The DATEX II hierarchy is:
      publication
        energyInfrastructureSiteStatus[]
          energyInfrastructureStationStatus[]
            refillPointStatus[]
              reference.id     ← EVSE ID (e.g. AT*EVN*E4654*1)
              status.value     ← AVAILABLE / OCCUPIED / OUT_OF_ORDER / ...

    The function is defensive about missing or renamed levels so the merge
    keeps working if E-Control tweaks the publication shape.
    """
    if not isinstance(payload, dict):
        return {}
    index: dict[str, str] = {}
    sites = payload.get("energyInfrastructureSiteStatus") or []
    if not isinstance(sites, list):
        return {}
    for site in sites:
        if not isinstance(site, dict):
            continue
        stations = site.get("energyInfrastructureStationStatus") or []
        if not isinstance(stations, list):
            continue
        for station in stations:
            if not isinstance(station, dict):
                continue
            points = station.get("refillPointStatus") or []
            if not isinstance(points, list):
                continue
            for point in points:
                if not isinstance(point, dict):
                    continue
                ref = point.get("reference") or {}
                status = point.get("status") or {}
                evse_id = ref.get("id") if isinstance(ref, dict) else None
                value = status.get("value") if isinstance(status, dict) else None
                if isinstance(evse_id, str) and isinstance(value, str):
                    index[evse_id] = value
    return index


def _merge_live_status(
    stations: list[dict[str, Any]], live_map: dict[str, str]
) -> None:
    """Overwrite each point's `status` field with the DATEX II live value.

    Mutates stations in place. Points whose evseId isn't in live_map keep
    whatever status /search returned (typically AVAILABLE) — this is a
    silent degradation rather than an error so the card still renders.
    """
    for station in stations:
        points = station.get("points") or []
        if not isinstance(points, list):
            continue
        for point in points:
            if not isinstance(point, dict):
                continue
            evse_id = point.get("evseId")
            if isinstance(evse_id, str) and evse_id in live_map:
                point["status"] = live_map[evse_id]
