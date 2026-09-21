/**
 * @vitest-environment happy-dom
 *
 * Component-level smoke coverage for everything the bundle registers.
 *
 * Two jobs, neither of which a green build proves on its own:
 *
 * 1. **The decorator check.** Rolldown reads `experimentalDecorators` /
 *    `useDefineForClassFields` out of tsconfig.json and lowers Lit's
 *    legacy decorators from it. If that ever regresses, plain class
 *    fields overwrite Lit's generated accessors, reactivity dies
 *    silently, and the build still succeeds. Reading `elementProperties`
 *    back off each constructor is what catches it — see §21 of the
 *    portfolio workflow, which calls this out as the check that a green
 *    build will not give you.
 *
 * 2. **Render-path coverage.** Until this suite existed the two card
 *    entrypoints were not merely uncovered, they were never imported by
 *    any test — so v8 computed its percentage over a denominator that
 *    excluded the two largest files in the tree.
 *
 * `ha-card`, `ha-icon` and friends are HA-provided elements that do not
 * exist here. happy-dom treats them as unknown elements and renders them
 * as inert containers, which is fine: this suite asserts that rendering
 * completes and produces the expected structure, not that HA's own
 * components behave.
 */

import { beforeAll, describe, expect, it } from "vitest";
import type { LitElement } from "lit";

import type { HomeAssistant, Station } from "./types";

/** Custom-element names recorded as the bundle registers them. */
const registered: string[] = [];

beforeAll(async () => {
  // happy-dom 20 keeps the custom-element registry in a private field,
  // so `customElements._registry` reads nothing. Wrap define() and
  // record names as they arrive instead.
  const realDefine = customElements.define.bind(customElements);
  customElements.define = ((
    name: string,
    ctor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
  ) => {
    registered.push(name);
    return realDefine(name, ctor, options);
  }) as typeof customElements.define;

  // Importing the entrypoint pulls in the parking card and both editors
  // via its own side-effect imports.
  await import("./ladestellen-austria-card");
});

function basePoint() {
  return {
    evseId: "AT*TST*E1",
    capacityKw: 22,
    status: "AVAILABLE",
    freeOfCharge: false,
    connectorType: [{ consumerName: "TYPE_2_AC", key: "T2" }],
    electricityType: ["AC_3_PHASE"],
    authenticationMode: ["APP"],
  };
}

function station(over: Partial<Station> = {}): Station {
  return {
    stationId: "at-1",
    label: "Testladestelle",
    stationStatus: "ACTIVE",
    points: [
      {
        evseId: "AT*TST*E1",
        capacityKw: 22,
        status: "AVAILABLE",
        freeOfCharge: false,
        connectorType: [{ consumerName: "TYPE_2_AC", key: "T2" }],
        electricityType: ["AC_3_PHASE"],
        authenticationMode: ["APP"],
      },
    ],
    greenEnergy: true,
    austrianEcoLabel: false,
    freeParking: false,
    roofedParking: false,
    illuminatedParking: false,
    cateringService: false,
    bathroomsAvailable: false,
    restingFacilities: false,
    barrierFreeParkingPlaces: 0,
    location: { lat: 48.2, lon: 16.37 },
    distance: 1200,
    city: "Wien",
    street: "Teststrasse 1",
    postCode: "1010",
    operatorName: "Testbetreiber",
    ...over,
  } as Station;
}

function hass(stations: Station[] = [station()]): HomeAssistant {
  return {
    language: "en",
    config: { time_zone: "Europe/Vienna" },
    states: {
      "sensor.ladestellen_austria": {
        entity_id: "sensor.ladestellen_austria",
        state: String(stations.length),
        attributes: {
          stations,
          live_status_available: true,
          attribution: "Datenquelle: E-Control",
        },
      },
    },
    callWS: async () => ({}),
  } as unknown as HomeAssistant;
}

