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
import type {
  HomeAssistant,
  LovelaceCardEditor,
} from "custom-card-helpers";

import type {
  LadestellenAustriaCardConfig,
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
    const filtered = this._filterStations(allStations);
    // Hero always uses the distance-nearest station — a stable "how far is
    // any charger from me" answer that shouldn't flip when the user
    // resorts the list by power.
    const nearestByDistance = filtered[0];
    const sorted = this._sortStations(filtered);
    const cap = Math.max(1, this.config.max_stations ?? DEFAULT_MAX_STATIONS);
    const visible = sorted.slice(0, cap);
    const farthestShown = visible[visible.length - 1];

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
              ${visible.map((s) => this._renderStation(s, liveAvailable))}
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
    const availPoints = points.filter((p) => p.status === "AVAILABLE").length;
    const stationActive = station.stationStatus === "ACTIVE";
    const level = this._statusLevel(
      liveAvailable,
      stationActive,
      availPoints,
      totalPoints,
    );

    const expanded = this._expanded.has(station.stationId);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.location.lat},${station.location.lon}`;
    const showAmenities = this.config?.show_amenities ?? true;
    const showPricing = this.config?.show_pricing ?? true;

    return html`
      <li
        class=${expanded ? "station expanded" : "station"}
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
              availPoints,
              totalPoints,
              liveAvailable,
              stationActive,
              showAmenities,
              mapsUrl,
            )
          : nothing}
      </li>
    `;
  }


  private _renderStationDetail(
    station: Station,
    availPoints: number,
    totalPoints: number,
    liveAvailable: boolean,
    stationActive: boolean,
    showAmenities: boolean,
    mapsUrl: string,
  ): TemplateResult {
    const amenities = this._amenityItems(station);
    const showStatus = liveAvailable || !stationActive;
    const address = this._address(station);
    // Order within the expanded panel: availability → amenities → address
    // → actions. Address sits second-to-last because tapping the Maps
    // action reveals the location visually anyway — the written address
    // is a supporting reference, not a primary finding.
    return html`
      <div class="detail">
        ${showStatus
          ? html`<div class="detail-section">
              <div class="detail-label">${localize("card.availability")}</div>
              ${this._statusLine(
                liveAvailable,
                stationActive,
                availPoints,
                totalPoints,
              )}
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

  private _statusLevel(
    liveAvailable: boolean,
    stationActive: boolean,
    avail: number,
    total: number,
  ): StatusLevel {
    if (!stationActive) return "inactive";
    if (!liveAvailable || total === 0) return "unknown";
    if (avail === 0) return "busy";
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

  private _statusLine(
    liveAvailable: boolean,
    stationActive: boolean,
    avail: number,
    total: number,
  ): TemplateResult {
    const level = this._statusLevel(liveAvailable, stationActive, avail, total);
    if (level === "inactive") {
      return html`<div class="status-row status-${level}">
        <span class="status-dot status-${level}"></span>
        ${localize("card.inactive")}
      </div>`;
    }
    if (level === "unknown") {
      return html`<div class="status-row status-${level}">
        <span class="status-dot status-${level}"></span>
        ${localize("card.status_unknown")}
      </div>`;
    }
    return html`<div class="status-row status-${level}">
      <span class="status-dot status-${level}"></span>
      ${localize("card.status_count")
        .replace("{avail}", String(avail))
        .replace("{total}", String(total))}
    </div>`;
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
