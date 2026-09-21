// Unit tests for the station predicates extracted out of the card class.
//
// These functions were private methods until this suite existed, which
// is why they were the highest-CRAP code in the bundle: the branchiest
// logic in the project with no way to exercise it short of booting a Lit
// component. They are pure now, so this runs in the default node
// environment.
//
// Opening-hours behaviour is the subtle part and gets the most coverage:
// the "no data means presumed open, not closed" rule is a deliberate
// product decision (filtering unknown-hours stations out would hide
// stations that are almost certainly reachable), and the week-wrapping
// range is easy to regress into an AND when it must stay an OR.

import { describe, expect, it } from "vitest";

import {
  filterStations,
  hoursToMow,
  isOpenNow,
  mapsDeeplink,
  minuteOfWeek,
  stationConnectorTokens,
  stationHasAmenity,
  stationHasDcPoint,
  stationMaxKw,
  statusLevel,
} from "./station-logic";
import type { OpeningHours, Point, Station } from "./types";

const VIENNA = "Europe/Vienna";

function point(over: Partial<Point> = {}): Point {
  return { status: "AVAILABLE", freeOfCharge: false, ...over } as Point;
}

function station(over: Partial<Station> = {}): Station {
  return {
    stationId: "s1",
    stationStatus: "ACTIVE",
    points: [point()],
    greenEnergy: false,
    austrianEcoLabel: false,
    freeParking: false,
    roofedParking: false,
    illuminatedParking: false,
    cateringService: false,
    bathroomsAvailable: false,
    restingFacilities: false,
    barrierFreeParkingPlaces: 0,
    ...over,
  } as Station;
}

function hours(
  fromWeekday: string,
  fromTime: string,
  toWeekday: string,
  toTime: string,
): OpeningHours {
  return { fromWeekday, fromTime, toWeekday, toTime };
}

/** A Date that lands on a known weekday/time in Vienna. */
function viennaDate(iso: string): Date {
  return new Date(iso);
}

describe("stationHasAmenity", () => {
  it.each([
    ["green_energy", "greenEnergy"],
    ["austrian_ecolabel", "austrianEcoLabel"],
    ["free_parking", "freeParking"],
    ["roofed_parking", "roofedParking"],
    ["illuminated_parking", "illuminatedParking"],
    ["catering", "cateringService"],
    ["bathrooms", "bathroomsAvailable"],
    ["resting", "restingFacilities"],
  ])("reads %s off the %s flag", (key, field) => {
    expect(stationHasAmenity(station({ [field]: true } as Partial<Station>), key)).toBe(true);
    expect(stationHasAmenity(station({ [field]: false } as Partial<Station>), key)).toBe(false);
  });

  it("treats barrier_free as a count, not a flag", () => {
    expect(stationHasAmenity(station({ barrierFreeParkingPlaces: 2 }), "barrier_free")).toBe(true);
    expect(stationHasAmenity(station({ barrierFreeParkingPlaces: 0 }), "barrier_free")).toBe(false);
  });

  it("returns false for an unknown key rather than throwing", () => {
    // A config saved by an older card version must not break the filter.
    expect(stationHasAmenity(station(), "amenity_from_the_future")).toBe(false);
  });
});

