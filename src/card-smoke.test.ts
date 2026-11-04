/**
 * @vitest-environment happy-dom
 *
 * Component-level smoke coverage for everything the bundle registers.
 *
 * Two jobs, neither of which a green build proves on its own:
 *
 * 1. **The decorator check.** The build (Rolldown) and this suite (Vite's
 *    Oxc transform) both read `experimentalDecorators` /
 *    `useDefineForClassFields` out of tsconfig.json and lower Lit's
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

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import type { LitElement } from "lit";

import { localize } from "./localize/localize";
import type { HomeAssistant, Station } from "./types";

/** Custom-element names recorded as the bundle registers them. */
const registered: string[] = [];

beforeAll(async () => {
  // happy-dom 20 keeps the custom-element registry in a private field,
  // so `customElements._registry` reads nothing. Wrap define() and
  // record names as they arrive instead.
  const realDefine = customElements.define.bind(customElements);
  customElements.define = (
    name: string,
    ctor: CustomElementConstructor,
    options?: ElementDefinitionOptions,
  ) => {
    registered.push(name);
    return realDefine(name, ctor, options);
  };

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

/**
 * The sensor as Home Assistant shows it while E-Control can't be reached:
 * `unavailable`, with none of the integration's attributes left on it.
 */
function unavailableHass(): HomeAssistant {
  return {
    ...hass(),
    states: {
      "sensor.ladestellen_austria": {
        entity_id: "sensor.ladestellen_austria",
        state: "unavailable",
        attributes: { friendly_name: "Ladestellen Austria" },
      },
    },
  };
}

/** Mount an element, let Lit settle, and hand it back. */
async function mount<T extends LitElement>(tag: string, setup: (el: T) => void): Promise<T> {
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

  // The grid-cell rules in styles.ts select on the layout attribute, which
  // exists only if the property reflects (grid-cell.test.ts).
  it.each(["ladestellen-austria-card", "ladestellen-austria-parking-card"])(
    "%s reflects layout",
    (tag) => {
      const ctor = customElements.get(tag) as unknown as typeof LitElement;
      expect(ctor.getPropertyOptions("layout").reflect).toBe(true);
    },
  );

  it.each(["ladestellen-austria-card", "ladestellen-austria-parking-card"])(
    "%s reflects a layout that arrives with an unchanged entity",
    async (tag) => {
      const el = await mount<
        LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant; layout?: string }
      >(tag, (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria", station_id: "at-1" });
        e.hass = hass();
      });
      // A new hass whose entity state is the same object is the cycle that
      // shouldUpdate would otherwise skip.
      el.hass = { ...el.hass };
      el.layout = "grid";
      await el.updateComplete;
      expect(el.getAttribute("layout")).toBe("grid");
    },
  );

  // ha-card.fixed-height turns .wrap into the scroller (styles.ts). It is
  // set only for a sections cell whose rows in force are a number.
  it.each([
    ["ladestellen-austria-card", "grid", { rows: 4 }, true],
    ["ladestellen-austria-card", "grid", { rows: "auto" }, false],
    ["ladestellen-austria-card", "grid", undefined, false],
    ["ladestellen-austria-card", undefined, { rows: 4 }, false],
    ["ladestellen-austria-parking-card", "grid", { rows: 4 }, true],
    ["ladestellen-austria-parking-card", "grid", undefined, false],
  ])(
    "%s with layout %s and grid_options %j is fixed-height: %s",
    async (tag, layout, grid, fixed) => {
      const el = await mount<
        LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant; layout?: string }
      >(tag, (e) => {
        e.setConfig({
          entity: "sensor.ladestellen_austria",
          station_id: "at-1",
          ...(grid ? { grid_options: grid } : {}),
        });
        e.hass = hass();
        if (layout) e.layout = layout;
      });
      expect(el.shadowRoot!.querySelector("ha-card")!.classList.contains("fixed-height")).toBe(
        fixed,
      );
    },
  );
});

