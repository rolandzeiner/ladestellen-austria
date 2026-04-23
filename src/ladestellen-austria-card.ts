// Ladestellen Austria — Lovelace custom card
// https://github.com/rolandzeiner/ladestellen-austria
//
// Lit 3 + Shadow DOM + Rollup, single-file HACS bundle.
// The header carries the E-Control branding as a clickable link to
// https://www.e-control.at/ — required by §3c of the ladestellen.at Terms
// of Use. The attribution footer reads "Datenquelle: E-Control" verbatim
// per §3d. Both are non-negotiable: removing either puts users in breach
// of the contract they accepted at registration (€10,000 penalty under §9).

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
import { hasConfigOrEntityChanged } from "custom-card-helpers";

import type {
  LadestellenAustriaCardConfig,
  Point,
  Station,
} from "./types";
import { CARD_VERSION } from "./const";
import { localize } from "./localize/localize";
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

  public setConfig(config: LadestellenAustriaCardConfig): void {
    if (!config) {
      throw new Error(localize("common.invalid_configuration"));
    }
    this.config = {
      name: "Ladestellen Austria",
      max_stations: DEFAULT_MAX_STATIONS,
      show_amenities: true,
      show_pricing: true,
      only_available: false,
      only_free: false,
      connector_types: [],
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) return false;
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  public getCardSize(): number {
    const max = this.config?.max_stations ?? DEFAULT_MAX_STATIONS;
    return Math.min(2 + Math.ceil(max / 2), 10);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html`<ha-card><div class="empty-state">${localize("common.loading")}</div></ha-card>`;
    }

    const stateObj = this.config.entity
      ? this.hass.states[this.config.entity]
      : undefined;

    if (!stateObj) {
      return html`
        <ha-card>
          ${this._renderBrandStrip()}
          <div class="empty-state">${localize("card.no_entity")}</div>
          ${this._renderAttribution(undefined)}
        </ha-card>
      `;
    }

    const allStations = (stateObj.attributes["stations"] ?? []) as Station[];
    const liveAvailable =
      (stateObj.attributes["live_status_available"] as boolean) === true;
    const filtered = this._filterStations(allStations);
    const cap = Math.max(1, this.config.max_stations ?? DEFAULT_MAX_STATIONS);
    const visible = filtered.slice(0, cap);
    const nearest = visible[0];

    return html`
      <ha-card>
        ${this._renderBrandStrip()}
        ${this._renderSummary(nearest, filtered.length, allStations.length)}
        ${visible.length > 0
          ? html`<ul class="stations">
              ${visible.map((s) => this._renderStation(s, liveAvailable))}
            </ul>`
          : html`<div class="empty-state">${localize("card.no_stations")}</div>`}
        ${this._renderAttribution(stateObj.attributes["attribution"] as string | undefined)}
      </ha-card>
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

  // §3c — Logo as image-link to www.e-control.at. Styled-text wordmark is a
  // placeholder until the official logo asset is bundled pre-v1.0.0. Link
  // target and attribution intent are already compliant.
  private _renderBrandStrip(): TemplateResult {
    const title = this.config?.name ?? "Ladestellen Austria";
    return html`
      <div class="brand-strip">
        <a
          class="brand-link"
          href="https://www.e-control.at/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="E-Control"
        >
          <span class="brand-logo"><span class="accent">E</span>-CONTROL</span>
        </a>
        <span class="card-title">${title}</span>
      </div>
    `;
  }

  private _renderSummary(
    nearest: Station | undefined,
    filteredTotal: number,
    rawTotal: number,
  ): TemplateResult {
    const km = nearest ? this._formatKm(nearest.distance) : "–";
    const countText =
      filteredTotal === rawTotal
        ? localize("card.station_count").replace("{count}", String(filteredTotal))
        : localize("card.station_count_filtered")
            .replace("{filtered}", String(filteredTotal))
            .replace("{total}", String(rawTotal));
    return html`
      <div class="summary">
        <div class="summary-main">
          <span class="summary-distance">
            ${km}<span class="unit">km</span>
          </span>
          <span class="summary-label">
            ${nearest
              ? localize("card.nearest_label").replace("{label}", nearest.label)
              : localize("card.no_stations")}
          </span>
        </div>
        <span class="summary-count">${countText}</span>
      </div>
    `;
  }

  private _renderStation(
    station: Station,
    liveAvailable: boolean,
  ): TemplateResult {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.location.lat},${station.location.lon}`;
    const points = station.points ?? [];

    const isDC = points.some((p) => (p.electricityType ?? []).includes("DC"));
    const maxKw = points.reduce((m, p) => Math.max(m, p.capacityKw ?? 0), 0);
    const connectorLabel = this._connectorSummary(points);
    const priceText = this._priceText(points);
    const priceIsFree = points.some((p) => p.freeOfCharge);

    const totalPoints = points.length;
    const availPoints = points.filter((p) => p.status === "AVAILABLE").length;
    const stationActive = station.stationStatus === "ACTIVE";

    const address = this._address(station);
    const amenities = this._amenityItems(station);
    const showAmenities = this.config?.show_amenities ?? true;
    const showPricing = this.config?.show_pricing ?? true;

    return html`
      <li
        class="station"
        @click=${(ev: Event) => this._openMaps(ev, mapsUrl)}
        tabindex="0"
        role="button"
      >
        <div class="headline">
          <span class="headline-metrics">
            ${maxKw > 0
              ? html`<span class="metric-kw ${isDC ? "dc" : ""}"
                  >${maxKw}&thinsp;kW</span
                >`
              : nothing}
            ${connectorLabel
              ? html`<span class="dot">·</span
                  ><span class="metric">${connectorLabel}</span>`
              : nothing}
            ${showPricing && priceText
              ? html`<span class="dot">·</span
                  ><span class="metric-price ${priceIsFree ? "free" : ""}"
                    >${priceText}</span
                  >`
              : nothing}
          </span>
          <span class="headline-distance">
            ${this._formatKm(station.distance)}<span class="unit">km</span>
          </span>
        </div>
        <div class="station-name">${station.label}</div>
        ${address
          ? html`<div class="station-address">${address}</div>`
          : nothing}
        ${this._renderStatusLine(
          liveAvailable,
          stationActive,
          availPoints,
          totalPoints,
        )}
        ${showAmenities && amenities.length > 0
          ? html`<div class="amenities">
              ${amenities.map(
                (a) => html`
                  <span
                    class=${a.icon === "mdi:leaf" ? "amenity green" : "amenity"}
                    title=${a.label}
                  >
                    <ha-icon icon=${a.icon}></ha-icon>
                    <span>${a.label}</span>
                  </span>
                `,
              )}
            </div>`
          : nothing}
      </li>
    `;
  }

  private _renderStatusLine(
    liveAvailable: boolean,
    stationActive: boolean,
    avail: number,
    total: number,
  ): TemplateResult | typeof nothing {
    if (!stationActive) {
      return html`<div class="station-status inactive">
        <span class="status-dot"></span>${localize("card.inactive")}
      </div>`;
    }
    if (liveAvailable && total > 0) {
      const cls = avail > 0 ? "ok" : "busy";
      const text = localize("card.live_count")
        .replace("{avail}", String(avail))
        .replace("{total}", String(total));
      return html`<div class="station-status ${cls}">
        <span class="status-dot"></span>${text}
      </div>`;
    }
    return nothing;
  }

  private _connectorSummary(points: Point[]): string {
    const unique = Array.from(
      new Set(
        points.flatMap((p) =>
          (p.connectorType ?? []).map((c) =>
            this._shortConnector(c.consumerName, c.key),
          ),
        ),
      ),
    );
    if (unique.length === 0) return "";
    if (unique.length <= 2) return unique.join(", ");
    return `${unique.slice(0, 2).join(", ")} +${unique.length - 2}`;
  }

  // Show the lowest €/kWh across points, or "Gratis" if any point is free, or
  // €/min for time-billed connectors. Locale-formatted for Austrian users.
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

  private _renderAttribution(attr: string | undefined): TemplateResult {
    const text =
      attr && attr.includes("E-Control") ? attr : ATTRIBUTION_REQUIRED;
    return html`<div class="attribution">${text}</div>`;
  }

  private _openMaps(ev: Event, url: string): void {
    ev.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  }

  private _formatKm(value: string | number | undefined): string {
    const n = typeof value === "number" ? value : parseFloat(String(value ?? ""));
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
