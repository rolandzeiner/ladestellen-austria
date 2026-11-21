"""Tests for the Ladestellen Austria config flow."""

from __future__ import annotations

from unittest.mock import AsyncMock, patch

from homeassistant import config_entries
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE, CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    CONF_DYNAMIC_ENTITY,
    DOMAIN,
)

VALID_USER_INPUT = {
    "name": "Test",
    CONF_API_KEY: "REDACTED_API_KEY",
    CONF_DOMAIN: "www.meineseite.at",
    "location": {"latitude": 48.21, "longitude": 16.37},
    CONF_SCAN_INTERVAL: 30,
}


async def test_form_shows(hass: HomeAssistant) -> None:
    """Initial form is rendered on flow start."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] == FlowResultType.FORM
    assert result["step_id"] == "user"


async def test_form_creates_entry(hass: HomeAssistant, mock_fetch: AsyncMock) -> None:
    """Valid input creates a config entry."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], VALID_USER_INPUT
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert result["title"] == "Test"
    assert result["data"][CONF_API_KEY] == "REDACTED_API_KEY"
    assert result["data"][CONF_DOMAIN] == "www.meineseite.at"
    assert result["data"][CONF_LATITUDE] == 48.21
    assert result["data"][CONF_LONGITUDE] == 16.37


async def test_domain_scheme_is_stripped(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Users pasting a full URL still get a clean hostname stored."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {**VALID_USER_INPUT, CONF_DOMAIN: "https://www.meineseite.at:8123/subpath"},
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert result["data"][CONF_DOMAIN] == "www.meineseite.at"


async def test_duplicate_entry_aborted(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Same domain+coord combination is rejected the second time."""
    for _ in range(2):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], VALID_USER_INPUT
        )
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "already_configured"


async def test_form_cannot_connect(hass: HomeAssistant) -> None:
    """Connection failure surfaces a cannot_connect error."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    with patch(
        "custom_components.ladestellen_austria.config_flow._test_api_connection",
        new_callable=AsyncMock,
        return_value="cannot_connect",
    ):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], VALID_USER_INPUT
        )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get("base") == "cannot_connect"


async def test_form_invalid_auth(hass: HomeAssistant) -> None:
    """HTTP 401 surfaces an invalid_auth error."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    with patch(
        "custom_components.ladestellen_austria.config_flow._test_api_connection",
        new_callable=AsyncMock,
        return_value="invalid_auth",
    ):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], VALID_USER_INPUT
        )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get("base") == "invalid_auth"


async def test_form_domain_mismatch(hass: HomeAssistant) -> None:
    """HTTP 403 surfaces a domain_mismatch error."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    with patch(
        "custom_components.ladestellen_austria.config_flow._test_api_connection",
        new_callable=AsyncMock,
        return_value="domain_mismatch",
    ):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], VALID_USER_INPUT
        )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get("base") == "domain_mismatch"


async def test_form_invalid_domain(hass: HomeAssistant, mock_fetch: AsyncMock) -> None:
    """Garbage domain input is rejected before the API probe runs."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {**VALID_USER_INPUT, CONF_DOMAIN: "not-a-hostname"}
    )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get(CONF_DOMAIN) == "invalid_domain"


async def test_reconfigure_updates_entry(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Reconfigure rewrites entry.data and preserves unique_id."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    await hass.config_entries.flow.async_configure(result["flow_id"], VALID_USER_INPUT)
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    original_unique_id = entry.unique_id

    flow = await hass.config_entries.flow.async_init(
        DOMAIN,
        context={
            "source": config_entries.SOURCE_RECONFIGURE,
            "entry_id": entry.entry_id,
        },
    )
    # Reconfigure schema omits `name` — pass only the editable fields.
    reconfigure_input = {k: v for k, v in VALID_USER_INPUT.items() if k != "name"}
    reconfigure_input[CONF_SCAN_INTERVAL] = 60
    result = await hass.config_entries.flow.async_configure(
        flow["flow_id"], reconfigure_input
    )
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "reconfigure_successful"

    refreshed = hass.config_entries.async_get_entry(entry.entry_id)
    assert refreshed is not None
    assert refreshed.unique_id == original_unique_id
    assert refreshed.data[CONF_SCAN_INTERVAL] == 60


async def test_form_creates_entry_with_dynamic_tracker(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """When the user picks a device_tracker, the entry stores it and the
    unique_id switches to the dynamic-mode formula so distinct trackers
    produce distinct entries."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {**VALID_USER_INPUT, CONF_DYNAMIC_ENTITY: "device_tracker.phone"},
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert result["data"][CONF_DYNAMIC_ENTITY] == "device_tracker.phone"
    # Stored location is the initial form value — just a fallback in
    # dynamic mode. The unique_id branch confirms the flow took the
    # dynamic path.
    entry = hass.config_entries.async_get_entry(result["result"].entry_id)
    assert entry is not None
    assert entry.unique_id == "www.meineseite.at:dynamic:device_tracker.phone"


