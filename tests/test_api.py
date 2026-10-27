"""Tests for the HA-free E-Control client in api.py.

No `hass` fixture anywhere in this file: the client takes a session, the
credentials and a User-Agent and must work without Home Assistant. The first
test keeps it that way.
"""

from __future__ import annotations

import ast
from pathlib import Path
from typing import Any
from unittest.mock import AsyncMock, MagicMock

import aiohttp
import pytest

from custom_components.ladestellen_austria import api
from custom_components.ladestellen_austria.api import (
    EControlConnectionError,
    EControlHttpError,
    EControlPayloadError,
    EControlTimeoutError,
    check_connection,
    fetch_search,
)

from .conftest import make_response_cm

UA = "test-agent/1.0"
CREDENTIALS = {"api_key": "KEY", "domain": "www.meineseite.at", "user_agent": UA}


def test_api_module_imports_nothing_from_home_assistant() -> None:
    """api.py may import only the standard library and aiohttp.

    A relative import counts as a violation too: const.py imports Home
    Assistant for its User-Agent, so `from .const import …` would pull HA
    back in through the side door.
    """
    tree = ast.parse(Path(api.__file__).read_text(encoding="utf-8"))
    offenders: list[str] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom):
            if node.level > 0 or (node.module or "").startswith("homeassistant"):
                offenders.append(f"from {'.' * node.level}{node.module or ''}")
        elif isinstance(node, ast.Import):
            offenders += [
                a.name for a in node.names if a.name.startswith("homeassistant")
            ]
    assert offenders == []


def _session(resp: Any) -> MagicMock:
    session = MagicMock(spec=aiohttp.ClientSession)
    session.get = MagicMock(return_value=make_response_cm(resp))
    return session


def _raising_session(err: BaseException) -> MagicMock:
    session = MagicMock(spec=aiohttp.ClientSession)
    session.get = MagicMock(side_effect=err)
    return session


def _json_resp(payload: Any, status: int = 200) -> MagicMock:
    resp = MagicMock()
    resp.status = status
    resp.reason = "OK"
    resp.raise_for_status = MagicMock()
    resp.json = AsyncMock(return_value=payload)
    return resp


async def _fetch(session: MagicMock) -> list[api.Station]:
    return await fetch_search(session, latitude=48.21, longitude=16.37, **CREDENTIALS)


async def _probe(session: MagicMock) -> None:
    await check_connection(session, latitude=48.21, longitude=16.37, **CREDENTIALS)


async def test_fetch_sends_params_and_headers() -> None:
    session = _session(_json_resp([{"label": "a"}]))
    assert await _fetch(session) == [{"label": "a"}]

    args, kwargs = session.get.call_args
    assert args == (api.SEARCH_URL,)
    assert kwargs["params"] == {"latitude": "48.21", "longitude": "16.37"}
    assert kwargs["headers"] == {
        "User-Agent": UA,
        "Apikey": "KEY",
        "Referer": "https://www.meineseite.at",
        "Accept": "application/json",
    }
    assert kwargs["timeout"].total == api.REQUEST_TIMEOUT_SEC


async def test_fetch_drops_non_dict_entries() -> None:
    session = _session(_json_resp([{"label": "a"}, "junk", 42, {"label": "b"}]))
    assert await _fetch(session) == [{"label": "a"}, {"label": "b"}]


async def test_fetch_http_error_keeps_status_and_reason() -> None:
    resp = _json_resp([])
    resp.raise_for_status = MagicMock(
        side_effect=aiohttp.ClientResponseError(
            MagicMock(), (), status=401, message="Unauthorized"
        )
    )
    with pytest.raises(EControlHttpError) as exc:
        await _fetch(_session(resp))
    assert (exc.value.status, exc.value.reason) == (401, "Unauthorized")


@pytest.mark.parametrize("call", [_fetch, _probe])
async def test_non_list_body_is_a_payload_error(call: Any) -> None:
    with pytest.raises(EControlPayloadError) as exc:
        await call(_session(_json_resp({"error": "nope"})))
    assert exc.value.status == 200
    assert exc.value.error == "expected list, got dict"


@pytest.mark.parametrize("call", [_fetch, _probe])
@pytest.mark.parametrize(
    "raised",
    [
        aiohttp.ContentTypeError(MagicMock(), (), status=200, message="text/html"),
        ValueError("Expecting value"),
    ],
)
async def test_unparseable_body_is_a_payload_error(
    call: Any, raised: BaseException
) -> None:
    """ContentTypeError is a ClientResponseError; it must not read as HTTP."""
    resp = _json_resp(None)
    resp.json = AsyncMock(side_effect=raised)
    with pytest.raises(EControlPayloadError):
        await call(_session(resp))


@pytest.mark.parametrize("call", [_fetch, _probe])
@pytest.mark.parametrize(
    ("raised", "expected"),
    [
        (TimeoutError(), EControlTimeoutError),
        (aiohttp.ClientConnectionError("refused"), EControlConnectionError),
    ],
)
async def test_transport_errors_map_to_api_errors(
    call: Any, raised: BaseException, expected: type[Exception]
) -> None:
    with pytest.raises(expected) as exc:
        await call(_raising_session(raised))
    assert exc.value.__cause__ is raised


async def test_connection_error_keeps_its_type_name() -> None:
    with pytest.raises(EControlConnectionError) as exc:
        await _fetch(_raising_session(aiohttp.ClientConnectionError("refused")))
    assert (exc.value.error_type, exc.value.error) == (
        "ClientConnectionError",
        "refused",
    )


async def test_probe_reads_the_status_itself() -> None:
    """The probe raises on an error status without relying on raise_for_status."""
    resp = _json_resp([], status=403)
    resp.reason = "Forbidden"
    with pytest.raises(EControlHttpError) as exc:
        await _probe(_session(resp))
    assert (exc.value.status, exc.value.reason) == (403, "Forbidden")
    resp.json.assert_not_awaited()


async def test_probe_succeeds_on_a_list() -> None:
    session = _session(_json_resp([]))
    await _probe(session)
    assert session.get.call_args.kwargs["headers"]["Apikey"] == "KEY"