describe("ladestellen-austria-card", () => {
  it("throws a localized error for a non-object config", () => {
    const el = document.createElement("ladestellen-austria-card") as LitElement & {
      setConfig: (c: unknown) => void;
    };
    expect(() => el.setConfig(null)).toThrow(localize("common.invalid_configuration"));
    expect(() => el.setConfig("nope")).toThrow(localize("common.invalid_configuration"));
  });

  it("rejects a non-string entity", () => {
    const el = document.createElement("ladestellen-austria-card") as LitElement & {
      setConfig: (c: unknown) => void;
    };
    expect(() => el.setConfig({ entity: 42 })).toThrow(localize("common.invalid_entity"));
  });

  it("renders a loading empty-state before hass arrives", async () => {
    const el = await mount<LitElement & { setConfig: (c: unknown) => void }>(
      "ladestellen-austria-card",
      (e) => e.setConfig({ entity: "sensor.ladestellen_austria" }),
    );
    expect(el.shadowRoot?.querySelector(".empty-state")).not.toBeNull();
  });

  it("renders station content once hass is set", async () => {
    const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-card",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria" });
        e.hass = hass();
      },
    );
    const text = el.shadowRoot?.textContent ?? "";
    expect(text).toContain("Testladestelle");
  });

  it("keeps the E-Control attribution in the rendered output (ToU §3d)", async () => {
    // Non-negotiable: removing this is a contract violation, so it gets
    // an assertion rather than a comment.
    const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-card",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria" });
        e.hass = hass();
      },
    );
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
    const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-card",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria" });
        e.hass = hass([bare as unknown as Station]);
      },
    );
    expect(el.shadowRoot?.textContent ?? "").toContain("Bare");
  });
});

describe("edit-dialog preview", () => {
  type Card = LitElement & {
    setConfig: (c: unknown) => void;
    hass: HomeAssistant;
    preview: boolean;
  };
  it.each(["ladestellen-austria-card", "ladestellen-austria-parking-card"])(
    "%s keeps the version banner out of the preview",
    async (tag) => {
      const el = await mount<Card>(tag, (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria", station_id: "at-1" });
        e.hass = hass();
      });
      (el as unknown as { _versionMismatch: string | null })._versionMismatch = "9.9.9";
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector(".version-notice")).not.toBeNull();

      el.preview = true;
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector(".version-notice")).toBeNull();
    },
  );
});

describe("missing sensor", () => {
  const cards = ["ladestellen-austria-card", "ladestellen-austria-parking-card"];
  const mountWith = (tag: string, entity?: string) =>
    mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(tag, (e) => {
      e.setConfig(entity ? { entity, station_id: "at-1" } : { station_id: "at-1" });
      e.hass = hass();
    });

  it.each(cards)("%s names a configured sensor that is gone in a warning", async (tag) => {
    const el = await mountWith(tag, "sensor.does_not_exist");
    const alert = el.shadowRoot!.querySelector("ha-alert");
    expect(alert?.getAttribute("alert-type")).toBe("warning");
    expect(alert?.textContent?.trim()).toBe("Entity not available: sensor.does_not_exist");
    expect(el.shadowRoot!.querySelector(".empty-state")).toBeNull();
  });

  it.each(cards)("%s keeps a neutral prompt when nothing is picked yet", async (tag) => {
    const el = await mountWith(tag);
    expect(el.shadowRoot!.querySelector("ha-alert")).toBeNull();
    expect(el.shadowRoot!.querySelector('.empty-state[role="status"]')).not.toBeNull();
  });
});

