// Station-level predicates and filtering.
//
// Module-scope functions, not card methods: they are unit-testable
// without booting a Lit component, and they keep the branchiest logic
// in the bundle out of the card file.
//
// Keep these pure. The card passes `now` and `tz` in rather than reading
// the clock here, so opening-hours behaviour is deterministic in tests.

import { normStatus, safeHttpsUri, shortConnector } from "./utils";
import type {
  LadestellenAustriaCardConfig,
  OpeningHours,
  ParkingLotCardConfig,
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
  return s === "CHARGING" || s === "OCCUPIED" || s === "RESERVED" || s === "BLOCKED";
}

/** Statuses that mean "a point is broken or withdrawn from service". */
function isWarnStatus(s: string): boolean {
  return s === "OUTOFORDER" || s === "FAULTED" || s === "INOPERATIVE" || s === "UNAVAILABLE";
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
 * Returns null when there are no hours at all or the clock can't be
 * read in `tz` — callers treat null as unknown, not as closed. Entries
 * that don't parse are skipped, so a station whose only entries are
 * unparseable reads closed. Ranges may wrap the week boundary
 * (Sun 22:00 → Mon 06:00).
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
    // A range that wraps the week boundary (from > to) is an OR of its
    // two halves; a plain range is the closed interval.
    const inRange =
      fromMow <= toMow
        ? nowMow >= fromMow && nowMow <= toMow
        : nowMow >= fromMow || nowMow <= toMow;
    if (inRange) return true;
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
  "only_available" | "only_free" | "only_open" | "connector_types" | "amenities" | "payment_methods"
>;

/** Does any point on the station report AVAILABLE, with the station ACTIVE? */
function hasActivePoint(s: Station): boolean {
  return (
    s.stationStatus === "ACTIVE" &&
    (s.points ?? []).some((p) => normStatus(p.status) === "AVAILABLE")
  );
}

/** Every distinct short connector label offered anywhere on the station. */
export function stationConnectorTokens(s: Station): Set<string> {
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

/** The parking card's plug and power filter. */
export type PointFilters = Pick<ParkingLotCardConfig, "connector_types" | "min_kw">;

/** The filter's plug tokens and minimum power, defended against hand-written YAML. */
function pointFilterParts(f: PointFilters): { plugs: string[]; minKw: number } {
  const plugs = Array.isArray(f.connector_types) ? f.connector_types : [];
  const minKw = typeof f.min_kw === "number" && Number.isFinite(f.min_kw) ? f.min_kw : 0;
  return { plugs, minKw };
}

/** Is a plug or power filter set at all? */
export function hasPointFilters(f: PointFilters): boolean {
  const { plugs, minKw } = pointFilterParts(f);
  return plugs.length > 0 || minKw > 0;
}

/**
 * Does this charging point fit the plug and power filter? Matched per
 * point, not per station, because stations mix them: one with a free
 * 3.7 kW Type 2 and a busy 22 kW Type 2 has no free point for "Type 2,
 * at least 11 kW", although it has Type 2, 11 kW and a free point.
 * Plugs are OR; a point with no reported power fails a power minimum,
 * since nothing says it reaches it.
 */
export function pointMatches(p: Point, f: PointFilters): boolean {
  const { plugs, minKw } = pointFilterParts(f);
  if (plugs.length > 0) {
    const tokens = (p.connectorType ?? []).map((c) => shortConnector(c.consumerName, c.key));
    if (!plugs.some((t) => tokens.includes(t))) return false;
  }
  return minKw <= 0 || (p.capacityKw ?? 0) >= minKw;
}

/**
 * Could you plug in here right now? A free point that fits the plug and
 * power filter, on an ACTIVE station (as in the list card's
 * only_available), not closed by its opening hours: a free point behind
 * a shut garage gate isn't free. No published hours counts as open, as
 * in only_open.
 */
export function hasUsableSpot(
  s: Station,
  now: Date,
  tz: string,
  filters: PointFilters = {},
): boolean {
  return (
    s.stationStatus === "ACTIVE" &&
    (s.points ?? []).some(
      (p) => normStatus(p.status) === "AVAILABLE" && pointMatches(p, filters),
    ) &&
    isOpenNow(s.openingHours, now, tz) !== false
  );
}

/** What the parking card shows when no station qualifies. */
export type ParkingEmptyKey =
  | "parking.no_station_selected"
  | "parking.station_not_found"
  | "parking.no_stations"
  | "parking.none_matching"
  | "parking.none_available";

export type ParkingPick = { station: Station } | { station?: undefined; emptyKey: ParkingEmptyKey };

/**
 * The station the parking card shows. With `auto_nearest` it is the
 * first station the sensor reports (the coordinator sorts them nearest
 * first) that has a point fitting the plug and power filter, and
 * `station_id` is ignored; `only_available` narrows that to the nearest
 * one with a usable spot. Otherwise it is `station_id`, whatever the
 * filter says: there the filter only hatches the spots that don't fit.
 */
export function pickParkingStation(
  stations: Station[],
  config: Pick<
    ParkingLotCardConfig,
    "station_id" | "auto_nearest" | "only_available" | "connector_types" | "min_kw"
  >,
  now: Date,
  tz: string,
): ParkingPick {
  if (config.auto_nearest) {
    if (stations.length === 0) return { emptyKey: "parking.no_stations" };
    const fitting = hasPointFilters(config)
      ? stations.filter((s) => (s.points ?? []).some((p) => pointMatches(p, config)))
      : stations;
    if (fitting.length === 0) return { emptyKey: "parking.none_matching" };
    if (!config.only_available) return { station: fitting[0]! };
    const usable = fitting.find((s) => hasUsableSpot(s, now, tz, config));
    return usable ? { station: usable } : { emptyKey: "parking.none_available" };
  }
  const stationId = config.station_id ?? "";
  if (!stationId) return { emptyKey: "parking.no_station_selected" };
  const station = stations.find((s) => s.stationId === stationId);
  return station ? { station } : { emptyKey: "parking.station_not_found" };
}

/** Highest advertised capacity across a station's points; 0 when none report one. */
export function stationMaxKw(station: Station): number {
  return (station.points ?? []).reduce((max, p) => Math.max(max, p.capacityKw ?? 0), 0);
}

/** Does any point on the station deliver DC? Drives the row's kW accent. */
export function stationHasDcPoint(station: Station): boolean {
  return (station.points ?? []).some((p) => (p.electricityType ?? []).includes("DC"));
}

/**
 * Google Maps deeplink for a station, or "" when it has no coordinates.
 *
 * `stations` arrives from an unvalidated state attribute, so a station
 * can reach the renderer without `location` despite the type — a missing
 * field must not throw and blank the whole card. The self-built URL
 * still goes through safeHttpsUri so a future contributor cannot wire an
 * upstream attribute through this binding and bypass the allowlist.
 */
export function mapsDeeplink(location: { lat: number; lon: number } | undefined): string {
  if (!location) return "";
  return safeHttpsUri(
    `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`,
  );
}
