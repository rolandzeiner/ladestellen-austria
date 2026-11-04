/**
 * @vitest-environment happy-dom
 *
 * The editors' groups and what their forms save.
 *
 * card-smoke.test.ts runs the editors without ha-expansion-panel, so
 * every group is drawn open there. This file registers a stand-in panel
 * first, so the editors take the path they take inside Home Assistant.
 */

import { beforeAll, describe, expect, it } from "vite-plus/test";
import type { LitElement } from "lit";

import type { HomeAssistant } from "./types";
import { formText, keyedMemo, withoutDefaults } from "./editor-panels";
import { setLanguage } from "./localize/localize";

type Editor = LitElement & { setConfig: (c: unknown) => void; hass: HomeAssistant };
type Panel = HTMLElement & { header: string; secondary: string };
type FormEl = HTMLElement & { schema: ReadonlyArray<{ name?: string }> };

beforeAll(async () => {
  customElements.define(
    "ha-expansion-panel",
    class extends HTMLElement {
      header = "";
      secondary = "";
    },
  );
  await import("./editor");
  await import("./parking-editor");
});

const HASS = {
  language: "en",
  states: {
    "sensor.ladestellen_austria": {
      entity_id: "sensor.ladestellen_austria",
      state: "3",
      attributes: { stations: [] },
    },
  },
} as unknown as HomeAssistant;

async function mount(tag: string, config: Record<string, unknown>): Promise<Editor> {
  const el = document.createElement(tag) as Editor;
  el.setConfig({ entity: "sensor.ladestellen_austria", ...config });
  el.hass = HASS;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const panels = (el: Editor) => [...el.shadowRoot!.querySelectorAll<Panel>("ha-expansion-panel")];

async function open(el: Editor, index: number): Promise<void> {
  panels(el)[index]!.dispatchEvent(
    new CustomEvent("expanded-will-change", { detail: { expanded: true } }),
  );
  await el.updateComplete;
}

/** Send `value` from the ha-form holding `field`; return what was saved. */
async function change(el: Editor, field: string, value: Record<string, unknown>) {
  const saved: Record<string, unknown>[] = [];
  el.addEventListener("config-changed", (ev) => saved.push((ev as CustomEvent).detail.config));
  const form = [...el.shadowRoot!.querySelectorAll<FormEl>("ha-form")].find((f) =>
    f.schema.some((s) => s.name === field),
  )!;
  form.dispatchEvent(new CustomEvent("value-changed", { detail: { value } }));
  await el.updateComplete;
  return saved[0]!;
}

describe("groups", () => {
  it("builds a group's body only once it is opened", async () => {
    const el = await mount("ladestellen-austria-card-editor", {});
    expect(panels(el).map((p) => p.header)).toEqual([
      "Header & overview",
      "Stations",
      "Filters",
      "Footer",
    ]);
    expect(el.shadowRoot!.querySelector("button.filter-chip")).toBeNull();

    await open(el, 2);
    expect(el.shadowRoot!.querySelector("button.filter-chip")).not.toBeNull();

    panels(el)[2]!.dispatchEvent(
      new CustomEvent("expanded-will-change", { detail: { expanded: false } }),
    );
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("button.filter-chip")).toBeNull();
  });

  it("names each group's state while it is closed", async () => {
    const el = await mount("ladestellen-austria-card-editor", {
      max_stations: 4,
      sort_by_power: true,
      pinned_station_ids: ["a", "b"],
      only_open: true,
      connector_types: ["CCS"],
    });
    expect(panels(el).map((p) => p.secondary)).toEqual([
      "Header · Nearest highlighted",
      "4 · fastest first · 2 pinned",
      "Filters on: 2",
      "Logo in E-Control colours",
    ]);
  });

  it("summarises the parking editor's groups", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", {
      hide_header: true,
      asphalt_style: "textured",
      car_color_mode: "fixed",
    });
    expect(panels(el).map((p) => p.secondary)).toEqual([
      "All plugs · any power",
      "Hidden",
      "Grainy · One colour · Medium",
      "Logo in E-Control colours",
    ]);
  });

  it("summarises the plug and power picked", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", {
      connector_types: ["CCS", "Type 2"],
      min_kw: 50,
    });
    expect(panels(el)[0]!.secondary).toBe("CCS, Type 2 · from 50 kW");
  });
});

