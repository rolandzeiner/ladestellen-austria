// Unit tests for the lifecycle helpers shared by both cards and both
// editors.
//
// These bodies were duplicated across four files before this module
// existed. Each one carries a guard whose reason is not obvious from
// reading it, and those guards are what this suite pins down:
//
//  - shouldUpdateForEntityState returns TRUE on a missing previous hass
//    (conservative: render rather than risk a stale card)
//  - ... and TRUE when only hass.language, the light or dark theme or the
//    time zone changed: none of them touches a state object
//
// No DOM needed — the helpers take plain objects — so this runs in
// vitest's default node environment.

import { beforeEach, describe, expect, it } from "vite-plus/test";

import {
  entitySuggestionFor,
  findStubEntity,
  shouldUpdateForEntityState,
  syncCardLanguage,
} from "./card-lifecycle";
import { localize, setLanguage } from "./localize/localize";
import type { HomeAssistant } from "./types";

/** PropertyValues is a Map; a plain Map is a faithful stand-in. */
function changed(...keys: string[]): Map<string, unknown> {
  return new Map(keys.map((k) => [k, undefined]));
}

function hassWith(states: Record<string, unknown>): HomeAssistant {
  return { states } as unknown as HomeAssistant;
}

describe("findStubEntity", () => {
  it("finds the integration's sensor", () => {
    expect(findStubEntity(["light.kitchen", "sensor.ladestellen_austria"])).toBe(
      "sensor.ladestellen_austria",
    );
  });

  it("requires both the sensor domain and the name fragment", () => {
    expect(findStubEntity(["binary_sensor.ladestelle_x"])).toBe("");
    expect(findStubEntity(["sensor.fuel_prices"])).toBe("");
  });

  it("returns an empty string rather than undefined when nothing matches", () => {
    // getStubConfig puts this straight into a config object; undefined
    // would serialise into the YAML as a missing key.
    expect(findStubEntity([])).toBe("");
  });

  it("takes the first match when several qualify", () => {
    expect(findStubEntity(["sensor.ladestellen_a", "sensor.ladestellen_b"])).toBe(
      "sensor.ladestellen_a",
    );
  });
});

describe("syncCardLanguage", () => {
  beforeEach(() => setLanguage("en"));

  it("pushes the language when hass changed", () => {
    const english = localize("common.loading");
    syncCardLanguage(changed("hass"), { language: "de" } as HomeAssistant);
    expect(localize("common.loading")).not.toBe(english);
  });

  it("does nothing when hass is not among the changed props", () => {
    const english = localize("common.loading");
    syncCardLanguage(changed("config"), { language: "de" } as HomeAssistant);
    expect(localize("common.loading")).toBe(english);
  });

  it("tolerates a missing hass", () => {
    expect(() => syncCardLanguage(changed("hass"), undefined)).not.toThrow();
  });
});

describe("shouldUpdateForEntityState", () => {
  const entity = "sensor.ladestellen_austria";
  const stateA = { state: "3" };
  const stateB = { state: "4" };

  it("updates when there is no previous hass", () => {
    // First render after mount — nothing to compare against, so render.
    const hass = hassWith({ [entity]: stateA });
    expect(shouldUpdateForEntityState(changed(), hass, entity)).toBe(true);
  });

  it("updates when no entity is configured", () => {
    const hass = hassWith({});
    const props = new Map<string, unknown>([["hass", hassWith({})]]);
    expect(shouldUpdateForEntityState(props, hass, undefined)).toBe(true);
    expect(shouldUpdateForEntityState(props, hass, "")).toBe(true);
  });

  it("updates when the entity's state object changed identity", () => {
    const props = new Map<string, unknown>([["hass", hassWith({ [entity]: stateA })]]);
    const next = hassWith({ [entity]: stateB });
    expect(shouldUpdateForEntityState(props, next, entity)).toBe(true);
  });

  it("skips the update when the state object is the same reference", () => {
    // This is the whole point of the helper: HA hands the card a new
    // hass object constantly, but only an identity change on OUR entity
    // is worth a re-render.
    const props = new Map<string, unknown>([["hass", hassWith({ [entity]: stateA })]]);
    const next = hassWith({ [entity]: stateA });
    expect(shouldUpdateForEntityState(props, next, entity)).toBe(false);
  });

  it("compares by identity, not by value", () => {
    const props = new Map<string, unknown>([["hass", hassWith({ [entity]: { state: "3" } })]]);
    const next = hassWith({ [entity]: { state: "3" } });
    expect(shouldUpdateForEntityState(props, next, entity)).toBe(true);
  });

  it("updates when only the language changed", () => {
    // A profile language switch hands over a new hass with the same state
    // objects; skipping it would leave the card in the old language.
    const prev = { ...hassWith({ [entity]: stateA }), language: "en" };
    const props = new Map<string, unknown>([["hass", prev]]);
    expect(shouldUpdateForEntityState(props, { ...prev, language: "de" }, entity)).toBe(true);
  });

  it("updates when only the theme switched between light and dark", () => {
    // The adaptive footer logo takes its silhouette from themes.darkMode.
    const prev = { ...hassWith({ [entity]: stateA }), themes: { darkMode: false } };
    const props = new Map<string, unknown>([["hass", prev]]);
    expect(shouldUpdateForEntityState(props, { ...prev, themes: { darkMode: true } }, entity)).toBe(
      true,
    );
    expect(
      shouldUpdateForEntityState(props, { ...prev, themes: { darkMode: false } }, entity),
    ).toBe(false);
  });

  it("updates when only the time zone changed", () => {
    // "Open now" is judged in HA's zone.
    const prev = { ...hassWith({ [entity]: stateA }), config: { time_zone: "Europe/Vienna" } };
    const props = new Map<string, unknown>([["hass", prev]]);
    expect(
      shouldUpdateForEntityState(props, { ...prev, config: { time_zone: "Asia/Tokyo" } }, entity),
    ).toBe(true);
  });
});

describe("entitySuggestionFor", () => {
  const suggest = entitySuggestionFor("custom:ladestellen-austria-card");
  const registry = (platform: string) =>
    ({
      entities: { "sensor.x": { platform } },
    }) as unknown as HomeAssistant;

  it("suggests the card for one of our own sensors", () => {
    expect(suggest(registry("ladestellen_austria"), "sensor.x")).toEqual({
      config: { type: "custom:ladestellen-austria-card", entity: "sensor.x" },
    });
  });

  it("declines an entity from another integration", () => {
    // Without the platform check the card would offer itself for every
    // sensor in the user's install.
    expect(suggest(registry("tankstellen_austria"), "sensor.x")).toBeNull();
  });

  it("declines a non-sensor domain", () => {
    const hass = {
      entities: { "light.x": { platform: "ladestellen_austria" } },
    } as unknown as HomeAssistant;
    expect(suggest(hass, "light.x")).toBeNull();
  });

  it("declines when the entity is not in the registry at all", () => {
    expect(suggest({} as HomeAssistant, "sensor.x")).toBeNull();
    expect(suggest(registry("ladestellen_austria"), "sensor.absent")).toBeNull();
  });

  it("carries the card type it was built for", () => {
    const parking = entitySuggestionFor("custom:ladestellen-austria-parking-card");
    expect(parking(registry("ladestellen_austria"), "sensor.x")).toEqual({
      config: {
        type: "custom:ladestellen-austria-parking-card",
        entity: "sensor.x",
      },
    });
  });
});
