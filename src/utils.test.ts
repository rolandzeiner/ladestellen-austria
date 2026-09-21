// Unit tests for the shared formatting + status-classification helpers.
//
// These are the pure, module-scope functions both cards call on every
// render. They need no DOM, so this suite runs in vitest's default node
// environment — no `@vitest-environment` docblock.
//
// Two behaviours here are contractual rather than cosmetic and are
// asserted deliberately:
//  - §3i of the ladestellen.at ToU forbids mutating API values, so the
//    formatters must preserve precision and must not round away the
//    API's occasional two-decimal cent values.
//  - safeHttpsUri is a trust boundary: Lit's `${}` interpolation does
//    not block `javascript:` URIs in an href, so this is the only thing
//    standing between a compromised upstream feed and script execution
//    in HA's frontend origin.

import { describe, expect, it } from "vitest";

import {
  computeFormLabel,
  formatCent,
  formatEuro,
  formatKw,
  normStatus,
  pointConnectorLabel,
  pointPowerType,
  pointStatusLabel,
  rackSlotStatus,
  safeHttpsUri,
  shortConnector,
  slotAriaLabel,
  slotClassList,
  slotStatusBucket,
  slotStatusShortKey,
  slotStatusWord,
  slotVariant,
} from "./utils";
import type { Point } from "./types";

/** Minimal Point factory — only the fields the helpers actually read. */
function point(over: Partial<Point> = {}): Point {
  return { status: "AVAILABLE", ...over } as Point;
}

describe("normStatus", () => {
  it("uppercases and strips underscores", () => {
    expect(normStatus("out_of_order")).toBe("OUTOFORDER");
  });

  it("routes both API spellings to the same key", () => {
    // The /search payload emits OUTOFORDER where DATEX II documents
    // OUT_OF_ORDER. Normalising is what makes the buckets agree.
    expect(normStatus("OUT_OF_ORDER")).toBe(normStatus("OUTOFORDER"));
  });

  it("survives a nullish status without throwing", () => {
    expect(normStatus(undefined as unknown as string)).toBe("");
  });
});

describe("pointPowerType", () => {
  it("collapses every AC phase variant to one bucket", () => {
    expect(pointPowerType(point({ electricityType: ["AC_1_PHASE"] }))).toBe("ac");
    expect(pointPowerType(point({ electricityType: ["AC_3_PHASE"] }))).toBe("ac");
  });

  it("detects DC, including prefixed spellings", () => {
    expect(pointPowerType(point({ electricityType: ["DC"] }))).toBe("dc");
    expect(pointPowerType(point({ electricityType: ["DC_FAST"] }))).toBe("dc");
  });

  it("prefers DC when a point reports both", () => {
    expect(
      pointPowerType(point({ electricityType: ["AC_3_PHASE", "DC"] })),
    ).toBe("dc");
  });

  it("returns null for missing or unrecognised types", () => {
    expect(pointPowerType(point({}))).toBeNull();
    expect(pointPowerType(point({ electricityType: [] }))).toBeNull();
    expect(pointPowerType(point({ electricityType: ["MAGIC"] }))).toBeNull();
  });
});

describe("rackSlotStatus", () => {
  it("maps AVAILABLE to ok", () => {
    expect(rackSlotStatus("AVAILABLE")).toBe("ok");
  });

  it.each(["CHARGING", "OCCUPIED", "RESERVED", "BLOCKED"])(
    "maps %s to busy",
    (s) => {
      expect(rackSlotStatus(s)).toBe("busy");
    },
  );

  it.each(["OUT_OF_ORDER", "OUTOFORDER", "FAULTED", "INOPERATIVE", "UNAVAILABLE"])(
    "maps %s to warn",
    (s) => {
      expect(rackSlotStatus(s)).toBe("warn");
    },
  );

  it("maps UNKNOWN to its own bucket, not to empty", () => {
    expect(rackSlotStatus("UNKNOWN")).toBe("unknown");
  });

  it.each(["PLANNED", "REMOVED", "WAT", ""])(
    "maps %s to empty",
    (s) => {
      expect(rackSlotStatus(s)).toBe("empty");
    },
  );
});

