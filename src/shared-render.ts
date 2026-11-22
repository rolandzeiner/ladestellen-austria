// Shared render helpers used by both cards: the "can't reach E-Control"
// notice, the missing-sensor alert and the attribution footer live here so
// neither card carries its own copy. Pure functions — the cards keep their
// own @state and call these from render() / event handlers. Lifecycle
// helpers (language sync, the shouldUpdate tail) live in card-lifecycle.ts.
// The version banner is src/version-banner.ts.
//
// ATTRIBUTION_REQUIRED is the verbatim §3d clause from the
// ladestellen.at ToU — single source of truth for both cards.

import { html, type TemplateResult } from "lit";

import type { HomeAssistant } from "./types";
import { localize } from "./localize/localize";

// §3d of the ladestellen.at Terms of Use requires this exact string
// shown as a footer attribution next to E-Control data:
//   "Datenquelle: E-Control"
// Do not edit; bumping it requires re-reading the ToU.
const ATTRIBUTION_REQUIRED = "Datenquelle: E-Control";

/**
 * The notice both cards show while their sensor is unavailable. Without it
 * an outage reads like a real answer ("No stations match the current
 * filters", "not in the sensor's current results"), which looks like a
 * broken setup. It doesn't say whose fault it is: the integration's Repairs
 * issue does that, once it can tell E-Control's side from the user's own
 * network.
 */
export function renderUnreachable(): TemplateResult {
  return html`
    <div class="empty-state unreachable" role="status" aria-live="polite">
      <div class="unreachable-title">${localize("card.unreachable")}</div>
      <div class="unreachable-detail">${localize("card.unreachable_detail")}</div>
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
  const darkMode = Boolean((hass?.themes as { darkMode?: boolean } | undefined)?.darkMode);
  const logoClasses = adaptive
    ? `brand-logo adaptive ${darkMode ? "adaptive-dark" : "adaptive-light"}`
    : "brand-logo";
  const text = attr && attr.includes("E-Control") ? attr : ATTRIBUTION_REQUIRED;
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

/**
 * What a card shows when its sensor isn't in hass.states. A sensor that was
 * picked and has since gone gets HA's own missing-entity warning, naming
 * the id the user has to look up (ha-alert brings role="alert"). Nothing
 * picked yet stays a neutral prompt to open the editor.
 */
export function renderMissingEntity(entity: string | undefined): TemplateResult {
  return entity
    ? html`<ha-alert alert-type="warning"
        >${localize("common.entity_unavailable", "{entity}", entity)}</ha-alert
      >`
    : html`<div class="empty-state" role="status">${localize("card.no_entity")}</div>`;
}
