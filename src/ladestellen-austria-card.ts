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
  Station,
  Point,
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
      (e) =>
        e.startsWith("sensor.") && e.includes("ladestelle"),
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
    const filtered = this._filterStations(allStations);
    const cap = Math.max(1, this.config.max_stations ?? DEFAULT_MAX_STATIONS);
    const visible = filtered.slice(0, cap);
    const nearest = visible[0];

    return html`
      <ha-card>
        ${this._renderBrandStrip()}
        ${this._renderSummary(nearest, filtered.length, allStations.length)}
        ${visible.length > 0
          ? html`<ul class="stations">${visible.map((s) => this._renderStation(s))}</ul>`
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
        const hasActive = s.stationStatus === "ACTIVE"
          && (s.points ?? []).some((p) => p.status === "AVAILABLE");
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
        <div>
          <div class="summary-distance">
            ${km}<span class="unit">km</span>
          </div>
          <div class="summary-count">
            ${nearest
              ? localize("card.nearest_label").replace("{label}", nearest.label)
              : localize("card.no_stations")}
          </div>
        </div>
        <div class="summary-count">${countText}</div>
      </div>
    `;
  }

  private _renderStation(station: Station): TemplateResult {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.location.lat},${station.location.lon}`;
    const points = station.points ?? [];
    const uniqueConnectorNames = Array.from(
      new Set(
        points.flatMap((p) =>
          (p.connectorType ?? []).map((c) =>
            this._shortConnector(c.consumerName, c.key),
          ),
        ),
      ),
    );
    const isDC = points.some((p) => (p.electricityType ?? []).includes("DC"));
    const maxKw = points.reduce((m, p) => Math.max(m, p.capacityKw ?? 0), 0);
    const anyAvailable = points.some((p) => p.status === "AVAILABLE");
    const active = station.stationStatus === "ACTIVE" && anyAvailable;
    const showAmenities = this.config?.show_amenities ?? true;
    const showPricing = this.config?.show_pricing ?? true;
    const priceChip = showPricing ? this._pricingChip(points) : null;

    return html`
      <li
        class="station"
        @click=${(ev: Event) => this._openMaps(ev, mapsUrl)}
        tabindex="0"
        role="button"
      >
        <div class="station-row-1">
          <span class="station-label">${station.label}</span>
          <span class="station-distance">${this._formatKm(station.distance)} km</span>
        </div>
        <div class="station-row-2">
          <span>${station.postCode} ${station.city}</span>
          ${maxKw > 0 ? html`<span class="chip power">${maxKw} kW</span>` : nothing}
          ${isDC ? html`<span class="chip dc">DC</span>` : nothing}
          ${uniqueConnectorNames.map((n) => html`<span class="chip">${n}</span>`)}
          ${priceChip}
          ${!active
            ? html`<span class="chip inactive">${localize("card.inactive")}</span>`
            : nothing}
          ${showAmenities ? this._renderAmenities(station) : nothing}
        </div>
      </li>
    `;
  }

  // Pricing chip: shows the lowest €/kWh across points, or "Gratis" if any
  // point is freeOfCharge. A point with priceCentMin > 0 and priceCentKwh === 0
  // is time-billed — show the per-minute cost with "/min" suffix instead.
  private _pricingChip(points: Point[]): TemplateResult | typeof nothing {
    if (points.length === 0) return nothing;
    if (points.some((p) => p.freeOfCharge)) {
      return html`<span class="chip free">${localize("card.gratis")}</span>`;
    }
    const kwhPrices = points
      .filter((p) => !p.freeOfCharge && p.priceCentKwh > 0)
      .map((p) => p.priceCentKwh);
    if (kwhPrices.length > 0) {
      const minKwh = Math.min(...kwhPrices);
      return html`<span class="chip price">${(minKwh / 100).toFixed(2)} €/kWh</span>`;
    }
    const minPrices = points
      .filter((p) => !p.freeOfCharge && p.priceCentMin > 0)
      .map((p) => p.priceCentMin);
    if (minPrices.length > 0) {
      const minPrice = Math.min(...minPrices);
      return html`<span class="chip price">${(minPrice / 100).toFixed(2)} €/min</span>`;
    }
    return nothing;
  }

  private _renderAmenities(station: Station): TemplateResult {
    const items: Array<{ flag: boolean; icon: string; label: string }> = [
      { flag: station.greenEnergy, icon: "mdi:leaf", label: localize("amenities.green_energy") },
      { flag: station.freeParking, icon: "mdi:parking", label: localize("amenities.free_parking") },
      { flag: station.roofedParking, icon: "mdi:home-roof", label: localize("amenities.roofed_parking") },
      { flag: station.cateringService, icon: "mdi:silverware-fork-knife", label: localize("amenities.catering") },
      { flag: station.bathroomsAvailable, icon: "mdi:toilet", label: localize("amenities.bathrooms") },
      { flag: station.restingFacilities, icon: "mdi:sofa", label: localize("amenities.resting") },
    ];
    return html`
      ${items
        .filter((i) => i.flag)
        .map(
          (i) => html`
            <span class="amenity" title=${i.label}>
              <ha-icon icon=${i.icon}></ha-icon>
            </span>
          `,
        )}
    `;
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
    return n.toFixed(2);
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
