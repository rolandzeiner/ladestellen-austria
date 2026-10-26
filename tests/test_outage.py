"""Tests for the domain-wide upstream-outage Repairs issue (outage.py)."""

from __future__ import annotations

from collections.abc import AsyncGenerator
from contextlib import suppress
from datetime import timedelta
from typing import Any
from unittest.mock import patch

import aiohttp
import pytest
from freezegun.api import FrozenDateTimeFactory
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.update_coordinator import UpdateFailed
from pytest_homeassistant_custom_component.test_util.aiohttp import (
    AiohttpClientMocker,
)

from custom_components.ladestellen_austria.const import (
    API_BASE_URL,
    DOMAIN,
    SEARCH_PATH,
)
from custom_components.ladestellen_austria.coordinator import (
    LadestellenAustriaCoordinator,
)
from custom_components.ladestellen_austria.outage import (
    OUTAGE_DATA,
    OUTAGE_ISSUE_ID,
    OUTAGE_MIN_SECONDS,
    Fault,
    async_clear_outage,
    async_note_fault,
    classify,
)

from .conftest import EXAMPLE_STATIONS, make_entry

SEARCH_URL = f"{API_BASE_URL}{SEARCH_PATH}"
_PAST_THRESHOLD = timedelta(seconds=OUTAGE_MIN_SECONDS + 1)


@pytest.fixture
async def search_api(
    hass: HomeAssistant, aioclient_mock: AiohttpClientMocker
) -> AsyncGenerator[AiohttpClientMocker]:
    """Route the coordinator's session through `aioclient_mock`.

    conftest's autouse fixture replaces the session with a bare MagicMock;
    this patch nests inside it so the real request code in
    ``_request_search`` (raise_for_status, json, the shape check) runs
    against a real aiohttp session and only the wire is mocked.
    """
    session = aioclient_mock.create_session(hass.loop)
    with patch(
        "custom_components.ladestellen_austria.coordinator.async_get_clientsession",
        return_value=session,
    ):
        yield aioclient_mock
    await session.close()


def _coordinator(hass: HomeAssistant) -> LadestellenAustriaCoordinator:
    return LadestellenAustriaCoordinator(hass, make_entry(hass))


async def _fetch(
    coordinator: LadestellenAustriaCoordinator,
    api: AiohttpClientMocker,
    **response: Any,
) -> None:
    """One real /search request through the coordinator, answering `response`."""
    api.clear_requests()
    api.get(SEARCH_URL, **response)
    with suppress(UpdateFailed, ConfigEntryAuthFailed):
        await coordinator._async_update_data()


def _issue(hass: HomeAssistant) -> ir.IssueEntry | None:
    return ir.async_get(hass).async_get_issue(DOMAIN, OUTAGE_ISSUE_ID)


def _failed(key: str, **placeholders: str) -> UpdateFailed:
    return UpdateFailed(
        translation_domain=DOMAIN,
        translation_key=key,
        translation_placeholders=placeholders,
    )


@pytest.mark.parametrize(
    ("err", "expected"),
    [
        (_failed("api_http_error", status="502", reason="Bad Gateway"), Fault.OUTAGE),
        (_failed("api_http_error", status="500", reason=""), Fault.OUTAGE),
        (_failed("api_http_error", status="503", reason=""), Fault.OUTAGE),
        (_failed("api_invalid_response", status="200", error="x"), Fault.OUTAGE),
        (_failed("api_http_error", status="404", reason=""), Fault.ANSWERED),
        (_failed("api_http_error", status="429", reason=""), Fault.ANSWERED),
        (
            ConfigEntryAuthFailed(
                translation_domain=DOMAIN,
                translation_key="api_auth_error",
                translation_placeholders={"status": "401"},
            ),
            Fault.ANSWERED,
        ),
        (_failed("api_timeout", seconds="30"), Fault.INCONCLUSIVE),
        (
            _failed("api_connection_error", error_type="X", error="refused"),
            Fault.INCONCLUSIVE,
        ),
        (_failed("api_http_error", status="", reason=""), Fault.INCONCLUSIVE),
        (UpdateFailed("bare"), Fault.INCONCLUSIVE),
        (RuntimeError("unforeseen"), Fault.INCONCLUSIVE),
    ],
)
def test_classify(err: Exception, expected: Fault) -> None:
    """Only failures that prove a broken server count against E-Control."""
    assert classify(err) is expected


