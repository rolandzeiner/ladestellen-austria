// Lifecycle helpers shared by both cards and both editors.
//
// Each carries a guard whose reason is not obvious from the code (the
// isConnected check, the `!prev` early return, the
// set-the-flag-before-awaiting ordering), so they live once, here: a
// guard copied per class is a guard that gets fixed in one place and
// left wrong in the others.

import type { PropertyValues } from "lit";

import type { HomeAssistant } from "./types";
import { DOMAIN } from "./const";
import { setLanguage } from "./localize/localize";

/**
 * Push `hass.language` into the localize() helper when hass changes.
 *
 * Call from `willUpdate`, never from `render` — Lit forbids side effects
 * in render. Gating on the changedProps key keeps it from re-pushing on
 * every unrelated re-render.
 */
export function syncCardLanguage(
  changedProps: PropertyValues,
  hass: HomeAssistant | undefined,
): void {
  if (changedProps.has("hass")) {
    setLanguage(hass?.language);
  }
}

/**
 * The `shouldUpdate` tail both cards share: re-render only when the
 * configured entity's state object actually changed identity.
 *
 * Returns true (update) when there is no previous hass, no configured
 * entity, or something else the cards read off hass changed (the UI
 * language, light or dark theme, the time zone) — conservative on purpose.
 */
export function shouldUpdateForEntityState(
  changedProps: PropertyValues,
  hass: HomeAssistant,
  entity: string | undefined,
): boolean {
  const prev = changedProps.get("hass") as HomeAssistant | undefined;
  if (!prev || !entity) return true;
  // A language switch changes no entity state; without this the card keeps
  // the old language until its sensor next updates.
  if (prev.language !== hass.language) return true;
  // Nor does a switch between a light and a dark theme, which picks the
  // footer logo's silhouette when logo_adapt_to_theme is on.
  if (prev.themes?.darkMode !== hass.themes?.darkMode) return true;
  // Opening hours are judged in HA's time zone.
  if (prev.config?.time_zone !== hass.config?.time_zone) return true;
  return prev.states[entity] !== hass.states[entity];
}

/**
 * Pick a sensible default entity for a card's `getStubConfig`. Both
 * cards look for the same thing, and the `"ladestelle"` substring is a
 * magic value that must not drift between them.
 */
export function findStubEntity(entities: string[]): string {
  return entities.find((e) => e.startsWith("sensor.") && e.includes("ladestelle")) ?? "";
}

/**
 * Build the `getEntitySuggestion` callback for a card's
 * `window.customCards` entry (HA 2026.6 entity-first picker).
 *
 * Suggest a card only for this integration's own sensor entities,
 * judged by the entity registry's `platform`. Built once here so the
 * `"ladestellen_austria"` platform string is not repeated per card — a
 * magic value that silently stops matching if the domain is renamed in
 * one place and not the other.
 */
export function entitySuggestionFor(cardType: `custom:${string}`): (
  hass: HomeAssistant,
  entityId: string,
) => {
  config: { type: string; entity: string };
} | null {
  return (hass: HomeAssistant, entityId: string) => {
    if (!entityId.startsWith("sensor.")) return null;
    if (hass?.entities?.[entityId]?.platform !== DOMAIN) {
      return null;
    }
    return { config: { type: cardType, entity: entityId } };
  };
}

/**
 * Whether a card sits in a sections cell with a set number of rows, where
 * its height is fixed. Stored grid_options win over getGridOptions(), so
 * this tests the rows in force (`stored ?? defaultRows`), not only the
 * stored ones. Outside a sections cell (masonry, a stack, the picker) the
 * card takes its natural height.
 */
export function isFixedHeight(
  layout: string | undefined,
  gridOptions: unknown,
  defaultRows: number | "auto",
): boolean {
  if (layout !== "grid") return false;
  const stored = (gridOptions as { rows?: unknown } | undefined)?.rows;
  return typeof (stored ?? defaultRows) === "number";
}
