"""Tests for the Ladestellen Austria diagnostics module."""
from __future__ import annotations

from unittest.mock import AsyncMock, patch

from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE, CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    DOMAIN,
)
from custom_components.ladestellen_austria.diagnostics import (
    async_get_config_entry_diagnostics,
)

from .conftest import EXAMPLE_COORDINATOR_DATA

BASE_DATA: dict[str, object] = {
    CONF_API_KEY: "super-secret-key",
    CONF_DOMAIN: "www.meineseite.at",
    CONF_LATITUDE: 48.21,
    CONF_LONGITUDE: 16.37,
    CONF_SCAN_INTERVAL: 30,
}


async def test_diagnostics_redacts_credentials(hass: HomeAssistant) -> None:
    """Every credential / location field is redacted from diagnostics output."""
    entry = MockConfigEntry(
        domain=DOMAIN, data=BASE_DATA, options={}, title="Test"
    )
    entry.add_to_hass(hass)

    with patch(
        "custom_components.ladestellen_austria.coordinator.LadestellenAustriaCoordinator._async_update_data",
        new_callable=AsyncMock,
        return_value=EXAMPLE_COORDINATOR_DATA,
    ):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

    diag = await async_get_config_entry_diagnostics(hass, entry)
    redacted = "**REDACTED**"
    assert diag["entry"]["data"][CONF_API_KEY] == redacted
    assert diag["entry"]["data"][CONF_DOMAIN] == redacted
    assert diag["entry"]["data"][CONF_LATITUDE] == redacted
    assert diag["entry"]["data"][CONF_LONGITUDE] == redacted
    assert diag["entry"]["title"] == "Test"
    assert diag["coordinator"]["last_update_success"] is True
    assert diag["coordinator"]["station_count"] == 1