describe("minuteOfWeek", () => {
  it("counts minutes from Monday 00:00", () => {
    // 2026-09-21 is a Monday. 00:00 UTC is 02:00 in Vienna (CEST).
    expect(minuteOfWeek(viennaDate("2026-09-21T00:00:00Z"), VIENNA)).toBe(120);
  });

  it("advances by a full day per weekday", () => {
    const mon = minuteOfWeek(viennaDate("2026-09-21T10:00:00Z"), VIENNA);
    const tue = minuteOfWeek(viennaDate("2026-09-22T10:00:00Z"), VIENNA);
    expect(tue! - mon!).toBe(1440);
  });

  it("puts Sunday last, not first", () => {
    // 2026-09-27 is a Sunday — index 6, so >= 6*1440.
    const sun = minuteOfWeek(viennaDate("2026-09-27T12:00:00Z"), VIENNA);
    expect(sun).toBeGreaterThanOrEqual(6 * 1440);
  });

  it("respects the timezone it is given", () => {
    const utc = minuteOfWeek(viennaDate("2026-09-21T00:00:00Z"), "UTC");
    const vienna = minuteOfWeek(viennaDate("2026-09-21T00:00:00Z"), VIENNA);
    expect(vienna! - utc!).toBe(120); // CEST is UTC+2
  });

  it("returns null for an invalid timezone instead of throwing", () => {
    expect(minuteOfWeek(new Date(), "Not/A_Zone")).toBeNull();
  });
});

describe("hoursToMow", () => {
  it("maps MONDAY 00:00 to zero", () => {
    expect(hoursToMow("MONDAY", "00:00")).toBe(0);
  });

  it("is case-insensitive about the weekday name", () => {
    expect(hoursToMow("monday", "01:30")).toBe(90);
    expect(hoursToMow("Monday", "01:30")).toBe(90);
  });

  it("places SUNDAY in the last slot", () => {
    expect(hoursToMow("SUNDAY", "23:59")).toBe(6 * 1440 + 23 * 60 + 59);
  });

  it.each([
    ["FUNDAY", "10:00"],
    ["MONDAY", "nonsense"],
    ["MONDAY", ""],
  ])("returns null for (%s, %s)", (day, time) => {
    expect(hoursToMow(day, time)).toBeNull();
  });

  it("survives nullish input", () => {
    expect(hoursToMow(undefined as unknown as string, "10:00")).toBeNull();
    expect(hoursToMow("MONDAY", undefined as unknown as string)).toBeNull();
  });
});

describe("isOpenNow", () => {
  // 2026-09-23 is a Wednesday. 10:00Z == 12:00 Vienna.
  const wedNoon = viennaDate("2026-09-23T10:00:00Z");

  it("returns null when there are no hours at all", () => {
    // Null is 'unknown', NOT 'closed' — the only-open filter presumes
    // these stations are open rather than hiding them.
    expect(isOpenNow(undefined, wedNoon, VIENNA)).toBeNull();
    expect(isOpenNow([], wedNoon, VIENNA)).toBeNull();
  });

  it("is open inside a same-day range", () => {
    expect(
      isOpenNow([hours("WEDNESDAY", "08:00", "WEDNESDAY", "18:00")], wedNoon, VIENNA),
    ).toBe(true);
  });

  it("is closed outside a same-day range", () => {
    expect(
      isOpenNow([hours("WEDNESDAY", "13:00", "WEDNESDAY", "18:00")], wedNoon, VIENNA),
    ).toBe(false);
  });

  it("is closed on a day the schedule does not cover", () => {
    expect(
      isOpenNow([hours("MONDAY", "08:00", "MONDAY", "18:00")], wedNoon, VIENNA),
    ).toBe(false);
  });

  it("handles a range that wraps the week boundary", () => {
    // Fri 20:00 -> Mon 06:00 wraps past Sunday. Wednesday noon is
    // outside it; Sunday and early Monday are inside.
    const overnight = [hours("FRIDAY", "20:00", "MONDAY", "06:00")];
    expect(isOpenNow(overnight, wedNoon, VIENNA)).toBe(false);
    expect(isOpenNow(overnight, viennaDate("2026-09-27T10:00:00Z"), VIENNA)).toBe(true);
    expect(isOpenNow(overnight, viennaDate("2026-09-21T03:00:00Z"), VIENNA)).toBe(true);
  });

  it("is open if ANY range matches, not only the first", () => {
    expect(
      isOpenNow(
        [
          hours("MONDAY", "08:00", "MONDAY", "18:00"),
          hours("WEDNESDAY", "08:00", "WEDNESDAY", "18:00"),
        ],
        wedNoon,
        VIENNA,
      ),
    ).toBe(true);
  });

  it("skips unparseable ranges but still honours the good ones", () => {
    expect(
      isOpenNow(
        [
          hours("FUNDAY", "08:00", "FUNDAY", "18:00"),
          hours("WEDNESDAY", "08:00", "WEDNESDAY", "18:00"),
        ],
        wedNoon,
        VIENNA,
      ),
    ).toBe(true);
  });

  it("reports closed when every range is unparseable", () => {
    expect(
      isOpenNow([hours("FUNDAY", "x", "FUNDAY", "y")], wedNoon, VIENNA),
    ).toBe(false);
  });

  it("returns null when the timezone makes the clock unreadable", () => {
    expect(
      isOpenNow([hours("WEDNESDAY", "08:00", "WEDNESDAY", "18:00")], wedNoon, "Not/A_Zone"),
    ).toBeNull();
  });

  it("includes both range endpoints", () => {
    const wedEight = viennaDate("2026-09-23T06:00:00Z"); // 08:00 Vienna
    expect(
      isOpenNow([hours("WEDNESDAY", "08:00", "WEDNESDAY", "18:00")], wedEight, VIENNA),
    ).toBe(true);
  });
});

