"""Tests for the Ladestellen Austria NearestStationSensor."""
from __future__ import annotations

from typing import Any
from unittest.mock import MagicMock

import pytest
from homeassistant.const import UnitOfLength
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import (
    CONF_DYNAMIC_ENTITY,
    DOMAIN,
)
from custom_components.ladestellen_austria.sensor import NearestStationSensor

from .conftest import BASE_ENTRY_DATA, EXAMPLE_COORDINATOR_DATA, EXAMPLE_STATIONS


def _build_sensor(
    hass: HomeAssistant,
    coordinator_data: Any,
    *,
    dynamic_entity: str | None = None,
) -> NearestStationSensor:
    """Construct a sensor wired to a fake coordinator with the given data."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={**BASE_ENTRY_DATA},
        options={},
        title="Test",
    )
    entry.add_to_hass(hass)
    coordinator = MagicMock()
    coordinator.data = coordinator_data
    coordinator.dynamic_mode = dynamic_entity is not None
    coordinator.dynamic_entity = dynamic_entity
    coordinator.last_update_success = True
    return NearestStationSensor(coordinator, entry)


def test_native_value_returns_distance(hass: HomeAssistant) -> None:
    """A well-formed nearest dict yields the distance as a float."""
    sensor = _build_sensor(hass, EXAMPLE_COORDINATOR_DATA)
    assert sensor.native_value == 0.5


def test_native_value_none_when_no_data(hass: HomeAssistant) -> None:
    """Coordinator with no data yields None (HA renders 'unknown')."""
    sensor = _build_sensor(hass, None)
    assert sensor.native_value is None


def test_native_value_none_when_nearest_missing(hass: HomeAssistant) -> None:
    """Empty payload (nearest=None) yields None, not a crash."""
    sensor = _build_sensor(
        hass,
        {"stations": [], "count": 0, "nearest": None, "live_status_available": True},
    )
    assert sensor.native_value is None


def test_native_value_none_when_nearest_not_dict(hass: HomeAssistant) -> None:
    """Defensive: a non-dict 'nearest' (corrupted state) yields None."""
    sensor = _build_sensor(
        hass,
        {"stations": [], "count": 0, "nearest": "garbage", "live_status_available": True},
    )
    assert sensor.native_value is None


def test_native_value_none_when_distance_missing(hass: HomeAssistant) -> None:
    """nearest dict without a 'distance' key yields None."""
    sensor = _build_sensor(
        hass,
        {
            "stations": [{"label": "x"}],
            "count": 1,
            "nearest": {"label": "x"},
            "live_status_available": True,
        },
    )
    assert sensor.native_value is None


def test_native_value_none_when_distance_not_castable(hass: HomeAssistant) -> None:
    """Non-numeric distance (e.g. 'NaN'-string) is treated as unknown."""
    sensor = _build_sensor(
        hass,
        {
            "stations": [{"label": "x", "distance": "not-a-number"}],
            "count": 1,
            "nearest": {"label": "x", "distance": "not-a-number"},
            "live_status_available": True,
        },
    )
    assert sensor.native_value is None


def test_extra_state_attributes_static_mode(hass: HomeAssistant) -> None:
    """Static-mode entry exposes dynamic_mode=False, dynamic_entity=None."""
    sensor = _build_sensor(hass, EXAMPLE_COORDINATOR_DATA)
    attrs = sensor.extra_state_attributes
    assert attrs["station_count"] == 1
    assert attrs["stations"] == EXAMPLE_STATIONS
    assert attrs["live_status_available"] is True
    assert attrs["dynamic_mode"] is False
    assert attrs["dynamic_entity"] is None


def test_extra_state_attributes_dynamic_mode(hass: HomeAssistant) -> None:
    """Dynamic-mode entry projects dynamic_mode=True and the tracker entity_id."""
    sensor = _build_sensor(
        hass, EXAMPLE_COORDINATOR_DATA, dynamic_entity="device_tracker.phone"
    )
    attrs = sensor.extra_state_attributes
    assert attrs["dynamic_mode"] is True
    assert attrs["dynamic_entity"] == "device_tracker.phone"


def test_extra_state_attributes_with_no_data(hass: HomeAssistant) -> None:
    """No coordinator data yields safe defaults instead of KeyError."""
    sensor = _build_sensor(hass, None)
    attrs = sensor.extra_state_attributes
    assert attrs["station_count"] == 0
    assert attrs["stations"] == []
    assert attrs["live_status_available"] is False
    assert attrs["dynamic_mode"] is False


def test_sensor_metadata(hass: HomeAssistant) -> None:
    """Device-class, unit, and attribution must remain stable — UI invariants."""
    sensor = _build_sensor(hass, EXAMPLE_COORDINATOR_DATA)
    assert sensor._attr_native_unit_of_measurement == UnitOfLength.KILOMETERS
    # Required verbatim by §3d of the ladestellen.at Nutzungsbedingungen.
    assert sensor._attr_attribution == "Datenquelle: E-Control"
    # FROZEN unique_id format — changing this wipes existing entities.
    assert sensor._attr_unique_id.endswith("_nearest_station")
