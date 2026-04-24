"""Tests for the Ladestellen Austria coordinator."""
from __future__ import annotations

from datetime import timedelta
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE, CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import UpdateFailed
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    CONF_DYNAMIC_ENTITY,
    DOMAIN,
    DOMAIN_LAST_API_CALL_KEY,
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


# ---------------------------------------------------------------------------
# Dynamic tracker mode — properties + update_interval selection
# ---------------------------------------------------------------------------


async def test_dynamic_mode_property_false_for_static(
    hass: HomeAssistant,
) -> None:
    """dynamic_mode is False when no tracker entity is configured."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    assert coordinator.dynamic_mode is False
    assert coordinator.dynamic_entity is None


async def test_dynamic_mode_property_true_for_tracker(
    hass: HomeAssistant,
) -> None:
    """dynamic_mode is True when a tracker entity is configured."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    assert coordinator.dynamic_mode is True
    assert coordinator.dynamic_entity == "device_tracker.phone"


async def test_dynamic_mode_uses_safety_interval(hass: HomeAssistant) -> None:
    """Dynamic entries use the 6-hour safety interval, not scan_interval."""
    entry = _make_entry(
        {CONF_DYNAMIC_ENTITY: "device_tracker.phone", CONF_SCAN_INTERVAL: 30}
    )
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    assert coordinator.update_interval == timedelta(hours=6)


# ---------------------------------------------------------------------------
# Dynamic mode — _should_update rate-limit guards
# ---------------------------------------------------------------------------


async def test_should_update_first_call_passes(hass: HomeAssistant) -> None:
    """First call with no prior position clears all three guards."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    assert coordinator._should_update(48.21, 16.37) is True


async def test_should_update_blocks_on_distance_threshold(
    hass: HomeAssistant,
) -> None:
    """A move below DYNAMIC_DISTANCE_THRESHOLD_M (1500 m) is ignored."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    coordinator._last_fetch_lat = 48.21
    coordinator._last_fetch_lng = 16.37
    coordinator._last_fetch_time = dt_util.utcnow() - timedelta(hours=1)
    # Roughly 10 m away — below the 1500 m threshold.
    assert coordinator._should_update(48.2101, 16.3701) is False


async def test_should_update_passes_when_moved_far(hass: HomeAssistant) -> None:
    """A move above DYNAMIC_DISTANCE_THRESHOLD_M and past entry cooldown
    passes all three guards."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    coordinator._last_fetch_lat = 48.21
    coordinator._last_fetch_lng = 16.37
    coordinator._last_fetch_time = dt_util.utcnow() - timedelta(hours=1)
    # ~15 km away
    assert coordinator._should_update(48.35, 16.5) is True


async def test_should_update_blocks_on_entry_cooldown(
    hass: HomeAssistant,
) -> None:
    """A refresh within DYNAMIC_COOLDOWN_MINUTES (10 min) is ignored
    even if the user moved a great distance."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    coordinator._last_fetch_lat = 48.0
    coordinator._last_fetch_lng = 15.0
    coordinator._last_fetch_time = dt_util.utcnow()  # just now
    assert coordinator._should_update(49.0, 16.0) is False


async def test_should_update_blocks_on_domain_cooldown(
    hass: HomeAssistant,
) -> None:
    """A recent call from ANY entry blocks further refreshes for
    DYNAMIC_DOMAIN_COOLDOWN_MINUTES (5 min)."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    hass.data.setdefault(DOMAIN, {})[DOMAIN_LAST_API_CALL_KEY] = (
        dt_util.utcnow()
    )
    assert coordinator._should_update(48.21, 16.37) is False


# ---------------------------------------------------------------------------
# Dynamic mode — tracker subscribe / teardown
# ---------------------------------------------------------------------------


async def test_async_setup_subscribes_tracker(hass: HomeAssistant) -> None:
    """Dynamic mode registers a state-change listener during _async_setup."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    assert coordinator._unsubscribe_tracker is None
    await coordinator._async_setup()
    assert coordinator._unsubscribe_tracker is not None
    coordinator.async_teardown()
    assert coordinator._unsubscribe_tracker is None


async def test_async_setup_noop_in_static_mode(hass: HomeAssistant) -> None:
    """Static mode skips the listener registration."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    await coordinator._async_setup()
    assert coordinator._unsubscribe_tracker is None
    coordinator.async_teardown()  # must not raise


# ---------------------------------------------------------------------------
# Dynamic mode — tracker-missing Repairs issue lifecycle
# ---------------------------------------------------------------------------


async def test_tracker_missing_raises_repair_issue(hass: HomeAssistant) -> None:
    """_get_entity_coords raises a Repairs issue when the tracker has
    no coordinates, falling back to the entry's configured location."""
    from homeassistant.helpers import issue_registry as ir

    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    hass.states.async_set("device_tracker.phone", "home", {})
    state = hass.states.get("device_tracker.phone")
    lat, lng = coordinator._get_entity_coords(state)

    # Fell back to the entry's configured location.
    assert lat == 48.21
    assert lng == 16.37
    # Repairs issue was raised.
    registry = ir.async_get(hass)
    issue = registry.async_get_issue(
        DOMAIN, f"tracker_missing_{entry.entry_id}"
    )
    assert issue is not None
    assert issue.translation_key == "tracker_missing"
    assert coordinator._tracker_issue_raised is True


async def test_tracker_restored_clears_repair_issue(
    hass: HomeAssistant,
) -> None:
    """Once the tracker reports coordinates again the Repairs issue clears."""
    from homeassistant.helpers import issue_registry as ir

    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    # Raise first.
    hass.states.async_set("device_tracker.phone", "home", {})
    coordinator._get_entity_coords(hass.states.get("device_tracker.phone"))
    registry = ir.async_get(hass)
    assert (
        registry.async_get_issue(DOMAIN, f"tracker_missing_{entry.entry_id}")
        is not None
    )

    # Now simulate the tracker reporting coords again.
    hass.states.async_set(
        "device_tracker.phone",
        "not_home",
        {"latitude": 48.35, "longitude": 16.5},
    )
    lat, lng = coordinator._get_entity_coords(
        hass.states.get("device_tracker.phone")
    )
    assert lat == 48.35
    assert lng == 16.5
    assert (
        registry.async_get_issue(DOMAIN, f"tracker_missing_{entry.entry_id}")
        is None
    )
    assert coordinator._tracker_issue_raised is False
