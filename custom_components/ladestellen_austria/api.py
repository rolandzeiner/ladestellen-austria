"""Client for E-Control's Ladestellenverzeichnis API (``charge/1.0``).

Owns everything about talking to E-Control: the endpoint, the request
parameters and headers, and turning every failure into one of the exceptions
below. Callers pass in the ``aiohttp.ClientSession``, the credentials and the
User-Agent, so this module never needs Home Assistant.

It deliberately imports nothing from Home Assistant or from the rest of the
package (``const.py`` pulls in HA for its User-Agent), and
``tests/test_api.py`` enforces that. Deciding which status means reauth,
translating these exceptions into ``UpdateFailed`` and pacing the requests is
the coordinator's and the config flow's job.
"""

from __future__ import annotations

from typing import Any, Final

import aiohttp

API_BASE_URL: Final = "https://api.e-control.at/charge/1.0"
SEARCH_PATH: Final = "/search"
SEARCH_URL: Final = f"{API_BASE_URL}{SEARCH_PATH}"

API_KEY_HEADER: Final = "Apikey"
REFERER_HEADER: Final = "Referer"

REQUEST_TIMEOUT_SEC: Final = 30

# One station record exactly as E-Control sends it. Nothing validates the
# shape beyond "is a dict", so every reader stays defensive; the cards read
# the same keys.
type Station = dict[str, Any]


class EControlError(Exception):
    """Base class for every failure talking to E-Control."""


class EControlTimeoutError(EControlError):
    """The request timed out."""


class EControlConnectionError(EControlError):
    """The request never got an HTTP answer (DNS, refused, reset, …)."""

    def __init__(self, err: aiohttp.ClientError) -> None:
        super().__init__(f"{type(err).__name__}: {err}")
        self.error_type = type(err).__name__
        self.error = str(err)


class EControlHttpError(EControlError):
    """E-Control answered with an error status, 401 and 403 included."""

    def __init__(self, status: int, reason: str) -> None:
        super().__init__(f"HTTP {status}: {reason}")
        self.status = status
        self.reason = reason


class EControlPayloadError(EControlError):
    """A 2xx answer whose body is not a JSON station list."""

    def __init__(self, status: int, error: str) -> None:
        super().__init__(f"invalid response (HTTP {status}): {error}")
        self.status = status
        self.error = error


def request_headers(api_key: str, domain: str, user_agent: str) -> dict[str, str]:
    """Headers sent with every request.

    The gateway compares the Referer header's hostname against the bare
    domain registered at ladestellen.at; hard-coding https is fine because
    the gateway strips scheme/port/path before matching.

    No `Accept-Encoding`: aiohttp sends its own offer (`gzip, deflate,
    zstd` on aiohttp 3.14.5) and decompresses whatever comes back, while
    a value set here would replace that offer rather than add to it.
    """
    return {
        "User-Agent": user_agent,
        API_KEY_HEADER: api_key,
        REFERER_HEADER: f"https://{domain}",
        "Accept": "application/json",
    }


def _search_params(latitude: float, longitude: float) -> dict[str, str]:
    return {"latitude": str(latitude), "longitude": str(longitude)}


def _station_list(status: int, payload: Any) -> list[Station]:
    """Return the dict entries of a /search body; raise if it isn't a list."""
    if not isinstance(payload, list):
        raise EControlPayloadError(
            status, f"expected list, got {type(payload).__name__}"
        )
    return [s for s in payload if isinstance(s, dict)]


async def fetch_search(
    session: aiohttp.ClientSession,
    *,
    latitude: float,
    longitude: float,
    api_key: str,
    domain: str,
    user_agent: str,
) -> list[Station]:
    """Return the stations around a point, live per-point status included.

    Raises an EControlError subclass for every failure class, so callers can
    tell timeouts, HTTP errors (auth among them) and malformed answers apart.
    Non-dict entries in the list are dropped.
    """
    try:
        async with session.get(
            SEARCH_URL,
            params=_search_params(latitude, longitude),
            headers=request_headers(api_key, domain, user_agent),
            timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT_SEC),
        ) as resp:
            resp.raise_for_status()
            status = resp.status
            try:
                payload = await resp.json()
            except (aiohttp.ContentTypeError, ValueError) as err:
                # json.JSONDecodeError is a ValueError
                raise EControlPayloadError(status, str(err)) from err
    except TimeoutError as err:
        raise EControlTimeoutError("request timed out") from err
    except aiohttp.ClientResponseError as err:
        raise EControlHttpError(err.status, err.message or "") from err
    except aiohttp.ClientError as err:
        raise EControlConnectionError(err) from err
    return _station_list(status, payload)


async def check_connection(
    session: aiohttp.ClientSession,
    *,
    latitude: float,
    longitude: float,
    api_key: str,
    domain: str,
    user_agent: str,
) -> None:
    """Probe /search once with the given credentials; raise if it fails.

    The body is read too: a misconfigured gateway answering 200 with an HTML
    error page would otherwise pass the probe and only fail on the first
    coordinator refresh, so the probe holds /search to the same shape
    contract as ``fetch_search``.
    """
    try:
        async with session.get(
            SEARCH_URL,
            params=_search_params(latitude, longitude),
            headers=request_headers(api_key, domain, user_agent),
            timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT_SEC),
        ) as resp:
            if resp.status >= 400:
                raise EControlHttpError(resp.status, resp.reason or "")
            try:
                payload = await resp.json()
            except (aiohttp.ContentTypeError, ValueError) as err:
                raise EControlPayloadError(resp.status, str(err)) from err
            _station_list(resp.status, payload)
    except TimeoutError as err:
        raise EControlTimeoutError("request timed out") from err
    except aiohttp.ClientError as err:
        raise EControlConnectionError(err) from err
