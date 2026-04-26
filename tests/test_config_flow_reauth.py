"""Tests for the Ladestellen Austria reauth flow."""
from __future__ import annotations

from unittest.mock import AsyncMock, patch

import pytest
from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    DOMAIN,
)

from .conftest import BASE_ENTRY_DATA


def _entry(hass: HomeAssistant) -> MockConfigEntry:
    entry = MockConfigEntry(
        domain=DOMAIN,
        data={**BASE_ENTRY_DATA},
        options={},
        title="Test",
        unique_id="www.meineseite.at:48.21:16.37",
    )
    entry.add_to_hass(hass)
    return entry


async def _start_reauth(hass: HomeAssistant, entry: MockConfigEntry) -> dict:
    """Open the reauth flow and confirm we land on the confirm step."""
    result = await hass.config_entries.flow.async_init(
        DOMAIN,
        context={
            "source": config_entries.SOURCE_REAUTH,
            "entry_id": entry.entry_id,
        },
        data=entry.data,
    )
    assert result["type"] == FlowResultType.FORM
    assert result["step_id"] == "reauth_confirm"
    return result


async def test_reauth_form_shows(hass: HomeAssistant) -> None:
    """Reauth entry-point lands on the confirm form, no error."""
    entry = _entry(hass)
    result = await _start_reauth(hass, entry)
    assert result.get("errors") in (None, {})


async def test_reauth_invalid_api_key(hass: HomeAssistant) -> None:
    """Empty api_key surfaces invalid_api_key without probing."""
    entry = _entry(hass)
    flow = await _start_reauth(hass, entry)
    result = await hass.config_entries.flow.async_configure(
        flow["flow_id"], {CONF_API_KEY: "  ", CONF_DOMAIN: "www.meineseite.at"}
    )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get(CONF_API_KEY) == "invalid_api_key"


async def test_reauth_invalid_domain(hass: HomeAssistant) -> None:
    """Garbage domain is rejected before the API probe runs."""
    entry = _entry(hass)
    flow = await _start_reauth(hass, entry)
    result = await hass.config_entries.flow.async_configure(
        flow["flow_id"],
        {CONF_API_KEY: "fresh-key", CONF_DOMAIN: "not-a-hostname"},
    )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get(CONF_DOMAIN) == "invalid_domain"


@pytest.mark.parametrize(
    "probe_error",
    ["cannot_connect", "invalid_auth", "domain_mismatch"],
)
async def test_reauth_probe_errors_surface(
    hass: HomeAssistant, probe_error: str
) -> None:
    """All probe-helper error keys propagate to errors['base']."""
    entry = _entry(hass)
    flow = await _start_reauth(hass, entry)
    with patch(
        "custom_components.ladestellen_austria.config_flow._test_api_connection",
        new_callable=AsyncMock,
        return_value=probe_error,
    ):
        result = await hass.config_entries.flow.async_configure(
            flow["flow_id"],
            {CONF_API_KEY: "fresh-key", CONF_DOMAIN: "www.meineseite.at"},
        )
    assert result["type"] == FlowResultType.FORM
    assert result["errors"].get("base") == probe_error


async def test_reauth_success_updates_credentials(
    hass: HomeAssistant, mock_fetch: AsyncMock
) -> None:
    """A successful reauth rewrites api_key + domain on the entry.

    `mock_fetch` is required because reauth ends in
    async_update_reload_and_abort, which reloads the entry — that in turn
    triggers a coordinator first_refresh that we don't want to hit the
    real upstream API.
    """
    entry = _entry(hass)
    flow = await _start_reauth(hass, entry)
    result = await hass.config_entries.flow.async_configure(
        flow["flow_id"],
        {CONF_API_KEY: "fresh-key", CONF_DOMAIN: "neue-seite.at"},
    )
    await hass.async_block_till_done()
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "reauth_successful"
    refreshed = hass.config_entries.async_get_entry(entry.entry_id)
    assert refreshed is not None
    assert refreshed.data[CONF_API_KEY] == "fresh-key"
    assert refreshed.data[CONF_DOMAIN] == "neue-seite.at"