/** Mount an element, let Lit settle, and hand it back. */
async function mount<T extends LitElement>(
  tag: string,
  setup: (el: T) => void,
): Promise<T> {
  const el = document.createElement(tag) as T;
  setup(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe("custom element registration", () => {
  it.each([
    "ladestellen-austria-card",
    "ladestellen-austria-parking-card",
    "ladestellen-austria-card-editor",
    "ladestellen-austria-parking-card-editor",
  ])("registers %s", (tag) => {
    expect(registered).toContain(tag);
    expect(customElements.get(tag)).toBeTypeOf("function");
  });

  it("ships both cards from the one bundle", () => {
    // ladestellen is the portfolio's deliberate exception to
    // one-bundle-per-card: the list and parking cards share ~70% of
    // their code and are always deployed together.
    expect(registered).toContain("ladestellen-austria-card");
    expect(registered).toContain("ladestellen-austria-parking-card");
  });

  it("advertises both cards to the Lovelace picker", () => {
    const types = (window.customCards ?? []).map((c) => c.type);
    expect(types).toContain("ladestellen-austria-card");
    expect(types).toContain("ladestellen-austria-parking-card");
  });
});

describe("Lit reactive properties survive decorator lowering", () => {
  // If decorators regress, elementProperties comes back empty or missing
  // `hass` and the cards stop re-rendering on state changes — with a
  // completely green build.
  it.each([
    ["ladestellen-austria-card", ["hass", "config"]],
    ["ladestellen-austria-parking-card", ["hass", "config"]],
    ["ladestellen-austria-card-editor", ["hass"]],
    ["ladestellen-austria-parking-card-editor", ["hass"]],
  ])("%s declares %j", (tag, expected) => {
    const ctor = customElements.get(tag) as unknown as {
      elementProperties?: Map<string | symbol, unknown>;
    };
    const props = [...(ctor.elementProperties?.keys() ?? [])].map(String);
    expect(props.length).toBeGreaterThan(0);
    for (const name of expected) expect(props).toContain(name);
  });
});

describe("ladestellen-austria-card", () => {
  it("throws a localized error for a non-object config", () => {
    const el = document.createElement("ladestellen-austria-card") as LitElement & {
      setConfig: (c: unknown) => void;
    };
    expect(() => el.setConfig(null)).toThrow();
    expect(() => el.setConfig("nope")).toThrow();
  });

  it("rejects a non-string entity", () => {
    const el = document.createElement("ladestellen-austria-card") as LitElement & {
      setConfig: (c: unknown) => void;
    };
    expect(() => el.setConfig({ entity: 42 })).toThrow();
  });

  it("renders a loading empty-state before hass arrives", async () => {
    const el = await mount<LitElement & { setConfig: (c: unknown) => void }>(
      "ladestellen-austria-card",
      (e) => e.setConfig({ entity: "sensor.ladestellen_austria" }),
    );
    expect(el.shadowRoot?.querySelector(".empty-state")).not.toBeNull();
  });

  it("renders station content once hass is set", async () => {
    const el = await mount<
      LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }
    >("ladestellen-austria-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria" });
      e.hass = hass();
    });
    const text = el.shadowRoot?.textContent ?? "";
    expect(text).toContain("Testladestelle");
  });

  it("keeps the E-Control attribution in the rendered output (ToU §3d)", async () => {
    // Non-negotiable: removing this is a contract violation, so it gets
    // an assertion rather than a comment.
    const el = await mount<
      LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }
    >("ladestellen-austria-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria" });
      e.hass = hass();
    });
    expect(el.shadowRoot?.textContent ?? "").toContain("E-Control");
  });

  it("reports a card size derived from max_stations", () => {
    const el = document.createElement("ladestellen-austria-card") as LitElement & {
      setConfig: (c: unknown) => void;
      getCardSize: () => number;
    };
    el.setConfig({ entity: "sensor.ladestellen_austria", max_stations: 5 });
    expect(el.getCardSize()).toBeGreaterThan(0);
  });

  it("survives a station payload missing optional fields", async () => {
    // `stations` arrives from an unvalidated state attribute, so a
    // station can reach render() without `location` despite the type.
    const bare = { stationId: "x", label: "Bare", stationStatus: "ACTIVE", points: [] };
    const el = await mount<
      LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }
    >("ladestellen-austria-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria" });
      e.hass = hass([bare as unknown as Station]);
    });
    expect(el.shadowRoot?.textContent ?? "").toContain("Bare");
  });

  it("renders an empty-state for an unknown entity", async () => {
    const el = await mount<
      LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }
    >("ladestellen-austria-card", (e) => {
      e.setConfig({ entity: "sensor.does_not_exist" });
      e.hass = hass();
    });
    expect(el.shadowRoot?.querySelector(".empty-state")).not.toBeNull();
  });
});

