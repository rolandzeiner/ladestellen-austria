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


async def test_form_invalid_domain(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
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
    await hass.config_entries.flow.async_configure(
        result["flow_id"], VALID_USER_INPUT
    )
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
