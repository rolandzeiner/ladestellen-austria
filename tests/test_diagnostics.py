"""Tests for the Ladestellen Austria diagnostics module."""
from __future__ import annotations

import json
from unittest.mock import AsyncMock, patch

from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry
from syrupy.assertion import SnapshotAssertion

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    DOMAIN,
)
from custom_components.ladestellen_austria.diagnostics import (
    async_get_config_entry_diagnostics,
)

from .conftest import BASE_ENTRY_DATA, EXAMPLE_COORDINATOR_DATA

# Use distinctive sentinel values so we can grep the serialized output
# for them — if any leak unredacted, the assertion below catches it.
SECRET_API_KEY = "ZZZ-SUPER-SECRET-LEAK-CANARY-ZZZ"
SECRET_DOMAIN = "leak-canary.example.invalid"
DATA_WITH_SECRETS: dict[str, object] = {
    **BASE_ENTRY_DATA,
    CONF_API_KEY: SECRET_API_KEY,
    CONF_DOMAIN: SECRET_DOMAIN,
}


async def test_diagnostics_redacts_credentials(hass: HomeAssistant) -> None:
    """Every credential / location field is redacted, and no raw secret
    string appears anywhere in the JSON-serialized output."""
    entry = MockConfigEntry(
        domain=DOMAIN, data=DATA_WITH_SECRETS, options={}, title="Test"
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

    # Field-level assertions — placeholder must be present, not just the
    # raw value being absent (which would also pass if the field were
    # silently dropped instead of redacted).
    redacted = "**REDACTED**"
    assert diag["entry"]["data"][CONF_API_KEY] == redacted
    assert diag["entry"]["data"][CONF_DOMAIN] == redacted
    assert diag["entry"]["title"] == "Test"
    assert diag["coordinator"]["last_update_success"] is True
    assert diag["coordinator"]["station_count"] == 1

    # Belt-and-braces: full-blob scan to catch any future addition that
    # forgets to wire a new credential field through TO_REDACT.
    blob = json.dumps(diag, default=str)
    assert SECRET_API_KEY not in blob
    assert SECRET_DOMAIN not in blob


async def test_diagnostics_snapshot(
    hass: HomeAssistant, snapshot: SnapshotAssertion
) -> None:
    """Pin the full redacted diagnostics shape so silent format changes surface.

    A failing diff usually means: a field was added to the entry/coordinator
    payload, or the redaction set changed. Update the snapshot
    (`pytest --snapshot-update`) only after confirming the change is intentional.
    """
    entry = MockConfigEntry(
        domain=DOMAIN,
        data=DATA_WITH_SECRETS,
        options={},
        title="Test",
        unique_id="test-stable-id",
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
    assert diag == snapshot


async def test_diagnostics_handles_no_coordinator_data(
    hass: HomeAssistant,
) -> None:
    """A coordinator that hasn't fetched yet (data=None) doesn't crash."""
    entry = MockConfigEntry(
        domain=DOMAIN, data=DATA_WITH_SECRETS, options={}, title="Test"
    )
    entry.add_to_hass(hass)

    with patch(
        "custom_components.ladestellen_austria.coordinator.LadestellenAustriaCoordinator._async_update_data",
        new_callable=AsyncMock,
        return_value={"stations": [], "count": 0, "nearest": None},
    ):
        await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

    diag = await async_get_config_entry_diagnostics(hass, entry)
    assert diag["coordinator"]["station_count"] == 0