async def test_issue_appears_only_after_the_threshold(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """A 502 starts the clock; the issue waits until it has run out."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, status=502)
    assert _issue(hass) is None

    freezer.tick(timedelta(seconds=OUTAGE_MIN_SECONDS - 60))
    await _fetch(coordinator, search_api, status=502)
    assert _issue(hass) is None

    freezer.tick(timedelta(seconds=61))
    await _fetch(coordinator, search_api, status=502)
    issue = _issue(hass)
    assert issue is not None
    assert issue.translation_key == OUTAGE_ISSUE_ID
    assert issue.severity is ir.IssueSeverity.WARNING
    assert issue.is_fixable is False
    assert issue.is_persistent is False


async def test_one_fault_never_raises_however_long_ago_it_began(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """The time alone isn't enough; the outage needs a second fault."""
    async_note_fault(hass, Fault.OUTAGE)
    freezer.tick(_PAST_THRESHOLD * 10)
    assert _issue(hass) is None
    assert hass.data[OUTAGE_DATA][""].failures == 1


async def test_two_faults_inside_the_window_raise_nothing(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """Back-to-back setup retries after a restart must not raise the issue."""
    async_note_fault(hass, Fault.OUTAGE)
    freezer.tick(timedelta(seconds=10))
    async_note_fault(hass, Fault.OUTAGE)
    freezer.tick(timedelta(seconds=20))
    async_note_fault(hass, Fault.OUTAGE)
    assert _issue(hass) is None


async def test_recovery_clears_the_issue(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """The first good answer ends the outage and removes the issue."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, status=503)
    freezer.tick(_PAST_THRESHOLD)
    await _fetch(coordinator, search_api, status=503)
    assert _issue(hass) is not None

    await _fetch(coordinator, search_api, json=EXAMPLE_STATIONS)
    assert _issue(hass) is None
    assert "" not in hass.data[OUTAGE_DATA]

    # The next outage has to earn its own threshold again.
    await _fetch(coordinator, search_api, status=503)
    assert _issue(hass) is None


async def test_an_unreadable_body_counts_as_an_outage(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """A 200 whose body isn't a JSON list is a fault on E-Control's side."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, text="<html>Wartung</html>")
    freezer.tick(_PAST_THRESHOLD)
    await _fetch(coordinator, search_api, json={"not": "a list"})
    assert _issue(hass) is not None


async def test_network_errors_never_start_the_clock(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """Timeouts and connection errors can be the user's own network."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, exc=TimeoutError())
    freezer.tick(_PAST_THRESHOLD)
    await _fetch(coordinator, search_api, exc=aiohttp.ClientConnectionError("refused"))
    await _fetch(coordinator, search_api, status=502)
    assert _issue(hass) is None


async def test_network_errors_keep_a_running_outage_going(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """A timeout in the middle of an outage doesn't reset its clock."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, status=502)
    freezer.tick(_PAST_THRESHOLD)
    await _fetch(coordinator, search_api, exc=TimeoutError())
    await _fetch(coordinator, search_api, status=502)
    assert _issue(hass) is not None


async def test_a_real_client_error_answer_ends_the_outage(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """A 4xx comes from a working server, so the clock starts over."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, status=502)
    freezer.tick(timedelta(seconds=OUTAGE_MIN_SECONDS - 60))
    await _fetch(coordinator, search_api, status=404)
    freezer.tick(timedelta(seconds=120))
    await _fetch(coordinator, search_api, status=502)
    assert _issue(hass) is None


@pytest.mark.parametrize("status", [401, 403, 429])
async def test_auth_and_rate_limit_answers_end_the_outage(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
    status: int,
) -> None:
    """A rejected key or a rate limit is a working server, not an outage."""
    coordinator = _coordinator(hass)
    await _fetch(coordinator, search_api, status=502)
    freezer.tick(_PAST_THRESHOLD)
    await _fetch(coordinator, search_api, status=status)
    await _fetch(coordinator, search_api, status=502)
    assert _issue(hass) is None


async def test_an_unforeseen_local_error_is_not_an_outage(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """A crash that isn't one of our translated raises must not count."""
    coordinator = _coordinator(hass)
    async_note_fault(hass, Fault.OUTAGE)
    freezer.tick(_PAST_THRESHOLD)
    search_api.get(SEARCH_URL, exc=KeyError("boom"))
    with pytest.raises(KeyError):
        await coordinator._async_update_data()
    assert _issue(hass) is None
    assert hass.data[OUTAGE_DATA][""].failures == 1


async def test_issue_is_created_once(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """Later failures leave the raised issue alone instead of re-creating it."""
    async_note_fault(hass, Fault.OUTAGE)
    freezer.tick(_PAST_THRESHOLD)
    with patch(
        "custom_components.ladestellen_austria.outage.ir.async_create_issue"
    ) as create:
        async_note_fault(hass, Fault.OUTAGE)
        async_note_fault(hass, Fault.OUTAGE)
    assert create.call_count == 1


async def test_scopes_keep_separate_clocks_and_issues(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """A scoped outage gets its own issue id and doesn't touch the others."""
    async_note_fault(hass, Fault.OUTAGE, scope="a", placeholders={"name": "A"})
    async_note_fault(hass, Fault.OUTAGE, scope="b")
    freezer.tick(_PAST_THRESHOLD)
    async_note_fault(hass, Fault.OUTAGE, scope="a", placeholders={"name": "A"})
    registry = ir.async_get(hass)
    issue = registry.async_get_issue(DOMAIN, f"{OUTAGE_ISSUE_ID}_a")
    assert issue is not None
    assert issue.translation_placeholders == {"name": "A"}
    assert registry.async_get_issue(DOMAIN, f"{OUTAGE_ISSUE_ID}_b") is None

    async_clear_outage(hass, "a")
    assert registry.async_get_issue(DOMAIN, f"{OUTAGE_ISSUE_ID}_a") is None
    assert set(hass.data[OUTAGE_DATA]) == {"b"}


async def test_clear_outage_forgets_state_and_issue(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> None:
    """Removing the last entry drops both the clock and the issue."""
    async_note_fault(hass, Fault.OUTAGE)
    freezer.tick(_PAST_THRESHOLD)
    async_note_fault(hass, Fault.OUTAGE)
    assert _issue(hass) is not None

    async_clear_outage(hass)
    assert _issue(hass) is None
    assert OUTAGE_DATA not in hass.data


async def test_removing_the_last_entry_clears_the_outage(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """The issue can't outlive the integration: the last removal drops it."""
    search_api.get(SEARCH_URL, status=502)
    entry = make_entry(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    freezer.tick(_PAST_THRESHOLD)
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert _issue(hass) is not None

    with patch(
        "custom_components.ladestellen_austria."
        "card_registration.JSModuleRegistration.async_unregister",
    ):
        assert await hass.config_entries.async_remove(entry.entry_id)
        await hass.async_block_till_done()
    assert _issue(hass) is None
    assert OUTAGE_DATA not in hass.data


async def test_entries_in_setup_retry_raise_and_clear_the_issue(
    hass: HomeAssistant,
    freezer: FrozenDateTimeFactory,
    search_api: AiohttpClientMocker,
) -> None:
    """An upstream outage, end to end through real config-entry setups.

    The shape of the 2026-10-21 Wiener Linien incident: /search answers 503
    for as long as it lasts, so every entry sits in setup retry and no
    coordinator timer runs. The setup attempts themselves have to feed the
    clock, or the issue never appears in exactly the case it was built for.
    Pinned here because nobody can stage a real E-Control outage to check.
    """
    search_api.get(SEARCH_URL, status=503)
    entry = make_entry(hass)
    await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.SETUP_RETRY
    assert _issue(hass) is None

    freezer.tick(_PAST_THRESHOLD)
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.SETUP_RETRY
    assert _issue(hass) is not None

    search_api.clear_requests()
    search_api.get(SEARCH_URL, json=EXAMPLE_STATIONS)
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state is ConfigEntryState.LOADED
    assert _issue(hass) is None
