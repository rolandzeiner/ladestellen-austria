// Ladestellen Austria — Lovelace custom card
// https://github.com/rolandzeiner/ladestellen-austria
//
// Lit 3 + Shadow DOM + Rollup, single-file HACS bundle.
// §3c of the ladestellen.at Terms of Use requires the E-Control brand link
// to https://www.e-control.at/. §3d requires the verbatim "Datenquelle:
// E-Control" attribution next to the data. Both are non-negotiable —
// removing either is a €10,000 contract violation.

import {
  LitElement,
  html,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  fireEvent,
  type HomeAssistant,
  type LovelaceCardEditor,
} from "custom-card-helpers";

import type {
  LadestellenAustriaCardConfig,
  OpeningHours,
  Point,
  Station,
} from "./types";
import { CARD_VERSION } from "./const";
import { localize, setLanguage } from "./localize/localize";
import { cardStyles } from "./styles";

import "./editor";

console.info(
  `%c  Ladestellen Austria Card  %c  ${localize("common.version")} ${CARD_VERSION}  `,
  "color: white; font-weight: bold; background: #3FA535",
  "color: white; font-weight: bold; background: dimgray",
);

interface WindowWithCustomCards extends Window {
  customCards: Array<{
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
  }>;
}

(window as unknown as WindowWithCustomCards).customCards =
  (window as unknown as WindowWithCustomCards).customCards || [];
(window as unknown as WindowWithCustomCards).customCards.push({
  type: "ladestellen-austria-card",
  name: "Ladestellen Austria",
  description: "Nearby EV charging stations, powered by E-Control Austria",
  preview: true,
  documentationURL: "https://github.com/rolandzeiner/ladestellen-austria",
});

const DEFAULT_MAX_STATIONS = 10;
// §3d of the ladestellen.at Terms of Use requires this exact string shown
// "unmittelbar bei den von der E-Control angezeigten Daten". Do not edit.
const ATTRIBUTION_REQUIRED = "Datenquelle: E-Control";

type StatusLevel = "ok" | "partial" | "busy" | "inactive" | "unknown";
type RackStatus = "ok" | "busy" | "warn" | "empty";

const WEEKDAY_NAME_TO_IDX: Record<string, number> = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
  SUNDAY: 6,
};

const WEEKDAY_SHORT_TO_IDX: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};

