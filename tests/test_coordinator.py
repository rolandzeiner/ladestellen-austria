"""Tests for the Ladestellen Austria coordinator."""
from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE, CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import UpdateFailed
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    DOMAIN,
)
from custom_components.ladestellen_austria.coordinator import (
    LadestellenAustriaCoordinator,
)

from .conftest import EXAMPLE_COORDINATOR_DATA

BASE_ENTRY_DATA: dict[str, object] = {
    CONF_API_KEY: "REDACTED_API_KEY",
    CONF_DOMAIN: "www.meineseite.at",
    CONF_LATITUDE: 48.21,
    CONF_LONGITUDE: 16.37,
    CONF_SCAN_INTERVAL: 30,
}


def _make_entry(data: dict[str, object] | None = None) -> MockConfigEntry:
    entry_data = {**BASE_ENTRY_DATA, **(data or {})}
    return MockConfigEntry(domain=DOMAIN, data=entry_data, options={})


async def test_fetch_success(hass: HomeAssistant, mock_fetch: AsyncMock) -> None:
    """Coordinator exposes fetched data on refresh."""
    entry = _make_entry()
    entry.add_to_hass(hass)

    coordinator = LadestellenAustriaCoordinator(hass, entry)
    await coordinator.async_refresh()
    assert coordinator.data == EXAMPLE_COORDINATOR_DATA
    assert coordinator.data["nearest"]["label"] == "Test Station"


async def test_api_failure_raises_update_failed(hass: HomeAssistant) -> None:
    """Upstream failure bubbles as UpdateFailed from the coordinator."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    with (
        patch(
            "custom_components.ladestellen_austria.coordinator.LadestellenAustriaCoordinator._async_update_data",
            side_effect=UpdateFailed("boom"),
        ),
        pytest.raises(UpdateFailed),
    ):
        await coordinator._async_update_data()


async def test_config_entry_not_ready_on_first_refresh_failure(
    hass: HomeAssistant,
) -> None:
    """Setup retries when the first refresh fails."""
    from homeassistant.config_entries import ConfigEntryState

    entry = _make_entry()
    entry.add_to_hass(hass)

    with patch(
        "custom_components.ladestellen_austria.coordinator.LadestellenAustriaCoordinator._async_update_data",
        side_effect=Exception("connection refused"),
    ):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

    assert entry.state is ConfigEntryState.SETUP_RETRY


async def test_repair_issue_lifecycle(hass: HomeAssistant) -> None:
    """Degraded-condition issue raises once and clears on recovery."""
    from homeassistant.helpers import issue_registry as ir

    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    coordinator._raise_degraded_issue("example_degraded", details="simulated")
    coordinator._raise_degraded_issue("example_degraded", details="simulated")

    registry = ir.async_get(hass)
    issues = [
        i
        for i in registry.issues.values()
        if i.domain == DOMAIN and i.issue_id.startswith("example_degraded_")
    ]
    assert len(issues) == 1

    coordinator._clear_degraded_issue("example_degraded")
    assert (
        registry.async_get_issue(DOMAIN, f"example_degraded_{entry.entry_id}")
        is None
    )
