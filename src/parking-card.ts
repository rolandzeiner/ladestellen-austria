// Ladestellen Austria — single-station "parking lot from above" card.
//
// Ships in the same Rolldown bundle as the main list card. Registers its
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

import type {
  HomeAssistant,
  LovelaceCardEditor,
  ParkingLotCardConfig,
  Point,
  Station,
} from "./types";
import { carSvg } from "./car-svg";
import { localize } from "./localize/localize";
import { renderFooter, renderVersionBanner } from "./shared-render";
import {
  entitySuggestionFor,
  findStubEntity,
  runVersionCheckOnce,
  shouldUpdateForEntityState,
  syncCardLanguage,
} from "./card-lifecycle";
import { parkingLotStyles } from "./styles";
import {
  formatKw,
  pointConnectorLabel,
  pointPowerType,
  pointStatusLabel,
  rackSlotStatus,
  slotAriaLabel,
  slotClassList,
  slotStatusBucket,
  slotStatusShortKey,
  slotStatusWord,
  slotVariant,
  type SlotOverlay,
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
  getEntitySuggestion: entitySuggestionFor(
    "custom:ladestellen-austria-parking-card",
  ),
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
    return { entity: findStubEntity(entities), station_id: "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: ParkingLotCardConfig;
  // Slots whose info-overlay is currently revealed by tap. Hover already
  // reveals on desktop via CSS :hover; this set covers touch devices
  // where :hover isn't a reliable interaction model. Toggling adds/
  // removes the slot's evseId; identity comparison in shouldUpdate.
  @state() private _revealedSlots: Set<string> = new Set();
  @state() private _versionMismatch: string | null = null;

  public setConfig(config: ParkingLotCardConfig): void {
    if (!config || typeof config !== "object") {
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
      asphalt_style: "default",
      paint_width: "medium",
      icon_paint_mode: "default",
      ...config,
    };
  }

  protected override shouldUpdate(changedProps: PropertyValues): boolean {
    // setConfig is called synchronously before mount; this.config is
    // non-null by the time any property change can fire shouldUpdate.
    if (
      changedProps.has("config") ||
      changedProps.has("_revealedSlots") ||
      changedProps.has("_versionMismatch")
    ) {
      return true;
    }
    return shouldUpdateForEntityState(
      changedProps,
      this.hass,
      this.config.entity,
    );
  }

  public getCardSize(): number {
    // Fixed estimate: header + a small slot grid. Most stations have only
    // a handful of points, so 3 is a reasonable constant — getCardSize is
    // a layout hint, not a measured value.
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

  protected override willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    syncCardLanguage(changedProps, this.hass);
  }

  protected override firstUpdated(_changedProps: PropertyValues): void {
    this._runVersionCheck();
  }

  protected override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // Also here, not just firstUpdated, in case `hass` arrives after the
    // first update; runVersionCheckOnce makes the repeat call a no-op.
    if (changedProps.has("hass")) this._runVersionCheck();
  }

  private _runVersionCheck(): void {
    runVersionCheckOnce(this, (v) => {
      this._versionMismatch = v;
    });
  }

  /**
   * The chrome every render branch shares: `ha-card > card-content >
   * .wrap`, the three appearance data-attributes, and the version
   * banner.
   *
   * All four branches used to carry their own copy of this, which is
   * where twelve of render()'s decision points came from — three `??`
   * defaults per copy. Optional-chaining `config` covers the
   * before-setConfig branch and is harmless in the other three.
   */
  private _renderShell(
    body: unknown,
    opts: { footer?: TemplateResult; accent?: boolean } = {},
  ): TemplateResult {
    return html`
      <ha-card>
        <div class="card-content">
          <div
            class="wrap"
            style=${opts.accent
              ? "--lade-accent: var(--primary-color);"
              : nothing}
            data-asphalt-style=${this.config?.asphalt_style ?? "default"}
            data-paint-width=${this.config?.paint_width ?? "medium"}
            data-icon-paint=${this.config?.icon_paint_mode ?? "default"}
          >
            ${renderVersionBanner(this._versionMismatch)} ${body}
          </div>
          ${opts.footer ?? nothing}
        </div>
      </ha-card>
    `;
  }

  private _cardFooter(attribution?: string): TemplateResult {
    return renderFooter(
      this.hass,
      attribution,
      this.config?.logo_adapt_to_theme === true,
    );
  }

  /**
   * Station header. `count` is passed only when the free-slot counter
   * should show, so the show_free_count decision stays at the call site
   * where the counts are already in scope.
   */
  private _renderHeader(
    title: string,
    subtitle = "",
    count?: { avail: number; total: number; label: string },
  ): TemplateResult {
    return html`<header class="header">
      <div class="icon-tile" aria-hidden="true">
        <ha-icon icon="mdi:ev-station"></ha-icon>
      </div>
      <div class="header-text">
        <h3 class="title">${title}</h3>
        ${subtitle ? html`<p class="subtitle">${subtitle}</p>` : nothing}
      </div>
      ${count
        ? html`<div
            class=${count.avail > 0 ? "header-count has-free" : "header-count"}
            aria-label=${count.label}
          >
            <div class="header-count-value">
              <span class="header-count-num" role="status" aria-live="polite"
                >${count.avail}</span
              >
              <span class="header-count-of">/ ${count.total}</span>
            </div>
            <div class="header-count-label">
              ${localize("parking.slot_status_free")}
            </div>
          </div>`
        : nothing}
    </header>`;
  }

  private _renderLot(points: Point[], countText: string): TemplateResult {
    if (points.length === 0) {
      return html`<div class="empty-state">
        ${localize("parking.no_points")}
      </div>`;
    }
    return html`<div class="rack-block">
      <div class="parking-lot" role="group" aria-label=${countText}>
        ${points.map((p) => this._renderSlot(p))}
      </div>
    </div>`;
  }

  /**
   * Header for the resolved-station branch. Owns all three of its
   * config decisions (hide_header, custom title, show_free_count) so
   * render() carries none of them — those nested ternaries were most of
   * its remaining cognitive complexity.
   */
  private _stationHeader(
    stationLabel: string,
    customTitle: string | undefined,
    counts: { avail: number; total: number; label: string },
  ): TemplateResult | typeof nothing {
    if (this.config.hide_header) return nothing;
    const showCount = this.config.show_free_count !== false;
    return this._renderHeader(
      customTitle ?? stationLabel,
      customTitle ? stationLabel : "",
      showCount ? counts : undefined,
    );
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config) {
      return this._renderShell(
        html`<div class="empty-state">${localize("common.loading")}</div>`,
      );
    }

    const stateObj = this.config.entity
      ? this.hass.states[this.config.entity]
      : undefined;

    if (!stateObj) {
      return this._renderShell(
        html`<div class="empty-state">${localize("card.no_entity")}</div>`,
        { footer: this._cardFooter() },
      );
    }

    const stations = (stateObj.attributes["stations"] ?? []) as Station[];
    const stationId = this.config.station_id ?? "";
    const station = stations.find((s) => s.stationId === stationId);
    const customTitle = this.config.name;
    const footer = this._cardFooter(stateObj.attributes.attribution);

    if (!stationId || !station) {
      const showHeader = Boolean(customTitle) && !this.config.hide_header;
      return this._renderShell(
        html`
          ${showHeader ? this._renderHeader(customTitle ?? "") : nothing}
          <div class="empty-state">
            ${localize(
              stationId
                ? "parking.station_not_found"
                : "parking.no_station_selected",
            )}
          </div>
        `,
        { footer },
      );
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
      .replaceAll("{avail}", String(availCount))
      .replaceAll("{total}", String(totalCount));

    return this._renderShell(
      html`
        ${this._stationHeader(station.label, customTitle, {
          avail: availCount,
          total: totalCount,
          label: countText,
        })}
        ${this._renderLot(points, countText)}
      `,
      { footer, accent: true },
    );
  }

  /** The car SVG and the MDI overlay icon — at most one of them shows. */
  private _renderSlotOverlays(
    overlay: SlotOverlay | null,
    carColor: string | null,
  ): TemplateResult {
    return html`
      ${carColor
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
    `;
  }

  /** The spec block inside the slot: power badge, kW, connector, status. */
  private _renderSlotInner(
    point: Point,
    powerType: "dc" | "ac" | null,
    kwText: string,
    connector: string,
    statusLabel: string,
  ): TemplateResult {
    const colorBucket = slotStatusBucket(slotVariant(point).bucket);
    const shortKey = slotStatusShortKey(point.status);
    return html`<span class="slot-inner">
      ${powerType
        ? html`<span class="slot-power-badge" data-type=${powerType}
            >${powerType.toUpperCase()}</span
          >`
        : nothing}
      <span class="slot-kw">
        <span class="slot-kw-num">${kwText}</span
        ><span class="slot-kw-unit">kW</span>
      </span>
      <span class="slot-connector">${connector}</span>
      <span class="slot-status-word slot-status-${colorBucket}"
        >${slotStatusWord(shortKey, statusLabel)}</span
      >
    </span>`;
  }

  private _renderSlot(point: Point): TemplateResult {
    const variant = slotVariant(point);
    const { bucket: statusCat, overlay, showCar, showOverlayIcon } = variant;
    const hasOverlay = showCar || showOverlayIcon;
    const isRevealed = hasOverlay && this._revealedSlots.has(point.evseId);
    const powerType = pointPowerType(point);
    const connector = pointConnectorLabel(point);
    const kwText = formatKw(point.capacityKw);
    const statusLabel = pointStatusLabel(point.status);
    const aria = slotAriaLabel({
      powerType,
      capacityKw: point.capacityKw,
      kwText,
      connector,
      statusLabel,
    });
    return html`
      <button
        type="button"
        class=${slotClassList(variant, isRevealed)}
        data-status=${statusCat}
        tabindex=${hasOverlay ? "0" : "-1"}
        aria-label=${aria}
        aria-pressed=${hasOverlay ? (isRevealed ? "true" : "false") : nothing}
        title=${`${point.evseId ?? ""} · ${statusLabel}`.trim()}
        @click=${(ev: Event) => {
          ev.preventDefault();
          if (hasOverlay) this._toggleSlot(point.evseId);
        }}
      >
        ${this._renderSlotOverlays(
          overlay,
          showCar ? this._carColor(point.evseId) : null,
        )}
        ${this._renderSlotInner(
          point,
          powerType,
          kwText,
          connector,
          statusLabel,
        )}
      </button>
    `;
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

  static override styles: CSSResultGroup = parkingLotStyles;
}