describe("slotStatusShortKey", () => {
  it("collapses CHARGING and OCCUPIED to busy — the car SVG shows the difference", () => {
    expect(slotStatusShortKey("CHARGING")).toBe("busy");
    expect(slotStatusShortKey("OCCUPIED")).toBe("busy");
  });

  it("keeps RESERVED and BLOCKED distinguishable at slot size", () => {
    expect(slotStatusShortKey("RESERVED")).toBe("reserved");
    expect(slotStatusShortKey("BLOCKED")).toBe("blocked");
  });

  it("falls back to unknown for anything unrecognised", () => {
    expect(slotStatusShortKey("NONSENSE")).toBe("unknown");
  });
});

describe("slotVariant", () => {
  it("shows the car only when busy and no MDI overlay claimed the cell", () => {
    const charging = slotVariant(point({ status: "CHARGING" }));
    expect(charging.isBusy).toBe(true);
    expect(charging.showCar).toBe(true);
    expect(charging.showOverlayIcon).toBe(false);
  });

  it("suppresses the car when an overlay icon wins the cell", () => {
    // UNKNOWN is not in the busy bucket but does carry an overlay.
    const unknown = slotVariant(point({ status: "UNKNOWN" }));
    expect(unknown.showCar).toBe(false);
    expect(unknown.showOverlayIcon).toBe(true);
    expect(unknown.overlay?.icon).toBe("mdi:help-circle-outline");
  });

  it("leaves an available slot blank", () => {
    const free = slotVariant(point({ status: "AVAILABLE" }));
    expect(free.isAvailable).toBe(true);
    expect(free.showCar).toBe(false);
    expect(free.overlay).toBeNull();
  });

  it("tints the background for states that should read as off or gone", () => {
    expect(slotVariant(point({ status: "PLANNED" })).overlay?.bgTint).toBe("info");
    expect(slotVariant(point({ status: "REMOVED" })).overlay?.bgTint).toBe("error");
  });

  it("gives OUT_OF_ORDER a wrench with no background tint", () => {
    const warn = slotVariant(point({ status: "OUT_OF_ORDER" }));
    expect(warn.isWarn).toBe(true);
    expect(warn.overlay?.icon).toBe("mdi:wrench");
    expect(warn.overlay?.bgTint).toBeUndefined();
  });
});

describe("formatKw", () => {
  it("uses Austrian comma decimals", () => {
    expect(formatKw(3.7)).toBe("3,7");
  });

  it("drops the fractional part when it is zero", () => {
    expect(formatKw(22)).toBe("22");
  });

  it("renders an en dash for missing or non-finite values", () => {
    expect(formatKw(undefined)).toBe("–");
    expect(formatKw(NaN)).toBe("–");
    expect(formatKw(Infinity)).toBe("–");
  });
});

describe("formatEuro", () => {
  it("divides cents into euros with two fixed digits", () => {
    expect(formatEuro(65)).toBe("0,65");
    expect(formatEuro(100)).toBe("1,00");
  });

  it("keeps two digits for whole euro amounts so price tables align", () => {
    expect(formatEuro(4900)).toBe("49,00");
  });
});

describe("formatCent", () => {
  it("does NOT divide by 100 — unlike formatEuro", () => {
    expect(formatCent(10)).toBe("10");
  });

  it("preserves the API's two-decimal precision (ToU §3i)", () => {
    expect(formatCent(10.01)).toBe("10,01");
  });

  it("returns 0 for non-finite input rather than NaN", () => {
    expect(formatCent(NaN)).toBe("0");
  });
});