describe("statusLevel", () => {
  const free = point({ status: "AVAILABLE" });
  const busy = point({ status: "CHARGING" });
  const broken = point({ status: "OUT_OF_ORDER" });

  it("is inactive when the station itself is not ACTIVE", () => {
    expect(statusLevel(true, false, [free])).toBe("inactive");
  });

  it("is inactive when closed, even with every point free", () => {
    // A station with 4/4 free but closed is not actionable.
    expect(statusLevel(true, true, [free, free, free, free], false)).toBe("inactive");
  });

  it("treats null opening hours as always-open", () => {
    expect(statusLevel(true, true, [free], null)).toBe("ok");
  });

  it("is unknown when live data is unavailable", () => {
    expect(statusLevel(false, true, [free])).toBe("unknown");
  });

  it("is unknown when the station reports no points", () => {
    expect(statusLevel(true, true, [])).toBe("unknown");
  });

  it("is ok when every point is free", () => {
    expect(statusLevel(true, true, [free, free])).toBe("ok");
  });

  it("is partial when some but not all points are free", () => {
    expect(statusLevel(true, true, [free, busy])).toBe("partial");
  });

  it("is busy when nothing is free because everything is in use", () => {
    expect(statusLevel(true, true, [busy, busy])).toBe("busy");
  });

  it("is inactive — not busy — when nothing is free because everything is broken", () => {
    // The distinction users care about: 'come back later' vs 'don't bother'.
    expect(statusLevel(true, true, [broken, broken])).toBe("inactive");
  });

  it("stays busy when the station is a mix of in-use and broken", () => {
    expect(statusLevel(true, true, [busy, broken])).toBe("busy");
  });

  it("normalises both OUT_OF_ORDER spellings", () => {
    expect(statusLevel(true, true, [point({ status: "OUTOFORDER" })])).toBe("inactive");
  });
});

