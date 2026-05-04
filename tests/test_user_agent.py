"""Regression test — every outbound request must carry the canonical User-Agent.

A malformed User-Agent is silent failure (the integration still works, only
upstream log parsers break). This test guards both the coordinator and the
config-flow trial probe independently since they're separate call sites.
"""
from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock, patch

from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.ladestellen_austria.config_flow import _test_api_connection
from custom_components.ladestellen_austria.const import (
    API_KEY_HEADER,
    DOMAIN,
    REFERER_HEADER,
    USER_AGENT,
)
from custom_components.ladestellen_austria.coordinator import (
    LadestellenAustriaCoordinator,
)

from .conftest import BASE_ENTRY_DATA, make_response_cm


def _json_resp(body: object, status: int = 200) -> MagicMock:
    resp = MagicMock()
    resp.status = status
    resp.raise_for_status = MagicMock()
    resp.json = AsyncMock(return_value=body)
    return resp


async def test_coordinator_sends_canonical_user_agent(hass: HomeAssistant) -> None:
    """Coordinator adds User-Agent, Apikey, and Referer on every GET."""
    entry = MockConfigEntry(domain=DOMAIN, data=BASE_ENTRY_DATA, options={})
    entry.add_to_hass(hass)
    coordinator = LadestellenAustriaCoordinator(hass, entry)

    session = MagicMock()
    session.get = MagicMock(return_value=make_response_cm(_json_resp([])))
    coordinator._session = session

    await coordinator._async_update_data()

    sent = session.get.call_args.kwargs["headers"]
    assert sent["User-Agent"] == USER_AGENT
    assert sent[API_KEY_HEADER] == "REDACTED_API_KEY"
    assert sent[REFERER_HEADER] == "https://www.meineseite.at"


async def test_config_flow_probe_sends_canonical_user_agent(
    hass: HomeAssistant,
) -> None:
    """Config-flow trial probe carries the same headers as the coordinator."""
    session = MagicMock()
    session.get = MagicMock(
        return_value=make_response_cm(_json_resp([], status=200))
    )
    with patch(
        "custom_components.ladestellen_austria.config_flow.async_get_clientsession",
        return_value=session,
    ):
        await _test_api_connection(
            hass, "REDACTED_API_KEY", "www.meineseite.at", 48.21, 16.37
        )

    sent = session.get.call_args.kwargs["headers"]
    assert sent["User-Agent"] == USER_AGENT
    assert sent[API_KEY_HEADER] == "REDACTED_API_KEY"
    assert sent[REFERER_HEADER] == "https://www.meineseite.at"