describe("shortConnector", () => {
  it.each([
    ["TYPE_2_AC", "", "Type 2"],
    ["COMBO2_CCS_DC", "", "CCS"],
    ["CHADEMO", "", "CHAdeMO"],
    ["TYPE_1_AC", "", "Type 1"],
    ["TESLA_S", "", "Tesla"],
    ["TESLA_R", "", "Tesla"],
  ])("maps %s to %s", (consumer, key, expected) => {
    expect(shortConnector(consumer, key)).toBe(expected);
  });

  it("disambiguates OTHER via the connector key", () => {
    expect(shortConnector("OTHER", "DOMESTIC_F")).toBe("Schuko");
    expect(shortConnector("OTHER", "CEE_17")).toBe("CEE");
  });

  it("falls back to the raw key for an unrecognised OTHER", () => {
    expect(shortConnector("OTHER", "WEIRD")).toBe("WEIRD");
  });

  it("humanises an unknown consumer by unscoring it", () => {
    expect(shortConnector("SOME_NEW_PLUG", "")).toBe("SOME NEW PLUG");
  });
});

describe("pointConnectorLabel", () => {
  it("uses the first connector entry", () => {
    const p = point({
      connectorType: [
        { consumerName: "TYPE_2_AC", key: "T2" },
        { consumerName: "CHADEMO", key: "CH" },
      ],
    } as Partial<Point>);
    expect(pointConnectorLabel(p)).toBe("Type 2");
  });

  it("renders an en dash when the point has no connectors", () => {
    expect(pointConnectorLabel(point({}))).toBe("–");
    expect(pointConnectorLabel(point({ connectorType: [] } as Partial<Point>))).toBe("–");
  });
});

describe("safeHttpsUri", () => {
  it("passes http and https through unchanged", () => {
    expect(safeHttpsUri("https://www.e-control.at/")).toBe("https://www.e-control.at/");
    expect(safeHttpsUri("http://example.at")).toBe("http://example.at");
  });

  it("is case-insensitive about the scheme", () => {
    expect(safeHttpsUri("HTTPS://example.at")).toBe("HTTPS://example.at");
  });

  it.each([
    "javascript:alert(1)",
    "JaVaScRiPt:alert(1)",
    "data:text/html;base64,PHNjcmlwdD4=",
    "vbscript:msgbox",
    "file:///etc/passwd",
    "//evil.example",
    "",
  ])("blocks %s", (raw) => {
    expect(safeHttpsUri(raw)).toBe("");
  });

  it("narrows non-string input from the unvalidated payload", () => {
    expect(safeHttpsUri(undefined)).toBe("");
    expect(safeHttpsUri(null)).toBe("");
    expect(safeHttpsUri(42)).toBe("");
    expect(safeHttpsUri({ href: "https://ok.at" })).toBe("");
  });
});

describe("pointStatusLabel", () => {
  it("returns an empty string for an empty status", () => {
    expect(pointStatusLabel("")).toBe("");
  });

  it("returns the raw status when the bucket is unrecognised", () => {
    expect(pointStatusLabel("SOMETHING_NEW")).toBe("SOMETHING_NEW");
  });

  it("resolves a known status to a non-empty label", () => {
    // The exact wording is a translation concern; what matters here is
    // that a known status never leaks the raw SCREAMING_CASE token.
    expect(pointStatusLabel("AVAILABLE")).not.toBe("AVAILABLE");
  });
});

describe("computeFormLabel", () => {
  it("falls back to the raw field name when no translation exists", () => {
    expect(computeFormLabel({ name: "definitely_not_a_key" })).toBe(
      "definitely_not_a_key",
    );
  });

  it("looks expandable sections up under a different prefix", () => {
    // Both resolve to the raw name when untranslated; the point is that
    // the two branches build different keys and neither throws.
    expect(
      computeFormLabel({ name: "nope_xyz", type: "expandable" }),
    ).toBe("nope_xyz");
  });
});

describe("slotStatusBucket", () => {
  it.each([
    ["ok", "free"],
    ["busy", "busy"],
    ["warn", "warn"],
    ["unknown", "unknown"],
    ["empty", "unknown"],
  ] as const)("maps %s to %s", (status, expected) => {
    expect(slotStatusBucket(status)).toBe(expected);
  });
});

describe("slotStatusWord", () => {
  it("falls back to the full status label when the short key is untranslated", () => {
    // A new upstream status must degrade to something readable rather
    // than leaking `parking.slot_status_whatever` into the UI.
    expect(slotStatusWord("definitely_not_a_key", "Out of order")).toBe(
      "Out of order",
    );
  });

  it("uses the translation when one exists", () => {
    expect(slotStatusWord("free", "IGNORED")).not.toBe("IGNORED");
  });
});

