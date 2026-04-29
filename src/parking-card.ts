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
import { carSvg } from "./car-svg";
import { CARD_VERSION } from "./const";
import { localize, setLanguage } from "./localize/localize";
import {
  checkCardVersionWS,
  renderFooter,
  renderVersionBanner,
} from "./shared-render";
import { parkingLotStyles } from "./styles";
import {
  formatKw,
  pointConnectorLabel,
  pointPowerType,
  pointStatusLabel,
  rackSlotStatus,
  slotStatusShortKey,
  slotVariant,
  type RackStatus,
} from "./utils";

import "./parking-editor";

window.customCards = window.customCards ?? [];
window.customCards.push({
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
  // Slots whose info-overlay is currently revealed by tap. Hover already
  // reveals on desktop via CSS :hover; this set covers touch devices
  // where :hover isn't a reliable interaction model. Toggling adds/
  // removes the slot's evseId; identity comparison in shouldUpdate.
  @state() private _revealedSlots: Set<string> = new Set();
  @state() private _versionMismatch: string | null = null;
  private _versionCheckDone = false;

  public setConfig(config: ParkingLotCardConfig): void {
    if (!config) {
      throw new Error(localize("common.invalid_configuration"));
    }
    if (config.entity !== undefined && typeof config.entity !== "string") {
      throw new Error(localize("common.invalid_entity"));
    }
    if (config.station_id !== undefined && typeof config.station_id !== "string") {
      throw new Error(localize("common.invalid_station_id"));
    }
    // Spread defaults first so reads can be plain (no `?? true` /
    // `!== false` scattered through render). Mirrors the list card's
    // setConfig policy — both cards now share one shape.
    this.config = {
      hide_header: false,
      show_free_count: true,
      logo_adapt_to_theme: false,
      car_color_mode: "random",
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    // setConfig is called synchronously before mount; this.config is
    // non-null by the time any property change can fire shouldUpdate.
    if (changedProps.has("config") || changedProps.has("_revealedSlots")) {
      return true;
    }
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

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    if (changedProps.has("hass")) {
      setLanguage(this.hass?.language);
    }
  }

  protected render(): TemplateResult {
    if (!this._versionCheckDone && this.hass) {
      this._versionCheckDone = true;
      void checkCardVersionWS(this.hass).then((mismatch) => {
        if (mismatch) this._versionMismatch = mismatch;
      });
    }

    if (!this.hass || !this.config) {
      return html`<ha-card>
        <div class="card-content">
          <div class="wrap">
            ${renderVersionBanner(this._versionMismatch)}
            <div class="empty-state">${localize("common.loading")}</div>
          </div>
        </div>
      </ha-card>`;
    }

    const stateObj = this.config.entity
      ? this.hass.states[this.config.entity]
      : undefined;

    if (!stateObj) {
      return html`<ha-card>
        <div class="card-content">
          <div class="wrap">
            ${renderVersionBanner(this._versionMismatch)}
            <div class="empty-state">${localize("card.no_entity")}</div>
          </div>
          ${renderFooter(
            this.hass,
            undefined,
            this.config?.logo_adapt_to_theme === true,
          )}
        </div>
      </ha-card>`;
    }

    const stations = (stateObj.attributes["stations"] ?? []) as Station[];
    const stationId = this.config.station_id ?? "";
    const station = stations.find((s) => s.stationId === stationId);

    const customTitle = this.config.name;

    if (!stationId || !station) {
      return html`<ha-card>
        <div class="card-content">
          <div class="wrap">
            ${renderVersionBanner(this._versionMismatch)}
            ${customTitle && !this.config.hide_header
              ? html`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h3 class="title">${customTitle}</h3>
                  </div>
                </header>`
              : nothing}
            <div class="empty-state">
              ${!stationId
                ? localize("parking.no_station_selected")
                : localize("parking.station_not_found")}
            </div>
          </div>
          ${renderFooter(
            this.hass,
            stateObj.attributes["attribution"] as string | undefined,
            this.config.logo_adapt_to_theme === true,
          )}
        </div>
      </ha-card>`;
    }

    // Coordinator already sorts each station's points by the trailing
    // EMSP-ID ordinal — see _evse_sort_key in coordinator.py. We just
    // consume the array order.
    const points = station.points ?? [];
    const availCount = points.filter(
      (p) => rackSlotStatus(p.status) === "ok",
    ).length;
    const totalCount = points.length;
    const countText = localize("parking.available_count")
      .replace("{avail}", String(availCount))
      .replace("{total}", String(totalCount));

    const headerTitle = customTitle ?? station.label;
    const headerSubtitle = customTitle ? station.label : "";

    return html`
      <ha-card>
        <div class="card-content">
          <div
            class="wrap"
            style="--lade-accent: var(--primary-color);"
          >
            ${renderVersionBanner(this._versionMismatch)}
            ${this.config.hide_header
              ? nothing
              : html`<header class="header">
                  <div class="icon-tile" aria-hidden="true">
                    <ha-icon icon="mdi:ev-station"></ha-icon>
                  </div>
                  <div class="header-text">
                    <h3 class="title">${headerTitle}</h3>
                    ${headerSubtitle
                      ? html`<p class="subtitle">${headerSubtitle}</p>`
                      : nothing}
                  </div>
                  ${this.config.show_free_count !== false
                    ? html`<div
                        class=${availCount > 0
                          ? "header-count has-free"
                          : "header-count"}
                        aria-label=${countText}
                      >
                        <div class="header-count-value">
                          <span
                            class="header-count-num"
                            role="status"
                            aria-live="polite"
                            >${availCount}</span
                          >
                          <span class="header-count-of">/ ${totalCount}</span>
                        </div>
                        <div class="header-count-label">
                          ${localize("parking.slot_status_free")}
                        </div>
                      </div>`
                    : nothing}
                </header>`}
            ${points.length === 0
              ? html`<div class="empty-state">
                  ${localize("parking.no_points")}
                </div>`
              : html`<div class="rack-block">
                  <div
                    class="parking-lot"
                    role="list"
                    aria-label=${countText}
                  >
                    ${points.map((p) => this._renderSlot(p))}
                  </div>
                </div>`}
          </div>
          ${renderFooter(
            this.hass,
            stateObj.attributes["attribution"] as string | undefined,
            this.config.logo_adapt_to_theme === true,
          )}
        </div>
      </ha-card>
    `;
  }

  private _renderSlot(point: Point): TemplateResult {
    const variant = slotVariant(point);
    const {
      bucket: statusCat,
      isAvailable,
      isBusy,
      isWarn,
      overlay,
      showCar,
      showOverlayIcon,
    } = variant;
    const powerType = pointPowerType(point);
    const connector = pointConnectorLabel(point);
    const kwText = formatKw(point.capacityKw);
    const statusLabel = pointStatusLabel(point.status);
    // colorBucket: drives the slot-status-{free|busy|warn|unknown}
    // text colour class — kept bucket-coarse so RESERVED / BLOCKED
    // still read red, OUT_OF_ORDER family still reads orange, etc.
    const colorBucket = this._slotStatusBucket(statusCat);
    // shortKey: drives the displayed word per-status (parking.slot_
    // status_reserved / _out_of_stock / _planned / …) so users see
    // "reserviert" instead of the bucket "belegt".
    const shortKey = slotStatusShortKey(point.status);
    const hasOverlay = showCar || showOverlayIcon;
    const isRevealed = hasOverlay && this._revealedSlots.has(point.evseId);
    const slotClass = isAvailable
      ? "is-available"
      : isBusy
        ? "is-busy"
        : isWarn
          ? "is-warn"
          : "is-unknown";
    const aria = [
      powerType ? powerType.toUpperCase() : null,
      point.capacityKw ? `${kwText} kW` : null,
      connector && connector !== "–" ? connector : null,
      statusLabel,
    ]
      .filter(Boolean)
      .join(" · ");
    const carColor = showCar ? this._carColor(point.evseId) : null;
    const cls = [
      "parking-slot",
      slotClass,
      hasOverlay ? "has-overlay" : "",
      showCar ? "has-car" : "",
      showOverlayIcon ? "has-icon" : "",
      overlay?.bgTint ? `slot-tint-${overlay.bgTint}` : "",
      isRevealed ? "is-revealed" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return html`
      <button
        type="button"
        class=${cls}
        data-status=${statusCat}
        role="listitem"
        tabindex=${hasOverlay ? "0" : "-1"}
        aria-label=${aria}
        aria-pressed=${hasOverlay ? (isRevealed ? "true" : "false") : nothing}
        title=${`${point.evseId ?? ""} · ${statusLabel}`.trim()}
        @click=${(ev: Event) => {
          ev.preventDefault();
          if (hasOverlay) this._toggleSlot(point.evseId);
        }}
      >
        ${showCar && carColor
          ? html`<span
              class="slot-car"
              aria-hidden="true"
              style=${`--slot-car-color: ${carColor};`}
            >
              ${carSvg()}
            </span>`
          : nothing}
        ${overlay
          ? html`<span
              class="slot-overlay-icon tone-${overlay.tone}"
              aria-hidden="true"
            >
              <ha-icon icon=${overlay.icon}></ha-icon>
            </span>`
          : nothing}
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
          <span class="slot-status-word slot-status-${colorBucket}"
            >${this._slotStatusWord(shortKey, statusLabel)}</span
          >
        </span>
      </button>
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

  private _toggleSlot(evseId: string): void {
    if (!evseId) return;
    const next = new Set(this._revealedSlots);
    if (next.has(evseId)) next.delete(evseId);
    else next.add(evseId);
    this._revealedSlots = next;
  }

  // Per-slot car colour — three sources picked via config.car_color_mode:
  //   "theme" → every car uses the dashboard's --primary-color
  //   "fixed" → every car uses the user-picked hex car_color_fixed
  //   "random" (default) → deterministic per-EVSE pick from a 10-hue
  //     palette. Stable across re-renders because it hashes the EVSE id
  //     so the same car always shows up in the same colour.
  private _carColor(evseId: string): string {
    const mode = this.config?.car_color_mode ?? "random";
    if (mode === "theme") {
      return "var(--primary-color)";
    }
    if (mode === "fixed") {
      return this.config?.car_color_fixed || "var(--primary-color)";
    }
    const palette = [
      "#e63946", // red
      "#1d4ed8", // blue
      "#15803d", // green
      "#facc15", // yellow
      "#fb923c", // orange
      "#ec4899", // pink
      "#0e7490", // teal
      "#6b21a8", // purple
      "#1f2937", // graphite
      "#e5e7eb", // pearl white
    ];
    const id = evseId ?? "";
    let h = 0;
    for (let i = 0; i < id.length; i++) {
      h = (h * 31 + id.charCodeAt(i)) >>> 0;
    }
    return palette[h % palette.length] ?? "#1f2937";
  }

  // Top-down car SVG lives in src/car-svg.ts; the wrapper here just
  // pipes the per-slot colour through `--slot-car-color` so the SVG
  // stays static.

  // Footer rendering lives in shared-render.ts; both cards share it.

  static styles: CSSResultGroup = parkingLotStyles;
}
