"""Tests for the Ladestellen Austria HasFreeSlotBinarySensor."""
from __future__ import annotations

from typing import Any
from unittest.mock import MagicMock

from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.binary_sensor import (
    HasFreeSlotBinarySensor,
)
from custom_components.ladestellen_austria.const import DOMAIN

from .conftest import BASE_ENTRY_DATA


def _build_binary_sensor(
    hass: HomeAssistant, coordinator_data: Any
) -> HasFreeSlotBinarySensor:
    """Construct a binary sensor wired to a fake coordinator."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={**BASE_ENTRY_DATA},
        options={},
        title="Test",
    )
    entry.add_to_hass(hass)
    coordinator = MagicMock()
    coordinator.data = coordinator_data
    coordinator.last_update_success = True
    return HasFreeSlotBinarySensor(coordinator, entry)


def _stations_with(*statuses: str) -> list[dict[str, Any]]:
    """Build a one-station payload with `len(statuses)` points using the
    given status strings — keeps each test's intent visible inline."""
    return [
        {
            "stationId": "S1",
            "label": "Test Station",
            "distance": 1.0,
            "points": [
                {"evseId": f"E{i}", "status": s} for i, s in enumerate(statuses)
            ],
        }
    ]


def test_is_on_true_when_any_point_available(hass: HomeAssistant) -> None:
    """A single AVAILABLE point flips the sensor on."""
    sensor = _build_binary_sensor(
        hass,
        {"stations": _stations_with("CHARGING", "AVAILABLE", "OUT_OF_ORDER")},
    )
    assert sensor.is_on is True
    attrs = sensor.extra_state_attributes
    assert attrs["free_slot_count"] == 1
    assert attrs["total_slot_count"] == 3
    assert attrs["stations_with_free"] == 1


def test_is_on_false_when_no_points_available(hass: HomeAssistant) -> None:
    """All non-AVAILABLE → off, attributes report zero free."""
    sensor = _build_binary_sensor(
        hass,
        {"stations": _stations_with("CHARGING", "OCCUPIED", "OUT_OF_ORDER")},
    )
    assert sensor.is_on is False
    assert sensor.extra_state_attributes["free_slot_count"] == 0


def test_is_on_normalizes_underscores(hass: HomeAssistant) -> None:
    """API may return AVAILABLE / OUT_OF_ORDER — both normalisations
    must match the AVAILABLE check (no false negatives on hyphenation
    drift in the upstream payload)."""
    sensor = _build_binary_sensor(hass, {"stations": _stations_with("AVAILABLE")})
    assert sensor.is_on is True


def test_is_on_none_when_coordinator_has_no_data(hass: HomeAssistant) -> None:
    """Pre-first-refresh: state is unknown, not False (which would
    misleadingly read as 'no slots free')."""
    sensor = _build_binary_sensor(hass, None)
    assert sensor.is_on is None


def test_attributes_aggregate_across_stations(hass: HomeAssistant) -> None:
    """stations_with_free counts stations that have ≥1 free slot, not
    total free slots (which is free_slot_count)."""
    stations = [
        {
            "stationId": "S1",
            "points": [
                {"evseId": "E1", "status": "AVAILABLE"},
                {"evseId": "E2", "status": "AVAILABLE"},
            ],
        },
        {
            "stationId": "S2",
            "points": [{"evseId": "E1", "status": "OCCUPIED"}],
        },
        {
            "stationId": "S3",
            "points": [{"evseId": "E1", "status": "AVAILABLE"}],
        },
    ]
    sensor = _build_binary_sensor(hass, {"stations": stations})
    attrs = sensor.extra_state_attributes
    assert attrs["free_slot_count"] == 3
    assert attrs["total_slot_count"] == 4
    assert attrs["stations_with_free"] == 2


def test_skips_malformed_entries(hass: HomeAssistant) -> None:
    """Non-dict entries in stations[] / points[] are ignored, not
    raised — defensive against stray nulls in the upstream payload."""
    stations = [
        None,
        {"stationId": "S1", "points": [None, {"evseId": "E1", "status": "AVAILABLE"}]},
    ]
    sensor = _build_binary_sensor(hass, {"stations": stations})
    assert sensor.is_on is True
    assert sensor.extra_state_attributes["free_slot_count"] == 1
