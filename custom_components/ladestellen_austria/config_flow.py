"""Config flow for Ladestellen Austria."""
from __future__ import annotations

import logging
from collections.abc import Mapping
from typing import Any
from urllib.parse import urlparse

import aiohttp
import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.const import (
    CONF_LATITUDE,
    CONF_LONGITUDE,
    CONF_SCAN_INTERVAL,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    EntitySelector,
    EntitySelectorConfig,
    LocationSelector,
    LocationSelectorConfig,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .const import (
    API_BASE_URL,
    API_KEY_HEADER,
    CONF_API_KEY,
    CONF_DOMAIN,
    CONF_DYNAMIC_ENTITY,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    REFERER_HEADER,
    REGISTRATION_URL,
    REQUEST_TIMEOUT_SEC,
    SEARCH_PATH,
    USER_AGENT,
)

_LOGGER = logging.getLogger(__name__)


def _default_domain(hass: HomeAssistant) -> str:
    """Derive a sensible default for the referer-domain field.

    The ladestellen.at gateway compares the Referer header's hostname against
    the bare domain the user registered (no scheme, no port, no path). Parsing
    `hass.config.external_url` gives us exactly that, with port stripped
    automatically (`urlparse().hostname` excludes port).
    """
    for candidate in (hass.config.external_url, hass.config.internal_url):
        if not candidate:
            continue
        host = urlparse(candidate).hostname
        if host:
            return host
    return ""


def _default_location(hass: HomeAssistant) -> dict[str, float]:
    """HA's configured home coordinates — pre-filled into the map picker."""
    return {
        "latitude": float(hass.config.latitude),
        "longitude": float(hass.config.longitude),
    }


def _build_schema(
    defaults: dict[str, Any],
    include_name: bool = False,
    include_location: bool = True,
    include_dynamic: bool = False,
) -> vol.Schema:
    """Build the user/reconfigure/options schema."""
    fields: dict[Any, Any] = {}
    if include_name:
        fields[
            vol.Required("name", default=defaults.get("name", "Ladestellen Austria"))
        ] = TextSelector()
    fields[vol.Required(CONF_API_KEY, default=defaults.get(CONF_API_KEY, ""))] = (
        TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))
    )
    fields[vol.Required(CONF_DOMAIN, default=defaults.get(CONF_DOMAIN, ""))] = (
        TextSelector(TextSelectorConfig(type=TextSelectorType.TEXT))
    )
    if include_location:
        fields[
            vol.Required(
                "location",
                default=defaults.get(
                    "location",
                    {
                        "latitude": defaults.get(CONF_LATITUDE, 0.0),
                        "longitude": defaults.get(CONF_LONGITUDE, 0.0),
                    },
                ),
            )
        ] = LocationSelector(LocationSelectorConfig(radius=False))
    fields[
        vol.Required(
            CONF_SCAN_INTERVAL,
            default=defaults.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
        )
    ] = NumberSelector(
        NumberSelectorConfig(
            min=5,
            max=720,
            step=5,
            unit_of_measurement="min",
            mode=NumberSelectorMode.BOX,
        )
    )
    if include_dynamic:
        # Optional device_tracker picker. An existing value is preserved
        # in the default (so reconfigure shows the currently-selected
        # tracker), but the field itself is always optional so users can
        # clear it back to static mode.
        existing = defaults.get(CONF_DYNAMIC_ENTITY) or None
        key = (
            vol.Optional(CONF_DYNAMIC_ENTITY, default=existing)
            if existing
            else vol.Optional(CONF_DYNAMIC_ENTITY)
        )
        fields[key] = EntitySelector(EntitySelectorConfig(domain="device_tracker"))
    return vol.Schema(fields)


def _normalize_domain(raw: str) -> str:
    """Strip scheme, trailing slash, path, and port from user input.

    The registration page at ladestellen.at requires "full domain name without
    protocol, port, or path" — this normalization is forgiving of users who
    paste their full external URL despite that rule.
    """
    value = raw.strip()
    if not value:
        return ""
    if "://" in value:
        value = urlparse(value).hostname or ""
    else:
        value = value.split("/")[0].split(":")[0]
    return value.lower()


