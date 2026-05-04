"""Constants for Ladestellen Austria."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Final

from homeassistant.const import __version__ as _HA_VERSION

DOMAIN: Final = "ladestellen_austria"

# Single source of truth for the integration version: manifest.json. Reading
# it here at import keeps INTEGRATION_VERSION, the User-Agent string, and the
# Lovelace cache-buster in lockstep with the file HA itself reads at install
# time. Bumping the release is now one edit instead of three.
INTEGRATION_VERSION: Final = json.loads(
    (Path(__file__).parent / "manifest.json").read_text(encoding="utf-8")
)["version"]

# Must match src/const.ts CARD_VERSION byte-for-byte; tests/test_card_version.py
# enforces the invariant in CI. Bump both in the same commit. manifest.json
# "version" stays on the clean release (no -beta); this constant plus
# src/const.ts can carry a -beta-N suffix during development.
#
# Two cache-stale defences combine here:
#   1. Cache-buster: card_registration.py appends `?v=<CARD_VERSION>` to the
#      Lovelace resource URL. New version → new URL → browser re-fetches.
#   2. Live WS probe: __init__.py registers `ladestellen_austria/card_version`
#      which the frontend bundle calls on first hass-set. If the running JS
#      reports a different CARD_VERSION than the backend, the card renders a
#      reload banner. This catches users with a tab open across an upgrade,
#      where the cache-buster only fires on the next page load.
CARD_VERSION: Final = INTEGRATION_VERSION

# User-Agent header sent on every outbound API call. HA convention is
# "HomeAssistant/{ha_ver} {domain}/{int_ver}". The trailing "(+<repo-url>)"
# comment follows RFC-9110 product-token-comment convention so E-Control
# has a direct contact point for abuse / coordination without having to
# find the repo by guessing.
USER_AGENT: Final = (
    f"HomeAssistant/{_HA_VERSION} {DOMAIN}/{INTEGRATION_VERSION} "
    f"(+https://github.com/rolandzeiner/ladestellen-austria)"
)

CONF_API_KEY: Final = "api_key"
CONF_DOMAIN: Final = "domain"
# Optional device_tracker entity_id. When set, the coordinator reads the
# tracker's live GPS attributes on each state change / each refresh and
# calls /search from that position instead of the fixed CONF_LATITUDE /
# CONF_LONGITUDE. Pinning is meaningless in dynamic mode, so the card
# hides that section when the sensor reports dynamic_mode: True.
CONF_DYNAMIC_ENTITY: Final = "dynamic_entity"

# ------------------------------------------------------------------
# Polling cadence — units are MINUTES (the ladestellen.at gateway is
# rate-limited per ToU §4: "max 2500 req/hour, 30 concurrent fair-use").
# DEFAULT_SCAN_INTERVAL = 10 min sits comfortably inside that envelope
# even when a single household runs multiple entries (e.g. one static
# + one dynamic). The 5-720 floor/ceiling matches the config-flow's
# NumberSelector range; codified as constants here so both the form
# and any future migration logic share one source of truth.
# ------------------------------------------------------------------
DEFAULT_SCAN_INTERVAL: Final = 10
MIN_POLL_MINUTES: Final = 5
MAX_POLL_MINUTES: Final = 720

# ------------------------------------------------------------------
# Sensor-attribute size discipline (recorder budget).
# Each station carries label, address, points[], connectors[], pricing,
# opening-hours, and distance — empirically ~600-1200 bytes per station
# at the 13-status fixture density. 10 stations × ~1 KB stays well
# below HA's 16 KB recorder attribute cap with margin for outliers
# (large operators, long opening-hours strings). Don't blindly raise
# this without measuring — going to 25 has tipped the cap on the
# tankstellen sister integration in the past.
# ------------------------------------------------------------------
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

API_KEY_HEADER: Final = "Apikey"
REFERER_HEADER: Final = "Referer"

REQUEST_TIMEOUT_SEC: Final = 30

# Confirmed against the Angular route table in admin.ladestellen.at's
# main.dbdfff82cb88e9da.js bundle (path "api/registrieren"). Retrieved
# 2026-04-23. If the SPA rebuilds, the hash fragment remains stable —
# hash-based routing is client-side and hash values don't change on
# bundle-version bumps.
REGISTRATION_URL: Final = "https://admin.ladestellen.at/#/api/registrieren"

# Required verbatim by §3d of the ladestellen.at Nutzungsbedingungen:
# "Der Nutzer muss die Datenquelle unmittelbar bei den von der E-Control
# angezeigten Daten durch folgenden Verweis anführen: 'Datenquelle:
# E-Control'." Do NOT rewrite this string — it's part of the contract the
# end user accepted at registration. Single source of truth: every entity
# imports this; the cards' attribution footer carries it independently
# (frontend can't read Python constants).
ATTRIBUTION: Final = "Datenquelle: E-Control"

# HA bus event fired when a single EVSE's status changes between two
# successful coordinator refreshes. Payload schema: see
# coordinator._fire_status_transition_events.
EVENT_SLOT_STATUS_CHANGED: Final = f"{DOMAIN}_slot_status_changed"


def classify_probe_status(status: int) -> str | None:
    """Map an HTTP status code from /search to a config-flow error key.

    Single source of truth for the credentials-probe outcome contract;
    both `coordinator._fetch_search` and `config_flow._test_api_connection`
    consult this so the two sites can't drift on the 4xx → translation
    key mapping. Returns None when the response is OK (2xx/3xx).

    - 401 → invalid_auth   (api_key rejected)
    - 403 → domain_mismatch (referer not in user's registered set)
    - any other ≥400 → cannot_connect
    """
    if status == 401:
        return "invalid_auth"
    if status == 403:
        return "domain_mismatch"
    if status >= 400:
        return "cannot_connect"
    return None


def normalize_status(status: str | None) -> str:
    """Bucket-comparison key for an upstream RefillPointStatusEnum value.

    Uppercases and strips underscores so `OUTOFORDER` and `OUT_OF_ORDER`
    produce the same key. Mirrors the TypeScript `normStatus()` in
    `src/utils.ts`; both the frontend rack-status bucketing and the
    coordinator's status-transition diff need to agree on the canonical
    key — keeping the formula in one Python helper plus its TS twin
    means a contributor changing the rules on one side has only one
    function to update on the other (CI test enforces parity).
    """
    return (status or "").upper().replace("_", "")


def build_default_headers(api_key: str, domain: str) -> dict[str, str]:
    """Build the canonical outbound header set used by every API call.

    Single source of truth for the coordinator and the config-flow trial
    probe. The gateway compares the Referer header's hostname against the
    bare domain registered at ladestellen.at; hard-coding https is fine
    because the gateway strips scheme/port/path before matching.

    `Accept-Encoding: gzip` is sent unconditionally — aiohttp transparently
    decompresses gzipped responses and harmlessly accepts identity if the
    upstream doesn't compress.
    """
    return {
        "User-Agent": USER_AGENT,
        API_KEY_HEADER: api_key,
        REFERER_HEADER: f"https://{domain}",
        "Accept": "application/json",
        "Accept-Encoding": "gzip",
    }