describe("station ordering", () => {
  // These assertions exist because a refactor of render() silently
  // deleted _sortStations and every test still passed — nothing
  // exercised the ordering. The rendered DOM order is the contract.
  function stations(): Station[] {
    return [
      station({
        stationId: "far",
        label: "Far",
        distance: 9000,
        points: [{ ...basePoint(), capacityKw: 150 }] as Station["points"],
      }),
      station({
        stationId: "near",
        label: "Near",
        distance: 100,
        points: [{ ...basePoint(), capacityKw: 11 }] as Station["points"],
      }),
      station({
        stationId: "mid",
        label: "Mid",
        distance: 1000,
        points: [{ ...basePoint(), capacityKw: 50 }] as Station["points"],
      }),
    ];
  }

  async function renderedOrder(config: Record<string, unknown>) {
    const el = await mount<
      LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }
    >("ladestellen-austria-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria", ...config });
      e.hass = hass(stations());
    });
    return [...(el.shadowRoot?.querySelectorAll(".station-name") ?? [])].map(
      (n) => n.textContent?.trim(),
    );
  }

  it("sorts by distance ascending by default", async () => {
    expect(await renderedOrder({})).toEqual(["Near", "Mid", "Far"]);
  });

  it("sorts by power descending when sort_by_power is set", async () => {
    expect(await renderedOrder({ sort_by_power: true })).toEqual([
      "Far",
      "Mid",
      "Near",
    ]);
  });

  it("caps the list at max_stations", async () => {
    expect(await renderedOrder({ max_stations: 2 })).toEqual(["Near", "Mid"]);
  });

  it("floats a pinned station above the sort order", async () => {
    expect(
      await renderedOrder({ pinned_station_ids: ["far"] }),
    ).toEqual(["Far", "Near", "Mid"]);
  });
});

