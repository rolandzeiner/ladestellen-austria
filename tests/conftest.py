"""Shared pytest fixtures for Ladestellen Austria tests."""
from __future__ import annotations

from collections.abc import Generator
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE, CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.syrupy import HomeAssistantSnapshotExtension
from syrupy.assertion import SnapshotAssertion

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    DOMAIN,
)

pytest_plugins = "pytest_homeassistant_custom_component"


EXAMPLE_STATIONS = [
    {
        "countryId": "AT",
        "operatorId": "ECT",
        "stationId": "E5487EA07",
        "stationStatus": "ACTIVE",
        "label": "Test Station",
        "postCode": "1010",
        "city": "Wien",
        "street": "Rudolfsplatz 13a",
        "distance": 0.5,
        "greenEnergy": True,
    }
]

EXAMPLE_COORDINATOR_DATA = {
    "stations": EXAMPLE_STATIONS,
    "count": len(EXAMPLE_STATIONS),
    "nearest": EXAMPLE_STATIONS[0],
    "live_status_available": True,
}

BASE_ENTRY_DATA: dict[str, object] = {
    CONF_API_KEY: "REDACTED_API_KEY",
    CONF_DOMAIN: "www.meineseite.at",
    CONF_LATITUDE: 48.21,
    CONF_LONGITUDE: 16.37,
    CONF_SCAN_INTERVAL: 30,
}


def make_entry(
    hass: HomeAssistant | None = None,
    *,
    data_overrides: dict[str, object] | None = None,
    options: dict[str, object] | None = None,
    title: str = "Test",
    unique_id: str | None = "www.meineseite.at:48.21:16.37",
) -> MockConfigEntry:
    """Build a MockConfigEntry with sensible defaults for this integration.

    One canonical entry-builder for all tests. Pass `hass` to also
    register the entry on the bus (most tests want this); omit `hass`
    for tests that operate on the entry without a HA core (rare).
    `data_overrides` is shallow-merged onto BASE_ENTRY_DATA so callers
    can flip a single field without restating the rest.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={**BASE_ENTRY_DATA, **(data_overrides or {})},
        options=options or {},
        title=title,
        unique_id=unique_id,
    )
    if hass is not None:
        entry.add_to_hass(hass)
    return entry


@pytest.fixture
def snapshot(snapshot: SnapshotAssertion) -> SnapshotAssertion:
    """Use the HA snapshot extension so diagnostics / state dumps diff cleanly."""
    return snapshot.use_extension(HomeAssistantSnapshotExtension)


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """Enable custom integrations for all tests in this package."""
    return None


@pytest.fixture(autouse=True)
def mock_aiohttp_session() -> Generator[None]:
    """Mock the aiohttp session to prevent pycares DNS background thread.

    pytest-homeassistant-custom-component's verify_cleanup fixture asserts no
    stray threads remain at teardown; the DNS-resolver thread violates that.
    """
    with patch(
        "custom_components.ladestellen_austria.coordinator.async_get_clientsession",
    ):
        yield


@pytest.fixture
def mock_fetch() -> Generator[AsyncMock]:
    """Stub the coordinator fetch and the config-flow probe for happy-path tests."""
    with (
        patch(
            "custom_components.ladestellen_austria.coordinator.LadestellenAustriaCoordinator._async_update_data",
            new_callable=AsyncMock,
            return_value=EXAMPLE_COORDINATOR_DATA,
        ) as m,
        patch(
            "custom_components.ladestellen_austria.config_flow._test_api_connection",
            new_callable=AsyncMock,
            return_value=None,
        ),
    ):
        yield m