// An outage used to read as "No stations match the current filters", and
// every pin turned into a "not in range" row offering to unpin it, so a dead
// API looked like a broken setup and invited the user to undo their config.
describe("unreachable notice", () => {
  type Card = LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant };

  const mountList = (h: HomeAssistant, config: Record<string, unknown> = {}) =>
    mount<Card>("ladestellen-austria-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria", ...config });
      e.hass = h;
    });

  it("says it can't reach E-Control when the sensor is unavailable", async () => {
    const el = await mountList(unavailableHass());
    const notice = el.shadowRoot?.querySelector(".unreachable");
    expect(notice?.querySelector(".unreachable-title")?.textContent?.trim()).toBe(
      "Can't reach E-Control",
    );
    expect(notice?.getAttribute("role")).toBe("status");
    expect(el.shadowRoot?.textContent ?? "").not.toContain("No stations match");
  });

  it("hides pinned stations instead of offering to unpin them", async () => {
    const el = await mountList(unavailableHass(), { pinned_station_ids: ["at-1", "at-2"] });
    expect(el.shadowRoot?.querySelector(".is-orphan")).toBeNull();
    expect(el.shadowRoot?.querySelector("ha-icon-button")).toBeNull();
    expect(el.shadowRoot?.textContent ?? "").not.toContain("Pinned station not in range");
  });

  it("keeps the E-Control attribution while unavailable (ToU §3d)", async () => {
    const el = await mountList(unavailableHass());
    expect(el.shadowRoot?.querySelector(".attribution-text")?.textContent).toContain(
      "Datenquelle: E-Control",
    );
  });

  it("still says no stations match for an available, empty result", async () => {
    const el = await mountList(hass([]));
    const text = el.shadowRoot?.textContent ?? "";
    expect(text).toContain("No stations match the current filters.");
    expect(text).not.toContain("Can't reach");
  });

  it("follows Home Assistant's language", async () => {
    const el = await mountList({ ...unavailableHass(), language: "de" });
    expect(el.shadowRoot?.textContent ?? "").toContain("Keine Verbindung zur E-Control");
  });

  it("replaces the parking card's station-not-found message", async () => {
    const el = await mount<Card>("ladestellen-austria-parking-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria", station_id: "at-1", name: "Garage" });
      e.hass = unavailableHass();
    });
    const text = el.shadowRoot?.textContent ?? "";
    expect(el.shadowRoot?.querySelector(".unreachable")).not.toBeNull();
    expect(text).toContain("Can't reach E-Control");
    expect(text).toContain("Garage");
    expect(text).not.toContain("not in the sensor's current results");
  });

  it("still tells the parking card a missing station isn't in the results", async () => {
    const el = await mount<Card>("ladestellen-austria-parking-card", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria", station_id: "not-here" });
      e.hass = hass();
    });
    const text = el.shadowRoot?.textContent ?? "";
    expect(text).toContain("not in the sensor's current results");
    expect(text).not.toContain("Can't reach");
  });
});

describe("station row disclosure", () => {
  const mountCard = () =>
    mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-card",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria" });
        e.hass = hass();
      },
    );

  // The trigger is an overlay sibling, not a wrapper. If it ever goes
  // back to being role="button" on the <li>, the maps link becomes a
  // presentational child of a button and can drop out of the
  // accessibility tree entirely.
  it("exposes a real button, not a role on the row", async () => {
    const el = await mountCard();
    const row = el.shadowRoot!.querySelector("li.station")!;
    expect(row.hasAttribute("role")).toBe(false);
    expect(row.hasAttribute("tabindex")).toBe(false);

    const trigger = row.querySelector("button.station-trigger")!;
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-controls")).toBeTruthy();
  });

  it("keeps the maps link outside the trigger", async () => {
    const el = await mountCard();
    const row = el.shadowRoot!.querySelector("li.station")!;
    // The fixture station carries a location, so the link must render.
    const link = row.querySelector("a.icon-action");
    expect(link).not.toBeNull();
    expect(link!.closest("button.station-trigger")).toBeNull();
  });

  it("names the trigger from the station and its status", async () => {
    const el = await mountCard();
    const root = el.shadowRoot!;
    const trigger = root.querySelector("button.station-trigger")!;
    const ids = (trigger.getAttribute("aria-labelledby") ?? "").split(" ");
    expect(ids).toHaveLength(2);
    for (const id of ids) {
      const target = root.getElementById(id);
      expect(target).not.toBeNull();
      const name = target!.textContent?.trim() || target!.getAttribute("aria-label");
      expect(name).toBeTruthy();
    }
    // The status half must not read as "three slash five".
    expect(root.getElementById(ids[1]!)!.getAttribute("aria-label")).not.toContain("/");
  });

  it("toggles on click and reflects it in aria-expanded", async () => {
    const el = await mountCard();
    el.shadowRoot!.querySelector<HTMLButtonElement>("button.station-trigger")!.click();
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector("button.station-trigger")!.getAttribute("aria-expanded"),
    ).toBe("true");
  });
});

