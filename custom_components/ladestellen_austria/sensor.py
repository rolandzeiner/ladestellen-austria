"""Sensor platform for Ladestellen Austria."""
from __future__ import annotations

import logging
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import UnitOfLength
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import LadestellenAustriaConfigEntry, LadestellenAustriaCoordinator

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 0


async def async_setup_entry(
    hass: HomeAssistant,
    entry: LadestellenAustriaConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up sensor entities from a config entry."""
    coordinator = entry.runtime_data
    async_add_entities([NearestStationSensor(coordinator, entry)])


class NearestStationSensor(
    CoordinatorEntity[LadestellenAustriaCoordinator], SensorEntity
):
    """Distance to the nearest charging station; full list in attributes."""

    _attr_has_entity_name = True
    _attr_device_class = SensorDeviceClass.DISTANCE
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfLength.KILOMETERS
    _attr_suggested_display_precision = 2
    # Required verbatim by §3d of the ladestellen.at Nutzungsbedingungen:
    # "Der Nutzer muss die Datenquelle unmittelbar bei den von der E-Control
    # angezeigten Daten durch folgenden Verweis anführen: 'Datenquelle:
    # E-Control'." Do not rewrite this string — it's part of the contract
    # the end user accepted at registration. See workflow skill Rule #1.
    _attr_attribution = "Datenquelle: E-Control"

    def __init__(
        self,
        coordinator: LadestellenAustriaCoordinator,
        entry: LadestellenAustriaConfigEntry,
    ) -> None:
        """Initialise the sensor."""
        super().__init__(coordinator)
        self._entry = entry
        # FROZEN — changing this format wipes existing entity registrations.
        self._attr_unique_id = f"{entry.entry_id}_nearest_station"
        self._attr_translation_key = "nearest_station"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=entry.title,
            manufacturer="E-Control Austria",
            model="Ladestellenverzeichnis",
            configuration_url="https://www.ladestellen.at/",
        )

    @property
    def native_value(self) -> float | None:
        """Distance to the nearest station in km."""
        data = self.coordinator.data or {}
        nearest = data.get("nearest")
        if not isinstance(nearest, dict):
            return None
        distance = nearest.get("distance")
        if distance is None:
            return None
        try:
            return float(distance)
        except (TypeError, ValueError):
            return None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Expose the full nearby-station list for cards/templates."""
        data = self.coordinator.data or {}
        stations = data.get("stations") or []
        return {
            "station_count": data.get("count", 0),
            "stations": stations,
        }
