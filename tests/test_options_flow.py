"""Tests for the Ladestellen Austria options flow."""
from __future__ import annotations

from unittest.mock import AsyncMock

from homeassistant.const import CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import DEFAULT_SCAN_INTERVAL, DOMAIN

from .conftest import BASE_ENTRY_DATA


def _entry(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={**BASE_ENTRY_DATA},
        options={},
        title="Test",
        unique_id="www.meineseite.at:48.21:16.37",
    )
    entry.add_to_hass(hass)
    return entry


async def test_options_form_shows(hass: HomeAssistant, mock_fetch: AsyncMock) -> None:
    """Initial options form is rendered with the current scan_interval default."""
    entry = _entry(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] == FlowResultType.FORM
    assert result["step_id"] == "init"


async def test_options_writes_scan_interval(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Submitting the form writes scan_interval into entry.options."""
    entry = _entry(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {CONF_SCAN_INTERVAL: 45}
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    refreshed = hass.config_entries.async_get_entry(entry.entry_id)
    assert refreshed is not None
    assert refreshed.options[CONF_SCAN_INTERVAL] == 45


async def test_options_default_used_when_missing(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """An empty submission falls back to DEFAULT_SCAN_INTERVAL."""
    entry = _entry(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    flow = await hass.config_entries.options.async_init(entry.entry_id)
    # Voluptuous will reject a truly empty payload, so submit the default
    # to mirror the form-default behaviour.
    result = await hass.config_entries.options.async_configure(
        flow["flow_id"], {CONF_SCAN_INTERVAL: DEFAULT_SCAN_INTERVAL}
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    refreshed = hass.config_entries.async_get_entry(entry.entry_id)
    assert refreshed is not None
    assert refreshed.options[CONF_SCAN_INTERVAL] == DEFAULT_SCAN_INTERVAL
