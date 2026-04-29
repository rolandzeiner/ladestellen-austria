"""Ladestellen Austria integration."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.components.websocket_api import async_register_command
from homeassistant.components.websocket_api.connection import ActiveConnection
from homeassistant.components.websocket_api.decorators import (
    async_response,
    websocket_command,
)
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED, Platform
from homeassistant.core import CoreState, Event, HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import device_registry as dr

from .card_registration import JSModuleRegistration
from .const import CARD_VERSION, DOMAIN, INTEGRATION_VERSION
from .coordinator import LadestellenAustriaConfigEntry, LadestellenAustriaCoordinator

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

_LOGGER = logging.getLogger(__name__)
PLATFORMS: list[Platform] = [Platform.BINARY_SENSOR, Platform.SENSOR]


@websocket_command(
    {vol.Required("type"): "ladestellen_austria/card_version"}
)
@async_response
async def _websocket_card_version(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the bundled card version so the frontend can detect mismatches.

    The frontend bundle hard-codes `CARD_VERSION` at build time. When HA
    updates the integration but the user is still running a tab that
    cached the old bundle, this probe lets the card surface a reload
    banner instead of silently misbehaving.
    """
    connection.send_result(msg["id"], {"version": CARD_VERSION})


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up the Ladestellen Austria component + register the card."""
    hass.data.setdefault(DOMAIN, {})

    # WS commands registered here survive integration removal — HA's
    # websocket_api has no public deregister hook. Same caveat as the
    # static path registration in card_registration.py: pragmatic given
    # the API surface, harmless in practice (a stray handler that no
    # caller invokes once the bundle is gone). Re-registering on
    # subsequent setups is idempotent — `async_register_command` raises
    # KeyError on collision and the second call would be skipped, but
    # async_setup only runs once per HA startup, so we never reach that
    # branch in normal operation.
    async_register_command(hass, _websocket_card_version)

    # Register the Lovelace card once at component setup — never per-entry.
    # If HA is not yet running, defer until EVENT_HOMEASSISTANT_STARTED so
    # frontend/http/lovelace are ready (they're listed in after_dependencies,
    # which is soft ordering; card registration must not run before they load).
    registration = JSModuleRegistration(hass)

    async def _register_card(_event: Event | None = None) -> None:
        await registration.async_register()

    if hass.state == CoreState.running:
        await _register_card()
    else:
        hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, _register_card)

    return True


async def async_setup_entry(hass: HomeAssistant, entry: LadestellenAustriaConfigEntry) -> bool:
    """Set up Ladestellen Austria from a config entry."""
    _LOGGER.info("Ladestellen Austria %s setup", INTEGRATION_VERSION)
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


async def async_migrate_entry(
    hass: HomeAssistant, entry: LadestellenAustriaConfigEntry
) -> bool:
    """Migrate older entry shapes forward.

    Currently a no-op — VERSION 1, MINOR_VERSION 1 is the only shape ever
    written. The hook is wired up so the next additive bump (MINOR_VERSION 2)
    or breaking bump (VERSION 2) can drop in branch logic without a separate
    plumbing pass. Returning False rolls the entry into SETUP_ERROR; True
    means "shape now matches the current code".
    """
    return True


async def async_unload_entry(hass: HomeAssistant, entry: LadestellenAustriaConfigEntry) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def async_remove_entry(
    hass: HomeAssistant, entry: LadestellenAustriaConfigEntry
) -> None:
    """Drop the Lovelace resource when the last config entry is removed.

    The card registration is component-level (one resource per HA install,
    not per entry), so this only runs when no other entries of this
    integration remain. Reload goes through async_unload_entry, not here,
    so the card stays registered across reloads.
    """
    remaining = [
        e
        for e in hass.config_entries.async_entries(DOMAIN)
        if e.entry_id != entry.entry_id
    ]
    if remaining:
        return
    registration = JSModuleRegistration(hass)
    await registration.async_unregister()
