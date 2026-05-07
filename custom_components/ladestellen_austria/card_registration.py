"""Lovelace JS module registration for Ladestellen Austria.

Pattern from the HA developer community guide:
https://community.home-assistant.io/t/developer-guide-embedded-lovelace-card-in-a-home-assistant-integration/974909

The ``LovelaceData`` field that signals storage-vs-yaml mode was
renamed across HA versions (``mode`` → ``resource_mode``). We read
whichever attribute is set; ``_is_storage_mode`` carries the details.
"""
from __future__ import annotations

import logging
from collections.abc import Callable
from pathlib import Path
from typing import TYPE_CHECKING, Any, cast

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_call_later

from .const import CARD_VERSION

# Typed access to LovelaceData via the public HassKey HA exposes since
# 2024.x. The string fallback covers HA versions that pre-date the key.
try:
    # Compound ignore covers both:
    #   - attr-defined: HA versions before LOVELACE_DATA shipped
    #   - unused-ignore: HA versions where the symbol IS exported and
    #     local mypy would otherwise grumble that the ignore is unused.
    from homeassistant.components.lovelace.const import (  # type: ignore[attr-defined,unused-ignore]
        LOVELACE_DATA,
    )
except ImportError:  # pragma: no cover — fallback for HA before LOVELACE_DATA shipped
    LOVELACE_DATA = None  # type: ignore[assignment,unused-ignore]

# `lovelace.resources` is a union of ResourceYAMLCollection (read-only)
# and ResourceStorageCollection (exposes async_create_item /
# async_update_item / async_delete_item). _is_storage_mode gates the
# branches that need the storage shape; the cast() at each call site
# narrows the union for mypy. Type-only import — the symbol is only
# referenced in the cast string literal, never at runtime, so older HA
# installs without this submodule layout still work.
if TYPE_CHECKING:
    from homeassistant.components.lovelace.resources import (
        ResourceStorageCollection,
    )

_LOGGER = logging.getLogger(__name__)

URL_BASE = "/ladestellen_austria"

# Cap on _async_wait_for_lovelace_resources retry ticks. Each tick is 5s,
# so 60 ticks = 5 min. Reaching the cap means Lovelace's resource loader
# never flipped `loaded` — broken storage, YAML-mode race during reload,
# or future Lovelace internals change. Cheaper to surface the bad state
# with one warning than poll forever.
_LOVELACE_LOAD_RETRY_MAX = 60
_LOVELACE_LOAD_RETRY_INTERVAL_S = 5

JSMODULES: list[dict[str, str]] = [
    {
        "name": "Ladestellen Austria Card",
        "filename": "ladestellen-austria-card.js",
        "version": CARD_VERSION,
    },
]


