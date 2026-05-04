"""Tests for the Ladestellen Austria coordinator."""
from __future__ import annotations

import asyncio
from datetime import timedelta
from unittest.mock import AsyncMock, MagicMock, patch

import aiohttp
import pytest
from homeassistant.const import CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import UpdateFailed
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import (
    CONF_DYNAMIC_ENTITY,
    DEFAULT_MAX_RESULTS,
    DOMAIN,
    DOMAIN_LAST_API_CALL_KEY,
)
from custom_components.ladestellen_austria.coordinator import (
    LadestellenAustriaCoordinator,
)

from .conftest import EXAMPLE_COORDINATOR_DATA, make_entry, make_response_cm


def _make_entry(data: dict[str, object] | None = None) -> MockConfigEntry:
    """Local thin wrapper — coordinator tests don't add to hass."""
    return make_entry(
        data_overrides=data,
        title="Test",
        unique_id=None,
    )


def _json_resp(body: object, status: int = 200) -> MagicMock:
    """Build a minimal mock aiohttp response."""
    resp = MagicMock()
    resp.status = status
    resp.raise_for_status = MagicMock()
    resp.json = AsyncMock(return_value=body)
    return resp


async def test_fetch_success(hass: HomeAssistant, mock_fetch: AsyncMock) -> None:
    """Coordinator exposes fetched data on refresh."""
    entry = _make_entry()
    entry.add_to_hass(hass)

    coordinator = LadestellenAustriaCoordinator(hass, entry)
    await coordinator.async_refresh()
    assert coordinator.data == EXAMPLE_COORDINATOR_DATA
    assert coordinator.data["nearest"]["label"] == "Test Station"


# ---------------------------------------------------------------------------
# _fetch_search — error-branch translation contract
# ---------------------------------------------------------------------------


def _attach_session(coordinator: LadestellenAustriaCoordinator, response_or_exc):
    """Wire a fake aiohttp session onto the coordinator.

    `response_or_exc` is either a mock response (which gets wrapped in
    an async-context-manager via make_response_cm — production code
    uses ``async with session.get(...) as resp``) or an exception
    instance to raise from session.get.
    """
    session = MagicMock()
    if isinstance(response_or_exc, BaseException):
        session.get = MagicMock(side_effect=response_or_exc)
    else:
        session.get = MagicMock(
            return_value=make_response_cm(response_or_exc)
        )
    coordinator._session = session
    return session


@pytest.mark.parametrize("status", [401, 403])
async def test_fetch_auth_error_raises_reauth(
    hass: HomeAssistant, status: int
) -> None:
    """401/403 from /search must raise ConfigEntryAuthFailed so HA triggers reauth."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    resp = _json_resp([], status=status)
    resp.raise_for_status = MagicMock(
        side_effect=aiohttp.ClientResponseError(
            request_info=MagicMock(),
            history=(),
            status=status,
            message="auth",
        )
    )
    _attach_session(coordinator, resp)

    with pytest.raises(ConfigEntryAuthFailed):
        await coordinator._fetch_search(48.21, 16.37)


async def test_fetch_server_error_raises_update_failed(
    hass: HomeAssistant,
) -> None:
    """5xx maps to UpdateFailed (recoverable)."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    resp = _json_resp([], status=500)
    resp.raise_for_status = MagicMock(
        side_effect=aiohttp.ClientResponseError(
            request_info=MagicMock(),
            history=(),
            status=500,
            message="server",
        )
    )
    _attach_session(coordinator, resp)

    with pytest.raises(UpdateFailed):
        await coordinator._fetch_search(48.21, 16.37)


async def test_fetch_timeout_raises_update_failed(hass: HomeAssistant) -> None:
    """asyncio.TimeoutError maps to UpdateFailed (api_timeout key)."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    _attach_session(coordinator, asyncio.TimeoutError())
    with pytest.raises(UpdateFailed) as exc:
        await coordinator._fetch_search(48.21, 16.37)
    assert exc.value.translation_key == "api_timeout"


async def test_fetch_client_error_raises_update_failed(
    hass: HomeAssistant,
) -> None:
    """Generic aiohttp.ClientError (DNS, connreset, etc.) maps to UpdateFailed."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    _attach_session(coordinator, aiohttp.ClientConnectionError("boom"))
    with pytest.raises(UpdateFailed) as exc:
        await coordinator._fetch_search(48.21, 16.37)
    assert exc.value.translation_key == "api_connection_error"