describe("station detail", () => {
  // The detail panel is rendered for every row (inert until expanded), so
  // its content can be read without clicking the trigger.
  const mountWith = (over: Partial<Station>) =>
    mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-card",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria" });
        e.hass = hass([station(over)]);
      },
    );

  /** The detail section whose heading reads `heading`, or null. */
  const section = (el: LitElement, heading: string) =>
    [...el.shadowRoot!.querySelectorAll(".detail-section")].find(
      (s) => s.querySelector(".detail-label")?.textContent?.trim() === heading,
    ) ?? null;

  // Wednesday 2026-10-21, 12:00 in Vienna. Only Date is faked: the card reads
  // the clock through `new Date()` and needs nothing else, so setTimeout and
  // requestAnimationFrame stay real for happy-dom.
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-21T10:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("formats single days, ranges and round-the-clock hours", async () => {
    const el = await mountWith({
      openingHours: [
        { fromWeekday: "MONDAY", fromTime: "08:00", toWeekday: "MONDAY", toTime: "18:00" },
        { fromWeekday: "tuesday", fromTime: "07:30", toWeekday: "FRIDAY", toTime: "20:00" },
        { fromWeekday: "SATURDAY", fromTime: "00:00", toWeekday: "SUNDAY", toTime: "24:00" },
        { fromWeekday: "HOLIDAY", fromTime: "09:00", toWeekday: "HOLIDAY", toTime: "12:00" },
      ],
    });
    const lines = [...section(el, "Opening hours")!.querySelectorAll(".hours-line")].map(
      (l) =>
        `${l.querySelector(".hours-day")!.textContent.trim()} ${l.querySelector(".hours-time")!.textContent.trim()}`,
    );
    // The unknown weekday is dropped rather than shown with an empty label.
    expect(lines).toEqual(["Mo 08:00–18:00", "Tu–Fr 07:30–20:00", "Sa–Su 24h"]);
  });

  it("flags the station as open now", async () => {
    const el = await mountWith({
      openingHours: [
        { fromWeekday: "WEDNESDAY", fromTime: "08:00", toWeekday: "WEDNESDAY", toTime: "18:00" },
      ],
    });
    const flag = section(el, "Opening hours")!.querySelector(".flag")!;
    expect(flag.classList.contains("ok")).toBe(true);
    expect(flag.textContent.trim()).toBe("Open now");
  });

  it("flags the station as closed now", async () => {
    const el = await mountWith({
      openingHours: [
        { fromWeekday: "MONDAY", fromTime: "08:00", toWeekday: "MONDAY", toTime: "18:00" },
      ],
    });
    const flag = section(el, "Opening hours")!.querySelector(".flag")!;
    expect(flag.classList.contains("warn")).toBe(true);
    expect(flag.textContent.trim()).toBe("Closed");
  });

  it("leaves the section out when no range can be shown", async () => {
    const el = await mountWith({
      openingHours: [
        { fromWeekday: "HOLIDAY", fromTime: "09:00", toWeekday: "HOLIDAY", toTime: "12:00" },
      ],
    });
    expect(section(el, "Opening hours")).toBeNull();
  });

  it("lists every known payment method once and skips unknown ones", async () => {
    const modes = [
      "APP",
      "QR",
      "RFID_READER",
      "CHARGING_CONTRACT",
      "DEBIT_CARD",
      "CREDIT_CARD",
      "CONTACTLESS_CARD_SUPPORT",
      "CARRIER_PIGEON",
    ];
    const el = await mountWith({
      points: [
        { ...basePoint(), authenticationMode: modes },
        { ...basePoint(), evseId: "AT*TST*E2", authenticationMode: ["APP", "QR"] },
      ] as Station["points"],
    });
    const chips = [...section(el, "Payment")!.querySelectorAll(".chip")];
    expect(chips.map((c) => c.getAttribute("title"))).toEqual([
      "App",
      "QR code",
      "RFID",
      "Contract",
      "Debit card",
      "Credit card",
      "Contactless",
    ]);
    expect(
      chips.every((c) => c.querySelector("ha-icon")!.getAttribute("icon")!.startsWith("mdi:")),
    ).toBe(true);
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
    const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-card",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria", ...config });
        e.hass = hass(stations());
      },
    );
    return [...(el.shadowRoot?.querySelectorAll(".station-name") ?? [])].map((n) =>
      n.textContent?.trim(),
    );
  }

  it("sorts by distance ascending by default", async () => {
    expect(await renderedOrder({})).toEqual(["Near", "Mid", "Far"]);
  });

  it("sorts by power descending when sort_by_power is set", async () => {
    expect(await renderedOrder({ sort_by_power: true })).toEqual(["Far", "Mid", "Near"]);
  });

  it("caps the list at max_stations", async () => {
    expect(await renderedOrder({ max_stations: 2 })).toEqual(["Near", "Mid"]);
  });

  it("floats a pinned station above the sort order", async () => {
    expect(await renderedOrder({ pinned_station_ids: ["far"] })).toEqual(["Far", "Near", "Mid"]);
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
    return mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-parking-card",
      (e) => {
        e.setConfig({
          entity: "sensor.ladestellen_austria",
          station_id: "at-1",
          ...config,
        });
        e.hass = hass([s ?? mixedStatusStation()]);
      },
    );
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
    expect(() => el.setConfig({ station_id: 7 })).toThrow(localize("common.invalid_station_id"));
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
    const slots = Array.from(el.shadowRoot?.querySelectorAll(".parking-slot") ?? []);
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
    const buckets = [...(el.shadowRoot?.querySelectorAll("[data-status]") ?? [])].map((n) =>
      n.getAttribute("data-status"),
    );
    expect(new Set(buckets)).toEqual(new Set(["ok", "busy", "warn", "unknown", "empty"]));
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
        [...(el.shadowRoot?.querySelectorAll("[style*='--slot-car-color']") ?? [])].map((n) =>
          n.getAttribute("style"),
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

  it("leaves the distance out for a picked station", async () => {
    const el = await mountParking({}, station({ distance: 1.25 }));
    expect(el.shadowRoot?.querySelector(".subtitle")).toBeNull();
  });

  describe("auto_nearest", () => {
    const fullStation = station({
      stationId: "at-full",
      label: "Voll",
      distance: 0.3,
      points: [{ ...basePoint(), status: "OCCUPIED" }],
    } as Partial<Station>);
    const freeStation = station({ stationId: "at-free", label: "Frei", distance: 1.25 });

    async function mountAuto(config: Record<string, unknown>, stations: Station[]) {
      return mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
        "ladestellen-austria-parking-card",
        (e) => {
          e.setConfig({ entity: "sensor.ladestellen_austria", auto_nearest: true, ...config });
          e.hass = hass(stations);
        },
      );
    }
    const text = (el: LitElement, selector: string) =>
      el.shadowRoot?.querySelector(selector)?.textContent?.trim();

    it("shows the nearest station without a station_id", async () => {
      const el = await mountAuto({}, [fullStation, freeStation]);
      expect(text(el, ".title")).toBe("Voll");
      expect(el.shadowRoot?.querySelectorAll(".parking-slot").length).toBe(1);
    });

    it("says how far the followed station is", async () => {
      const el = await mountAuto({}, [freeStation]);
      expect(text(el, ".subtitle")).toBe("1,25 km");
    });

    it("keeps the station's name under a custom title", async () => {
      const el = await mountAuto({ name: "Laden" }, [freeStation]);
      expect(text(el, ".title")).toBe("Laden");
      expect(text(el, ".subtitle")).toBe("Frei · 1,25 km");
    });

    it("skips a full station with only_available", async () => {
      const el = await mountAuto({ only_available: true }, [fullStation, freeStation]);
      expect(text(el, ".title")).toBe("Frei");
    });

    it("says so when no nearby station has a free space", async () => {
      const el = await mountAuto({ only_available: true }, [fullStation]);
      expect(text(el, ".empty-state")).toBe(localize("parking.none_available"));
      expect(el.shadowRoot?.querySelector(".parking-slot")).toBeNull();
    });
  });

  describe("plug and power filter", () => {
    const point = (
      evseId: string,
      consumerName: string,
      key: string,
      kw: number,
      status: string,
    ) => ({
      ...basePoint(),
      evseId,
      capacityKw: kw,
      status,
      connectorType: [{ consumerName, key }],
    });
    // A free slow Type 2, a busy fast CCS and a free fast CCS.
    const mixed = station({
      stationId: "at-1",
      points: [
        point("AT*TST*E1", "TYPE_2_AC", "CTYPE2", 11, "AVAILABLE"),
        point("AT*TST*E2", "COMBO2_CCS_DC", "IEC_62196_T2_COMBO", 80, "CHARGING"),
        point("AT*TST*E3", "COMBO2_CCS_DC", "IEC_62196_T2_COMBO", 80, "AVAILABLE"),
      ],
    } as Partial<Station>);
    const slots = (el: LitElement) => [
      ...(el.shadowRoot?.querySelectorAll<HTMLElement>(".parking-slot") ?? []),
    ];

    it("hatches the spots that don't fit and keeps the rest as they are", async () => {
      const el = await mountParking({ connector_types: ["CCS"] }, mixed);
      expect(slots(el).map((s) => s.classList.contains("is-unmatched"))).toEqual([
        true,
        false,
        false,
      ]);
      // The busy CCS spot keeps its car; the hatched one gets none.
      expect(slots(el)[1]!.querySelector(".slot-car")).not.toBeNull();
      expect(slots(el)[0]!.querySelector(".slot-car, .slot-overlay-icon")).toBeNull();
    });

    it("tells screen readers why a spot is hatched", async () => {
      const el = await mountParking({ min_kw: 50 }, mixed);
      expect(slots(el)[0]!.getAttribute("aria-label")).toContain(
        localize("parking.slot_unmatched"),
      );
      expect(slots(el)[2]!.getAttribute("aria-label")).not.toContain(
        localize("parking.slot_unmatched"),
      );
    });

    it("counts only the spots that fit", async () => {
      const el = await mountParking({ connector_types: ["CCS"] }, mixed);
      expect(el.shadowRoot?.querySelector(".header-count-num")?.textContent).toBe("1");
      expect(el.shadowRoot?.querySelector(".header-count-of")?.textContent).toBe("/ 2");
    });

    it("drops the counter when no spot fits", async () => {
      const el = await mountParking({ min_kw: 150 }, mixed);
      expect(el.shadowRoot?.querySelector(".header-count")).toBeNull();
      expect(slots(el).every((s) => s.classList.contains("is-unmatched"))).toBe(true);
    });

    it("hatches nothing without a filter", async () => {
      const el = await mountParking({}, mixed);
      expect(el.shadowRoot?.querySelector(".is-unmatched")).toBeNull();
    });

    it("follows the nearest station with a fitting point", async () => {
      const acOnly = station({
        stationId: "at-ac",
        label: "Nur AC",
        points: [point("AT*TST*A1", "TYPE_2_AC", "CTYPE2", 22, "AVAILABLE")],
      } as Partial<Station>);
      const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
        "ladestellen-austria-parking-card",
        (e) => {
          e.setConfig({
            entity: "sensor.ladestellen_austria",
            auto_nearest: true,
            connector_types: ["CCS"],
          });
          e.hass = hass([acOnly, { ...mixed, label: "Gemischt" }]);
        },
      );
      expect(el.shadowRoot?.querySelector(".title")?.textContent?.trim()).toBe("Gemischt");
    });

    it("says so when no nearby station has a fitting point", async () => {
      const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
        "ladestellen-austria-parking-card",
        (e) => {
          e.setConfig({ entity: "sensor.ladestellen_austria", auto_nearest: true, min_kw: 150 });
          e.hass = hass([mixed]);
        },
      );
      expect(el.shadowRoot?.querySelector(".empty-state")?.textContent?.trim()).toBe(
        localize("parking.none_matching"),
      );
    });
  });
});

