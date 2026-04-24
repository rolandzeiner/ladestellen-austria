"""Constants for Ladestellen Austria."""
from __future__ import annotations

from typing import Final

from homeassistant.const import __version__ as _HA_VERSION

DOMAIN: Final = "ladestellen_austria"

INTEGRATION_VERSION: Final = "0.1.0"

# Must match src/const.ts CARD_VERSION byte-for-byte. Bump both in the same
# commit. manifest.json "version" stays on the clean release (no -beta); this
# constant plus src/const.ts carry the -beta-N suffix during development. The
# WS version check that the bundled card runs on first hass assignment uses
# this string as the source of truth — any mismatch triggers the reload banner
# loop described in the workflow skill's CARD_VERSION section.
CARD_VERSION: Final = "0.1.0-beta-19"

USER_AGENT: Final = f"HomeAssistant/{_HA_VERSION} {DOMAIN}/{INTEGRATION_VERSION}"

CONF_API_KEY: Final = "api_key"
CONF_DOMAIN: Final = "domain"

DEFAULT_SCAN_INTERVAL: Final = 10
DEFAULT_MAX_RESULTS: Final = 10

API_BASE_URL: Final = "https://api.e-control.at/charge/1.0"
SEARCH_PATH: Final = "/search"
DATEX_STATUS_PATH: Final = "/datex2/v3.5/energy-infrastructure-status-publication"

API_KEY_HEADER: Final = "Apikey"
REFERER_HEADER: Final = "Referer"

REQUEST_TIMEOUT_SEC: Final = 30

# Confirmed against the Angular route table in admin.ladestellen.at's
# main.dbdfff82cb88e9da.js bundle (path "api/registrieren"). Retrieved
# 2026-04-23. If the SPA rebuilds, the hash fragment remains stable —
# hash-based routing is client-side and hash values don't change on
# bundle-version bumps.
REGISTRATION_URL: Final = "https://admin.ladestellen.at/#/api/registrieren"