async def test_fetch_non_list_payload_raises_update_failed(
    hass: HomeAssistant,
) -> None:
    """A JSON object instead of a list is rejected with api_invalid_response."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    _attach_session(coordinator, _json_resp({"unexpected": "object"}))
    with pytest.raises(UpdateFailed) as exc:
        await coordinator._fetch_search(48.21, 16.37)
    assert exc.value.translation_key == "api_invalid_response"


async def test_fetch_invalid_json_raises_update_failed(
    hass: HomeAssistant,
) -> None:
    """Non-JSON body (ContentTypeError) maps to api_invalid_response."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    resp = _json_resp(None)
    resp.json = AsyncMock(
        side_effect=aiohttp.ContentTypeError(
            request_info=MagicMock(), history=()
        )
    )
    _attach_session(coordinator, resp)
    with pytest.raises(UpdateFailed) as exc:
        await coordinator._fetch_search(48.21, 16.37)
    assert exc.value.translation_key == "api_invalid_response"


async def test_fetch_filters_non_dict_entries(hass: HomeAssistant) -> None:
    """Stray non-dict items in the array are silently dropped."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    payload = [
        {"label": "ok", "distance": 1.0},
        "garbage-string",
        42,
        {"label": "also-ok", "distance": 2.0},
    ]
    _attach_session(coordinator, _json_resp(payload))
    result = await coordinator._fetch_search(48.21, 16.37)
    assert len(result) == 2
    assert all(isinstance(s, dict) for s in result)


# ---------------------------------------------------------------------------
# _async_update_data — sort + truncation contract
# ---------------------------------------------------------------------------


async def test_update_sorts_and_truncates_to_max_results(
    hass: HomeAssistant,
) -> None:
    """Results are sorted by distance and capped at DEFAULT_MAX_RESULTS."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    # 15 stations in reverse distance order — verifies sort, truncation,
    # and that nearest reflects the post-sort head.
    payload = [
        {"label": f"s{i}", "distance": float(20 - i)} for i in range(15)
    ]
    _attach_session(coordinator, _json_resp(payload))
    data = await coordinator._async_update_data()

    assert data["count"] == DEFAULT_MAX_RESULTS
    assert len(data["stations"]) == DEFAULT_MAX_RESULTS
    distances = [s["distance"] for s in data["stations"]]
    assert distances == sorted(distances)
    assert data["nearest"]["distance"] == min(s["distance"] for s in payload)
    assert data["live_status_available"] is True


async def test_update_handles_empty_payload(hass: HomeAssistant) -> None:
    """Empty result list yields nearest=None without raising."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    _attach_session(coordinator, _json_resp([]))
    data = await coordinator._async_update_data()
    assert data["count"] == 0
    assert data["stations"] == []
    assert data["nearest"] is None


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
    """A move below DYNAMIC_DISTANCE_THRESHOLD_M (1500 m) is ignored.

    Leaving _last_fetch_time as None deliberately skips the entry-cooldown
    guard so this test isolates the distance branch.
    """
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    coordinator._last_fetch_lat = 48.21
    coordinator._last_fetch_lng = 16.37
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


# ---------------------------------------------------------------------------
# Dynamic mode — _handle_tracker_update end-to-end (event → guard → refresh)
# ---------------------------------------------------------------------------


async def test_tracker_update_event_refreshes_when_moved(
    hass: HomeAssistant,
) -> None:
    """A state-change event for a fresh location triggers a refresh and
    stamps the domain-wide cooldown timestamp."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    await coordinator._async_setup()

    refresh_mock = AsyncMock()
    with patch.object(coordinator, "async_refresh", refresh_mock):
        hass.states.async_set(
            "device_tracker.phone",
            "not_home",
            {"latitude": 49.0, "longitude": 17.0},
        )
        await hass.async_block_till_done()

    refresh_mock.assert_awaited()
    assert (
        hass.data[DOMAIN].get(DOMAIN_LAST_API_CALL_KEY) is not None
    ), "domain cooldown timestamp must be stamped on refresh dispatch"
    coordinator.async_teardown()


async def test_tracker_update_event_blocked_by_cooldown_no_refresh(
    hass: HomeAssistant,
) -> None:
    """When the domain cooldown is active, the listener must NOT refresh."""
    entry = _make_entry({CONF_DYNAMIC_ENTITY: "device_tracker.phone"})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)
    await coordinator._async_setup()

    # Pre-stamp domain cooldown so _should_update returns False.
    hass.data.setdefault(DOMAIN, {})[DOMAIN_LAST_API_CALL_KEY] = dt_util.utcnow()

    refresh_mock = AsyncMock()
    with patch.object(coordinator, "async_refresh", refresh_mock):
        hass.states.async_set(
            "device_tracker.phone",
            "not_home",
            {"latitude": 49.0, "longitude": 17.0},
        )
        await hass.async_block_till_done()

    refresh_mock.assert_not_awaited()
    coordinator.async_teardown()


# ---------------------------------------------------------------------------
# Slot-status transition events — fired on per-EVSE status changes between
# successful refreshes; no event on first refresh, on identical status, or
# on a missing/null status on either side.
# ---------------------------------------------------------------------------


from custom_components.ladestellen_austria.const import (  # noqa: E402
    EVENT_SLOT_STATUS_CHANGED,
)