def _is_valid_domain(value: str) -> bool:
    """Lenient hostname validator — letters, digits, dots, hyphens only."""
    if not value or len(value) > 253:
        return False
    labels = value.split(".")
    if len(labels) < 2:
        return False
    for label in labels:
        if not label or len(label) > 63:
            return False
        if label.startswith("-") or label.endswith("-"):
            return False
        for ch in label:
            if not (ch.isalnum() or ch == "-"):
                return False
    return True


def _validate_user_input(
    user_input: dict[str, Any],
) -> tuple[dict[str, Any], dict[str, str]]:
    """Parse + validate. Returns (cleaned, errors)."""
    errors: dict[str, str] = {}

    api_key = str(user_input.get(CONF_API_KEY, "")).strip()
    if not api_key:
        errors[CONF_API_KEY] = "invalid_api_key"

    domain = _normalize_domain(str(user_input.get(CONF_DOMAIN, "")))
    if not _is_valid_domain(domain):
        errors[CONF_DOMAIN] = "invalid_domain"

    location = user_input.get("location") or {}
    latitude = location.get("latitude") if isinstance(location, dict) else None
    longitude = location.get("longitude") if isinstance(location, dict) else None
    if latitude is None and CONF_LATITUDE in user_input:
        latitude = user_input[CONF_LATITUDE]
    if longitude is None and CONF_LONGITUDE in user_input:
        longitude = user_input[CONF_LONGITUDE]

    try:
        lat_f = float(latitude) if latitude is not None else None
        lng_f = float(longitude) if longitude is not None else None
    except (TypeError, ValueError):
        lat_f = lng_f = None
    if lat_f is None or lng_f is None or not (-90 <= lat_f <= 90) or not (-180 <= lng_f <= 180):
        errors["location"] = "invalid_location"

    cleaned = {
        CONF_API_KEY: api_key,
        CONF_DOMAIN: domain,
        CONF_LATITUDE: lat_f if lat_f is not None else 0.0,
        CONF_LONGITUDE: lng_f if lng_f is not None else 0.0,
        CONF_SCAN_INTERVAL: int(
            user_input.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
        ),
        CONF_DYNAMIC_ENTITY: user_input.get(CONF_DYNAMIC_ENTITY) or None,
    }
    return cleaned, errors


def _build_entry_data(cleaned: dict[str, Any]) -> dict[str, Any]:
    """Pack validated input into ConfigEntry.data shape."""
    return {
        CONF_API_KEY: cleaned[CONF_API_KEY],
        CONF_DOMAIN: cleaned[CONF_DOMAIN],
        CONF_LATITUDE: cleaned[CONF_LATITUDE],
        CONF_LONGITUDE: cleaned[CONF_LONGITUDE],
        CONF_SCAN_INTERVAL: cleaned[CONF_SCAN_INTERVAL],
        CONF_DYNAMIC_ENTITY: cleaned.get(CONF_DYNAMIC_ENTITY) or None,
    }


def _compute_unique_id(cleaned: dict[str, Any]) -> str:
    """Stable unique_id formula.

    Static mode — FROZEN from v0.2.0 onward: `{domain}:{lat_round3}:{lng_round3}`.
    Combining domain + coarse coords lets the same API key serve multiple
    regional entries without collision. Three decimals of lat/lng is ~110 m
    precision — fine-grained enough that a second entry at a truly different
    location doesn't collide, coarse enough that micro-adjustments in the map
    picker don't create duplicates.

    Dynamic mode (beta-50): `{domain}:dynamic:{entity_id}`. A dynamic
    entry's live position changes constantly, so tying the unique_id to
    lat/lng would make the ID unstable. The tracker entity_id is the
    user's intended identity for the entry and stays fixed across moves.
    """
    dynamic_entity = cleaned.get(CONF_DYNAMIC_ENTITY) or None
    if dynamic_entity:
        return f"{cleaned[CONF_DOMAIN]}:dynamic:{dynamic_entity}"
    lat = round(float(cleaned[CONF_LATITUDE]), 3)
    lng = round(float(cleaned[CONF_LONGITUDE]), 3)
    return f"{cleaned[CONF_DOMAIN]}:{lat}:{lng}"