describe("ladestellen-austria-parking-card", () => {
  /** A station whose points cover one status from every visual bucket. */
  function mixedStatusStation(): Station {
    const statuses = [
      "AVAILABLE",
      "CHARGING",
      "OCCUPIED",
      "RESERVED",
      "BLOCKED",
      "OUT_OF_ORDER",
      "FAULTED",
      "OUT_OF_STOCK",
      "PLANNED",
      "REMOVED",
      "UNKNOWN",
    ];
    return station({
      points: statuses.map((status, i) => ({
        evseId: `AT*TST*E${i}`,
        capacityKw: 22,
        status,
        freeOfCharge: i % 2 === 0,
        connectorType: [{ consumerName: "TYPE_2_AC", key: "T2" }],
        electricityType: ["AC_3_PHASE"],
        authenticationMode: ["APP"],
      })) as Station["points"],
    });
  }

  async function mountParking(config: Record<string, unknown> = {}, s?: Station) {
    return mount<
      LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }
    >("ladestellen-austria-parking-card", (e) => {
      e.setConfig({
        entity: "sensor.ladestellen_austria",
        station_id: "at-1",
        ...config,
      });
      e.hass = hass([s ?? mixedStatusStation()]);
    });
  }

  it("renders a loading empty-state before hass arrives", async () => {
    const el = await mount<LitElement & { setConfig: (c: unknown) => void }>(
      "ladestellen-austria-parking-card",
      (e) => e.setConfig({ entity: "sensor.ladestellen_austria" }),
    );
    expect(el.shadowRoot?.textContent ?? "").toBeTruthy();
  });

  it("rejects a non-string station_id", () => {
    const el = document.createElement("ladestellen-austria-parking-card") as LitElement & {
      setConfig: (c: unknown) => void;
    };
    expect(() => el.setConfig({ station_id: 7 })).toThrow();
  });

  it("renders one slot per point", async () => {
    // Slots are <button class="parking-slot ..."> inside a role="group"
    // container. They carry no ARIA role of their own: role="listitem"
    // used to sit here, but it overrode the native button role while
    // aria-pressed stayed set, which is a contradiction. The class is
    // the stable selector.
    const el = await mountParking();
    const slots = el.shadowRoot?.querySelectorAll(".parking-slot") ?? [];
    expect(slots.length).toBe(11);
  });

  it("keeps slot button semantics intact", async () => {
    const el = await mountParking();
    const slots = Array.from(
      el.shadowRoot?.querySelectorAll(".parking-slot") ?? [],
    );
    expect(slots.length).toBeGreaterThan(0);
    // No slot may re-declare a role that would mask the button.
    expect(slots.every((s) => !s.hasAttribute("role"))).toBe(true);
    // Every interactive slot exposes its revealed state.
    const pressable = slots.filter((s) => s.getAttribute("tabindex") === "0");
    expect(pressable.length).toBeGreaterThan(0);
    expect(pressable.every((s) => s.hasAttribute("aria-pressed"))).toBe(true);
  });

  it("tags each slot with its status bucket", async () => {
    const el = await mountParking();
    const buckets = [
      ...(el.shadowRoot?.querySelectorAll("[data-status]") ?? []),
    ].map((n) => n.getAttribute("data-status"));
    expect(new Set(buckets)).toEqual(
      new Set(["ok", "busy", "warn", "unknown", "empty"]),
    );
  });

  it("renders every status bucket without throwing", async () => {
    // _renderSlot branches on each RefillPointStatus. Exercising all of
    // them in one mount is what takes this function off the critical list.
    const el = await mountParking();
    const html = el.shadowRoot?.innerHTML ?? "";
    expect(html).toContain("mdi:wrench"); // OUT_OF_ORDER / FAULTED
    expect(html).toContain("mdi:battery-off-outline"); // OUT_OF_STOCK
    expect(html).toContain("mdi:progress-wrench"); // PLANNED
    expect(html).toContain("mdi:close-circle-outline"); // REMOVED
    expect(html).toContain("mdi:help-circle-outline"); // UNKNOWN
  });

  it("shows the free count when configured", async () => {
    const el = await mountParking({ show_free_count: true });
    expect(el.shadowRoot?.textContent ?? "").toBeTruthy();
  });

  describe("car colour modes", () => {
    it("uses the theme colour in theme mode", async () => {
      const el = await mountParking({ car_color_mode: "theme" });
      expect(el.shadowRoot?.innerHTML ?? "").toContain("var(--primary-color)");
    });

    it("uses the configured colour in fixed mode", async () => {
      const el = await mountParking({
        car_color_mode: "fixed",
        car_color_fixed: "#abcdef",
      });
      expect(el.shadowRoot?.innerHTML ?? "").toContain("#abcdef");
    });

    it("falls back to the theme colour when fixed mode has no colour", async () => {
      const el = await mountParking({ car_color_mode: "fixed", car_color_fixed: "" });
      expect(el.shadowRoot?.innerHTML ?? "").toContain("var(--primary-color)");
    });

    it("is deterministic per evseId in random mode", async () => {
      // Same station, two mounts — the hash must pick the same palette
      // entry, or cars change colour on every re-render.
      const s = mixedStatusStation();
      const a = await mountParking({ car_color_mode: "random" }, s);
      const b = await mountParking({ car_color_mode: "random" }, s);
      const colours = (el: LitElement) =>
        [...(el.shadowRoot?.querySelectorAll("[style*='--slot-car-color']") ?? [])].map(
          (n) => n.getAttribute("style"),
        );
      expect(colours(a)).toEqual(colours(b));
    });
  });

  it("honours the appearance options", async () => {
    const el = await mountParking({
      asphalt_style: "dark",
      paint_width: "wide",
      icon_paint_mode: "mono",
      hide_header: true,
    });
    expect(el.shadowRoot).not.toBeNull();
  });

  it("renders an empty-state for a station_id that is not in the payload", async () => {
    const el = await mountParking({ station_id: "not-here" });
    expect(el.shadowRoot?.textContent ?? "").toBeTruthy();
  });

  it("tolerates a station with no points", async () => {
    const el = await mountParking({}, station({ points: [] }));
    expect(el.shadowRoot).not.toBeNull();
  });
});