class JSModuleRegistration:
    """Register JavaScript modules for Lovelace.

    Storage mode: resources are created/updated via the Lovelace resources API.
    YAML mode: users must add the resource manually — registration is skipped.
    """

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the registrar."""
        self.hass = hass
        # Prefer the typed HassKey introduced in HA 2024.x. The bare
        # string lookup is the older pattern — kept as the
        # ImportError-fallback path so older HA installs (which may
        # not export LOVELACE_DATA yet) still resolve correctly.
        if LOVELACE_DATA is not None:
            self.lovelace = self.hass.data.get(LOVELACE_DATA)
        else:
            self.lovelace = self.hass.data.get("lovelace")
        # Pending async_call_later handle for the resource-loaded retry
        # loop. Captured so async_unregister can cancel it (otherwise
        # HA's verify_cleanup fixture and prod tear-down both leak the
        # scheduled callback). Reset before each schedule call so we
        # never lose a previous handle to the GC.
        self._retry_unsub: Callable[[], None] | None = None

    async def async_register(self) -> None:
        """Register frontend resources."""
        # `http` is a soft dependency via manifest `after_dependencies`, so
        # it may not be loaded in the pytest env (pytest-homeassistant-custom-
        # component does not bootstrap `http` automatically). Skip instead of
        # crashing when absent — production installs always have it loaded.
        if getattr(self.hass, "http", None) is None:
            _LOGGER.debug(
                "http component not available; skipping card registration"
            )
            return
        await self._async_register_path()
        if self.lovelace is not None and self._is_storage_mode():
            await self._async_wait_for_lovelace_resources()

    def _is_storage_mode(self) -> bool:
        """Read the LovelaceData storage-vs-yaml field.

        Renamed across HA versions: ``mode`` (≤ 2026.1) → ``resource_mode``
        (≥ 2026.2). Whichever is present we read; the other won't exist
        on that HA version.
        """
        assert self.lovelace is not None
        for attr in ("resource_mode", "mode"):
            value = getattr(self.lovelace, attr, None)
            if value is not None:
                return bool(value == "storage")
        return False

    async def _async_register_path(self) -> None:
        """Register the static HTTP path that serves the JS bundle.

        Rollup writes the bundle to ``custom_components/<domain>/www/
        <filename>``; serving that ``www`` subdirectory under URL_BASE
        keeps the resource URL flat (``URL_BASE/<filename>``) — no
        ``/www`` segment in the URL the user copies onto their dashboard.
        """
        www_dir = Path(__file__).parent / "www"
        try:
            await self.hass.http.async_register_static_paths(
                [StaticPathConfig(URL_BASE, str(www_dir), False)]
            )
            _LOGGER.debug("Path registered: %s -> %s", URL_BASE, www_dir)
        except RuntimeError:
            _LOGGER.debug("Path already registered: %s", URL_BASE)

    async def _async_wait_for_lovelace_resources(self) -> None:
        """Wait for Lovelace resources to load, then register modules."""
        # Guarded by async_register(); narrow the Optional for mypy --strict.
        assert self.lovelace is not None
        attempts = 0

        async def _check_loaded(_now: Any) -> None:
            nonlocal attempts
            # The just-fired callback is no longer cancellable — drop
            # the stale handle so async_unregister doesn't hold a
            # pointer to a scheduler slot that has already drained.
            self._retry_unsub = None
            assert self.lovelace is not None
            if self.lovelace.resources.loaded:
                await self._async_register_modules()
                return
            attempts += 1
            if attempts >= _LOVELACE_LOAD_RETRY_MAX:
                _LOGGER.warning(
                    "Lovelace resources never reported `loaded` after %d × %ds "
                    "(broken storage, YAML-mode race, or Lovelace internals "
                    "change?). Giving up — users on storage mode will need to "
                    "reload the integration once Lovelace is back online.",
                    _LOVELACE_LOAD_RETRY_MAX,
                    _LOVELACE_LOAD_RETRY_INTERVAL_S,
                )
                return
            _LOGGER.debug(
                "Lovelace resources not loaded, retrying in %ds (%d/%d)",
                _LOVELACE_LOAD_RETRY_INTERVAL_S,
                attempts,
                _LOVELACE_LOAD_RETRY_MAX,
            )
            # Capture the cancel handle so async_unregister can stop
            # the scheduled retry. Cancel any previous handle defensively
            # — _check_loaded should have nulled it on entry, but a
            # caller racing async_register / async_unregister can
            # otherwise leave a leaked slot behind.
            if self._retry_unsub is not None:
                self._retry_unsub()
            self._retry_unsub = async_call_later(
                self.hass, _LOVELACE_LOAD_RETRY_INTERVAL_S, _check_loaded
            )

        await _check_loaded(0)

    async def _async_register_modules(self) -> None:
        """Register or update JavaScript modules."""
        assert self.lovelace is not None
        # async_register() gates this method behind _is_storage_mode(),
        # so the resources collection is always the StorageCollection
        # variant. cast() tells mypy to treat the union as the narrow
        # type; runtime safety is the caller's _is_storage_mode() check.
        resources = cast("ResourceStorageCollection", self.lovelace.resources)
        _LOGGER.debug("Installing JavaScript modules")
        existing_resources = [
            r for r in resources.async_items() if r["url"].startswith(URL_BASE)
        ]
        for module in JSMODULES:
            url = f"{URL_BASE}/{module['filename']}"
            versioned_url = f"{url}?v={module['version']}"
            registered = False
            for resource in existing_resources:
                if self._get_path(resource["url"]) == url:
                    registered = True
                    if self._get_version(resource["url"]) != module["version"]:
                        _LOGGER.info(
                            "Updating %s to version %s",
                            module["name"],
                            module["version"],
                        )
                        try:
                            await resources.async_update_item(
                                resource["id"],
                                {"res_type": "module", "url": versioned_url},
                            )
                        except Exception as update_err:  # noqa: BLE001
                            # Broad catch is deliberate. async_update_item
                            # can fail with HomeAssistantError, KeyError
                            # (row evicted between async_items() and the
                            # update call), or another concrete class that
                            # has shifted across HA core versions. The
                            # recovery is the same regardless: drop and
                            # recreate. Same observable state for the
                            # dashboard, fresh resource id (which the
                            # dashboard never holds externally).
                            _LOGGER.debug(
                                "async_update_item failed (%s), trying delete+recreate",
                                update_err,
                            )
                            await resources.async_delete_item(resource["id"])
                            await resources.async_create_item(
                                {"res_type": "module", "url": versioned_url}
                            )
                    break
            if not registered:
                _LOGGER.info(
                    "Registering %s version %s", module["name"], module["version"]
                )
                await resources.async_create_item(
                    {"res_type": "module", "url": versioned_url}
                )

    def _get_path(self, url: str) -> str:
        """Extract path without version parameter."""
        return url.split("?")[0]

    def _get_version(self, url: str) -> str:
        """Extract version from URL query string."""
        parts = url.split("?")
        if len(parts) > 1 and parts[1].startswith("v="):
            return parts[1].replace("v=", "")
        return "0"

    async def async_unregister(self) -> None:
        """Remove Lovelace resources owned by this integration."""
        # Cancel any pending retry tick before tearing down — otherwise
        # the next _check_loaded fires against a registrar whose hass
        # bus is already shutting down and HA's verify_cleanup leaks
        # the scheduler slot.
        if self._retry_unsub is not None:
            self._retry_unsub()
            self._retry_unsub = None
        if self.lovelace is None or not self._is_storage_mode():
            return
        resources = cast("ResourceStorageCollection", self.lovelace.resources)
        for module in JSMODULES:
            url = f"{URL_BASE}/{module['filename']}"
            existing = [
                r for r in resources.async_items() if r["url"].startswith(url)
            ]
            for resource in existing:
                await resources.async_delete_item(resource["id"])