async def _test_api_connection(
    hass: HomeAssistant,
    api_key: str,
    domain: str,
    latitude: float,
    longitude: float,
) -> str | None:
    """Probe /search with the supplied credentials. Return an error key or None."""
    session = async_get_clientsession(hass)
    headers = {
        "User-Agent": USER_AGENT,
        API_KEY_HEADER: api_key,
        REFERER_HEADER: f"https://{domain}",
        "Accept": "application/json",
    }
    params = {"latitude": str(latitude), "longitude": str(longitude)}
    timeout = aiohttp.ClientTimeout(total=REQUEST_TIMEOUT_SEC)
    try:
        resp = await session.get(
            f"{API_BASE_URL}{SEARCH_PATH}",
            headers=headers,
            params=params,
            timeout=timeout,
        )
    except aiohttp.ClientError:
        return "cannot_connect"
    except TimeoutError:
        return "cannot_connect"

    if resp.status == 401:
        return "invalid_auth"
    if resp.status == 403:
        return "domain_mismatch"
    if resp.status >= 400:
        return "cannot_connect"
    return None


class LadestellenAustriaConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Ladestellen Austria."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: ConfigEntry,
    ) -> LadestellenAustriaOptionsFlow:
        """Return the options flow handler."""
        return LadestellenAustriaOptionsFlow()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Collect initial credentials + location."""
        errors: dict[str, str] = {}
        if user_input is not None:
            cleaned, errors = _validate_user_input(user_input)
            if not errors:
                probe_err = await _test_api_connection(
                    self.hass,
                    cleaned[CONF_API_KEY],
                    cleaned[CONF_DOMAIN],
                    cleaned[CONF_LATITUDE],
                    cleaned[CONF_LONGITUDE],
                )
                if probe_err:
                    errors["base"] = probe_err
                else:
                    await self.async_set_unique_id(_compute_unique_id(cleaned))
                    self._abort_if_unique_id_configured()
                    title = user_input.get("name", "Ladestellen Austria")
                    return self.async_create_entry(
                        title=title, data=_build_entry_data(cleaned)
                    )

        defaults: dict[str, Any] = {
            "name": "Ladestellen Austria",
            CONF_DOMAIN: _default_domain(self.hass),
            "location": _default_location(self.hass),
        }
        return self.async_show_form(
            step_id="user",
            data_schema=_build_schema(
                defaults, include_name=True, include_dynamic=True
            ),
            errors=errors,
            description_placeholders={"registration_url": REGISTRATION_URL},
        )

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit credentials, location, or dynamic-tracker mode.

        The reconfigure flow intentionally supports unique_id changes —
        switching between static and dynamic mode flips the formula from
        `{domain}:{lat}:{lng}` to `{domain}:dynamic:{entity}`, and
        moving the static-mode map pin by more than ~110 m also produces
        a new unique_id. Both are legitimate user operations. We only
        abort when the new unique_id collides with a *different*
        existing entry.
        """
        entry = self._get_reconfigure_entry()
        errors: dict[str, str] = {}
        if user_input is not None:
            cleaned, errors = _validate_user_input(user_input)
            if not errors:
                probe_err = await _test_api_connection(
                    self.hass,
                    cleaned[CONF_API_KEY],
                    cleaned[CONF_DOMAIN],
                    cleaned[CONF_LATITUDE],
                    cleaned[CONF_LONGITUDE],
                )
                if probe_err:
                    errors["base"] = probe_err
                else:
                    new_unique_id = _compute_unique_id(cleaned)
                    await self.async_set_unique_id(new_unique_id)
                    # Allow THIS entry to change its unique_id (mode
                    # switch / location move) but abort if another
                    # entry already holds the new unique_id.
                    for other in self._async_current_entries(
                        include_ignore=True
                    ):
                        if (
                            other.entry_id != entry.entry_id
                            and other.unique_id == new_unique_id
                        ):
                            return self.async_abort(reason="already_configured")
                    return self.async_update_reload_and_abort(
                        entry,
                        data=_build_entry_data(cleaned),
                        unique_id=new_unique_id,
                    )

        current = {**entry.data, **entry.options}
        current_defaults = {
            CONF_API_KEY: current.get(CONF_API_KEY, ""),
            CONF_DOMAIN: current.get(CONF_DOMAIN, _default_domain(self.hass)),
            "location": {
                "latitude": current.get(CONF_LATITUDE, self.hass.config.latitude),
                "longitude": current.get(CONF_LONGITUDE, self.hass.config.longitude),
            },
            CONF_SCAN_INTERVAL: current.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL),
            CONF_DYNAMIC_ENTITY: current.get(CONF_DYNAMIC_ENTITY) or None,
        }
        return self.async_show_form(
            step_id="reconfigure",
            data_schema=_build_schema(current_defaults, include_dynamic=True),
            errors=errors,
            description_placeholders={"registration_url": REGISTRATION_URL},
        )

    async def async_step_reauth(
        self, entry_data: Mapping[str, Any]
    ) -> ConfigFlowResult:
        """Triggered when the coordinator raises ConfigEntryAuthFailed."""
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Prompt for fresh api_key + domain (either may have rotated)."""
        entry = self._get_reauth_entry()
        errors: dict[str, str] = {}
        if user_input is not None:
            api_key = str(user_input.get(CONF_API_KEY, "")).strip()
            if not api_key:
                errors[CONF_API_KEY] = "invalid_api_key"
            domain = _normalize_domain(str(user_input.get(CONF_DOMAIN, "")))
            if not _is_valid_domain(domain):
                errors[CONF_DOMAIN] = "invalid_domain"
            if not errors:
                probe_err = await _test_api_connection(
                    self.hass,
                    api_key,
                    domain,
                    float(entry.data[CONF_LATITUDE]),
                    float(entry.data[CONF_LONGITUDE]),
                )
                if probe_err:
                    errors["base"] = probe_err
                else:
                    return self.async_update_reload_and_abort(
                        entry,
                        data={
                            **entry.data,
                            CONF_API_KEY: api_key,
                            CONF_DOMAIN: domain,
                        },
                    )

        return self.async_show_form(
            step_id="reauth_confirm",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_API_KEY, default=entry.data.get(CONF_API_KEY, "")
                    ): TextSelector(
                        TextSelectorConfig(type=TextSelectorType.PASSWORD)
                    ),
                    vol.Required(
                        CONF_DOMAIN, default=entry.data.get(CONF_DOMAIN, "")
                    ): TextSelector(),
                }
            ),
            errors=errors,
            description_placeholders={"registration_url": REGISTRATION_URL},
        )


class LadestellenAustriaOptionsFlow(OptionsFlow):
    """Handle the options flow — editable subset of the entry settings."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit settings without a connection probe."""
        current = {**self.config_entry.data, **self.config_entry.options}
        if user_input is not None:
            return self.async_create_entry(
                data={
                    CONF_SCAN_INTERVAL: int(
                        user_input.get(CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL)
                    ),
                }
            )
        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        CONF_SCAN_INTERVAL,
                        default=current.get(
                            CONF_SCAN_INTERVAL, DEFAULT_SCAN_INTERVAL
                        ),
                    ): NumberSelector(
                        NumberSelectorConfig(
                            min=5,
                            max=720,
                            step=5,
                            unit_of_measurement="min",
                            mode=NumberSelectorMode.BOX,
                        )
                    ),
                }
            ),
        )