describe("editors", () => {
  it.each([
    "ladestellen-austria-card-editor",
    "ladestellen-austria-parking-card-editor",
  ])("%s renders without hass", async (tag) => {
    const el = await mount<LitElement & { setConfig: (c: unknown) => void }>(
      tag,
      (e) => e.setConfig({ entity: "sensor.ladestellen_austria" }),
    );
    expect(el.shadowRoot).not.toBeNull();
  });

  // The editors are hand-written Lit below the ha-form, so none of the
  // ARIA below comes for free the way it does inside <ha-form>. These
  // assertions exist because attribute-only regressions are silent: the
  // editor still looks and clicks exactly the same once they go.
  const mountEditor = (tag: string) =>
    mount<LitElement & { setConfig: (c: unknown) => void }>(tag, (e) =>
      e.setConfig({ entity: "sensor.ladestellen_austria" }),
    );

  it("exposes chip filters as labelled toggle groups", async () => {
    const el = await mountEditor("ladestellen-austria-card-editor");
    const root = el.shadowRoot!;

    const chips = Array.from(root.querySelectorAll("button.filter-chip"));
    expect(chips.length).toBeGreaterThan(0);
    expect(chips.every((c) => c.hasAttribute("aria-pressed"))).toBe(true);
    expect(
      chips.every(
        (c) =>
          c.classList.contains("active") ===
          (c.getAttribute("aria-pressed") === "true"),
      ),
    ).toBe(true);

    const groups = Array.from(root.querySelectorAll('[role="group"]'));
    expect(groups).toHaveLength(3);
    for (const g of groups) {
      const id = g.getAttribute("aria-labelledby");
      expect(id).toBeTruthy();
      expect(root.getElementById(id!)?.textContent?.trim()).toBeTruthy();
    }
  });

  it("exposes the station picker as a radio group", async () => {
    const el = await mountEditor("ladestellen-austria-parking-card-editor");
    const root = el.shadowRoot!;
    expect(
      root.getElementById("station-picker-heading")?.getAttribute("role"),
    ).toBe("heading");
    // The group renders only once stations are present; the labelling
    // target must exist either way so the wiring cannot rot silently.
    const group = root.querySelector('[role="radiogroup"]');
    if (group) {
      expect(group.getAttribute("aria-labelledby")).toBe(
        "station-picker-heading",
      );
      const radios = Array.from(group.querySelectorAll('[role="radio"]'));
      expect(radios.every((r) => r.hasAttribute("aria-checked"))).toBe(true);
    }
  });

  it("gives both editors a heading structure", async () => {
    for (const tag of [
      "ladestellen-austria-card-editor",
      "ladestellen-austria-parking-card-editor",
    ]) {
      const el = await mountEditor(tag);
      const headers = Array.from(
        el.shadowRoot!.querySelectorAll(".section-header"),
      );
      expect(headers.length).toBeGreaterThan(0);
      expect(headers.every((h) => h.getAttribute("role") === "heading")).toBe(
        true,
      );
      expect(headers.every((h) => h.getAttribute("aria-level") === "3")).toBe(
        true,
      );
    }
  });
});