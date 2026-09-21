// Ladestellen Austria — Lovelace custom card
// https://github.com/rolandzeiner/ladestellen-austria
//
// Lit 3 + Shadow DOM + Rolldown, single-file HACS bundle.
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
  type HassEntity,
  type HomeAssistant,
  type LovelaceCardEditor,
  type LadestellenAustriaCardConfig,
  type OpeningHours,
  type Point,
  type Station,
} from "./types";
import { localize } from "./localize/localize";
import { renderFooter, renderVersionBanner } from "./shared-render";
import {
  entitySuggestionFor,
  findStubEntity,
  runVersionCheckOnce,
  shouldUpdateForEntityState,
  syncCardLanguage,
} from "./card-lifecycle";
import { cardStyles } from "./styles";
import {
  filterStations,
  isOpenNow,
  mapsDeeplink,
  stationConnectorTokens,
  stationHasDcPoint,
  stationMaxKw,
  statusLevel,
  type StatusLevel,
} from "./station-logic";
import {
  formatCent,
  formatEuro,
  formatKw,
  normStatus,
  pointConnectorLabel,
  pointPowerType,
  pointStatusLabel,
  safeHttpsUri,
  slotVariant,
} from "./utils";

import "./editor";
// Second card type ships in the same bundle — its @customElement
// decorator registers on module load, its window.customCards push
// runs, and Rolldown rolls it into ladestellen-austria-card.js.
import "./parking-card";

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "ladestellen-austria-card",
  name: "Ladestellen Austria",
  description: "Nearby EV charging stations, powered by E-Control Austria",
  preview: true,
  documentationURL: "https://github.com/rolandzeiner/ladestellen-austria",
  getEntitySuggestion: entitySuggestionFor("custom:ladestellen-austria-card"),
});

const DEFAULT_MAX_STATIONS = 10;

/** One row in the rendered list: a real station, or an orphaned pin. */
type StationListItem =
  | { kind: "live"; station: Station }
  | { kind: "orphan"; id: string };