@customElement("ladestellen-austria-card")
export class LadestellenAustriaCard extends LitElement {
  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement(
      "ladestellen-austria-card-editor",
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    _hass: HomeAssistant,
    entities: string[],
  ): Record<string, unknown> {
    const found = entities.find(
      (e) => e.startsWith("sensor.") && e.includes("ladestelle"),
    );
    return { entity: found ?? "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: LadestellenAustriaCardConfig;
  @state() private _expanded: Set<string> = new Set();

  public setConfig(config: LadestellenAustriaCardConfig): void {
    if (!config) {
      throw new Error(localize("common.invalid_configuration"));
    }
    this.config = {
      name: "Ladestellen Austria",
      max_stations: DEFAULT_MAX_STATIONS,
      show_hero: true,
      show_amenities: true,
      show_pricing: true,
      sort_by_power: false,
      logo_adapt_to_theme: false,
      only_available: false,
      only_free: false,
      connector_types: [],
      pinned_station_ids: [],
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) return false;
    if (changedProps.has("config") || changedProps.has("_expanded")) {
      return true;
    }
    const prev = changedProps.get("hass") as HomeAssistant | undefined;
    if (!prev || !this.config.entity) return true;
    return (
      prev.states[this.config.entity] !== this.hass.states[this.config.entity]
    );
  }

  public getCardSize(): number {
    const max = this.config?.max_stations ?? DEFAULT_MAX_STATIONS;
    return Math.min(3 + Math.ceil(max / 3), 10);
  }

  protected render(): TemplateResult {
    // Push hass.language into the localize() helper on every render so the
    // card always matches HA's server-side user-profile language setting,
    // regardless of whether the frontend ever wrote to localStorage.
    setLanguage(this.hass?.language);

    if (!this.hass || !this.config) {
      return html`<ha-card
        ><div class="empty-state">${localize("common.loading")}</div></ha-card
      >`;
    }

    const stateObj = this.config.entity
      ? this.hass.states[this.config.entity]
      : undefined;

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="empty-state">${localize("card.no_entity")}</div>
          ${this._renderFooter(undefined)}
        </ha-card>
      `;
    }

    const allStations = (stateObj.attributes["stations"] ?? []) as Station[];
    const liveAvailable =
      (stateObj.attributes["live_status_available"] as boolean) === true;

    // Partition by pin status. Pinned first in user-defined order,
    // bypassing filters + sort. Orphan pins (IDs not found in the API
    // response) render as placeholder rows at their pin-order position.
    const pinnedIds = this.config.pinned_station_ids ?? [];
    const pinnedItems = this._collectPinnedItems(pinnedIds, allStations);
    const pinnedLiveStationIds = new Set(
      pinnedItems
        .filter((item) => item.kind === "live")
        .map((item) => item.stationId),
    );
    const rest = allStations.filter(
      (s) => !pinnedLiveStationIds.has(s.stationId),
    );

    const filtered = this._filterStations(rest);
    const sorted = this._sortStations(filtered);

    // Hero always uses the distance-nearest station from the unfiltered,
    // unpinned pool — a stable "how far is any charger from me" answer
    // that shouldn't flip when the user resorts, filters, or pins.
    const nearestByDistance = allStations[0];

    const cap = Math.max(1, this.config.max_stations ?? DEFAULT_MAX_STATIONS);
    const orderedAll: Array<
      | { kind: "live"; station: Station }
      | { kind: "orphan"; id: string }
    > = [
      ...pinnedItems,
      ...sorted.map((s) => ({ kind: "live" as const, station: s })),
    ];
    const visible = orderedAll.slice(0, cap);
    const visibleLive = visible
      .filter(
        (item): item is { kind: "live"; station: Station } =>
          item.kind === "live",
      )
      .map((item) => item.station);
    const farthestShown =
      visibleLive.length > 0
        ? visibleLive[visibleLive.length - 1]
        : undefined;

    const showHero = this.config.show_hero !== false;
    const customTitle =
      this.config.name && this.config.name !== "Ladestellen Austria"
        ? this.config.name
        : null;

    return html`
      <ha-card>
        ${customTitle
          ? html`<div class="custom-title">${customTitle}</div>`
          : nothing}
        ${showHero
          ? this._renderHero(
              nearestByDistance,
              farthestShown,
              filtered.length,
              allStations.length,
            )
          : nothing}
        ${visible.length > 0
          ? html`<ul class="stations">
              ${visible.map((item) =>
                item.kind === "live"
                  ? this._renderStation(
                      item.station,
                      liveAvailable,
                      pinnedLiveStationIds.has(item.station.stationId),
                    )
                  : this._renderOrphanPin(item.id),
              )}
            </ul>`
          : html`<div class="empty-state">
              ${localize("card.no_stations")}
            </div>`}
        ${this._renderFooter(
          stateObj.attributes["attribution"] as string | undefined,
        )}
      </ha-card>
    `;
  }

  private _sortStations(stations: Station[]): Station[] {
    // Both sort modes get a free > busy tier between the primary sort
    // value and distance. With DATEX II live data this is meaningful —
    // inside a tied primary bucket, actionable stations beat fully-busy
    // ones. Without live data every station reads AVAILABLE so the tier
    // silently no-ops.
    //
    // sort_by_power=true: kW desc → free > busy → distance asc
    // sort_by_power=false: distance asc → free > busy → (stable)
    //
    // In distance mode the free tier only fires on exact-distance ties
    // (rare), so behaviour matches the previous distance-sort for
    // essentially all stations. Included for consistency and to handle
    // pathological edge cases where two stations share identical coords.
    return [...stations].sort((a, b) => {
      if (this.config.sort_by_power) {
        const aMax = Math.max(
          0,
          ...(a.points ?? []).map((p) => p.capacityKw ?? 0),
        );
        const bMax = Math.max(
          0,
          ...(b.points ?? []).map((p) => p.capacityKw ?? 0),
        );
        if (bMax !== aMax) return bMax - aMax;
      } else {
        const aDist = a.distance ?? Infinity;
        const bDist = b.distance ?? Infinity;
        if (aDist !== bDist) return aDist - bDist;
      }
      const aFree = this._stationHasFree(a);
      const bFree = this._stationHasFree(b);
      if (aFree !== bFree) return aFree ? -1 : 1;
      return (a.distance ?? Infinity) - (b.distance ?? Infinity);
    });
  }

  private _stationHasFree(s: Station): boolean {
    if (s.stationStatus !== "ACTIVE") return false;
    return (s.points ?? []).some((p) => p.status === "AVAILABLE");
  }

  // Build the pinned section, preserving config order. Each item is
  // either { kind: "live", station } when the pin matches a station in
  // the API response, or { kind: "orphan", id } when the pin is stale
  // (station not in range / decommissioned). Duplicate IDs are ignored.
  private _collectPinnedItems(
    ids: readonly string[],
    stations: readonly Station[],
  ): Array<
    | { kind: "live"; station: Station; stationId: string }
    | { kind: "orphan"; id: string }
  > {
    const byId = new Map(stations.map((s) => [s.stationId, s]));
    const seen = new Set<string>();
    const out: Array<
      | { kind: "live"; station: Station; stationId: string }
      | { kind: "orphan"; id: string }
    > = [];
    for (const id of ids) {
      if (seen.has(id)) continue;
      seen.add(id);
      const station = byId.get(id);
      if (station) {
        out.push({ kind: "live", station, stationId: station.stationId });
      } else {
        out.push({ kind: "orphan", id });
      }
    }
    return out;
  }

  private _unpinStation(id: string): void {
    const current = this.config.pinned_station_ids ?? [];
    const next = current.filter((x) => x !== id);
    const newConfig: LadestellenAustriaCardConfig = {
      ...this.config,
      pinned_station_ids: next,
    };
    // Notify Lovelace of the config change. When the dashboard is in
    // edit mode (or storage-mode in general) this persists. In YAML-
    // mode dashboards the event is a no-op — users who want this action
    // to stick should use the card editor instead.
    fireEvent(this, "config-changed", { config: newConfig });
  }

  private _renderOrphanPin(id: string): TemplateResult {
    return html`
      <li class="station orphan-pin" role="listitem">
        <div class="station-body orphan-body">
          <ha-icon class="orphan-icon" icon="mdi:pin-off-outline"></ha-icon>
          <div class="orphan-text">
            <div class="orphan-title">
              ${localize("card.orphan_pin_title")}
            </div>
            <div class="orphan-id">${id}</div>
          </div>
          <button
            class="orphan-remove"
            type="button"
            aria-label=${localize("card.unpin")}
            title=${localize("card.unpin")}
            @click=${(ev: Event) => {
              ev.stopPropagation();
              this._unpinStation(id);
            }}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
      </li>
    `;
  }

  private _filterStations(stations: Station[]): Station[] {
    const onlyAvailable = this.config.only_available ?? false;
    const onlyFree = this.config.only_free ?? false;
    const wantedTokens = this.config.connector_types ?? [];
    if (!onlyAvailable && !onlyFree && wantedTokens.length === 0) {
      return stations;
    }
    return stations.filter((s) => {
      if (onlyAvailable) {
        const hasActive =
          s.stationStatus === "ACTIVE" &&
          (s.points ?? []).some((p) => p.status === "AVAILABLE");
        if (!hasActive) return false;
      }
      if (onlyFree) {
        const hasFree = (s.points ?? []).some((p) => p.freeOfCharge);
        if (!hasFree) return false;
      }
      if (wantedTokens.length > 0) {
        const stationTokens = new Set(
          (s.points ?? []).flatMap((p) =>
            (p.connectorType ?? []).map((c) =>
              this._shortConnector(c.consumerName, c.key),
            ),
          ),
        );
        const match = wantedTokens.some((t) => stationTokens.has(t));
        if (!match) return false;
      }
      return true;
    });
  }

  // §3c and §3d compliance rolled into a single footer row: logo-link
  // on the left, "Datenquelle: E-Control" on the right. Hard-coded
  // attribution text as a fallback in case a user template sensor
  // strips the upstream attribute. When logo_adapt_to_theme is on, the
  // PNG renders as a silhouette (filter brightness(0) [invert(1)]) that
  // follows hass.themes.darkMode.
  private _renderFooter(attr: string | undefined): TemplateResult {
    const adaptive = this.config?.logo_adapt_to_theme === true;
    const darkMode = Boolean(
      (this.hass?.themes as { darkMode?: boolean } | undefined)?.darkMode,
    );
    const logoClasses = adaptive
      ? `brand-logo adaptive ${darkMode ? "adaptive-dark" : "adaptive-light"}`
      : "brand-logo";
    const text =
      attr && attr.includes("E-Control") ? attr : ATTRIBUTION_REQUIRED;
    return html`
      <div class="footer">
        <a
          class="brand-link"
          href="https://www.e-control.at/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="E-Control"
          @click=${(ev: Event) => ev.stopPropagation()}
        >
          <img
            class=${logoClasses}
            src="/ladestellen_austria/e-control_logo.png"
            alt="E-Control"
          />
        </a>
        <span class="attribution-text">${text}</span>
      </div>
    `;
  }

  private _renderHero(
    nearest: Station | undefined,
    farthest: Station | undefined,
    filteredTotal: number,
    rawTotal: number,
  ): TemplateResult {
    if (!nearest) {
      return html`<div class="hero hero--empty">
        <div class="hero-label">${localize("card.no_stations")}</div>
      </div>`;
    }
    const km = this._formatKm(nearest.distance);
    const cityLabel = this._heroCity(nearest);
    const farKm = farthest ? this._formatKm(farthest.distance) : km;
    const rangeText = localize("card.hero_range")
      .replace("{min}", this._formatKm(nearest.distance))
      .replace("{max}", farKm);
    const countText =
      filteredTotal === rawTotal
        ? localize("card.hero_count").replace("{count}", String(filteredTotal))
        : localize("card.hero_count_filtered")
            .replace("{filtered}", String(filteredTotal))
            .replace("{total}", String(rawTotal));
    return html`
      <div class="hero">
        <div class="hero-value">
          <span class="hero-number">${km}</span>
          <span class="hero-unit">km</span>
        </div>
        <div class="hero-context">
          <div class="hero-context-1">
            ${localize("card.hero_context").replace("{city}", cityLabel)}
          </div>
          <div class="hero-context-2">${countText} · ${rangeText}</div>
        </div>
      </div>
    `;
  }

  private _heroCity(station: Station): string {
    return station.city || station.label || "";
  }

  private _renderStation(
    station: Station,
    liveAvailable: boolean,
    isPinned: boolean = false,
  ): TemplateResult {
    const points = station.points ?? [];
    const isDC = points.some((p) => (p.electricityType ?? []).includes("DC"));
    const maxKw = points.reduce((m, p) => Math.max(m, p.capacityKw ?? 0), 0);
    const connectorTokens = Array.from(
      new Set(
        points.flatMap((p) =>
          (p.connectorType ?? []).map((c) =>
            this._shortConnector(c.consumerName, c.key),
          ),
        ),
      ),
    );
    // Cap inline connector chips at 3, roll the rest into a "+N" chip so
    // wide rows stay scannable. The full list still appears in the
    // expanded detail via the original points[] data.
    const visibleConnectors = connectorTokens.slice(0, 3);
    const extraConnectors = connectorTokens.length - visibleConnectors.length;
    const priceText = this._priceText(points);
    const priceIsFree = points.some((p) => p.freeOfCharge);

    const totalPoints = points.length;
    const availPoints = points.filter(
      (p) => this._normStatus(p.status) === "AVAILABLE",
    ).length;
    const stationActive = station.stationStatus === "ACTIVE";
    const tz = this.hass?.config?.time_zone ?? "Europe/Vienna";
    const isOpenNow = this._isOpenNow(station.openingHours, new Date(), tz);
    const level = this._statusLevel(
      liveAvailable,
      stationActive,
      points,
      isOpenNow,
    );

    const expanded = this._expanded.has(station.stationId);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.location.lat},${station.location.lon}`;
    const showAmenities = this.config?.show_amenities ?? true;
    const showPricing = this.config?.show_pricing ?? true;

    const cls = [
      "station",
      expanded ? "expanded" : "",
      isPinned ? "pinned" : "",
      level === "inactive" ? "inactive" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <li
        class=${cls}
        @click=${() => this._toggle(station.stationId)}
        @keydown=${(ev: KeyboardEvent) => this._onKey(ev, station.stationId)}
        tabindex="0"
        role="button"
        aria-expanded=${expanded ? "true" : "false"}
      >
        <div class="station-body">
          <span
            class=${`status-dot status-${level}`}
            aria-label=${this._statusAria(level, availPoints, totalPoints)}
          ></span>
          <div class="station-grid">
            <span class="station-metrics">
              ${isPinned
                ? html`<ha-icon
                    class="pin-indicator"
                    icon="mdi:pin"
                    title=${localize("card.pinned")}
                    aria-label=${localize("card.pinned")}
                  ></ha-icon>`
                : nothing}
              ${maxKw > 0
                ? html`<span
                    class=${isDC ? "metric-kw metric-kw--dc" : "metric-kw"}
                  >
                    <span class="kw-num">${maxKw}</span
                    ><span class="kw-unit">kW</span>
                  </span>`
                : nothing}
              ${visibleConnectors.map(
                (t) => html`<span class="pill plug">${t}</span>`,
              )}
              ${extraConnectors > 0
                ? html`<span class="pill plug plug-more"
                    >+${extraConnectors}</span
                  >`
                : nothing}
            </span>
            ${showPricing && priceText
              ? html`<span
                  class=${priceIsFree
                    ? "metric-price metric-free"
                    : "metric-price"}
                  >${priceText}</span
                >`
              : html`<span class="metric-price-placeholder"></span>`}
            <ha-icon
              class="chevron"
              icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            ></ha-icon>
            <div class="station-name">${station.label}</div>
            <a
              class="station-distance"
              href=${mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label=${localize("card.open_in_maps")}
              title=${localize("card.open_in_maps")}
              @click=${(ev: Event) => ev.stopPropagation()}
            >
              <ha-icon icon="mdi:map-marker-outline"></ha-icon>
              <span class="distance-value">
                ${this._formatKm(station.distance)}<span class="unit"
                  >km</span
                >
              </span>
            </a>
          </div>
        </div>
        ${expanded
          ? this._renderStationDetail(
              station,
              isOpenNow,
              showAmenities,
              mapsUrl,
            )
          : nothing}
      </li>
    `;
  }


  // Expanded-panel layout (top → bottom):
  //   Operator · Ladepunkte (rack [+ fees line]) · Öffnungszeiten (+ live chip)
  //   · Bezahlung · Ausstattung · Adresse · Actions.
  // The single-number "3/4 frei" chip that used to head this panel is gone —
  // the rack carries per-point availability at higher information density, so
  // keeping the chip alongside would have been redundant noise.
  private _renderStationDetail(
    station: Station,
    isOpenNow: boolean | null,
    showAmenities: boolean,
    mapsUrl: string,
  ): TemplateResult {
    const amenities = this._amenityItems(station);
    const points = station.points ?? [];
    const address = this._address(station);
    const paymentChips = this._paymentChips(points);
    const feesLine = this._feesLine(points);
    const operatorName = station.operatorName || station.owner || "";
    return html`
      <div class="detail">
        ${operatorName
          ? html`<div class="operator-line">
              <span class="detail-label">
                ${localize("card.operator_heading")}
              </span>
              <span class="operator-name">${operatorName}</span>
            </div>`
          : nothing}
        ${points.length > 0
          ? html`<div class="detail-section">
              <div class="detail-label">
                ${localize("card.charging_points_heading")}
              </div>
              ${this._renderRack(points)}
              ${feesLine
                ? html`<div class="fees-line">${feesLine}</div>`
                : nothing}
            </div>`
          : nothing}
        ${this._renderOpeningHoursSection(station.openingHours, isOpenNow)}
        ${paymentChips.length > 0
          ? html`<div class="detail-section">
              <div class="detail-label">
                ${localize("card.payment_heading")}
              </div>
              <div class="payment-row">
                ${paymentChips.map(
                  (a) => html`
                    <span class="payment-chip" title=${a.label}>
                      <ha-icon icon=${a.icon}></ha-icon>
                      <span>${a.label}</span>
                    </span>
                  `,
                )}
              </div>
            </div>`
          : nothing}
        ${showAmenities && amenities.length > 0
          ? html`<div class="detail-section">
              <div class="detail-label">
                ${localize("card.amenities_heading")}
              </div>
              <div class="amenities">
                ${amenities.map(
                  (a) => html`
                    <span class="amenity" title=${a.label}>
                      <ha-icon icon=${a.icon}></ha-icon>
                      <span>${a.label}</span>
                    </span>
                  `,
                )}
              </div>
            </div>`
          : nothing}
        ${address
          ? html`<div class="detail-section">
              <div class="detail-label">
                ${localize("card.address_heading")}
              </div>
              <div class="detail-address">${address}</div>
            </div>`
          : nothing}
        <div class="detail-actions">
          <a
            class="action-btn primary"
            href=${mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            @click=${(ev: Event) => ev.stopPropagation()}
          >
            <ha-icon icon="mdi:map-marker-radius-outline"></ha-icon>
            <span>${localize("card.open_in_maps")}</span>
          </a>
          ${station.website
            ? html`<a
                class="action-btn"
                href=${station.website}
                target="_blank"
                rel="noopener noreferrer"
                @click=${(ev: Event) => ev.stopPropagation()}
              >
                <ha-icon icon="mdi:web"></ha-icon>
                <span>${localize("card.website")}</span>
              </a>`
            : nothing}
          ${station.phoneNumber
            ? html`<a
                class="action-btn"
                href=${`tel:${station.phoneCountryCode ?? ""}${station.phoneNumber}`}
                @click=${(ev: Event) => ev.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline"></ha-icon>
                <span>${localize("card.call")}</span>
              </a>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderRack(points: Point[]): TemplateResult {
    return html`
      <div class="rack">
        ${points.map((p) => this._renderRackSlot(p))}
      </div>
    `;
  }

  private _renderRackSlot(point: Point): TemplateResult {
    const powerType = this._pointPowerType(point);
    const statusCat = this._rackSlotStatus(point.status);
    const tooltip = this._pointTooltip(point);
    const ariaLabel = this._pointAriaLabel(point, powerType);
    const badge = powerType
      ? html`<span class="power-badge" data-type=${powerType}
          >${powerType.toUpperCase()}</span
        >`
      : nothing;
    // Out-of-order / faulted / inoperative slots swap their kW + connector
    // for a wrench icon — the electrical spec isn't actionable while the
    // point is down, so showing it adds noise. Power-type badge + status
    // dot stay for consistency with the rest of the rack.
    if (statusCat === "warn") {
      return html`
        <div
          class="rack-slot"
          role="group"
          aria-label=${ariaLabel}
          data-status=${statusCat}
          title=${tooltip}
        >
          <span class="rack-dot status-${statusCat}"></span>
          ${badge}
          <ha-icon
            class="rack-warn-icon"
            icon="mdi:wrench-outline"
          ></ha-icon>
        </div>
      `;
    }
    const connector = this._pointConnectorLabel(point);
    const kwText = this._formatKw(point.capacityKw);
    return html`
      <div
        class="rack-slot"
        role="group"
        aria-label=${ariaLabel}
        data-status=${statusCat}
        title=${tooltip}
      >
        <span class="rack-dot status-${statusCat}"></span>
        ${badge}
        <span class="rack-kw">
          <span class="rack-kw-num">${kwText}</span
          ><span class="rack-kw-unit">kW</span>
        </span>
        <span class="rack-connector">${connector}</span>
      </div>
    `;
  }

  // Screen-reader label for a rack slot — composed from the same signals
  // visible on screen (power-type, kW, connector, localized status) so
  // assistive tech gets parity with sighted users.
  private _pointAriaLabel(
    point: Point,
    powerType: "dc" | "ac" | null,
  ): string {
    const parts: string[] = [];
    if (powerType) parts.push(powerType.toUpperCase());
    if (point.capacityKw) {
      parts.push(`${this._formatKw(point.capacityKw)} kW`);
    }
    const connector = this._pointConnectorLabel(point);
    if (connector && connector !== "–") parts.push(connector);
    const status = this._pointStatusLabel(point.status);
    if (status) parts.push(status);
    return parts.join(" · ");
  }

  // Resolve the slot's AC/DC label from point.electricityType. API emits
  // values like "DC", "AC_1_PHASE", "AC_3_PHASE" — we collapse to two
  // buckets since the phase detail isn't actionable at rack-glance level.
  // Returns null when no recognised value is present.
  private _pointPowerType(point: Point): "dc" | "ac" | null {
    const types = point.electricityType ?? [];
    if (types.some((t) => t === "DC" || t?.startsWith("DC"))) return "dc";
    if (types.some((t) => t?.startsWith("AC"))) return "ac";
    return null;
  }

  // The API is inconsistent with status casing + punctuation: the same
  // "out of order" appears as `OUTOFORDER` in EVN responses but is
  // documented as `OUT_OF_ORDER` in the DATEX II spec. Normalising
  // removes both variants of that trap.
  private _normStatus(status: string): string {
    return (status ?? "").toUpperCase().replace(/_/g, "");
  }

  private _rackSlotStatus(status: string): RackStatus {
    const s = this._normStatus(status);
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
    return "empty";
  }

  private _pointConnectorLabel(point: Point): string {
    const first = (point.connectorType ?? [])[0];
    if (!first) return "–";
    return this._shortConnector(first.consumerName, first.key);
  }

  // Austrian comma decimals; preserves API precision (§3i). 3.7 → "3,7",
  // 22 → "22", 80 → "80". Up to one fractional digit.
  private _formatKw(v: number | undefined): string {
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

  // Raw cent-value formatter — used for blocking-fee rate (e.g. 10,01 ¢/min).
  // Unlike _formatEuro (which divides by 100), this preserves the cent value.
  private _formatCent(value: number): string {
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

  // Tooltip for a rack slot. evseId + localized status + any active fees.
  // Newline-separated; browsers render \n in native title tooltips.
  private _pointTooltip(point: Point): string {
    const lines = [
      `${point.evseId ?? ""} · ${this._pointStatusLabel(point.status)}`.trim(),
    ];
    const startCent = point.startFeeCent ?? 0;
    if (startCent > 0) {
      lines.push(
        `${localize("card.start_fee_label")}: ${this._formatEuro(startCent)} €`,
      );
    }
    const blockCent = point.blockingFeeCentMin ?? 0;
    const blockFrom = point.blockingFeeFromMinute ?? 0;
    if (blockCent > 0 && blockFrom > 0) {
      lines.push(
        `${this._formatCent(blockCent)} ${localize("card.blocking_fee_label").replace("{from}", String(blockFrom))}`,
      );
    }
    return lines.join("\n");
  }

  private _pointStatusLabel(status: string): string {
    if (!status) return "";
    const s = this._normStatus(status);
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

  private _renderOpeningHoursSection(
    hours: OpeningHours[] | undefined,
    isOpenNow: boolean | null,
  ): TemplateResult | typeof nothing {
    if (!hours || hours.length === 0) return nothing;
    const lines = this._formatOpeningHours(hours);
    if (lines.length === 0) return nothing;
    const chipClass =
      isOpenNow === true
        ? "status-ok"
        : isOpenNow === false
          ? "status-inactive"
          : null;
    const chipText =
      isOpenNow === true
        ? localize("card.open_now")
        : isOpenNow === false
          ? localize("card.closed_now")
          : null;
    return html`
      <div class="detail-section">
        <div class="detail-label">
          ${localize("card.opening_hours_heading")}
        </div>
        <div class="hours-row">
          <div class="hours-lines">
            ${lines.map((l) => html`<div class="hours-line">${l}</div>`)}
          </div>
          ${chipText
            ? html`<span class=${`hours-chip ${chipClass ?? ""}`}>
                <span class=${`status-dot ${chipClass ?? ""}`}></span>
                ${chipText}
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _formatOpeningHours(hours: OpeningHours[]): string[] {
    const out: string[] = [];
    for (const h of hours) {
      const line = this._formatSingleRange(h);
      if (line) out.push(line);
    }
    return out;
  }

  private _formatSingleRange(h: OpeningHours): string | null {
    const from = this._shortDay(h.fromWeekday);
    const to = this._shortDay(h.toWeekday);
    if (!from || !to) return null;
    const isFull24h =
      h.fromTime === "00:00" &&
      (h.toTime === "23:59" || h.toTime === "24:00");
    const sameDay = h.fromWeekday === h.toWeekday;
    const dayRange = sameDay ? from : `${from}–${to}`;
    if (isFull24h) {
      return `${dayRange} ${localize("card.always_open_short")}`;
    }
    return `${dayRange} ${h.fromTime}–${h.toTime}`;
  }

  private _shortDay(name: string): string {
    switch ((name ?? "").toUpperCase()) {
      case "MONDAY":
        return localize("weekday.mo");
      case "TUESDAY":
        return localize("weekday.tu");
      case "WEDNESDAY":
        return localize("weekday.we");
      case "THURSDAY":
        return localize("weekday.th");
      case "FRIDAY":
        return localize("weekday.fr");
      case "SATURDAY":
        return localize("weekday.sa");
      case "SUNDAY":
        return localize("weekday.su");
      default:
        return "";
    }
  }

  // Is the station inside any of its opening ranges at `now` (in `tz`)?
  // Returns null when hours are missing or unparseable — callers can then
  // treat the closed-now signal as unknown. Ranges that wrap the week
  // boundary (from > to) are handled via OR, matching the behaviour a
  // single 7-day schedule expects.
  private _isOpenNow(
    hours: OpeningHours[] | undefined,
    now: Date,
    tz: string,
  ): boolean | null {
    if (!hours || hours.length === 0) return null;
    const nowMow = this._minuteOfWeek(now, tz);
    if (nowMow == null) return null;
    for (const h of hours) {
      const fromMow = this._hoursToMow(h.fromWeekday, h.fromTime);
      const toMow = this._hoursToMow(h.toWeekday, h.toTime);
      if (fromMow == null || toMow == null) continue;
      if (fromMow <= toMow) {
        if (nowMow >= fromMow && nowMow <= toMow) return true;
      } else {
        if (nowMow >= fromMow || nowMow <= toMow) return true;
      }
    }
    return false;
  }

  private _minuteOfWeek(now: Date, tz: string): number | null {
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

  private _hoursToMow(dayName: string, time: string): number | null {
    const day = WEEKDAY_NAME_TO_IDX[(dayName ?? "").toUpperCase()];
    if (day === undefined) return null;
    const [hStr, mStr] = (time ?? "").split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
    return day * 1440 + h * 60 + m;
  }

  private _paymentChips(
    points: Point[],
  ): Array<{ icon: string; label: string }> {
    const seen = new Set<string>();
    const out: Array<{ icon: string; label: string }> = [];
    for (const p of points) {
      for (const mode of p.authenticationMode ?? []) {
        if (seen.has(mode)) continue;
        seen.add(mode);
        const mapped = this._authLabel(mode);
        if (mapped) out.push(mapped);
      }
    }
    return out;
  }

  private _authLabel(
    mode: string,
  ): { icon: string; label: string } | null {
    switch (mode) {
      case "APP":
        return { icon: "mdi:cellphone", label: localize("auth.app") };
      case "QR":
        return { icon: "mdi:qrcode", label: localize("auth.qr") };
      case "RFID_READER":
        return {
          icon: "mdi:credit-card-wireless-outline",
          label: localize("auth.rfid"),
        };
      case "CHARGING_CONTRACT":
        return {
          icon: "mdi:handshake-outline",
          label: localize("auth.contract"),
        };
      case "DEBIT_CARD":
        return {
          icon: "mdi:credit-card-outline",
          label: localize("auth.debit"),
        };
      case "CREDIT_CARD":
        return { icon: "mdi:credit-card", label: localize("auth.credit") };
      case "CONTACTLESS_CARD_SUPPORT":
        return {
          icon: "mdi:contactless-payment",
          label: localize("auth.contactless"),
        };
      default:
        return null;
    }
  }

  // One-line fee summary (or null). Uses the max of each extra fee across a
  // station's points — mixed-fee stations are rare and showing a range is
  // noisier than showing the worst case. Hidden when every point is free of
  // extras.
  private _feesLine(points: Point[]): string | null {
    const startFees = points
      .map((p) => p.startFeeCent ?? 0)
      .filter((v) => v > 0);
    const blocking = points
      .map((p) => ({
        cent: p.blockingFeeCentMin ?? 0,
        fromMin: p.blockingFeeFromMinute ?? 0,
      }))
      .filter((v) => v.cent > 0 && v.fromMin > 0);
    const parts: string[] = [];
    if (startFees.length > 0) {
      const maxCent = Math.max(...startFees);
      parts.push(
        `+ ${this._formatEuro(maxCent)} € ${localize("card.start_fee_label")}`,
      );
    }
    if (blocking.length > 0) {
      const maxRate = Math.max(...blocking.map((v) => v.cent));
      const minFrom = Math.min(...blocking.map((v) => v.fromMin));
      parts.push(
        `${this._formatCent(maxRate)} ${localize(
          "card.blocking_fee_label",
        ).replace("{from}", String(minFrom))}`,
      );
    }
    return parts.length > 0 ? parts.join(", ") : null;
  }

  private _statusLevel(
    liveAvailable: boolean,
    stationActive: boolean,
    points: Point[],
    isOpenNow: boolean | null = null,
  ): StatusLevel {
    if (!stationActive) return "inactive";
    // Closed-now greys the row dot regardless of live count — a station
    // with 4/4 free but closed is not actionable. Null isOpenNow means no
    // opening-hours data; treat as always-open for row-status purposes.
    if (isOpenNow === false) return "inactive";
    const total = points.length;
    if (!liveAvailable || total === 0) return "unknown";
    let avail = 0;
    let busy = 0;
    let warn = 0;
    for (const p of points) {
      const s = this._normStatus(p.status);
      if (s === "AVAILABLE") avail++;
      else if (
        s === "CHARGING" ||
        s === "OCCUPIED" ||
        s === "RESERVED" ||
        s === "BLOCKED"
      )
        busy++;
      else if (
        s === "OUTOFORDER" ||
        s === "FAULTED" ||
        s === "INOPERATIVE" ||
        s === "UNAVAILABLE"
      )
        warn++;
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

  private _statusAria(
    level: StatusLevel,
    avail: number,
    total: number,
  ): string {
    if (level === "inactive") return localize("card.inactive");
    if (level === "unknown") return localize("card.status_unknown");
    return `${avail} / ${total} ${localize("card.live_suffix")}`;
  }

  private _toggle(stationId: string): void {
    const next = new Set(this._expanded);
    if (next.has(stationId)) next.delete(stationId);
    else next.add(stationId);
    this._expanded = next;
  }

  private _onKey(ev: KeyboardEvent, stationId: string): void {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._toggle(stationId);
    }
  }

  private _priceText(points: Point[]): string {
    if (points.length === 0) return "";
    if (points.some((p) => p.freeOfCharge)) return localize("card.gratis");
    const kwhPrices = points
      .filter((p) => !p.freeOfCharge && p.priceCentKwh > 0)
      .map((p) => p.priceCentKwh);
    if (kwhPrices.length > 0) {
      return `${this._formatEuro(Math.min(...kwhPrices))} €/kWh`;
    }
    const minPrices = points
      .filter((p) => !p.freeOfCharge && p.priceCentMin > 0)
      .map((p) => p.priceCentMin);
    if (minPrices.length > 0) {
      return `${this._formatEuro(Math.min(...minPrices))} €/min`;
    }
    return "";
  }

  private _formatEuro(cents: number): string {
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

  private _address(station: Station): string {
    const parts: string[] = [];
    if (station.street) parts.push(station.street);
    const loc = [station.postCode, station.city].filter(Boolean).join(" ");
    if (loc) parts.push(loc);
    return parts.join(", ");
  }

  private _amenityItems(
    station: Station,
  ): Array<{ flag: boolean; icon: string; label: string }> {
    return [
      {
        flag: station.greenEnergy,
        icon: "mdi:leaf",
        label: localize("amenities.green_energy"),
      },
      {
        flag: station.freeParking,
        icon: "mdi:parking",
        label: localize("amenities.free_parking"),
      },
      {
        flag: station.roofedParking,
        icon: "mdi:home-roof",
        label: localize("amenities.roofed_parking"),
      },
      {
        flag: station.cateringService,
        icon: "mdi:silverware-fork-knife",
        label: localize("amenities.catering"),
      },
      {
        flag: station.bathroomsAvailable,
        icon: "mdi:toilet",
        label: localize("amenities.bathrooms"),
      },
      {
        flag: station.restingFacilities,
        icon: "mdi:sofa",
        label: localize("amenities.resting"),
      },
    ].filter((i) => i.flag);
  }

  private _formatKm(value: string | number | undefined): string {
    const n =
      typeof value === "number" ? value : parseFloat(String(value ?? ""));
    if (!Number.isFinite(n)) return "–";
    try {
      return new Intl.NumberFormat("de-AT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(n);
    } catch {
      return n.toFixed(2);
    }
  }

  private _shortConnector(consumer: string, key: string): string {
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

  static styles: CSSResultGroup = cardStyles;
}
