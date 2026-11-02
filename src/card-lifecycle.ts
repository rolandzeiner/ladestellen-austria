// Lifecycle helpers shared by both cards and both editors.
//
// Each carries a guard whose reason is not obvious from the code (the
// isConnected check, the `!prev` early return, the
// set-the-flag-before-awaiting ordering), so they live once, here: a
// guard copied per class is a guard that gets fixed in one place and
// left wrong in the others.
//
// `checkCardVersionWS` lives here rather than in shared-render.ts
// because it is a lifecycle concern, not a render one.

import type { PropertyValues } from "lit";

import type { HomeAssistant } from "./types";
import { CARD_VERSION } from "./const";
import { setLanguage } from "./localize/localize";

/** The integration's domain, as the entity registry reports it. */
const INTEGRATION_DOMAIN = "ladestellen_austria";

/**
 * Probe the backend's card-version WebSocket command. Returns the
 * server-reported version when it differs from CARD_VERSION (i.e.
 * banner should appear), or null otherwise. Silent on transport error
 * — older HA installs without the handler simply don't surface a
 * mismatch, which is correct (cache-buster URL still applies).
 */
export async function checkCardVersionWS(hass: HomeAssistant | undefined): Promise<string | null> {
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
 * entity, or the UI language changed — conservative on purpose.
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

// Elements whose version probe has already been started. A WeakSet so
// the entry is collected with the element; it is added *before* the
// await, so a second call during the in-flight probe is a no-op.
const versionCheckStarted = new WeakSet();

/**
 * Fire the WS card-version probe at most once per element.
 *
 * Call from both `firstUpdated` and `updated` — the first covers the
 * normal mount, the second covers `hass` arriving after the first
 * update, and the once-guard makes the double call harmless.
 *
 * `isConnected` is checked inside the late callback so the probe can
 * never write state onto an element the user already navigated away
 * from.
 */
export function runVersionCheckOnce(
  // `hass` is `?: ... | undefined`, not just `?:`: under
  // exactOptionalPropertyTypes an optional-only property may be omitted
  // but may not hold `undefined`, and a card genuinely holds an undefined
  // `hass` before HA assigns it — which is the case the guard below
  // exists for.
  host: { hass?: HomeAssistant | undefined; isConnected: boolean },
  onMismatch: (version: string) => void,
): void {
  if (!host.hass || versionCheckStarted.has(host)) return;
  versionCheckStarted.add(host);
  void checkCardVersionWS(host.hass).then((mismatch) => {
    if (host.isConnected && mismatch) onMismatch(mismatch);
  });
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
    if (hass?.entities?.[entityId]?.platform !== INTEGRATION_DOMAIN) {
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