async def test_reconfigure_switches_static_to_dynamic(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Reconfigure flow accepts switching an existing static entry into
    dynamic mode even though that changes the unique_id formula."""
    # Create a static entry first.
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    await hass.config_entries.flow.async_configure(result["flow_id"], VALID_USER_INPUT)
    entry = hass.config_entries.async_entries(DOMAIN)[0]
    assert entry.unique_id == "www.meineseite.at:48.21:16.37"

    # Now reconfigure, adding a tracker.
    flow = await hass.config_entries.flow.async_init(
        DOMAIN,
        context={
            "source": config_entries.SOURCE_RECONFIGURE,
            "entry_id": entry.entry_id,
        },
    )
    reconfigure_input = {k: v for k, v in VALID_USER_INPUT.items() if k != "name"}
    reconfigure_input[CONF_DYNAMIC_ENTITY] = "device_tracker.phone"
    result = await hass.config_entries.flow.async_configure(
        flow["flow_id"], reconfigure_input
    )
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "reconfigure_successful"

    refreshed = hass.config_entries.async_get_entry(entry.entry_id)
    assert refreshed is not None
    # unique_id flipped to the dynamic formula.
    assert refreshed.unique_id == "www.meineseite.at:dynamic:device_tracker.phone"
    assert refreshed.data[CONF_DYNAMIC_ENTITY] == "device_tracker.phone"


async def test_dynamic_entries_do_not_collide_by_location(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Two dynamic entries at the same initial location are still
    distinct as long as the tracker entity_ids differ — the unique_id
    formula keys off the tracker, not the coords."""
    # First dynamic entry.
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {**VALID_USER_INPUT, CONF_DYNAMIC_ENTITY: "device_tracker.phone"},
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY

    # Second dynamic entry — same fallback location, different tracker.
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {**VALID_USER_INPUT, CONF_DYNAMIC_ENTITY: "device_tracker.tablet"},
    )
    assert result["type"] == FlowResultType.CREATE_ENTRY
    entry = hass.config_entries.async_get_entry(result["result"].entry_id)
    assert entry is not None
    assert entry.unique_id == "www.meineseite.at:dynamic:device_tracker.tablet"


async def _reconfigure(hass: HomeAssistant, entry_id: str, user_input: dict) -> dict:
    """Open the reconfigure form for an entry and submit it."""
    flow = await hass.config_entries.flow.async_init(
        DOMAIN,
        context={"source": config_entries.SOURCE_RECONFIGURE, "entry_id": entry_id},
    )
    result = await hass.config_entries.flow.async_configure(flow["flow_id"], user_input)
    await hass.async_block_till_done()
    return result


RECONFIGURE_INPUT = {k: v for k, v in VALID_USER_INPUT.items() if k != "name"}


async def test_reconfigure_clears_dynamic_tracker(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """An emptied tracker field takes the entry back to its fixed location.

    The frontend sends a cleared field as a missing key. With the stored
    tracker as the schema's default, validation put it straight back and
    the entry could never leave dynamic mode again.
    """
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {**VALID_USER_INPUT, CONF_DYNAMIC_ENTITY: "device_tracker.phone"},
    )
    entry = hass.config_entries.async_get_entry(result["result"].entry_id)
    assert entry is not None
    assert entry.unique_id == "www.meineseite.at:dynamic:device_tracker.phone"

    # No CONF_DYNAMIC_ENTITY key at all: that is what a cleared picker sends.
    result = await _reconfigure(hass, entry.entry_id, RECONFIGURE_INPUT)
    assert result["reason"] == "reconfigure_successful"

    refreshed = hass.config_entries.async_get_entry(entry.entry_id)
    assert refreshed is not None
    assert refreshed.data[CONF_DYNAMIC_ENTITY] is None
    assert refreshed.unique_id == "www.meineseite.at:48.21:16.37"


async def test_reconfigure_shows_the_tracker_as_a_suggestion(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """The form still shows the stored tracker, as a suggested value."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {**VALID_USER_INPUT, CONF_DYNAMIC_ENTITY: "device_tracker.phone"},
    )
    flow = await hass.config_entries.flow.async_init(
        DOMAIN,
        context={
            "source": config_entries.SOURCE_RECONFIGURE,
            "entry_id": result["result"].entry_id,
        },
    )
    key = next(k for k in flow["data_schema"].schema if k == CONF_DYNAMIC_ENTITY)
    assert key.description == {"suggested_value": "device_tracker.phone"}
    assert not callable(getattr(key, "default", None))


async def test_reconfigure_after_options_save_wins(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """An interval saved under Configure must not outrank a later Reconfigure.

    Readers merge options over data, and both forms show the interval.
    """
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], VALID_USER_INPUT
    )
    entry_id = result["result"].entry_id
    await hass.async_block_till_done()

    options = await hass.config_entries.options.async_init(entry_id)
    await hass.config_entries.options.async_configure(
        options["flow_id"], {CONF_SCAN_INTERVAL: 60}
    )
    await hass.async_block_till_done()

    result = await _reconfigure(
        hass, entry_id, {**RECONFIGURE_INPUT, CONF_SCAN_INTERVAL: 15}
    )
    assert result["reason"] == "reconfigure_successful"

    entry = hass.config_entries.async_get_entry(entry_id)
    assert entry is not None
    assert {**entry.data, **entry.options}[CONF_SCAN_INTERVAL] == 15
    assert entry.options == {}


async def test_reconfigure_onto_another_entry_aborts(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """Moving an entry onto another entry's location is refused."""
    entry_ids = []
    for location in (
        {"latitude": 48.21, "longitude": 16.37},
        {"latitude": 47.07, "longitude": 15.44},
    ):
        result = await hass.config_entries.flow.async_init(
            DOMAIN, context={"source": config_entries.SOURCE_USER}
        )
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"], {**VALID_USER_INPUT, "location": location}
        )
        entry_ids.append(result["result"].entry_id)

    result = await _reconfigure(hass, entry_ids[1], RECONFIGURE_INPUT)
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "already_configured"
    second = hass.config_entries.async_get_entry(entry_ids[1])
    assert second is not None
    assert second.unique_id == "www.meineseite.at:47.07:15.44"
    assert second.data[CONF_LATITUDE] == 47.07