describe("parking card size", () => {
  type Parking = LitElement & {
    setConfig: (c: unknown) => void;
    hass: HomeAssistant;
    getCardSize: () => number;
  };
  const withPoints = (n: number) =>
    station({
      points: Array.from({ length: n }, (_, i) => ({ ...basePoint(), evseId: `AT*TST*E${i}` })),
    } as Partial<Station>);
  const size = async (n: number, config: Record<string, unknown> = {}) =>
    (
      await mount<Parking>("ladestellen-austria-parking-card", (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria", station_id: "at-1", ...config });
        e.hass = hass([withPoints(n)]);
      })
    ).getCardSize();

  // Rendered heights in a 400 px column: 229, 349 and 589 px with the
  // header, 537 px without it.
  it.each([
    [1, {}, 5],
    [5, {}, 7],
    [11, {}, 12],
    [11, { hide_header: true }, 11],
  ])("is %i slots with %j → %i", async (n, config, expected) => {
    expect(await size(n, config)).toBe(expected);
  });

  it("measures the nearest station while following it", async () => {
    expect(await size(5, { auto_nearest: true, station_id: "elsewhere" })).toBe(7);
  });

  it("falls back to 3 before the station resolves", () => {
    const el = document.createElement("ladestellen-austria-parking-card") as Parking;
    el.setConfig({ entity: "sensor.ladestellen_austria", station_id: "at-1" });
    expect(el.getCardSize()).toBe(3);
  });
});

