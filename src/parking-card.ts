// Ladestellen Austria — single-station "parking lot from above" card.
//
// Ships in the same Rollup bundle as the main list card. Registers its
// own @customElement + window.customCards entry so Lovelace's "Add Card"
// picker shows both. The user picks one sensor + one station; the card
// renders every point as a parking slot viewed from above, with
// painted-lane separators and an asphalt-tinted surface. AVAILABLE
// points stand out, non-available ones are muted so the "where can I
// plug in right now" reading is instant.

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
  type HomeAssistant,
  type LovelaceCardEditor,
} from "custom-card-helpers";

import type {
  ParkingLotCardConfig,
  Point,
  Station,
} from "./types";
import { localize, setLanguage } from "./localize/localize";
import { parkingLotStyles } from "./styles";
import {
  formatKw,
  pointConnectorLabel,
  pointPowerType,
  pointStatusLabel,
  rackSlotStatus,
  type RackStatus,
} from "./utils";

import "./parking-editor";

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
  type: "ladestellen-austria-parking-card",
  name: "Ladestellen Austria — Parking",
  description:
    "Single station, points rendered as parking slots viewed from above.",
  preview: true,
  documentationURL: "https://github.com/rolandzeiner/ladestellen-austria",
});

@customElement("ladestellen-austria-parking-card")
export class LadestellenAustriaParkingCard extends LitElement {
  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement(
      "ladestellen-austria-parking-card-editor",
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    _hass: HomeAssistant,
    entities: string[],
  ): Record<string, unknown> {
    const found = entities.find(
      (e) => e.startsWith("sensor.") && e.includes("ladestelle"),
    );
    return { entity: found ?? "", station_id: "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ParkingLotCardConfig;

  public setConfig(config: ParkingLotCardConfig): void {
    if (!config) {
      throw new Error(localize("common.invalid_configuration"));
    }
    this.config = { ...config };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) return false;
    if (changedProps.has("config")) return true;
    const prev = changedProps.get("hass") as HomeAssistant | undefined;
    if (!prev || !this.config.entity) return true;
    return (
      prev.states[this.config.entity] !== this.hass.states[this.config.entity]
    );
  }

  public getCardSize(): number {
    // Rough: header row (1) + slot grid (~2-4 rows depending on point
    // count). Most stations have 2-4 points → 1-2 slot rows.
    return 3;
  }

  public getGridOptions(): {
    columns: number | "full";
    rows: number | "auto";
    min_columns: number;
    min_rows: number;
  } {
    return {
      columns: 6,
      rows: "auto",
      min_columns: 4,
      min_rows: 3,
    };
  }

  protected render(): TemplateResult {
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
      return html`<ha-card>
        <div class="empty-state">${localize("card.no_entity")}</div>
      </ha-card>`;
    }

    const stations = (stateObj.attributes["stations"] ?? []) as Station[];
    const stationId = this.config.station_id ?? "";
    const station = stations.find((s) => s.stationId === stationId);

    const customTitle = this.config.name;

    if (!stationId || !station) {
      return html`<ha-card>
        ${customTitle
          ? html`<div class="parking-title">${customTitle}</div>`
          : nothing}
        <div class="empty-state">
          ${!stationId
            ? localize("parking.no_station_selected")
            : localize("parking.station_not_found")}
        </div>
      </ha-card>`;
    }

    const points = station.points ?? [];
    const availCount = points.filter(
      (p) => rackSlotStatus(p.status) === "ok",
    ).length;
    const totalCount = points.length;
    const countText = localize("parking.available_count")
      .replace("{avail}", String(availCount))
      .replace("{total}", String(totalCount));

    return html`
      <ha-card>
        <header class="parking-header">
          <div class="parking-title-group">
            ${customTitle
              ? html`<h3 class="parking-title">${customTitle}</h3>`
              : nothing}
            <div class="parking-station-label">${station.label}</div>
          </div>
          <div
            class=${availCount > 0
              ? "parking-count parking-count--ok"
              : "parking-count"}
            role="status"
            aria-live="polite"
          >
            ${countText}
          </div>
        </header>
        ${points.length === 0
          ? html`<div class="empty-state">
              ${localize("parking.no_points")}
            </div>`
          : html`<div
              class="parking-lot"
              role="list"
              aria-label=${countText}
            >
              ${points.map((p) => this._renderSlot(p))}
            </div>`}
      </ha-card>
    `;
  }

  private _renderSlot(point: Point): TemplateResult {
    const statusCat: RackStatus = rackSlotStatus(point.status);
    const powerType = pointPowerType(point);
    const connector = pointConnectorLabel(point);
    const kwText = formatKw(point.capacityKw);
    const statusLabel = pointStatusLabel(point.status);
    const statusBucket = this._slotStatusBucket(statusCat);
    const isAvailable = statusCat === "ok";
    const aria = [
      powerType ? powerType.toUpperCase() : null,
      point.capacityKw ? `${kwText} kW` : null,
      connector && connector !== "–" ? connector : null,
      statusLabel,
    ]
      .filter(Boolean)
      .join(" · ");
    return html`
      <div
        class=${`parking-slot ${isAvailable ? "is-available" : "is-muted"}`}
        data-status=${statusCat}
        role="listitem"
        aria-label=${aria}
        title=${`${point.evseId ?? ""} · ${statusLabel}`.trim()}
      >
        <span class="slot-inner">
          ${powerType
            ? html`<span
                class="slot-power-badge"
                data-type=${powerType}
                >${powerType.toUpperCase()}</span
              >`
            : nothing}
          <span class="slot-kw">
            <span class="slot-kw-num">${kwText}</span
            ><span class="slot-kw-unit">kW</span>
          </span>
          <span class="slot-connector">${connector}</span>
          <span class="slot-status-word slot-status-${statusBucket}"
            >${this._slotStatusWord(statusBucket, statusLabel)}</span
          >
        </span>
      </div>
    `;
  }

  // Which localize key bucket to use for the bottom-of-slot status word.
  // Short labels ("frei" / "lädt" / "kaputt" / "unbekannt") read better
  // at slot size than the full status label.
  private _slotStatusBucket(status: RackStatus): string {
    switch (status) {
      case "ok":
        return "free";
      case "busy":
        return "busy";
      case "warn":
        return "warn";
      case "unknown":
        return "unknown";
      default:
        return "unknown";
    }
  }

  private _slotStatusWord(bucket: string, fallback: string): string {
    const key = `parking.slot_status_${bucket}`;
    const resolved = localize(key);
    return resolved === key ? fallback : resolved;
  }

  static styles: CSSResultGroup = parkingLotStyles;
}
