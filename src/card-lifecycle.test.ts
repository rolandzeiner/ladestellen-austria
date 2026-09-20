// Unit tests for the lifecycle helpers shared by both cards and both
// editors.
//
// These bodies were duplicated across four files before this module
// existed. Each one carries a guard whose reason is not obvious from
// reading it, and those guards are what this suite pins down:
//
//  - shouldUpdateForEntityState returns TRUE on a missing previous hass
//    (conservative: render rather than risk a stale card)
//  - runVersionCheckOnce marks the element BEFORE awaiting, so a second
//    call during the in-flight probe cannot start a second one
//  - the isConnected check happens in the late callback, not up front,
//    so a probe resolving after the user navigated away writes nothing
//
// No DOM needed — the helpers take plain objects — so this runs in
// vitest's default node environment.

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  checkCardVersionWS,
  entitySuggestionFor,
  findStubEntity,
  runVersionCheckOnce,
  shouldUpdateForEntityState,
  syncCardLanguage,
} from "./card-lifecycle";
import { CARD_VERSION } from "./const";
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
    expect(
      findStubEntity(["light.kitchen", "sensor.ladestellen_austria"]),
    ).toBe("sensor.ladestellen_austria");
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
    expect(
      findStubEntity(["sensor.ladestellen_a", "sensor.ladestellen_b"]),
    ).toBe("sensor.ladestellen_a");
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
    const props = new Map<string, unknown>([
      ["hass", hassWith({ [entity]: stateA })],
    ]);
    const next = hassWith({ [entity]: stateB });
    expect(shouldUpdateForEntityState(props, next, entity)).toBe(true);
  });

  it("skips the update when the state object is the same reference", () => {
    // This is the whole point of the helper: HA hands the card a new
    // hass object constantly, but only an identity change on OUR entity
    // is worth a re-render.
    const props = new Map<string, unknown>([
      ["hass", hassWith({ [entity]: stateA })],
    ]);
    const next = hassWith({ [entity]: stateA });
    expect(shouldUpdateForEntityState(props, next, entity)).toBe(false);
  });

  it("compares by identity, not by value", () => {
    const props = new Map<string, unknown>([
      ["hass", hassWith({ [entity]: { state: "3" } })],
    ]);
    const next = hassWith({ [entity]: { state: "3" } });
    expect(shouldUpdateForEntityState(props, next, entity)).toBe(true);
  });
});

describe("checkCardVersionWS", () => {
  it("returns null when hass has no callWS", async () => {
    await expect(checkCardVersionWS(undefined)).resolves.toBeNull();
    await expect(
      checkCardVersionWS({} as HomeAssistant),
    ).resolves.toBeNull();
  });

  it("reports the backend version when it differs", async () => {
    const hass = {
      callWS: vi.fn().mockResolvedValue({ version: "9.9.9" }),
    } as unknown as HomeAssistant;
    await expect(checkCardVersionWS(hass)).resolves.toBe("9.9.9");
  });

  it("reports nothing when the versions agree", async () => {
    const hass = {
      callWS: vi.fn().mockResolvedValue({ version: CARD_VERSION }),
    } as unknown as HomeAssistant;
    await expect(checkCardVersionWS(hass)).resolves.toBeNull();
  });

  it("stays silent when the backend has no handler", async () => {
    // An older backend rejects the command; the cache-buster URL still
    // applies, so a transport error must not surface as a mismatch.
    const hass = {
      callWS: vi.fn().mockRejectedValue(new Error("unknown command")),
    } as unknown as HomeAssistant;
    await expect(checkCardVersionWS(hass)).resolves.toBeNull();
  });

  it("tolerates a response with no version field", async () => {
    const hass = {
      callWS: vi.fn().mockResolvedValue({}),
    } as unknown as HomeAssistant;
    await expect(checkCardVersionWS(hass)).resolves.toBeNull();
  });
});

describe("runVersionCheckOnce", () => {
  function host(over: Partial<{ hass: HomeAssistant; isConnected: boolean }> = {}) {
    return {
      hass: {
        callWS: vi.fn().mockResolvedValue({ version: "9.9.9" }),
      } as unknown as HomeAssistant,
      isConnected: true,
      ...over,
    };
  }

  /** Let the probe's promise chain settle. */
  const settle = () => new Promise((r) => setTimeout(r, 0));

  it("reports a mismatch through the callback", async () => {
    const h = host();
    const onMismatch = vi.fn();
    runVersionCheckOnce(h, onMismatch);
    await settle();
    expect(onMismatch).toHaveBeenCalledWith("9.9.9");
  });

  it("probes only once per element", async () => {
    const h = host();
    const onMismatch = vi.fn();
    runVersionCheckOnce(h, onMismatch);
    runVersionCheckOnce(h, onMismatch);
    runVersionCheckOnce(h, onMismatch);
    await settle();
    expect(h.hass.callWS).toHaveBeenCalledTimes(1);
    expect(onMismatch).toHaveBeenCalledTimes(1);
  });

  it("guards against a second probe while the first is in flight", async () => {
    // The element is marked before the await, so a synchronous second
    // call during the pending probe cannot start another.
    let release: (v: unknown) => void = () => {};
    const pending = new Promise((r) => {
      release = r;
    });
    const h = host({
      hass: {
        callWS: vi.fn().mockReturnValue(pending),
      } as unknown as HomeAssistant,
    });
    runVersionCheckOnce(h, vi.fn());
    runVersionCheckOnce(h, vi.fn());
    expect(h.hass.callWS).toHaveBeenCalledTimes(1);
    release({ version: "9.9.9" });
    await settle();
  });

  it("does nothing without hass, and stays retryable once it arrives", async () => {
    const h = host();
    const withoutHass = { ...h, hass: undefined };
    const onMismatch = vi.fn();
    runVersionCheckOnce(withoutHass, onMismatch);
    await settle();
    expect(onMismatch).not.toHaveBeenCalled();

    // The same element later gains hass — the probe must still fire,
    // which is why the no-hass path returns before marking it.
    const later = Object.assign(withoutHass, { hass: h.hass });
    runVersionCheckOnce(later, onMismatch);
    await settle();
    expect(onMismatch).toHaveBeenCalledWith("9.9.9");
  });

  it("does not write state onto a disconnected element", async () => {
    // The probe resolves after the user navigated away. Writing
    // _versionMismatch here would be a Lit update on a detached node.
    const h = host();
    const onMismatch = vi.fn();
    runVersionCheckOnce(h, onMismatch);
    h.isConnected = false;
    await settle();
    expect(onMismatch).not.toHaveBeenCalled();
  });

  it("keeps separate elements independent", async () => {
    const a = host();
    const b = host();
    const onA = vi.fn();
    const onB = vi.fn();
    runVersionCheckOnce(a, onA);
    runVersionCheckOnce(b, onB);
    await settle();
    expect(onA).toHaveBeenCalledWith("9.9.9");
    expect(onB).toHaveBeenCalledWith("9.9.9");
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
    const parking = entitySuggestionFor(
      "custom:ladestellen-austria-parking-card",
    );
    expect(parking(registry("ladestellen_austria"), "sensor.x")).toEqual({
      config: {
        type: "custom:ladestellen-austria-parking-card",
        entity: "sensor.x",
      },
    });
  });
});