describe("editors", () => {
  it.each(["ladestellen-austria-card-editor", "ladestellen-austria-parking-card-editor"])(
    "%s renders without hass",
    async (tag) => {
      const el = await mount<LitElement & { setConfig: (c: unknown) => void }>(tag, (e) =>
        e.setConfig({ entity: "sensor.ladestellen_austria" }),
      );
      expect(el.shadowRoot).not.toBeNull();
    },
  );

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
        (c) => c.classList.contains("active") === (c.getAttribute("aria-pressed") === "true"),
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

  it("keeps the station picker heading without stations", async () => {
    // The group renders only once stations are present; the labelling
    // target must exist either way so the wiring cannot rot silently.
    const el = await mountEditor("ladestellen-austria-parking-card-editor");
    const root = el.shadowRoot!;
    expect(root.getElementById("station-picker-heading")?.textContent?.trim()).toBeTruthy();
    expect(root.querySelector('[role="radiogroup"]')).toBeNull();
  });

  it("exposes the station picker as a radio group", async () => {
    const el = await mount<LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant }>(
      "ladestellen-austria-parking-card-editor",
      (e) => {
        e.setConfig({ entity: "sensor.ladestellen_austria" });
        e.hass = hass();
      },
    );
    const root = el.shadowRoot!;
    const group = root.querySelector('[role="radiogroup"]');
    expect(group).not.toBeNull();
    expect(group!.getAttribute("aria-labelledby")).toBe("station-picker-heading");
    const radios = Array.from(group!.querySelectorAll('[role="radio"]'));
    expect(radios.length).toBeGreaterThan(0);
    expect(radios.every((r) => r.hasAttribute("aria-checked"))).toBe(true);
  });

  it("gives both editors a heading structure", async () => {
    for (const tag of [
      "ladestellen-austria-card-editor",
      "ladestellen-austria-parking-card-editor",
    ]) {
      const el = await mountEditor(tag);
      const headers = Array.from(el.shadowRoot!.querySelectorAll(".section-header"));
      expect(headers.length).toBeGreaterThan(0);
      expect(headers.every((h) => h.getAttribute("role") === "heading")).toBe(true);
      expect(headers.every((h) => h.getAttribute("aria-level") === "3")).toBe(true);
    }
  });
});

