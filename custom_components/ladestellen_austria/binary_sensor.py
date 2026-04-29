"""Binary sensor platform for Ladestellen Austria.

Exposes one entity per config entry: ON when at least one EVSE across
the nearby station list reports `AVAILABLE`. Drives automation triggers
("notify me when any nearby charger frees up") without forcing users
into JSON-attribute templating against the main sensor.

Counts of free / total slots and stations-with-free are surfaced as
attributes for cards and templates.
"""
from __future__ import annotations

from typing import Any

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import ATTRIBUTION, DOMAIN, normalize_status
from .coordinator import LadestellenAustriaConfigEntry, LadestellenAustriaCoordinator

PARALLEL_UPDATES = 0


async def async_setup_entry(
    hass: HomeAssistant,
    entry: LadestellenAustriaConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up binary-sensor entities from a config entry."""
    coordinator = entry.runtime_data
    async_add_entities([HasFreeSlotBinarySensor(coordinator, entry)])


class HasFreeSlotBinarySensor(
    CoordinatorEntity[LadestellenAustriaCoordinator], BinarySensorEntity
):
    """ON when at least one EVSE in range reports AVAILABLE."""

    _attr_has_entity_name = True
    _attr_device_class = BinarySensorDeviceClass.PRESENCE
    _attr_attribution = ATTRIBUTION

    def __init__(
        self,
        coordinator: LadestellenAustriaCoordinator,
        entry: LadestellenAustriaConfigEntry,
    ) -> None:
        """Initialise the binary sensor."""
        super().__init__(coordinator)
        self._entry = entry
        # FROZEN — changing this format wipes existing entity registrations.
        self._attr_unique_id = f"{entry.entry_id}_has_free_slot"
        self._attr_translation_key = "has_free_slot"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
        )

    @property
    def is_on(self) -> bool | None:
        """True when any point across all stations reports AVAILABLE."""
        counts = self._counts()
        if counts is None:
            return None
        return counts["free"] > 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Free-slot counts and station counts for cards/templates."""
        counts = self._counts() or {"free": 0, "total": 0, "stations_with_free": 0}
        return {
            "free_slot_count": counts["free"],
            "total_slot_count": counts["total"],
            "stations_with_free": counts["stations_with_free"],
        }

    def _counts(self) -> dict[str, int] | None:
        """Aggregate free/total counts from coordinator data.

        Returns None when the coordinator has never produced a payload —
        the entity then reports `unknown` instead of a misleading False.
        """
        data = self.coordinator.data
        if not isinstance(data, dict):
            return None
        stations = data.get("stations") or []
        free = 0
        total = 0
        stations_with_free = 0
        for station in stations:
            if not isinstance(station, dict):
                continue
            station_free = 0
            for point in station.get("points") or []:
                if not isinstance(point, dict):
                    continue
                total += 1
                if normalize_status(point.get("status")) == "AVAILABLE":
                    station_free += 1
            free += station_free
            if station_free > 0:
                stations_with_free += 1
        return {
            "free": free,
            "total": total,
            "stations_with_free": stations_with_free,
        }