describe("filterStations", () => {
  const now = viennaDate("2026-09-23T10:00:00Z"); // Wednesday noon Vienna
  const noFilters = {};

  it("returns the input untouched when no filter is set", () => {
    const stations = [station({ stationId: "a" }), station({ stationId: "b" })];
    expect(filterStations(stations, noFilters, now, VIENNA)).toBe(stations);
  });

  describe("only_available", () => {
    it("keeps a station with an ACTIVE status and a free point", () => {
      const s = station({ points: [point({ status: "AVAILABLE" })] });
      expect(filterStations([s], { only_available: true }, now, VIENNA)).toEqual([s]);
    });

    it("drops a station whose points are all busy", () => {
      const s = station({ points: [point({ status: "CHARGING" })] });
      expect(filterStations([s], { only_available: true }, now, VIENNA)).toEqual([]);
    });

    it("drops an inactive station even when a point claims to be free", () => {
      const s = station({ stationStatus: "PLANNED", points: [point({ status: "AVAILABLE" })] });
      expect(filterStations([s], { only_available: true }, now, VIENNA)).toEqual([]);
    });
  });

  describe("only_free", () => {
    it("keeps a station with at least one free-of-charge point", () => {
      const s = station({ points: [point({ freeOfCharge: false }), point({ freeOfCharge: true })] });
      expect(filterStations([s], { only_free: true }, now, VIENNA)).toEqual([s]);
    });

    it("drops a station where every point costs money", () => {
      const s = station({ points: [point({ freeOfCharge: false })] });
      expect(filterStations([s], { only_free: true }, now, VIENNA)).toEqual([]);
    });
  });

  describe("only_open", () => {
    it("keeps a station that is open now", () => {
      const s = station({ openingHours: [hours("WEDNESDAY", "08:00", "WEDNESDAY", "18:00")] });
      expect(filterStations([s], { only_open: true }, now, VIENNA)).toEqual([s]);
    });

    it("drops a station that is closed now", () => {
      const s = station({ openingHours: [hours("WEDNESDAY", "13:00", "WEDNESDAY", "18:00")] });
      expect(filterStations([s], { only_open: true }, now, VIENNA)).toEqual([]);
    });

    it("KEEPS a station with no opening-hours data", () => {
      // Presumed open. Hiding these would hide stations that are almost
      // certainly reachable just because the operator published nothing.
      // The base fixture omits openingHours entirely, which is the shape
      // the upstream payload actually produces.
      const s = station();
      expect(s.openingHours).toBeUndefined();
      expect(filterStations([s], { only_open: true }, now, VIENNA)).toEqual([s]);
    });

    it("KEEPS a station whose opening-hours array is empty", () => {
      const s = station({ openingHours: [] });
      expect(filterStations([s], { only_open: true }, now, VIENNA)).toEqual([s]);
    });
  });

  describe("connector_types (OR)", () => {
    const withPlugs = (...consumers: string[]) =>
      station({
        points: [
          point({
            connectorType: consumers.map((c) => ({ consumerName: c, key: c })),
          } as Partial<Point>),
        ],
      });

    it("keeps a station matching any requested token", () => {
      const s = withPlugs("TYPE_2_AC", "CHADEMO");
      expect(filterStations([s], { connector_types: ["CCS", "Type 2"] }, now, VIENNA)).toEqual([s]);
    });

    it("drops a station matching none of them", () => {
      const s = withPlugs("TYPE_2_AC");
      expect(filterStations([s], { connector_types: ["CCS"] }, now, VIENNA)).toEqual([]);
    });
  });

  describe("amenities (AND)", () => {
    it("requires EVERY selected amenity", () => {
      const both = station({ greenEnergy: true, roofedParking: true });
      const one = station({ greenEnergy: true, roofedParking: false });
      const filters = { amenities: ["green_energy", "roofed_parking"] };
      expect(filterStations([both, one], filters, now, VIENNA)).toEqual([both]);
    });
  });

  describe("payment_methods (OR)", () => {
    const withModes = (...modes: string[]) =>
      station({ points: [point({ authenticationMode: modes } as Partial<Point>)] });

    it("keeps a station accepting any selected method", () => {
      const s = withModes("APP", "RFID");
      expect(filterStations([s], { payment_methods: ["CREDIT_CARD", "RFID"] }, now, VIENNA)).toEqual([s]);
    });

    it("drops a station accepting none of them", () => {
      const s = withModes("APP");
      expect(filterStations([s], { payment_methods: ["CREDIT_CARD"] }, now, VIENNA)).toEqual([]);
    });
  });

  it("applies multiple filters conjunctively", () => {
    const good = station({
      stationId: "good",
      greenEnergy: true,
      points: [point({ status: "AVAILABLE", freeOfCharge: true })],
    });
    const wrongAmenity = station({
      stationId: "wrong",
      greenEnergy: false,
      points: [point({ status: "AVAILABLE", freeOfCharge: true })],
    });
    const filters = { only_available: true, only_free: true, amenities: ["green_energy"] };
    expect(filterStations([good, wrongAmenity], filters, now, VIENNA)).toEqual([good]);
  });

  it("tolerates a station with no points array", () => {
    const s = station({ points: undefined as unknown as Point[] });
    expect(() => filterStations([s], { only_available: true }, now, VIENNA)).not.toThrow();
  });
});

