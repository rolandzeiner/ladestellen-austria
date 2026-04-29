"""Diagnostics support for Ladestellen Austria."""
from __future__ import annotations

from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE
from homeassistant.core import HomeAssistant

from .const import ATTRIBUTION, CONF_API_KEY, CONF_DOMAIN
from .coordinator import LadestellenAustriaConfigEntry

TO_REDACT: set[str] = {
    CONF_API_KEY,
    CONF_DOMAIN,
    CONF_LATITUDE,
    CONF_LONGITUDE,
    # Defensive future-proofing — diagnostics dumps end up in public GitHub
    # issues, so over-redacting is essentially free. "Referer" matches the
    # outbound header the coordinator builds from CONF_DOMAIN if it ever
    # surfaces in a future request-history field; "password" / "token" are
    # generic auth-field names that would otherwise need a contributor to
    # remember to update this set when adding them. Removing any of these
    # is a regression — extend the set, never shrink it.
    "Referer",
    "password",
    "token",
}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: LadestellenAustriaConfigEntry
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""
    coordinator = entry.runtime_data
    data = coordinator.data or {}
    return {
        "attribution": ATTRIBUTION,
        "entry": {
            "title": entry.title,
            "version": entry.version,
            "data": async_redact_data(dict(entry.data), TO_REDACT),
            "options": async_redact_data(dict(entry.options), TO_REDACT),
        },
        "coordinator": {
            "last_update_success": coordinator.last_update_success,
            "last_exception": repr(coordinator.last_exception),
            "update_interval": str(coordinator.update_interval),
            "station_count": data.get("count", 0),
        },
    }
