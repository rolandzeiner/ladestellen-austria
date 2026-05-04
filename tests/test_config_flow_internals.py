"""Pure-function tests for config_flow internals.

These cover the helpers that the user-facing flow tests skip past:
the probe-helper status→error-key mapping, the input validator, and
the domain normaliser/validator pair.
"""
from __future__ import annotations

from unittest.mock import MagicMock, patch

import aiohttp
import pytest
from homeassistant.const import CONF_LATITUDE, CONF_LONGITUDE, CONF_SCAN_INTERVAL
from homeassistant.core import HomeAssistant

from custom_components.ladestellen_austria.config_flow import (
    _build_entry_data,
    _compute_unique_id,
    _is_valid_domain,
    _normalize_domain,
    _test_api_connection,
    _validate_user_input,
)
from custom_components.ladestellen_austria.const import (
    CONF_API_KEY,
    CONF_DOMAIN,
    CONF_DYNAMIC_ENTITY,
)

from .conftest import make_response_cm


# ---------------------------------------------------------------------------
# _test_api_connection — status → error-key contract
# ---------------------------------------------------------------------------


def _resp(status: int) -> MagicMock:
    resp = MagicMock()
    resp.status = status
    return resp


@pytest.mark.parametrize(
    ("status", "expected"),
    [
        (200, None),
        (204, None),
        (401, "invalid_auth"),
        (403, "domain_mismatch"),
        (404, "cannot_connect"),
        (500, "cannot_connect"),
        (502, "cannot_connect"),
    ],
)
async def test_probe_status_mapping(
    hass: HomeAssistant, status: int, expected: str | None
) -> None:
    """Each upstream HTTP status maps to the documented error key."""
    session = MagicMock()
    session.get = MagicMock(return_value=make_response_cm(_resp(status)))
    with patch(
        "custom_components.ladestellen_austria.config_flow.async_get_clientsession",
        return_value=session,
    ):
        result = await _test_api_connection(
            hass, "key", "www.meineseite.at", 48.21, 16.37
        )
    assert result == expected


@pytest.mark.parametrize(
    "exc",
    [
        aiohttp.ClientConnectionError("dns"),
        aiohttp.ClientError("generic"),
        TimeoutError(),
    ],
)
async def test_probe_network_errors_map_to_cannot_connect(
    hass: HomeAssistant, exc: BaseException
) -> None:
    """All network-level failures collapse to cannot_connect."""
    session = MagicMock()
    session.get = MagicMock(side_effect=exc)
    with patch(
        "custom_components.ladestellen_austria.config_flow.async_get_clientsession",
        return_value=session,
    ):
        result = await _test_api_connection(
            hass, "key", "www.meineseite.at", 48.21, 16.37
        )
    assert result == "cannot_connect"


# ---------------------------------------------------------------------------
# _validate_user_input — every error key
# ---------------------------------------------------------------------------


_GOOD_INPUT: dict[str, object] = {
    CONF_API_KEY: "key",
    CONF_DOMAIN: "www.meineseite.at",
    "location": {"latitude": 48.21, "longitude": 16.37},
    CONF_SCAN_INTERVAL: 30,
}


def test_validate_happy_path() -> None:
    cleaned, errors = _validate_user_input(_GOOD_INPUT)
    assert errors == {}
    assert cleaned[CONF_DOMAIN] == "www.meineseite.at"
    assert cleaned[CONF_LATITUDE] == 48.21
    assert cleaned[CONF_LONGITUDE] == 16.37
    assert cleaned[CONF_SCAN_INTERVAL] == 30


def test_validate_empty_api_key() -> None:
    cleaned, errors = _validate_user_input({**_GOOD_INPUT, CONF_API_KEY: "  "})
    assert errors[CONF_API_KEY] == "invalid_api_key"


def test_validate_invalid_domain() -> None:
    cleaned, errors = _validate_user_input(
        {**_GOOD_INPUT, CONF_DOMAIN: "no-tld"}
    )
    assert errors[CONF_DOMAIN] == "invalid_domain"


@pytest.mark.parametrize(
    "lat,lng",
    [
        (None, 16.37),
        (48.21, None),
        (91.0, 16.37),       # lat out of range
        (48.21, 181.0),      # lng out of range
        ("nope", 16.37),     # non-numeric
    ],
)
def test_validate_invalid_location(
    lat: object, lng: object
) -> None:
    cleaned, errors = _validate_user_input(
        {**_GOOD_INPUT, "location": {"latitude": lat, "longitude": lng}}
    )
    assert errors.get("location") == "invalid_location"