def _stations(*pairs: tuple[str, str]) -> list[dict[str, object]]:
    """Build a one-station payload from (evseId, status) tuples."""
    return [
        {
            "stationId": "S1",
            "label": "Test Station",
            "distance": 1.0,
            "points": [{"evseId": e, "status": s} for e, s in pairs],
        }
    ]


async def test_status_events_skip_first_refresh(hass: HomeAssistant) -> None:
    """No prior data → no diffing → no events on the very first refresh."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    events: list[dict[str, object]] = []
    hass.bus.async_listen(EVENT_SLOT_STATUS_CHANGED, lambda e: events.append(e.data))

    _attach_session(coordinator, _json_resp(_stations(("E1", "AVAILABLE"))))
    await coordinator._async_update_data()
    await hass.async_block_till_done()
    assert events == []


async def test_status_events_fire_on_transition(hass: HomeAssistant) -> None:
    """A status change between refreshes fires one event with old + new."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    events: list[dict[str, object]] = []
    hass.bus.async_listen(EVENT_SLOT_STATUS_CHANGED, lambda e: events.append(e.data))

    _attach_session(coordinator, _json_resp(_stations(("E1", "AVAILABLE"))))
    coordinator.data = await coordinator._async_update_data()
    _attach_session(coordinator, _json_resp(_stations(("E1", "CHARGING"))))
    await coordinator._async_update_data()
    await hass.async_block_till_done()

    assert len(events) == 1
    ev = events[0]
    assert ev["station_id"] == "S1"
    assert ev["station_label"] == "Test Station"
    assert ev["evse_id"] == "E1"
    assert ev["old_status"] == "AVAILABLE"
    assert ev["new_status"] == "CHARGING"
    assert ev["entry_id"] == entry.entry_id


async def test_status_events_silent_on_no_change(hass: HomeAssistant) -> None:
    """Same status across refreshes → no event."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    events: list[dict[str, object]] = []
    hass.bus.async_listen(EVENT_SLOT_STATUS_CHANGED, lambda e: events.append(e.data))

    _attach_session(coordinator, _json_resp(_stations(("E1", "AVAILABLE"))))
    coordinator.data = await coordinator._async_update_data()
    _attach_session(coordinator, _json_resp(_stations(("E1", "AVAILABLE"))))
    await coordinator._async_update_data()
    await hass.async_block_till_done()
    assert events == []


async def test_status_events_normalize_underscored_equality(
    hass: HomeAssistant,
) -> None:
    """OUT_OF_ORDER (refresh 1) vs OUTOFORDER (refresh 2) should NOT fire —
    the underscore is a representation difference, not a state change."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    events: list[dict[str, object]] = []
    hass.bus.async_listen(EVENT_SLOT_STATUS_CHANGED, lambda e: events.append(e.data))

    _attach_session(coordinator, _json_resp(_stations(("E1", "OUT_OF_ORDER"))))
    coordinator.data = await coordinator._async_update_data()
    _attach_session(coordinator, _json_resp(_stations(("E1", "OUTOFORDER"))))
    await coordinator._async_update_data()
    await hass.async_block_till_done()
    assert events == []


async def test_status_events_skip_when_evse_disappears(hass: HomeAssistant) -> None:
    """A point present in refresh 1 but missing from refresh 2 fires no
    event — disappearance is not a status change. Same for new arrivals."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    events: list[dict[str, object]] = []
    hass.bus.async_listen(EVENT_SLOT_STATUS_CHANGED, lambda e: events.append(e.data))

    _attach_session(
        coordinator, _json_resp(_stations(("E1", "AVAILABLE"), ("E2", "AVAILABLE")))
    )
    coordinator.data = await coordinator._async_update_data()
    _attach_session(coordinator, _json_resp(_stations(("E1", "AVAILABLE"))))
    await coordinator._async_update_data()
    await hass.async_block_till_done()
    assert events == []


async def test_status_events_fire_per_evse(hass: HomeAssistant) -> None:
    """Multiple transitions in a single refresh fire one event each."""
    entry = _make_entry()
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    events: list[dict[str, object]] = []
    hass.bus.async_listen(EVENT_SLOT_STATUS_CHANGED, lambda e: events.append(e.data))

    _attach_session(
        coordinator,
        _json_resp(_stations(("E1", "AVAILABLE"), ("E2", "CHARGING"))),
    )
    coordinator.data = await coordinator._async_update_data()
    _attach_session(
        coordinator,
        _json_resp(_stations(("E1", "OCCUPIED"), ("E2", "AVAILABLE"))),
    )
    await coordinator._async_update_data()
    await hass.async_block_till_done()

    assert len(events) == 2
    transitions = {(e["evse_id"], e["old_status"], e["new_status"]) for e in events}
    assert transitions == {
        ("E1", "AVAILABLE", "OCCUPIED"),
        ("E2", "CHARGING", "AVAILABLE"),
    }