/** Everything render() needs, derived once from the sensor state. */
interface StationListView {
  visible: StationListItem[];
  liveAvailable: boolean;
  pinnedLiveStationIds: Set<string>;
  dynamicMode: boolean;
  dynamicEntity: string | null;
  filteredCount: number;
  totalCount: number;
  nearestByDistance: Station | undefined;
  farthestShown: Station | undefined;
}

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
    return { entity: findStubEntity(entities) };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: LadestellenAustriaCardConfig;
  @state() private _expanded: Set<string> = new Set();
  @state() private _versionMismatch: string | null = null;

  public setConfig(config: LadestellenAustriaCardConfig): void {
    if (!config || typeof config !== "object") {
      throw new Error(localize("common.invalid_configuration"));
    }
    // Shape validation — raise a real HA error card with a localized
    // message when YAML users forget required fields, instead of a
    // silent empty-state.
    if (config.entity !== undefined && typeof config.entity !== "string") {
      throw new Error(localize("common.invalid_entity"));
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
      only_open: false,
      connector_types: [],
      amenities: [],
      payment_methods: [],
      pinned_station_ids: [],
      ...config,
    };
  }

  protected override shouldUpdate(changedProps: PropertyValues): boolean {
    // Lit calls shouldUpdate before the first render only after a
    // property change; HA's Lovelace pipeline always invokes setConfig
    // synchronously before mounting, so this.config is non-null here.
    if (
      changedProps.has("config") ||
      changedProps.has("_expanded") ||
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
    const max = this.config?.max_stations ?? DEFAULT_MAX_STATIONS;
    return Math.min(3 + Math.ceil(max / 3), 10);
  }

  public getGridOptions(): {
    columns: number | "full";
    rows: number | "auto";
    min_columns: number;
    min_rows: number;
  } {
    return {
      columns: 12,
      rows: "auto",
      min_columns: 6,
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
   * Everything render() needs derived from the sensor's state object.
   *
   * This was ~55 lines inline at the top of render(), which is why the
   * renderer carried eight `??`/ternary decision points before it drew
   * anything. Pulling it out leaves render() as a layout description.
   */
  private _buildListView(stateObj: HassEntity): StationListView {
    const allStations = (stateObj.attributes["stations"] ?? []) as Station[];
    const liveAvailable = stateObj.attributes.live_status_available === true;
    // Dynamic-tracker mode signals: the sensor follows a device_tracker's
    // GPS instead of the fixed config coords. Pinning is meaningless in
    // this mode (the list of nearby stations changes as the user moves),
    // so we short-circuit any configured pins to an empty list. The
    // config itself is preserved untouched, so switching back to static
    // mode restores the previously-pinned stations.
    const dynamicMode = stateObj.attributes.dynamic_mode === true;
    const dynamicEntity = stateObj.attributes.dynamic_entity ?? null;

    // Partition by pin status. Pinned first in user-defined order,
    // bypassing filters + sort. Orphan pins (IDs not found in the API
    // response) render as placeholder rows at their pin-order position.
    const pinnedIds = dynamicMode ? [] : (this.config.pinned_station_ids ?? []);
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

    const cap = Math.max(1, this.config.max_stations ?? DEFAULT_MAX_STATIONS);
    const orderedAll: StationListItem[] = [
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

    return {
      visible,
      liveAvailable,
      pinnedLiveStationIds,
      dynamicMode,
      dynamicEntity,
      filteredCount: filtered.length,
      totalCount: allStations.length,
      // Hero always uses the distance-nearest station from the unfiltered,
      // unpinned pool — a stable "how far is any charger from me" answer
      // that shouldn't flip when the user resorts, filters, or pins.
      nearestByDistance: allStations[0],
      farthestShown: visibleLive[visibleLive.length - 1],
    };
  }

  /** Card header. Returns nothing when the user hid it. */
  private _renderCardHeader(
    nearest: Station | undefined,
  ): TemplateResult | typeof nothing {
    if (this.config.hide_header) return nothing;
    const name = this.config.name;
    const titleText = name && name.trim() ? name : "Ladestellen Austria";
    const subtitle = nearest ? this._heroCity(nearest) : "";
    return html`<header class="header">
      <div class="icon-tile" aria-hidden="true">
        <ha-icon icon="mdi:ev-station"></ha-icon>
      </div>
      <div class="header-text">
        <h2 class="title">${titleText}</h2>
        ${subtitle ? html`<p class="subtitle">${subtitle}</p>` : nothing}
      </div>
    </header>`;
  }

  /** The "following <entity>" chip, shown only in dynamic-tracker mode. */
  private _renderDynamicFlag(
    dynamicMode: boolean,
    dynamicEntity: string | null,
  ): TemplateResult | typeof nothing {
    if (!dynamicMode || !dynamicEntity) return nothing;
    return html`<div class="flags">
      <span class="flag">
        <ha-icon icon="mdi:crosshairs-gps" aria-hidden="true"></ha-icon>
        <span
          >${localize("card.dynamic_follows_entity").replace(
            "{entity}",
            dynamicEntity,
          )}</span
        >
      </span>
    </div>`;
  }

  /** The station list, or the empty-state when nothing survived filtering. */
  private _renderStationList(view: StationListView): TemplateResult {
    if (view.visible.length === 0) {
      return html`<div class="empty-state">
        ${localize("card.no_stations")}
      </div>`;
    }
    return html`<ul class="stations" role="list">
      ${view.visible.map((item) =>
        item.kind === "live"
          ? this._renderStation(
              item.station,
              view.liveAvailable,
              view.pinnedLiveStationIds.has(item.station.stationId),
            )
          : this._renderOrphanPin(item.id),
      )}
    </ul>`;
  }

  protected override render(): TemplateResult {
    // Block on missing config (defensive — setConfig should have run).
    // Block on missing hass separately so the empty-state stays reactive:
    // when hass arrives, Lit re-renders and we proceed past this guard.
    if (!this.config || !this.hass) {
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
      return html`
        <ha-card>
          <div class="card-content">
            <div class="wrap">
              <div class="empty-state">${localize("card.no_entity")}</div>
            </div>
            ${renderFooter(
              this.hass,
              undefined,
              this.config?.logo_adapt_to_theme === true,
            )}
          </div>
        </ha-card>
      `;
    }

    const view = this._buildListView(stateObj);

    return html`
      <ha-card>
        <div class="card-content">
          <div class="wrap">
            ${renderVersionBanner(this._versionMismatch)}
            ${this._renderCardHeader(view.nearestByDistance)}
            ${this.config.show_hero !== false
              ? this._renderHero(
                  view.nearestByDistance,
                  view.farthestShown,
                  view.filteredCount,
                  view.totalCount,
                )
              : nothing}
            ${this._renderDynamicFlag(view.dynamicMode, view.dynamicEntity)}
            ${this._renderStationList(view)}
          </div>
          ${renderFooter(
            this.hass,
            stateObj.attributes.attribution,
            this.config.logo_adapt_to_theme === true,
          )}
        </div>
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
    return (s.points ?? []).some((p) => normStatus(p.status) === "AVAILABLE");
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
      <li class="station is-orphan" role="listitem">
        <div class="station-body">
          <ha-icon
            class="orphan-icon"
            icon="mdi:pin-off-outline"
            aria-hidden="true"
          ></ha-icon>
          <div class="station-main">
            <div class="row-secondary">
              <span class="station-name"
                >${localize("card.orphan_pin_title")}</span
              >
            </div>
            <div class="orphan-id">${id}</div>
          </div>
          <div class="station-actions">
            <ha-icon-button
              .label=${localize("card.unpin")}
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this._unpinStation(id);
              }}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </ha-icon-button>
          </div>
        </div>
      </li>
    `;
  }

  private _filterStations(stations: Station[]): Station[] {
    // Cache now + tz once for the only-open sweep; isOpenNow is a
    // per-station call so we don't want to rebuild Date/tz in the loop.
    return filterStations(
      stations,
      this.config,
      new Date(),
      this.hass?.config?.time_zone ?? "Europe/Vienna",
    );
  }


  // Footer rendering lives in shared-render.ts; both cards share it.

  private _renderHero(
    nearest: Station | undefined,
    farthest: Station | undefined,
    filteredTotal: number,
    rawTotal: number,
  ): TemplateResult {
    if (!nearest) {
      return html`<section class="hero hero--empty">
        <span aria-live="polite">${localize("card.no_stations")}</span>
      </section>`;
    }
    const km = this._formatKm(nearest.distance);
    const cityLabel = this._heroCity(nearest);
    const farKm = farthest ? this._formatKm(farthest.distance) : km;
    const rangeText = localize("card.hero_range")
      .replaceAll("{min}", this._formatKm(nearest.distance))
      .replaceAll("{max}", farKm);
    const countText =
      filteredTotal === rawTotal
        ? localize("card.hero_count").replaceAll(
            "{count}",
            String(filteredTotal),
          )
        : localize("card.hero_count_filtered")
            .replaceAll("{filtered}", String(filteredTotal))
            .replaceAll("{total}", String(rawTotal));
    return html`
      <section class="hero">
        <div class="metric">
          <div class="metric-value">
            <span class="metric-num" aria-live="polite">${km}</span>
            <span class="metric-of">km</span>
          </div>
          <div class="metric-label">${cityLabel}</div>
        </div>
        <div class="chip-row">
          <span class="chip">${rangeText}</span>
          <span class="chip muted">${countText}</span>
        </div>
      </section>
    `;
  }

  private _heroCity(station: Station): string {
    return station.city || station.label || "";
  }

  /**
   * The row's top line: kW, price, connector chips and the pin marker.
   * Five conditional fragments that were inline in _renderStation and
   * made up most of its branching.
   */
  private _renderRowPrimary(v: {
    maxKw: number;
    isDC: boolean;
    priceText: string;
    priceIsFree: boolean;
    visibleConnectors: string[];
    extraConnectors: number;
    isPinned: boolean;
  }): TemplateResult {
    return html`<div class="row-primary">
      ${v.maxKw > 0
        ? html`<span class=${v.isDC ? "metric-kw dc" : "metric-kw"}>
            <span class="kw-num">${v.maxKw}</span
            ><span class="kw-unit">kW</span>
          </span>`
        : nothing}
      ${v.priceText
        ? html`<span
            class=${v.priceIsFree ? "metric-price free" : "metric-price"}
            >${v.priceText}</span
          >`
        : nothing}
      ${v.visibleConnectors.map(
        (token) => html`<span class="chip muted">${token}</span>`,
      )}
      ${v.extraConnectors > 0
        ? html`<span class="chip muted">+${v.extraConnectors}</span>`
        : nothing}
      ${v.isPinned
        ? html`<span class="chip pin" title=${localize("card.pinned")}>
            <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
            <span>${localize("card.pinned")}</span>
          </span>`
        : nothing}
    </div>`;
  }

  private _renderStation(
    station: Station,
    liveAvailable: boolean,
    isPinned: boolean = false,
  ): TemplateResult {
    const points = station.points ?? [];
    const isDC = stationHasDcPoint(station);
    const maxKw = stationMaxKw(station);
    const connectorTokens = Array.from(stationConnectorTokens(station));
    // Cap inline connector chips at 3, roll the rest into a "+N" chip so
    // wide rows stay scannable. The full list still appears in the
    // expanded detail via the original points[] data.
    const visibleConnectors = connectorTokens.slice(0, 3);
    const extraConnectors = connectorTokens.length - visibleConnectors.length;
    const priceText = this._priceText(points);
    const priceIsFree = points.some((p) => p.freeOfCharge);

    const totalPoints = points.length;
    const availPoints = points.filter(
      (p) => normStatus(p.status) === "AVAILABLE",
    ).length;
    const stationActive = station.stationStatus === "ACTIVE";
    const tz = this.hass?.config?.time_zone ?? "Europe/Vienna";
    const openNow = isOpenNow(station.openingHours, new Date(), tz);
    const level = statusLevel(
      liveAvailable,
      stationActive,
      points,
      openNow,
    );

    const expanded = this._expanded.has(station.stationId);
    const mapsUrl = mapsDeeplink(station.location);
    const showAmenities = this.config?.show_amenities ?? true;
    const showPricing = this.config?.show_pricing ?? true;

    const cls = [
      "station",
      expanded ? "expanded" : "",
      isPinned ? "is-pinned" : "",
      level === "inactive" ? "is-inactive" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const cityLine = [station.postCode, station.city].filter(Boolean).join(" ");
    const distanceText = Number.isFinite(station.distance)
      ? `${this._formatKm(station.distance)} km`
      : "";
    const locParts = [cityLine, distanceText].filter(Boolean);
    const locText = locParts.join(" · ");

    const detailId = `station-panel-${station.stationId}`;
    const nameId = `station-name-${station.stationId}`;
    const statusId = `station-status-${station.stationId}`;
    return html`
      <li class=${cls}>
        <div class="station-body">
          <!-- The disclosure trigger is a transparent overlay across the
               row, not a wrapper around it. role="button" used to sit on
               the <li>, which made the row's own maps link a
               presentational child of a button — assistive tech can drop
               a distinct destination that way. As a sibling the link
               stays reachable: .icon-action is positioned so it paints
               above the overlay and takes its own clicks, while the
               chevron deliberately stays below it so clicking the
               affordance still toggles the row. -->
          <button
            class="station-trigger"
            type="button"
            aria-expanded=${expanded}
            aria-controls=${detailId}
            aria-labelledby=${`${nameId} ${statusId}`}
            @click=${() => this._toggle(station.stationId)}
          ></button>
          <span
            id=${statusId}
            class=${`status-dot status-${level}`}
            role="img"
            aria-label=${this._statusAria(level, availPoints, totalPoints)}
          ></span>
          <div class="station-main">
            ${this._renderRowPrimary({
              maxKw,
              isDC,
              priceText: showPricing ? priceText : "",
              priceIsFree,
              visibleConnectors,
              extraConnectors,
              isPinned,
            })}
            <div class="row-secondary">
              <span class="station-name" id=${nameId} lang="de"
                >${station.label}</span
              >
              ${locText
                ? html`<span class="station-loc" lang="de">${locText}</span>`
                : nothing}
            </div>
          </div>
          <div class="station-actions">
            ${mapsUrl
              ? html`<a
                  class="icon-action"
                  href=${mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label=${`${localize("card.open_in_maps")}: ${station.label}`}
                  title=${localize("card.open_in_maps")}
                  @click=${(ev: Event) => ev.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:map-marker-outline"
                    aria-hidden="true"
                  ></ha-icon>
                </a>`
              : nothing}
            <ha-icon
              class="chevron"
              icon="mdi:chevron-down"
              aria-hidden="true"
            ></ha-icon>
          </div>
        </div>
        ${this._renderStationDetail(
          station,
          openNow,
          showAmenities,
          mapsUrl,
          expanded,
          detailId,
        )}
      </li>
    `;
  }


  // Expanded-panel layout (top → bottom):
  //   Operator · Ladepunkte (rack [+ fees line]) · Öffnungszeiten (+ live chip)
  //   · Bezahlung · Ausstattung · Adresse · Actions.
  private _renderStationDetail(
    station: Station,
    isOpenNow: boolean | null,
    showAmenities: boolean,
    mapsUrl: string,
    expanded: boolean,
    detailId: string,
  ): TemplateResult {
    const amenities = this._amenityItems(station);
    const points = station.points ?? [];
    const address = this._address(station);
    const paymentChips = this._paymentChips(points);
    const feesLine = this._feesLine(points);
    const operatorName = station.operatorName || station.owner || "";
    return html`
      <div
        class="detail"
        id=${detailId}
        role="region"
        aria-hidden=${expanded ? "false" : "true"}
        ?inert=${!expanded}
      >
        <div class="detail-inner">
        ${operatorName
          ? html`<div class="operator-line">
              <span class="detail-label">
                ${localize("card.operator_heading")}
              </span>
              <span class="operator-name" lang="de">${operatorName}</span>
            </div>`
          : nothing}
        ${station.description
          ? html`<div class="station-note">
              <ha-icon
                icon="mdi:information-outline"
                aria-hidden="true"
              ></ha-icon>
              <span>${station.description}</span>
            </div>`
          : nothing}
        ${points.length > 0
          ? html`<div class="rack-block">
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
              <div class="chip-row">
                ${paymentChips.map(
                  (a) => html`
                    <span class="chip muted" title=${a.label}>
                      <ha-icon icon=${a.icon} aria-hidden="true"></ha-icon>
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
              <div class="chip-row">
                ${amenities.map(
                  (a) => html`
                    <span class="chip muted" title=${a.label}>
                      <ha-icon icon=${a.icon} aria-hidden="true"></ha-icon>
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
              <div class="detail-text" lang="de">${address}</div>
            </div>`
          : nothing}
        <div class="actions">
          ${mapsUrl
            ? html`<a
                class="btn-primary"
                href=${mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                @click=${(ev: Event) => ev.stopPropagation()}
              >
                <ha-icon
                  icon="mdi:map-marker-radius-outline"
                  aria-hidden="true"
                ></ha-icon>
                <span>${localize("card.open_in_maps")}</span>
              </a>`
            : nothing}
          ${(() => {
            const websiteUrl = safeHttpsUri(station.website);
            return websiteUrl
              ? html`<a
                  class="btn-secondary"
                  href=${websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  @click=${(ev: Event) => ev.stopPropagation()}
                >
                  <ha-icon icon="mdi:web" aria-hidden="true"></ha-icon>
                  <span>${localize("card.website")}</span>
                </a>`
              : nothing;
          })()}
          ${station.phoneNumber
            ? html`<a
                class="btn-secondary"
                href=${`tel:${station.phoneCountryCode ?? ""}${station.phoneNumber}`}
                @click=${(ev: Event) => ev.stopPropagation()}
              >
                <ha-icon icon="mdi:phone-outline" aria-hidden="true"></ha-icon>
                <span>${localize("card.call")}</span>
              </a>`
            : nothing}
          ${(() => {
            const priceUrl = safeHttpsUri(station.priceUrl);
            return priceUrl
              ? html`<a
                  class="btn-secondary"
                  href=${priceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  @click=${(ev: Event) => ev.stopPropagation()}
                >
                  <ha-icon
                    icon="mdi:cash-multiple"
                    aria-hidden="true"
                  ></ha-icon>
                  <span>${localize("card.tariff")}</span>
                </a>`
              : nothing;
          })()}
        </div>
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
    const powerType = pointPowerType(point);
    const { bucket: statusCat, overlay } = slotVariant(point);
    const tooltip = this._pointTooltip(point);
    const ariaLabel = this._pointAriaLabel(point, powerType);
    const badge = powerType
      ? html`<span class="power-badge" data-type=${powerType}
          >${powerType.toUpperCase()}</span
        >`
      : nothing;
    // Special-state slots swap their kW + connector for a status icon —
    // the electrical spec isn't actionable when the point is out of order,
    // out of stock, planned, removed, or unknown. Optional bgTint
    // upgrades the slot's tint (info / error) for PLANNED / REMOVED even
    // though they share the "warn" bucket.
    if (overlay) {
      const slotClass = overlay.bgTint
        ? `rack-slot slot-tint-${overlay.bgTint}`
        : "rack-slot";
      return html`
        <div
          class=${slotClass}
          role="group"
          aria-label=${ariaLabel}
          data-status=${statusCat}
          title=${tooltip}
        >
          <ha-icon
            class=${`rack-overlay-icon tone-${overlay.tone}`}
            icon=${overlay.icon}
          ></ha-icon>
        </div>
      `;
    }
    const connector = pointConnectorLabel(point);
    const kwText = formatKw(point.capacityKw);
    return html`
      <div
        class="rack-slot"
        role="group"
        aria-label=${ariaLabel}
        data-status=${statusCat}
        title=${tooltip}
      >
        <span class="rack-dot" data-status=${statusCat}></span>
        ${badge}
        <span class="rack-kw">
          <span class="rack-kw-num">${kwText}</span
          ><span class="rack-kw-unit">kW</span>
        </span>
        <span class="rack-connector">${connector}</span>
      </div>
    `;
  }

  private _pointAriaLabel(
    point: Point,
    powerType: "dc" | "ac" | null,
  ): string {
    const parts: string[] = [];
    if (powerType) parts.push(powerType.toUpperCase());
    if (point.capacityKw) {
      parts.push(`${formatKw(point.capacityKw)} kW`);
    }
    const connector = pointConnectorLabel(point);
    if (connector && connector !== "–") parts.push(connector);
    const status = pointStatusLabel(point.status);
    if (status) parts.push(status);
    return parts.join(" · ");
  }

  private _pointTooltip(point: Point): string {
    const lines = [
      `${point.evseId ?? ""} · ${pointStatusLabel(point.status)}`.trim(),
    ];
    const startCent = point.startFeeCent ?? 0;
    if (startCent > 0) {
      lines.push(
        `${localize("card.start_fee_label")}: ${formatEuro(startCent)} €`,
      );
    }
    const blockCent = point.blockingFeeCentMin ?? 0;
    const blockFrom = point.blockingFeeFromMinute ?? 0;
    if (blockCent > 0 && blockFrom > 0) {
      lines.push(
        `${formatCent(blockCent)} ${localize("card.blocking_fee_label").replaceAll("{from}", String(blockFrom))}`,
      );
    }
    // `\n` collapses to a single space in HTML `title=` attributes, which
    // produced run-on tooltips. Use a visible separator so the hover
    // string reads cleanly across browsers; assistive tech goes through
    // _pointAriaLabel which is composed independently.
    return lines.join(" · ");
  }

  private _renderOpeningHoursSection(
    hours: OpeningHours[] | undefined,
    isOpenNow: boolean | null,
  ): TemplateResult | typeof nothing {
    if (!hours || hours.length === 0) return nothing;
    const lines = this._formatOpeningHours(hours);
    if (lines.length === 0) return nothing;
    const flagClass =
      isOpenNow === true
        ? "flag ok"
        : isOpenNow === false
          ? "flag warn"
          : null;
    const flagIcon =
      isOpenNow === true
        ? "mdi:clock-check-outline"
        : isOpenNow === false
          ? "mdi:clock-alert-outline"
          : null;
    const flagText =
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
          <dl class="hours-lines">
            ${lines.map(
              (l) => html`<div class="hours-line">
                <dt class="hours-day">${l.day}</dt>
                <dd class="hours-time">${l.time}</dd>
              </div>`,
            )}
          </dl>
          ${flagText && flagClass && flagIcon
            ? html`<span class=${flagClass}>
                <ha-icon icon=${flagIcon} aria-hidden="true"></ha-icon>
                <span>${flagText}</span>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _formatOpeningHours(hours: OpeningHours[]): Array<{
    day: string;
    time: string;
  }> {
    const out: Array<{ day: string; time: string }> = [];
    for (const h of hours) {
      const line = this._formatSingleRange(h);
      if (line) out.push(line);
    }
    return out;
  }

  private _formatSingleRange(
    h: OpeningHours,
  ): { day: string; time: string } | null {
    const from = this._shortDay(h.fromWeekday);
    const to = this._shortDay(h.toWeekday);
    if (!from || !to) return null;
    const isFull24h =
      h.fromTime === "00:00" &&
      (h.toTime === "23:59" || h.toTime === "24:00");
    const sameDay = h.fromWeekday === h.toWeekday;
    const day = sameDay ? from : `${from}–${to}`;
    const time = isFull24h
      ? localize("card.always_open_short")
      : `${h.fromTime}–${h.toTime}`;
    return { day, time };
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
        `+ ${formatEuro(maxCent)} € ${localize("card.start_fee_label")}`,
      );
    }
    if (blocking.length > 0) {
      const maxRate = Math.max(...blocking.map((v) => v.cent));
      const minFrom = Math.min(...blocking.map((v) => v.fromMin));
      parts.push(
        `${formatCent(maxRate)} ${localize(
          "card.blocking_fee_label",
        ).replaceAll("{from}", String(minFrom))}`,
      );
    }
    return parts.length > 0 ? parts.join(", ") : null;
  }


  private _statusAria(
    level: StatusLevel,
    avail: number,
    total: number,
  ): string {
    if (level === "inactive") return localize("card.inactive");
    if (level === "unknown") return localize("card.status_unknown");
    return localize("card.available_count")
      .replaceAll("{avail}", String(avail))
      .replaceAll("{total}", String(total));
  }

  private _toggle(stationId: string): void {
    const next = new Set(this._expanded);
    if (next.has(stationId)) next.delete(stationId);
    else next.add(stationId);
    this._expanded = next;
  }

  private _priceText(points: Point[]): string {
    if (points.length === 0) return "";
    if (points.some((p) => p.freeOfCharge)) return localize("card.gratis");
    const kwhPrices = points
      .filter((p) => !p.freeOfCharge && p.priceCentKwh > 0)
      .map((p) => p.priceCentKwh);
    if (kwhPrices.length > 0) {
      return `${formatEuro(Math.min(...kwhPrices))} €/kWh`;
    }
    const minPrices = points
      .filter((p) => !p.freeOfCharge && p.priceCentMin > 0)
      .map((p) => p.priceCentMin);
    if (minPrices.length > 0) {
      return `${formatEuro(Math.min(...minPrices))} €/min`;
    }
    return "";
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
        flag: station.austrianEcoLabel,
        icon: "mdi:certificate-outline",
        label: localize("amenities.austrian_ecolabel"),
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
        flag: station.illuminatedParking,
        icon: "mdi:lightbulb-outline",
        label: localize("amenities.illuminated_parking"),
      },
      {
        flag: (station.barrierFreeParkingPlaces ?? 0) > 0,
        icon: "mdi:wheelchair-accessibility",
        label: localize("amenities.barrier_free"),
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

  static override styles: CSSResultGroup = cardStyles;
}
