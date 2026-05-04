// Shared render helpers used by both cards: version-banner, footer,
// and the WS card-version probe live here so neither card carries its
// own copy. Pure functions — the cards keep their own @state and call
// these from render() / event handlers.
//
// ATTRIBUTION_REQUIRED is the verbatim §3d clause from the
// ladestellen.at ToU — single source of truth for both cards.

import { html, nothing, type TemplateResult } from "lit";

import type { HomeAssistant } from "./types";
import { CARD_VERSION } from "./const";
import { localize } from "./localize/localize";

// §3d of the ladestellen.at Terms of Use requires this exact string
// shown as a footer attribution next to E-Control data:
//   "Datenquelle: E-Control"
// Do not edit; bumping it requires re-reading the ToU.
const ATTRIBUTION_REQUIRED = "Datenquelle: E-Control";

/**
 * Probe the backend's card-version WebSocket command. Returns the
 * server-reported version when it differs from CARD_VERSION (i.e.
 * banner should appear), or null otherwise. Silent on transport error
 * — older HA installs without the handler simply don't surface a
 * mismatch, which is correct (cache-buster URL still applies).
 */
export async function checkCardVersionWS(
  hass: HomeAssistant | undefined,
): Promise<string | null> {
  if (!hass?.callWS) return null;
  try {
    const r = await hass.callWS<{ version?: string }>({
      type: "ladestellen_austria/card_version",
    });
    if (r?.version && r.version !== CARD_VERSION) return r.version;
  } catch {
    // Silent: older backend without the WS handler.
  }
  return null;
}

/**
 * Best-effort cache-storage wipe followed by a hard reload. The reload
 * picks up the freshly-cached JS bundle so the version-mismatch banner
 * clears on next mount.
 */
function reloadAfterCacheWipe(): void {
  try {
    window.caches?.keys?.().then((keys) => {
      keys.forEach((k) => window.caches?.delete?.(k));
    });
  } catch {
    // best-effort cache wipe
  }
  window.location.reload();
}

/**
 * Render the version-mismatch banner. Returns the lit `nothing` sentinel
 * when there is no mismatch so call sites can splat it unconditionally
 * into their template.
 */
export function renderVersionBanner(
  mismatch: string | null,
): TemplateResult | typeof nothing {
  if (!mismatch) return nothing;
  return html`
    <div class="version-notice" role="alert" aria-live="assertive">
      <span
        >${localize("common.version_update").replace("{v}", mismatch)}</span
      >
      <button
        class="version-reload-btn"
        type="button"
        @click=${reloadAfterCacheWipe}
      >
        ${localize("common.version_reload")}
      </button>
    </div>
  `;
}

/**
 * Render the brand-attribution footer (E-Control logo + "Datenquelle:
 * E-Control" string). The list card and the parking card render
 * byte-identical footers; the only inputs are the dark-mode flag from
 * hass.themes (for the silhouette colour-flip when adaptive logos are
 * enabled) and the upstream attribution string (which serves as a
 * fallback when a user template sensor strips the attribute).
 */
export function renderFooter(
  hass: HomeAssistant | undefined,
  attr: string | undefined,
  adaptive: boolean,
): TemplateResult {
  const darkMode = Boolean(
    (hass?.themes as { darkMode?: boolean } | undefined)?.darkMode,
  );
  const logoClasses = adaptive
    ? `brand-logo adaptive ${darkMode ? "adaptive-dark" : "adaptive-light"}`
    : "brand-logo";
  const text =
    attr && attr.includes("E-Control") ? attr : ATTRIBUTION_REQUIRED;
  return html`
    <div class="footer">
      <a
        class="brand-link"
        href="https://www.e-control.at/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="E-Control"
        @click=${(ev: Event) => ev.stopPropagation()}
      >
        <img
          class=${logoClasses}
          src="/ladestellen_austria/e-control_logo.svg"
          alt="E-Control"
        />
      </a>
      <span class="attribution-text">${text}</span>
    </div>
  `;
}
