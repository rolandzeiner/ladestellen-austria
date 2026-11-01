/**
 * @vitest-environment happy-dom
 *
 * Markup snapshots of the station detail panel and the parking editor.
 *
 * Both are long hand-written templates with many optional branches, so a
 * restructuring can drop an attribute or reorder a section without any
 * behavioural test noticing. These snapshots pin the rendered markup for
 * each branch. Lit's marker comments are stripped (their ids are random
 * per run) and whitespace between tags is removed, so re-indenting a
 * template does not change a snapshot.
 */

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import type { LitElement } from "lit";

import type { HomeAssistant, Station } from "./types";

beforeAll(async () => {
  await import("./ladestellen-austria-card");
});

function markup(root: ParentNode): string {
  const html = root instanceof ShadowRoot ? root.innerHTML : (root as Element).outerHTML;
  return html
    .replace(/<!--[^]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
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
    distance: 1.2,
    city: "Wien",
    street: "Teststrasse 1",
    postCode: "1010",
    operatorName: "Testbetreiber",
    ...over,
  } as Station;
}

function hass(stations: Station[], language = "en"): HomeAssistant {
  return {
    language,
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

type ConfigurableEl = LitElement & { setConfig: (c: unknown) => void; hass?: HomeAssistant };

async function mount(
  tag: string,
  config: Record<string, unknown>,
  h: HomeAssistant | undefined,
): Promise<ConfigurableEl> {
  const el = document.createElement(tag) as ConfigurableEl;
  el.setConfig(config);
  if (h) el.hass = h;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("station detail markup", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-21T10:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  const detail = async (s: Station, config: Record<string, unknown> = {}) => {
    const el = await mount(
      "ladestellen-austria-card",
      { entity: "sensor.ladestellen_austria", ...config },
      hass([s]),
    );
    const panel = el.shadowRoot!.querySelector(".detail");
    expect(panel).not.toBeNull();
    return markup(panel!);
  };

  it("renders every section and action when the station has them all", async () => {
    const full = station({
      description: "Zufahrt über den Hof",
      website: "https://example.at",
      priceUrl: "https://example.at/tarife",
      phoneCountryCode: "+43",
      phoneNumber: "1234567",
      freeParking: true,
      roofedParking: true,
      bathroomsAvailable: true,
      openingHours: [
        { fromWeekday: "MONDAY", fromTime: "08:00", toWeekday: "FRIDAY", toTime: "18:00" },
      ],
      points: [
        {
          evseId: "AT*TST*E1",
          capacityKw: 22,
          status: "AVAILABLE",
          freeOfCharge: false,
          connectorType: [{ consumerName: "TYPE_2_AC", key: "T2" }],
          electricityType: ["AC_3_PHASE"],
          authenticationMode: ["APP", "RFID", "DEBIT_CARD"],
          priceCentKwh: 49,
          priceCentMin: 5,
        },
        {
          evseId: "AT*TST*E2",
          capacityKw: 150,
          status: "OCCUPIED",
          freeOfCharge: true,
          connectorType: [{ consumerName: "CCS", key: "CCS" }],
          electricityType: ["DC"],
          authenticationMode: ["APP"],
        },
      ],
    } as unknown as Partial<Station>);
    expect(await detail(full)).toMatchSnapshot();
  });

  it("hides amenities when show_amenities is off", async () => {
    expect(
      await detail(station({ freeParking: true, roofedParking: true }), { show_amenities: false }),
    ).toMatchSnapshot();
  });

  it("drops the optional sections for a bare station", async () => {
    const bare = station({
      operatorName: "",
      owner: "",
      points: [],
      street: "",
      city: "",
      postCode: "",
      greenEnergy: false,
      location: undefined,
    } as unknown as Partial<Station>);
    expect(await detail(bare)).toMatchSnapshot();
  });

  it("keeps an http link and drops a non-http one", async () => {
    expect(
      await detail(station({ website: "http://example.at", priceUrl: "javascript:alert(1)" })),
    ).toMatchSnapshot();
  });
});

describe("parking editor markup", () => {
  const editor = async (config: Record<string, unknown>, h?: HomeAssistant) =>
    markup((await mount("ladestellen-austria-parking-card-editor", config, h)).shadowRoot!);

  const stations = [
    station({ stationId: "at-1", label: "Erste", distance: 0.42 }),
    station({
      stationId: "at-2",
      label: "Zweite",
      distance: undefined,
    } as unknown as Partial<Station>),
  ];

  it("asks for a sensor first", async () => {
    expect(await editor({}, hass(stations))).toMatchSnapshot();
  });

  it("says there are no stations yet", async () => {
    expect(await editor({ entity: "sensor.ladestellen_austria" }, hass([]))).toMatchSnapshot();
  });

  it("flags a configured sensor that is gone", async () => {
    expect(await editor({ entity: "sensor.gone" }, hass(stations))).toMatchSnapshot();
  });

  it("lists the stations with the picked one checked", async () => {
    expect(
      await editor({ entity: "sensor.ladestellen_austria", station_id: "at-2" }, hass(stations)),
    ).toMatchSnapshot();
  });

  it("names a picked station that left the results", async () => {
    expect(
      await editor({ entity: "sensor.ladestellen_austria", station_id: "at-9" }, hass(stations)),
    ).toMatchSnapshot();
  });

  it("shows the colour picker for a fixed car colour", async () => {
    expect(
      await editor(
        {
          entity: "sensor.ladestellen_austria",
          car_color_mode: "fixed",
          car_color_fixed: "#ff8800",
        },
        hass(stations),
      ),
    ).toMatchSnapshot();
  });

  it("falls back to the default fixed colour", async () => {
    expect(
      await editor(
        { entity: "sensor.ladestellen_austria", car_color_mode: "fixed" },
        hass(stations),
      ),
    ).toMatchSnapshot();
  });

  it("renders the static content before hass arrives", async () => {
    expect(await editor({ entity: "sensor.ladestellen_austria" })).toMatchSnapshot();
  });
});
