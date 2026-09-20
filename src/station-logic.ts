// Station-level predicates and filtering, extracted from the card class.
//
// These were private methods on LadestellenAustriaCard until the card's
// complexity density made them the file's main risk concentration. None
// of them touched `this` for anything but reading config, so moving them
// to module scope costs nothing and buys two things: they are unit
// testable without booting a Lit component, and the card file stops
// carrying the branchiest logic in the bundle.
//
// Keep these pure. The card passes `now` and `tz` in rather than reading
// the clock here, so opening-hours behaviour is deterministic in tests.

import { normStatus, shortConnector } from "./utils";
import type {
  LadestellenAustriaCardConfig,
  OpeningHours,
  Point,
  Station,
} from "./types";

export type StatusLevel = "ok" | "partial" | "busy" | "inactive" | "unknown";

/** Opening-hours payload weekday names (`fromWeekday` / `toWeekday`). */
const WEEKDAY_NAME_TO_IDX: Record<string, number> = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

/** `Intl.DateTimeFormat` `weekday: "short"` output, en-US. */
const WEEKDAY_SHORT_TO_IDX: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

/** Statuses that mean "a point is in use or held for someone". */
function isBusyStatus(s: string): boolean {
  return (
    s === "CHARGING" || s === "OCCUPIED" || s === "RESERVED" || s === "BLOCKED"
  );
}

/** Statuses that mean "a point is broken or withdrawn from service". */
function isWarnStatus(s: string): boolean {
  return (
    s === "OUTOFORDER" ||
    s === "FAULTED" ||
    s === "INOPERATIVE" ||
    s === "UNAVAILABLE"
  );
}

/**
 * Does `station` carry the amenity identified by `key`? Keys match the
 * AMENITIES table in types.ts, which is also what the editor's chip
 * filter emits. Unknown keys are false rather than throwing — a stale
 * config from an older card version must not break the filter.
 */
export function stationHasAmenity(station: Station, key: string): boolean {
  switch (key) {
    case "green_energy":
      return Boolean(station.greenEnergy);
    case "austrian_ecolabel":
      return Boolean(station.austrianEcoLabel);
    case "free_parking":
      return Boolean(station.freeParking);
    case "roofed_parking":
      return Boolean(station.roofedParking);
    case "illuminated_parking":
      return Boolean(station.illuminatedParking);
    case "barrier_free":
      return (station.barrierFreeParkingPlaces ?? 0) > 0;
    case "catering":
      return Boolean(station.cateringService);
    case "bathrooms":
      return Boolean(station.bathroomsAvailable);
    case "resting":
      return Boolean(station.restingFacilities);
    default:
      return false;
  }
}

/**
 * Minutes elapsed since Monday 00:00 in `tz`, or null when the timezone
 * is unusable or Intl returns something unparseable.
 */
export function minuteOfWeek(now: Date, tz: string): number | null {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const wk = parts.find((p) => p.type === "weekday")?.value ?? "";
    const hr = parts.find((p) => p.type === "hour")?.value ?? "";
    const mn = parts.find((p) => p.type === "minute")?.value ?? "";
    const weekday = WEEKDAY_SHORT_TO_IDX[wk];
    if (weekday === undefined) return null;
    let hour = parseInt(hr, 10);
    const minute = parseInt(mn, 10);
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
    // Safari with hour12:false occasionally reports "24" for midnight.
    if (hour === 24) hour = 0;
    return weekday * 1440 + hour * 60 + minute;
  } catch {
    return null;
  }
}

/**
 * Convert an opening-hours weekday name + `HH:MM` string to the same
 * minute-of-week scale as minuteOfWeek(). Null when either half is
 * missing or unparseable.
 */
export function hoursToMow(dayName: string, time: string): number | null {
  const day = WEEKDAY_NAME_TO_IDX[(dayName ?? "").toUpperCase()];
  if (day === undefined) return null;
  const [hStr, mStr] = (time ?? "").split(":");
  const h = parseInt(hStr ?? "", 10);
  const m = parseInt(mStr ?? "", 10);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return day * 1440 + h * 60 + m;
}

/**
 * Is the station inside any of its opening ranges at `now` (in `tz`)?
 * Returns null when hours are missing or unparseable — callers treat
 * the closed-now signal as unknown rather than as closed. Ranges that
 * wrap the week boundary (from > to) are handled via OR, matching the
 * behaviour a single 7-day schedule expects.
 */
