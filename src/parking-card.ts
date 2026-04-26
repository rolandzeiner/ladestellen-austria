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
  slotOverlayIcon,
  slotStatusShortKey,
  type RackStatus,
} from "./utils";

import "./parking-editor";

// §3d of the ladestellen.at Terms of Use requires this exact string shown
// "unmittelbar bei den von der E-Control angezeigten Daten". Do not edit.
// Duplicated verbatim from the list card so the parking card stays
// independent (no cross-card import). §3c likewise requires the
// E-Control logo link rendered alongside.
const ATTRIBUTION_REQUIRED = "Datenquelle: E-Control";

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
  // Slots whose info-overlay is currently revealed by tap. Hover already
  // reveals on desktop via CSS :hover; this set covers touch devices
  // where :hover isn't a reliable interaction model. Toggling adds/
  // removes the slot's evseId; identity comparison in shouldUpdate.
  @state() private _revealedSlots: Set<string> = new Set();

  public setConfig(config: ParkingLotCardConfig): void {
    if (!config) {
      throw new Error(localize("common.invalid_configuration"));
    }
    this.config = { ...config };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) return false;
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

  protected render(): TemplateResult {
    setLanguage(this.hass?.language);

    if (!this.hass || !this.config) {
      return html`<ha-card>
        <div class="card-content">
          <div class="wrap">
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
            <div class="empty-state">${localize("card.no_entity")}</div>
          </div>
          ${this._renderFooter(undefined)}
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
            ${customTitle
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
          ${this._renderFooter(
            stateObj.attributes["attribution"] as string | undefined,
          )}
        </div>
      </ha-card>`;
    }

    // Slot order: sort by the trailing segment of the EVSE-ID — the
    // per-station point index the operator issued (e.g. *VIE*E5055*1
    // before *VIE*E5055*2). This follows the operator's own signal
    // rather than overriding it (ToU §3i — display data as it's
    // transmitted), and gives users a stable reading direction in
    // place of arbitrary array-position order. Falls back to lexical
    // compare on the full EVSE-ID when the trailing segment isn't
    // numeric.
    const points = (station.points ?? []).slice().sort((a, b) => {
      const ai = parseInt(
        (a.evseId ?? "").split("*").pop() ?? "",
        10,
      );
      const bi = parseInt(
        (b.evseId ?? "").split("*").pop() ?? "",
        10,
      );
      if (Number.isFinite(ai) && Number.isFinite(bi)) return ai - bi;
      return (a.evseId ?? "").localeCompare(b.evseId ?? "");
    });
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
            style="--nb-accent: var(--primary-color);"
          >
            <header class="header">
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
                    role="status"
                    aria-live="polite"
                    aria-label=${countText}
                  >
                    <div class="header-count-value">
                      <span class="header-count-num">${availCount}</span>
                      <span class="header-count-of">/ ${totalCount}</span>
                    </div>
                    <div class="header-count-label">
                      ${localize("parking.slot_status_free")}
                    </div>
                  </div>`
                : nothing}
            </header>
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
          ${this._renderFooter(
            stateObj.attributes["attribution"] as string | undefined,
          )}
        </div>
      </ha-card>
    `;
  }

  private _renderSlot(point: Point): TemplateResult {
    const statusCat: RackStatus = rackSlotStatus(point.status);
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
    const isAvailable = statusCat === "ok";
    const isBusy = statusCat === "busy";
    const isWarn = statusCat === "warn";
    // Per-status icon overlay (RESERVED / BLOCKED / OUT_OF_ORDER family /
    // OUT_OF_STOCK / PLANNED / REMOVED / UNKNOWN). When set, the icon
    // overrides the car: RESERVED/BLOCKED still tint the slot busy but
    // get their own icon since they aren't physically occupied. CHARGING
    // and OCCUPIED return null here so the SVG car keeps rendering.
    const overlay = slotOverlayIcon(point.status);
    const showCar = isBusy && !overlay;
    const showOverlayIcon = overlay !== null;
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
          ? html`<span class="slot-car" aria-hidden="true">
              ${this._renderCarSvg(carColor)}
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
    return palette[h % palette.length];
  }

  // Top-down vector car. Body filled with the per-slot colour; smoked
  // glass for windshield + rear window; pale headlights at the top,
  // red taillights at the bottom; little side mirrors. Sits inside a
  // .slot-car overlay that fades out on hover/focus/reveal.
  private _renderCarSvg(color: string): TemplateResult {
    // Body + mirror fills go through inline-style so a CSS variable
    // (e.g. theme mode → "var(--primary-color)") resolves correctly.
    // SVG attribute-fill won't compute CSS vars; inline style does.
    const bodyFill = `fill: ${color};`;
    return html`
      <svg
        viewBox="0 0 50 90"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="2"
          width="44"
          height="86"
          rx="10"
          style=${bodyFill}
        />
        <path
          d="M10 18 Q25 14 40 18 L37 36 L13 36 Z"
          fill="rgba(15,20,35,0.7)"
        />
        <path
          d="M13 54 L37 54 L40 70 Q25 74 10 70 Z"
          fill="rgba(15,20,35,0.65)"
        />
        <circle cx="14" cy="9" r="2" fill="#fff8c5" />
        <circle cx="36" cy="9" r="2" fill="#fff8c5" />
        <circle cx="14" cy="81" r="2" fill="#e63946" />
        <circle cx="36" cy="81" r="2" fill="#e63946" />
        <rect
          x="1"
          y="22"
          width="3"
          height="5"
          rx="1"
          style=${bodyFill}
        />
        <rect
          x="46"
          y="22"
          width="3"
          height="5"
          rx="1"
          style=${bodyFill}
        />
      </svg>
    `;
  }

  // §3c + §3d compliance: E-Control brand link on the left, "Datenquelle:
  // E-Control" attribution on the right. Hard-coded ATTRIBUTION_REQUIRED
  // fallback in case a user's template sensor strips the upstream
  // attribute. Mirrors the list card's footer one-for-one.
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
            src="/ladestellen_austria/e-control_logo.svg"
            alt="E-Control"
          />
        </a>
        <span class="attribution-text">${text}</span>
      </div>
    `;
  }

  static styles: CSSResultGroup = parkingLotStyles;
}
