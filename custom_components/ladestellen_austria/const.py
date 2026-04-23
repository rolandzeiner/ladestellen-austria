"""Constants for Ladestellen Austria."""
from __future__ import annotations

from typing import Final

from homeassistant.const import __version__ as _HA_VERSION

DOMAIN: Final = "ladestellen_austria"

INTEGRATION_VERSION: Final = "0.1.0"

USER_AGENT: Final = f"HomeAssistant/{_HA_VERSION} {DOMAIN}/{INTEGRATION_VERSION}"

CONF_API_KEY: Final = "api_key"
CONF_DOMAIN: Final = "domain"

DEFAULT_SCAN_INTERVAL: Final = 10
DEFAULT_MAX_RESULTS: Final = 10

API_BASE_URL: Final = "https://api.e-control.at/charge/1.0"
SEARCH_PATH: Final = "/search"

API_KEY_HEADER: Final = "Apikey"
REFERER_HEADER: Final = "Referer"

REQUEST_TIMEOUT_SEC: Final = 30

# TODO: replace with deep-link to the ladestellen.at API registration page
# before v1.0.0. Currently points at the homepage as a fallback.
REGISTRATION_URL: Final = "https://www.ladestellen.at/"
