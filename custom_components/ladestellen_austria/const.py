"""Constants for Ladestellen Austria."""
from __future__ import annotations

from typing import Final

from homeassistant.const import __version__ as _HA_VERSION

DOMAIN: Final = "ladestellen_austria"

INTEGRATION_VERSION: Final = "0.2.0"

# Must match src/const.ts CARD_VERSION byte-for-byte. Bump both in the same
# commit. manifest.json "version" stays on the clean release (no -beta); this
# constant plus src/const.ts carry the -beta-N suffix during development. The
# WS version check that the bundled card runs on first hass assignment uses
# this string as the source of truth — any mismatch triggers the reload banner
# loop described in the workflow skill's CARD_VERSION section.
CARD_VERSION: Final = "0.2.0"

USER_AGENT: Final = f"HomeAssistant/{_HA_VERSION} {DOMAIN}/{INTEGRATION_VERSION}"

CONF_API_KEY: Final = "api_key"
CONF_DOMAIN: Final = "domain"
# Optional device_tracker entity_id. When set, the coordinator reads the
# tracker's live GPS attributes on each state change / each refresh and
# calls /search from that position instead of the fixed CONF_LATITUDE /
# CONF_LONGITUDE. Pinning is meaningless in dynamic mode, so the card
# hides that section when the sensor reports dynamic_mode: True.
CONF_DYNAMIC_ENTITY: Final = "dynamic_entity"

DEFAULT_SCAN_INTERVAL: Final = 10
DEFAULT_MAX_RESULTS: Final = 10

# ------------------------------------------------------------------
# Dynamic-tracker mode rate limits (ported from tankstellen-austria).
# The tracker state-change listener fires a lot; these guards ensure a
# phone that reports every couple of seconds doesn't hammer E-Control.
# ------------------------------------------------------------------
# Minimum metres moved before a tracker state change triggers a refresh.
DYNAMIC_DISTANCE_THRESHOLD_M: Final = 1500
# Minimum minutes between auto-refreshes for a single entry.
DYNAMIC_COOLDOWN_MINUTES: Final = 10
# Minimum minutes between auto-refreshes across ALL entries of this
# domain — prevents a thundering-herd when multiple dynamic entries
# react to the same tracker event.
DYNAMIC_DOMAIN_COOLDOWN_MINUTES: Final = 5
# Fallback update_interval when dynamic mode is active. The coordinator
# still runs on a timer so it refreshes periodically even if the
# tracker never moves (parked vehicle, device off), just slowly.
DYNAMIC_SAFETY_INTERVAL_HOURS: Final = 6
# Key under hass.data[DOMAIN] that stores the last API-call timestamp
# (datetime) used for the domain-wide cooldown check.
DOMAIN_LAST_API_CALL_KEY: Final = "last_api_call_ts"

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