export function isOpenNow(
  hours: OpeningHours[] | undefined,
  now: Date,
  tz: string,
): boolean | null {
  if (!hours || hours.length === 0) return null;
  const nowMow = minuteOfWeek(now, tz);
  if (nowMow == null) return null;
  for (const h of hours) {
    const fromMow = hoursToMow(h.fromWeekday, h.fromTime);
    const toMow = hoursToMow(h.toWeekday, h.toTime);
    if (fromMow == null || toMow == null) continue;
    if (fromMow <= toMow) {
      if (nowMow >= fromMow && nowMow <= toMow) return true;
    } else {
      if (nowMow >= fromMow || nowMow <= toMow) return true;
    }
  }
  return false;
}

/**
 * Row-level status dot for a station.
 *
 * `isOpenNow === false` greys the row regardless of live count — a
 * station with 4/4 free but closed is not actionable. Null means no
 * opening-hours data, treated as always-open for row-status purposes.
 */
export function statusLevel(
  liveAvailable: boolean,
  stationActive: boolean,
  points: Point[],
  isOpenNowValue: boolean | null = null,
): StatusLevel {
  if (!stationActive) return "inactive";
  if (isOpenNowValue === false) return "inactive";
  const total = points.length;
  if (!liveAvailable || total === 0) return "unknown";
  let avail = 0;
  let busy = 0;
  let warn = 0;
  for (const p of points) {
    const s = normStatus(p.status);
    if (s === "AVAILABLE") avail++;
    else if (isBusyStatus(s)) busy++;
    else if (isWarnStatus(s)) warn++;
  }
  if (avail === 0) {
    // Distinguish "nobody free because the whole station is broken" from
    // "nobody free because everyone's charging". The former reads inactive
    // (grey) — the station isn't actionable. The latter stays busy (red).
    if (busy === 0 && warn > 0) return "inactive";
    return "busy";
  }
  if (avail < total) return "partial";
  return "ok";
}

/** The filter-relevant slice of the card config. */
export type StationFilters = Pick<
  LadestellenAustriaCardConfig,
  | "only_available"
  | "only_free"
  | "only_open"
  | "connector_types"
  | "amenities"
  | "payment_methods"
>;

/** Does any point on the station report AVAILABLE, with the station ACTIVE? */
function hasActivePoint(s: Station): boolean {
  return (
    s.stationStatus === "ACTIVE" &&
    (s.points ?? []).some((p) => normStatus(p.status) === "AVAILABLE")
  );
}

/** Every distinct short connector label offered anywhere on the station. */
function stationConnectorTokens(s: Station): Set<string> {
  return new Set(
    (s.points ?? []).flatMap((p) =>
      (p.connectorType ?? []).map((c) => shortConnector(c.consumerName, c.key)),
    ),
  );
}

/** Every authentication mode accepted anywhere on the station. */
function stationPaymentModes(s: Station): Set<string> {
  return new Set((s.points ?? []).flatMap((p) => p.authenticationMode ?? []));
}

/**
 * Apply the card's station filters. `now` and `tz` are passed in so the
 * only-open sweep builds its Date/timezone once per call rather than per
 * station — and so tests can pin the clock.
 *
 * Semantics worth preserving: amenities are AND (narrowing — "I need
 * barrier-free AND roofed"), payment methods are OR (you only need one
 * working payment option), connector types are OR.
 */
export function filterStations(
  stations: Station[],
  config: StationFilters,
  now: Date,
  tz: string,
): Station[] {
  const onlyAvailable = config.only_available ?? false;
  const onlyFree = config.only_free ?? false;
  const onlyOpen = config.only_open ?? false;
  const wantedTokens = config.connector_types ?? [];
  const wantedAmenities = config.amenities ?? [];
  const wantedPayments = config.payment_methods ?? [];

  if (
    !onlyAvailable &&
    !onlyFree &&
    !onlyOpen &&
    wantedTokens.length === 0 &&
    wantedAmenities.length === 0 &&
    wantedPayments.length === 0
  ) {
    return stations;
  }

  return stations.filter((s) => {
    if (onlyAvailable && !hasActivePoint(s)) return false;
    if (onlyFree && !(s.points ?? []).some((p) => p.freeOfCharge)) return false;
    // Stations with no opening-hours data (isOpenNow === null) are
    // treated as "presumed open" — filtering them out would hide
    // stations that are almost certainly accessible just because the
    // operator hasn't bothered to publish hours.
    if (onlyOpen && isOpenNow(s.openingHours, now, tz) === false) return false;
    if (wantedTokens.length > 0) {
      const tokens = stationConnectorTokens(s);
      if (!wantedTokens.some((t) => tokens.has(t))) return false;
    }
    if (wantedAmenities.length > 0) {
      if (!wantedAmenities.every((key) => stationHasAmenity(s, key))) {
        return false;
      }
    }
    if (wantedPayments.length > 0) {
      const modes = stationPaymentModes(s);
      if (!wantedPayments.some((m) => modes.has(m))) return false;
    }
    return true;
  });
}