def test_validate_passes_dynamic_entity_through() -> None:
    cleaned, _ = _validate_user_input(
        {**_GOOD_INPUT, CONF_DYNAMIC_ENTITY: "device_tracker.phone"}
    )
    assert cleaned[CONF_DYNAMIC_ENTITY] == "device_tracker.phone"


def test_validate_normalizes_dynamic_entity_empty_to_none() -> None:
    """Empty-string from the form becomes None (= static mode)."""
    cleaned, _ = _validate_user_input(
        {**_GOOD_INPUT, CONF_DYNAMIC_ENTITY: ""}
    )
    assert cleaned[CONF_DYNAMIC_ENTITY] is None


# ---------------------------------------------------------------------------
# _normalize_domain — strip scheme/port/path/case
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("www.meineseite.at", "www.meineseite.at"),
        ("WWW.MeineSeite.AT", "www.meineseite.at"),
        ("https://www.meineseite.at", "www.meineseite.at"),
        ("http://www.meineseite.at:8123", "www.meineseite.at"),
        ("https://www.meineseite.at/dashboard", "www.meineseite.at"),
        ("https://www.meineseite.at:8123/sub/path", "www.meineseite.at"),
        ("www.meineseite.at:8123", "www.meineseite.at"),
        ("www.meineseite.at/", "www.meineseite.at"),
        ("  www.meineseite.at  ", "www.meineseite.at"),
        ("", ""),
    ],
)
def test_normalize_domain(raw: str, expected: str) -> None:
    assert _normalize_domain(raw) == expected


# ---------------------------------------------------------------------------
# _is_valid_domain — table of edges
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("www.meineseite.at", True),
        ("a.b", True),
        ("sub.example.co.uk", True),
        # Negative cases
        ("", False),
        ("singlelabel", False),       # no dot
        (".leadingdot", False),
        ("trailingdot.", False),
        ("-leading.example.com", False),
        ("trailing-.example.com", False),
        ("bad_underscore.com", False),
        ("with space.com", False),
        ("a." + "x" * 64 + ".com", False),  # label > 63 chars
        ("a." + ("x" * 60 + ".") * 5 + "com", False),  # > 253 chars total
    ],
)
def test_is_valid_domain(value: str, expected: bool) -> None:
    assert _is_valid_domain(value) is expected


# ---------------------------------------------------------------------------
# _compute_unique_id / _build_entry_data
# ---------------------------------------------------------------------------


def test_compute_unique_id_static() -> None:
    """Static entries key off domain + 3-decimal-rounded coords."""
    cleaned = {
        CONF_DOMAIN: "x.example",
        CONF_LATITUDE: 48.2103456,
        CONF_LONGITUDE: 16.3719999,
        CONF_DYNAMIC_ENTITY: None,
    }
    assert _compute_unique_id(cleaned) == "x.example:48.21:16.372"


def test_compute_unique_id_dynamic() -> None:
    """Dynamic entries key off the tracker entity_id, ignoring coords."""
    cleaned = {
        CONF_DOMAIN: "x.example",
        CONF_LATITUDE: 48.21,
        CONF_LONGITUDE: 16.37,
        CONF_DYNAMIC_ENTITY: "device_tracker.phone",
    }
    assert (
        _compute_unique_id(cleaned)
        == "x.example:dynamic:device_tracker.phone"
    )


def test_build_entry_data_round_trip() -> None:
    """The packed entry-data dict carries every required key."""
    cleaned = {
        CONF_API_KEY: "k",
        CONF_DOMAIN: "x.example",
        CONF_LATITUDE: 48.21,
        CONF_LONGITUDE: 16.37,
        CONF_SCAN_INTERVAL: 30,
        CONF_DYNAMIC_ENTITY: None,
    }
    data = _build_entry_data(cleaned)
    assert data[CONF_API_KEY] == "k"
    assert data[CONF_DOMAIN] == "x.example"
    assert data[CONF_LATITUDE] == 48.21
    assert data[CONF_LONGITUDE] == 16.37
    assert data[CONF_SCAN_INTERVAL] == 30
    assert data[CONF_DYNAMIC_ENTITY] is None