describe("stationMaxKw", () => {
  it("takes the highest capacity across points", () => {
    const s = station({
      points: [point({ capacityKw: 11 }), point({ capacityKw: 150 })],
    });
    expect(stationMaxKw(s)).toBe(150);
  });

  it("returns 0 when no point reports a capacity", () => {
    expect(stationMaxKw(station({ points: [point({})] }))).toBe(0);
    expect(stationMaxKw(station({ points: [] }))).toBe(0);
  });

  it("tolerates a missing points array", () => {
    expect(stationMaxKw(station({ points: undefined as unknown as Point[] }))).toBe(0);
  });
});

describe("stationHasDcPoint", () => {
  it("detects a DC point", () => {
    const s = station({ points: [point({ electricityType: ["DC"] })] });
    expect(stationHasDcPoint(s)).toBe(true);
  });

  it("is false for an AC-only station", () => {
    const s = station({ points: [point({ electricityType: ["AC_3_PHASE"] })] });
    expect(stationHasDcPoint(s)).toBe(false);
  });

  it("needs an exact DC entry, not a prefix", () => {
    // Deliberately stricter than pointPowerType, which buckets DC_FAST
    // as DC — this drives the row accent and matches the old inline test.
    const s = station({ points: [point({ electricityType: ["DC_FAST"] })] });
    expect(stationHasDcPoint(s)).toBe(false);
  });
});

describe("stationConnectorTokens", () => {
  it("deduplicates across points", () => {
    const plug = { consumerName: "TYPE_2_AC", key: "T2" };
    const s = station({
      points: [
        point({ connectorType: [plug] } as Partial<Point>),
        point({ connectorType: [plug] } as Partial<Point>),
      ],
    });
    expect([...stationConnectorTokens(s)]).toEqual(["Type 2"]);
  });

  it("collects every distinct type", () => {
    const s = station({
      points: [
        point({
          connectorType: [
            { consumerName: "TYPE_2_AC", key: "T2" },
            { consumerName: "CHADEMO", key: "CH" },
          ],
        } as Partial<Point>),
      ],
    });
    expect([...stationConnectorTokens(s)].sort()).toEqual(["CHAdeMO", "Type 2"]);
  });

  it("is empty for a station with no connectors", () => {
    expect([...stationConnectorTokens(station({ points: [] }))]).toEqual([]);
  });
});

describe("mapsDeeplink", () => {
  it("builds an https maps URL from coordinates", () => {
    expect(mapsDeeplink({ lat: 48.2, lon: 16.37 })).toBe(
      "https://www.google.com/maps/search/?api=1&query=48.2,16.37",
    );
  });

  it("returns an empty string when the station has no location", () => {
    // `stations` comes from an unvalidated state attribute, so this
    // happens in practice and must not throw.
    expect(mapsDeeplink(undefined)).toBe("");
  });

  it("passes the self-built URL through the https allowlist", () => {
    // The guard is defensive: it stays in place so a future contributor
    // cannot route an upstream attribute through this binding.
    expect(mapsDeeplink({ lat: 0, lon: 0 })).toMatch(/^https:\/\//);
  });
});
