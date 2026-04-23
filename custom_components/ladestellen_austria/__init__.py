"""Ladestellen Austria integration."""
from __future__ import annotations

import logging
from typing import Any

from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import device_registry as dr

from .const import DOMAIN
from .coordinator import LadestellenAustriaConfigEntry, LadestellenAustriaCoordinator

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

_LOGGER = logging.getLogger(__name__)
PLATFORMS: list[Platform] = [Platform.SENSOR]


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up the Ladestellen Austria component."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: LadestellenAustriaConfigEntry) -> bool:
    """Set up Ladestellen Austria from a config entry."""
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    # HA auto-invokes coordinator._async_setup() inside this call before the
    # first fetch; it also raises ConfigEntryNotReady on fetch failure.
    await coordinator.async_config_entry_first_refresh()

    # Register teardown only after first_refresh succeeded — avoids running
    # teardown on a half-initialized coordinator if setup raised.
    entry.async_on_unload(coordinator.async_teardown)

    entry.runtime_data = coordinator

    # Register a device explicitly so the Devices panel shows the entry
    # even before any entity reports state.
    dr.async_get(hass).async_get_or_create(
        config_entry_id=entry.entry_id,
        identifiers={(DOMAIN, entry.entry_id)},
        name=entry.title,
        manufacturer="E-Control Austria",
        model="Ladestellenverzeichnis",
        configuration_url="https://www.ladestellen.at/",
    )

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    return True


async def _async_reload_entry(hass: HomeAssistant, entry: LadestellenAustriaConfigEntry) -> None:
    """Reload the config entry when options are updated."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: LadestellenAustriaConfigEntry) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