describe("saved config", () => {
  it("saves the positive header switch as hide_header", async () => {
    const el = await mount("ladestellen-austria-card-editor", {});
    await open(el, 0);
    const saved = await change(el, "show_header", {
      entity: "sensor.ladestellen_austria",
      show_header: false,
      show_hero: true,
    });
    expect(saved).toEqual({ entity: "sensor.ladestellen_austria", hide_header: true });
  });

  it("saves the order tiles as sort_by_power", async () => {
    const el = await mount("ladestellen-austria-card-editor", { sort_by_power: true });
    await open(el, 1);
    const saved = await change(el, "sort_order", {
      entity: "sensor.ladestellen_austria",
      sort_order: "distance",
      sort_by_power: true,
      max_stations: 10,
    });
    // Back at the default order, and the default count left out.
    expect(saved).toEqual({ entity: "sensor.ladestellen_austria" });
  });

  it("drops a chip list once its last chip is off", async () => {
    const el = await mount("ladestellen-austria-card-editor", { connector_types: ["CCS"] });
    await open(el, 2);
    const saved: Record<string, unknown>[] = [];
    el.addEventListener("config-changed", (ev) => saved.push((ev as CustomEvent).detail.config));
    const ccs = [...el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button.filter-chip")].find(
      (b) => b.textContent?.trim() === "CCS",
    )!;
    ccs.click();
    await el.updateComplete;
    expect(saved).toEqual([{ entity: "sensor.ladestellen_austria" }]);
  });

  it("greys out the free-space filter until the card follows the nearest station", async () => {
    const disabled = async (config: Record<string, unknown>) => {
      const el = await mount("ladestellen-austria-parking-card-editor", config);
      const form = [...el.shadowRoot!.querySelectorAll<FormEl>("ha-form")].find((f) =>
        f.schema.some((s) => s.name === "only_available"),
      )!;
      return (form.schema.find((s) => s.name === "only_available") as { disabled?: boolean })
        .disabled;
    };
    expect(await disabled({})).toBe(true);
    expect(await disabled({ auto_nearest: true })).toBe(false);
  });

  it("hides the station list while following the nearest station", async () => {
    const hint = async (config: Record<string, unknown>) =>
      (await mount("ladestellen-austria-parking-card-editor", config)).shadowRoot!.querySelector(
        "#station-picker-hint",
      );
    expect(await hint({ station_id: "at-1" })).not.toBeNull();
    expect(await hint({ station_id: "at-1", auto_nearest: true })).toBeNull();
  });

  it("keeps the picked station when switching to the nearest one", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", { station_id: "at-1" });
    const saved = await change(el, "auto_nearest", {
      entity: "sensor.ladestellen_austria",
      station_id: "at-1",
      show_header: true,
      auto_nearest: true,
      only_available: false,
    });
    // The off-by-default filter is left out; the pick stays for switching back.
    expect(saved).toEqual({
      entity: "sensor.ladestellen_austria",
      station_id: "at-1",
      auto_nearest: true,
    });
  });

  it("saves the power tile as kW and drops the default", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", {});
    await open(el, 0);
    const base = { entity: "sensor.ladestellen_austria", show_header: true };
    expect(await change(el, "min_kw", { ...base, min_kw: "50" })).toEqual({
      entity: "sensor.ladestellen_austria",
      min_kw: 50,
    });
    expect(await change(el, "min_kw", { ...base, min_kw: "0" })).toEqual({
      entity: "sensor.ladestellen_austria",
    });
  });

  it("gives a power minimum written in YAML a tile of its own", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", { min_kw: 22 });
    await open(el, 0);
    const form = [...el.shadowRoot!.querySelectorAll<FormEl>("ha-form")].find((f) =>
      f.schema.some((s) => s.name === "min_kw"),
    )!;
    const field = form.schema.find((s) => s.name === "min_kw") as {
      selector: { select: { options: { value: string }[] } };
    };
    expect(field.selector.select.options.map((o) => o.value)).toEqual([
      "0",
      "11",
      "22",
      "50",
      "150",
    ]);
  });

  it("toggles a plug chip into connector_types and out again", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", {});
    await open(el, 0);
    const saved: Record<string, unknown>[] = [];
    el.addEventListener("config-changed", (ev) => saved.push((ev as CustomEvent).detail.config));
    const ccs = () =>
      [...el.shadowRoot!.querySelectorAll<HTMLButtonElement>("button.filter-chip")].find(
        (b) => b.textContent?.trim() === "CCS",
      )!;
    ccs().click();
    await el.updateComplete;
    expect(ccs().getAttribute("aria-pressed")).toBe("true");
    ccs().click();
    await el.updateComplete;
    expect(saved).toEqual([
      { entity: "sensor.ladestellen_austria", connector_types: ["CCS"] },
      { entity: "sensor.ladestellen_austria" },
    ]);
  });

  it("greys out the counter while the parking header is hidden", async () => {
    const el = await mount("ladestellen-austria-parking-card-editor", { hide_header: true });
    await open(el, 1);
    const form = [...el.shadowRoot!.querySelectorAll<FormEl>("ha-form")].find((f) =>
      f.schema.some((s) => s.name === "show_free_count"),
    )!;
    expect(form.schema.find((s) => s.name === "show_free_count")).toMatchObject({
      disabled: true,
    });
  });
});

describe("helpers", () => {
  it("withoutDefaults drops only the values equal to the default", () => {
    expect(withoutDefaults({ a: 1, b: 2, c: false }, { a: 1, b: 3, c: false })).toEqual({ b: 2 });
  });

  it("formText searches the namespaces in order", () => {
    setLanguage("en");
    const parking = formText("parking_editor", "editor");
    expect(parking.computeLabel({ name: "show_free_count" })).toBe("Count free spaces");
    expect(parking.computeLabel({ name: "entity" })).toBe("Sensor");
    expect(parking.computeLabel({ name: "no_such_field" })).toBe("no_such_field");
    expect(parking.computeHelper({ name: "name" })).toBe("Defaults to the station's name.");
    expect(formText("editor").computeHelper({ name: "name" })).toBe(
      "Defaults to “Ladestellen Austria”.",
    );
    expect(parking.computeHelper({ name: "entity" })).toBeUndefined();
  });

  it("keyedMemo rebuilds only when the key changes", () => {
    let builds = 0;
    const memo = keyedMemo((n: number) => ({ n, build: ++builds }));
    const first = memo("a", 1);
    expect(memo("a", 2)).toBe(first);
    expect(memo("b", 2)).toEqual({ n: 2, build: 2 });
  });
});