describe("slotClassList", () => {
  const base = {
    bucket: "ok" as const,
    isAvailable: true,
    isBusy: false,
    isWarn: false,
    overlay: null,
    showCar: false,
    showOverlayIcon: false,
  };

  it("always starts with the base class", () => {
    expect(slotClassList(base, false).split(" ")[0]).toBe("parking-slot");
  });

  it.each([
    [{ isAvailable: true, isBusy: false, isWarn: false }, "is-available"],
    [{ isAvailable: false, isBusy: true, isWarn: false }, "is-busy"],
    [{ isAvailable: false, isBusy: false, isWarn: true }, "is-warn"],
    [{ isAvailable: false, isBusy: false, isWarn: false }, "is-unknown"],
  ])("picks %o -> %s", (flags, expected) => {
    expect(slotClassList({ ...base, ...flags }, false)).toContain(expected);
  });

  it("marks has-overlay for either a car or an icon", () => {
    expect(slotClassList({ ...base, showCar: true }, false)).toContain(
      "has-overlay",
    );
    expect(slotClassList({ ...base, showOverlayIcon: true }, false)).toContain(
      "has-overlay",
    );
  });

  it("distinguishes the car from the icon", () => {
    const car = slotClassList({ ...base, showCar: true }, false);
    expect(car).toContain("has-car");
    expect(car).not.toContain("has-icon");
  });

  it("adds the background tint class only when the overlay carries one", () => {
    expect(
      slotClassList(
        { ...base, overlay: { icon: "mdi:x", tone: "info", bgTint: "info" } },
        false,
      ),
    ).toContain("slot-tint-info");
    expect(
      slotClassList(
        { ...base, overlay: { icon: "mdi:x", tone: "muted" } },
        false,
      ),
    ).not.toContain("slot-tint");
  });

  it("adds is-revealed only when asked", () => {
    expect(slotClassList(base, true)).toContain("is-revealed");
    expect(slotClassList(base, false)).not.toContain("is-revealed");
  });

  it("emits no empty class tokens", () => {
    // The array is filtered before joining; a stray "" would render as a
    // double space and break exact class matching in CSS tests.
    expect(slotClassList(base, false)).not.toMatch(/\s{2,}/);
    expect(slotClassList(base, false).split(" ").filter((c) => !c)).toEqual([]);
  });
});

describe("slotAriaLabel", () => {
  const base = {
    powerType: "ac" as const,
    capacityKw: 22,
    kwText: "22",
    connector: "Type 2",
    statusLabel: "Available",
  };

  it("joins the parts with a middle dot", () => {
    expect(slotAriaLabel(base)).toBe("AC · 22 kW · Type 2 · Available");
  });

  it("uppercases the power type", () => {
    expect(slotAriaLabel({ ...base, powerType: "dc" })).toContain("DC");
  });

  it("drops a missing power type rather than reading a blank", () => {
    expect(slotAriaLabel({ ...base, powerType: null })).toBe(
      "22 kW · Type 2 · Available",
    );
  });

  it("treats 0 kW as not reported", () => {
    // The API uses 0 for 'no capacity published'.
    expect(slotAriaLabel({ ...base, capacityKw: 0 })).toBe(
      "AC · Type 2 · Available",
    );
    expect(slotAriaLabel({ ...base, capacityKw: undefined })).toBe(
      "AC · Type 2 · Available",
    );
  });

  it("drops the en-dash placeholder connector", () => {
    expect(slotAriaLabel({ ...base, connector: "–" })).toBe(
      "AC · 22 kW · Available",
    );
  });

  it("always keeps the status, even when everything else is absent", () => {
    expect(
      slotAriaLabel({
        powerType: null,
        capacityKw: 0,
        kwText: "–",
        connector: "–",
        statusLabel: "Unknown",
      }),
    ).toBe("Unknown");
  });
});