describe("parking editor forms", () => {
  type ParkingEditor = LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant };
  type FormEl = HTMLElement & { schema: ReadonlyArray<{ name?: string }> };

  const withLanguage = (language: string) => ({ ...hass(), language }) as HomeAssistant;
  /** The ha-form that holds the field `name`. */
  const formWith = (el: LitElement, name: string) =>
    [...el.shadowRoot!.querySelectorAll<FormEl>("ha-form")].find((f) =>
      f.schema.some((field) => field.name === name),
    )!;

  const mountEditor = () =>
    mount<ParkingEditor>("ladestellen-austria-parking-card-editor", (e) => {
      e.setConfig({ entity: "sensor.ladestellen_austria" });
      e.hass = withLanguage("en");
    });

  it("keeps the lot schemas' identity until the language changes", async () => {
    const el = await mountEditor();
    const english = formWith(el, "paint_width").schema;
    const englishCars = formWith(el, "car_color_mode").schema;

    // A new hass object in the same language must not rebuild a schema:
    // ha-form skips work on an identical array.
    el.hass = withLanguage("en");
    await el.updateComplete;
    expect(formWith(el, "paint_width").schema).toBe(english);
    expect(formWith(el, "car_color_mode").schema).toBe(englishCars);

    el.hass = withLanguage("de");
    await el.updateComplete;
    const german = formWith(el, "paint_width").schema;
    expect(german).not.toBe(english);
    expect(JSON.stringify(german)).not.toBe(JSON.stringify(english));
  });

  it("forwards a form change as config-changed and keeps it locally", async () => {
    const el = await mountEditor();
    const seen: unknown[] = [];
    el.addEventListener("config-changed", (ev) => seen.push((ev as CustomEvent).detail.config));
    const next = { entity: "sensor.ladestellen_austria", car_color_mode: "fixed" };

    formWith(el, "car_color_mode").dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: next } }),
    );
    await el.updateComplete;

    expect(seen).toEqual([next]);
    // The fixed-colour picker renders from the editor's own copy of the
    // config; the dashboard does not push a config-changed it received from
    // the editor back via setConfig.
    expect(el.shadowRoot!.querySelector('input[type="color"]')).not.toBeNull();
  });

  it("redraws the single-colour tile in the picked colour", async () => {
    const el = await mountEditor();
    el.setConfig({ entity: "sensor.ladestellen_austria", car_color_mode: "fixed" });
    await el.updateComplete;
    const before = formWith(el, "car_color_mode").schema;

    const input = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="color"]')!;
    input.value = "#ff8800";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;

    const after = formWith(el, "car_color_mode").schema;
    expect(after).not.toBe(before);
    expect(JSON.stringify(after)).toContain(encodeURIComponent("#ff8800"));
  });
});
