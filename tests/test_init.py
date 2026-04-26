"""Tests for the integration's setup/unload/remove lifecycle."""
from __future__ import annotations

from unittest.mock import AsyncMock, patch

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import DOMAIN

from .conftest import BASE_ENTRY_DATA


def _entry(hass: HomeAssistant, *, unique_id: str | None = None) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={**BASE_ENTRY_DATA},
        options={},
        title="Test",
        unique_id=unique_id or "www.meineseite.at:48.21:16.37",
    )
    entry.add_to_hass(hass)
    return entry


async def test_setup_and_unload_entry(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """async_setup_entry → async_unload_entry round trip."""
    entry = _entry(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.NOT_LOADED


async def test_remove_last_entry_unregisters_card(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Removing the last config entry must call card_registration.async_unregister."""
    entry = _entry(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    with patch(
        "custom_components.ladestellen_austria.JSModuleRegistration.async_unregister",
        new_callable=AsyncMock,
    ) as unregister:
        assert await hass.config_entries.async_remove(entry.entry_id)
        await hass.async_block_till_done()
        unregister.assert_awaited_once()


async def test_remove_one_of_two_entries_keeps_card(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """When other entries remain, the Lovelace resource must NOT be dropped."""
    entry_a = _entry(hass, unique_id="www.meineseite.at:48.21:16.37")
    entry_b = _entry(hass, unique_id="www.meineseite.at:48.30:16.40")
    # Setting up one entry loads the integration and HA auto-sets-up
    # remaining entries of the same domain — block_till_done covers that.
    assert await hass.config_entries.async_setup(entry_a.entry_id)
    await hass.async_block_till_done()
    assert entry_b.state is ConfigEntryState.LOADED

    with patch(
        "custom_components.ladestellen_austria.JSModuleRegistration.async_unregister",
        new_callable=AsyncMock,
    ) as unregister:
        assert await hass.config_entries.async_remove(entry_a.entry_id)
        await hass.async_block_till_done()
        unregister.assert_not_awaited()
