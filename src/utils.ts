// Shared formatting + status-classification helpers used by both the
// main list card and the parking-slot card. Extracted as plain
// functions (no `this` binding) so the two cards stay independent —
// neither card needs to know the other exists.
//
// Policy notes for future edits:
// - §3i of the ladestellen.at ToU forbids mutating API values: these
//   helpers preserve precision, use Austrian comma decimals, and only
//   transform the presentation (de-AT locale via Intl.NumberFormat).
// - Status normalisation exists because the /search payload emits
//   `OUTOFORDER` where the DATEX II spec documents `OUT_OF_ORDER`.
//   Normalising (strip underscores + uppercase) routes both spellings
//   to the same bucket.

import type { Point } from "./types";
import { localize } from "./localize/localize";

export type RackStatus = "ok" | "busy" | "warn" | "unknown" | "empty";

/**
 * Resolve a point's AC/DC label from point.electricityType. Collapses
 * `AC_1_PHASE` / `AC_3_PHASE` / `DC` to two buckets because phase
 * detail isn't actionable at rack-glance level. Returns null when the
 * field is empty or unrecognised.
 */
export function pointPowerType(point: Point): "dc" | "ac" | null {
  const types = point.electricityType ?? [];
  if (types.some((t) => t === "DC" || t?.startsWith("DC"))) return "dc";
  if (types.some((t) => t?.startsWith("AC"))) return "ac";
  return null;
}

/**
 * Normalises an API status string for bucket comparison. Uppercases
 * and strips underscores so `OUTOFORDER` and `OUT_OF_ORDER` produce
 * the same key. See coordinator docs / rack-status buckets below.
 */
export function normStatus(status: string): string {
  return (status ?? "").toUpperCase().replace(/_/g, "");
}

/**
 * Maps a per-point live status to the rack/parking slot visual bucket.
 * - ok: AVAILABLE — point is free to start a session
 * - busy: CHARGING / OCCUPIED / RESERVED / BLOCKED — in use / held
 * - warn: OUTOFORDER / FAULTED / INOPERATIVE / UNAVAILABLE — maintenance
 * - unknown: UNKNOWN — operator isn't reporting live state
 * - empty: anything else (PLANNED / REMOVED / unrecognised)
 */
export function rackSlotStatus(status: string): RackStatus {
  const s = normStatus(status);
  if (s === "AVAILABLE") return "ok";
  if (s === "CHARGING" || s === "OCCUPIED" || s === "RESERVED" || s === "BLOCKED") {
    return "busy";
  }
  if (
    s === "OUTOFORDER" ||
    s === "FAULTED" ||
    s === "INOPERATIVE" ||
    s === "UNAVAILABLE"
  ) {
    return "warn";
  }
  if (s === "UNKNOWN") return "unknown";
  return "empty";
}

/**
 * Human-readable localized label for a point status. Falls back to the
 * raw status string if the localize key is missing or the status is
 * unrecognised.
 */
export function pointStatusLabel(status: string): string {
  if (!status) return "";
  const s = normStatus(status);
  const buckets: Record<string, string> = {
    AVAILABLE: "available",
    CHARGING: "charging",
    OCCUPIED: "occupied",
    RESERVED: "reserved",
    BLOCKED: "blocked",
    OUTOFORDER: "fault",
    FAULTED: "fault",
    INOPERATIVE: "fault",
    UNAVAILABLE: "unavailable",
    UNKNOWN: "unknown",
    PLANNED: "planned",
    REMOVED: "removed",
  };
  const bucket = buckets[s];
  if (!bucket) return status;
  const key = `card.point_status_${bucket}`;
  const resolved = localize(key);
  return resolved === key ? status : resolved;
}

/**
 * kW formatter — Austrian comma decimals, up to one fractional digit.
 * 3.7 → "3,7", 22 → "22", 80 → "80". Preserves API precision (§3i).
 */
export function formatKw(v: number | undefined): string {
  if (v == null || !Number.isFinite(v)) return "–";
  try {
    return new Intl.NumberFormat("de-AT", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(v);
  } catch {
    return String(v).replace(".", ",");
  }
}

/**
 * Convert cents to a euro-formatted number string (no currency symbol
 * — callers add "€"). 65 → "0,65", 100 → "1,00". Fixed 2 fractional
 * digits for alignment in price tables.
 */
export function formatEuro(cents: number): string {
  const value = cents / 100;
  try {
    return new Intl.NumberFormat("de-AT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
}

/**
 * Raw cent-value formatter — used for per-minute fees (e.g. "10 ¢/min",
 * "10,01 ¢/min"). Unlike formatEuro, this does NOT divide by 100.
 * Up to two fractional digits so the API's occasional 10.01 precision
 * survives without being rounded (§3i).
 */
export function formatCent(value: number): string {
  if (!Number.isFinite(value)) return "0";
  try {
    return new Intl.NumberFormat("de-AT", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return String(value).replace(".", ",");
  }
}

/**
 * Short human label for a connector type. Derived from the API's
 * connectorType.consumerName with DOMESTIC_F/CEE fallbacks via the key.
 */
export function shortConnector(consumer: string, key: string): string {
  switch (consumer) {
    case "TYPE_2_AC":
      return "Type 2";
    case "COMBO2_CCS_DC":
      return "CCS";
    case "CHADEMO":
      return "CHAdeMO";
    case "TYPE_1_AC":
      return "Type 1";
    case "TESLA_S":
    case "TESLA_R":
      return "Tesla";
    case "OTHER":
      if (key === "DOMESTIC_F") return "Schuko";
      if (key?.startsWith("CEE")) return "CEE";
      return key ?? "?";
    default:
      return consumer?.replace(/_/g, " ") ?? key ?? "?";
  }
}

/**
 * First-connector short label for a point. Centralises the "pick first
 * connectorType entry and shortConnector it" pattern that shows up in
 * both cards.
 */
export function pointConnectorLabel(point: Point): string {
  const first = (point.connectorType ?? [])[0];
  if (!first) return "–";
  return shortConnector(first.consumerName, first.key);
}
