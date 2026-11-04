// Visual editor for the list card. The sensor and the title sit at the
// top; everything else is in one collapsible group per part of the card,
// in the card's own order: header and overview, the stations, the
// filters, the footer. Typed fields go through <ha-form>; the chip
// filters and the pin list are hand-written, since no ha-form selector
// matches them.

import { html, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import {
  AMENITY_FILTER_OPTIONS,
  CONNECTOR_FILTER_OPTIONS,
  PAYMENT_FILTER_OPTIONS,
  type LovelaceCardEditor,
  type LadestellenAustriaCardConfig,
  type Station,
} from "./types";
import { localize } from "./localize/localize";
import {
  PanelEditor,
  boxSelector,
  chipGroup,
  filterChip,
  formText,
  keyedMemo,
  type HaFormSchema,
} from "./editor-panels";

/**
 * The string-array fields the chip helpers below toggle. Typing their
 * key with this union makes a typo'd key a compile error there;
 * `_toggleListItem` itself takes any string.
 */
type ListConfigKey = "connector_types" | "amenities" | "payment_methods";

const ENTITY_SELECTOR = {
  entity: { filter: { domain: "sensor", integration: "ladestellen_austria" } },
};

const TOP_SCHEMA: HaFormSchema = [
  { name: "entity", required: true, selector: ENTITY_SELECTOR },
  { name: "name", selector: { text: {} } },
];

// `show_header` and `sort_order` are the form's names for `hide_header`
// and `sort_by_power`: a positive switch and a choice between two
// orders read better than a switch whose "off" means "on" or "by
// distance". They never reach the saved config (see _fromForm).
const HEADER_SCHEMA: HaFormSchema = [
  { name: "show_header", selector: { boolean: {} } },
  { name: "show_hero", selector: { boolean: {} } },
];

const DETAILS_SCHEMA: HaFormSchema = [
  { name: "show_pricing", selector: { boolean: {} } },
  { name: "show_amenities", selector: { boolean: {} } },
];

const FILTER_SCHEMA: HaFormSchema = [
  { name: "only_available", selector: { boolean: {} } },
  { name: "only_open", selector: { boolean: {} } },
  { name: "only_free", selector: { boolean: {} } },
];

// Its option labels go through localize(), which must run after
// setLanguage() has pushed the HA UI language, so this is built per
// language instead of at module load.
const countSchema = keyedMemo<HaFormSchema>(() => [
  { name: "max_stations", selector: { number: { min: 1, max: 10, step: 1, mode: "slider" } } },
  {
    name: "sort_order",
    selector: boxSelector(
      [
        {
          value: "distance",
          label: localize("editor.sort_distance"),
          description: localize("editor.sort_distance_helper"),
        },
        {
          value: "power",
          label: localize("editor.sort_power"),
          description: localize("editor.sort_power_helper"),
        },
      ],
      2,
    ),
  },
]);

// The card's own defaults (setConfig in the card). The form shows them
// for keys the config leaves out; withoutDefaults drops them again.
const FORM_DEFAULTS: Record<string, unknown> = {
  max_stations: 10,
  hide_header: false,
  show_hero: true,
  show_pricing: true,
  show_amenities: true,
  sort_by_power: false,
  logo_adapt_to_theme: false,
  only_available: false,
  only_free: false,
  only_open: false,
};

/** How many filters are on: the switches plus every picked chip. */
const filterCount = (c: LadestellenAustriaCardConfig): number =>
  [c.only_available, c.only_open, c.only_free].filter(Boolean).length +
  (c.connector_types?.length ?? 0) +
  (c.payment_methods?.length ?? 0) +
  (c.amenities?.length ?? 0);

const headerSummary = (c: LadestellenAustriaCardConfig): string =>
  [
    c.hide_header !== true && localize("editor.summary_header"),
    c.show_hero !== false && localize("editor.summary_hero"),
  ]
    .filter(Boolean)
    .join(" · ") || localize("editor.summary_hidden");

function stationsSummary(c: LadestellenAustriaCardConfig): string {
  const pins = c.pinned_station_ids?.length ?? 0;
  return [
    String(c.max_stations ?? FORM_DEFAULTS["max_stations"]),
    localize(c.sort_by_power ? "editor.summary_power" : "editor.summary_distance"),
    pins > 0 ? localize("editor.summary_pins", "{n}", String(pins)) : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

function filterSummary(c: LadestellenAustriaCardConfig): string {
  const n = filterCount(c);
  return n > 0
    ? localize("editor.summary_filters", "{n}", String(n))
    : localize("editor.summary_no_filters");
}

const TEXT = formText("editor");

@customElement("ladestellen-austria-card-editor")
export class LadestellenAustriaCardEditor
  extends PanelEditor<LadestellenAustriaCardConfig>
  implements LovelaceCardEditor
{
  protected readonly _defaults = FORM_DEFAULTS;

  // Max stations names its value in the helper; everything else is fixed.
  protected readonly _text = {
    computeLabel: TEXT.computeLabel,
    computeHelper: (schema: { name: string }): string | undefined =>
      schema.name === "max_stations"
        ? localize(
            "editor.max_stations_helper",
            "{n}",
            String(this._config.max_stations ?? FORM_DEFAULTS["max_stations"]),
          )
        : TEXT.computeHelper(schema),
  };

  protected _fromForm(value: Record<string, unknown>): Record<string, unknown> {
    const { show_header, sort_order, ...next } = value;
    if (show_header !== undefined) next["hide_header"] = show_header === false;
    if (sort_order !== undefined) next["sort_by_power"] = sort_order === "power";
    return next;
  }

  protected override render(): TemplateResult {
    const c = this._config;
    const data: Record<string, unknown> = {
      ...FORM_DEFAULTS,
      ...c,
      show_header: c.hide_header !== true,
      sort_order: c.sort_by_power === true ? "power" : "distance",
    };
    const form = (schema: HaFormSchema) => this._form(schema, data);

    return html`
      <div class="editor">
        ${form(TOP_SCHEMA)} ${this._renderEntityAlert()}
        ${this._renderPanels([
          {
            id: "header",
            icon: "mdi:page-layout-header",
            header: localize("editor.group_header"),
            summary: headerSummary(c),
            body: () => html`${form(HEADER_SCHEMA)}`,
          },
          {
            id: "stations",
            icon: "mdi:format-list-bulleted",
            header: localize("editor.group_stations"),
            summary: stationsSummary(c),
            body: () => html`
              ${form(countSchema(this.hass?.language ?? ""))} ${this._renderPinSection()}
              <hr />
              ${form(DETAILS_SCHEMA)}
            `,
          },
          {
            id: "filters",
            icon: "mdi:filter-outline",
            header: localize("editor.group_filters"),
            summary: filterSummary(c),
            body: () => html`
              ${form(FILTER_SCHEMA)}
              <hr />
              ${this._renderChipFilters()}
            `,
          },
          this._footerPanel(data),
        ])}
      </div>
    `;
  }

  private _renderChipFilters(): TemplateResult {
    const connectors = this._config.connector_types ?? [];
    const payments = this._config.payment_methods ?? [];
    const amenities = this._config.amenities ?? [];
    const chip = (key: ListConfigKey, value: string, on: boolean, content: unknown) =>
      filterChip(on, () => this._toggleListItem(key, value), content);
    const iconChip = (
      key: ListConfigKey,
      selected: ReadonlyArray<string>,
      opt: { key: string; icon: string; label_key: string },
    ) =>
      chip(
        key,
        opt.key,
        selected.includes(opt.key),
        html`<ha-icon icon=${opt.icon} aria-hidden="true"></ha-icon>
          <span>${localize(opt.label_key)}</span>`,
      );
    return html`
      ${this._chipGroup(
        "connector",
        CONNECTOR_FILTER_OPTIONS.map((token) =>
          chip("connector_types", token, connectors.includes(token), token),
        ),
      )}
      ${this._chipGroup(
        "payment",
        PAYMENT_FILTER_OPTIONS.map((opt) => iconChip("payment_methods", payments, opt)),
      )}
      ${this._chipGroup(
        "amenity",
        AMENITY_FILTER_OPTIONS.map((opt) => iconChip("amenities", amenities, opt)),
      )}
    `;
  }

  private _chipGroup(id: string, chips: TemplateResult[]): TemplateResult {
    return chipGroup(
      id,
      localize(`editor.chips_${id}`),
      localize(`editor.chips_${id}_helper`),
      chips,
    );
  }

  private _renderPinSection(): TemplateResult {
    const entityId = this._config.entity;
    const stateObj = entityId ? this.hass?.states[entityId] : undefined;
    const stations = (stateObj?.attributes?.["stations"] ?? []) as Station[];
    const pinned = this._config.pinned_station_ids ?? [];
    const pinnedSet = new Set(pinned);
    const liveIds = new Set(stations.map((s) => s.stationId));
    const orphanIds = pinned.filter((id) => !liveIds.has(id));
    const dynamicMode = stateObj?.attributes?.["dynamic_mode"] === true;
    return html`
      <div class="field">
        <div class="field-label">${localize("editor.pinned")}</div>
        ${
          dynamicMode
            ? html`<div class="editor-hint editor-hint--muted">
              ${localize("editor.pin_disabled_dynamic")}
            </div>`
            : !entityId
              ? html`<div class="editor-hint editor-hint--muted">
              ${localize("editor.pin_select_sensor_first")}
            </div>`
              : stations.length === 0
                ? html`<div class="editor-hint editor-hint--muted">
              ${localize("editor.pin_no_stations_yet")}
            </div>`
                : html`
              <div class="pin-list">
                ${stations.map((s) => {
                  const isPinned = pinnedSet.has(s.stationId);
                  const distanceText =
                    typeof s.distance === "number" ? `${s.distance.toFixed(2)} km` : "";
                  return html`
                    <button
                      type="button"
                      class=${isPinned ? "pin-row pinned" : "pin-row"}
                      aria-pressed=${isPinned}
                      @click=${() => this._toggleListItem("pinned_station_ids", s.stationId)}
                    >
                      <ha-icon
                        icon=${isPinned ? "mdi:pin" : "mdi:pin-outline"}
                        aria-hidden="true"
                      ></ha-icon>
                      <span class="pin-label">${s.label}</span>
                      <span class="pin-meta">${distanceText}</span>
                    </button>
                  `;
                })}
              </div>
            `
        }
        ${
          !dynamicMode && orphanIds.length > 0
            ? html`
              <div class="editor-hint editor-hint--muted">
                ${localize("editor.pin_orphans_heading")}
              </div>
              <div class="pin-list">
                ${orphanIds.map(
                  (id) => html`
                    <button
                      type="button"
                      class="pin-row pinned orphan"
                      aria-pressed="true"
                      @click=${() => this._toggleListItem("pinned_station_ids", id)}
                    >
                      <ha-icon icon="mdi:pin" aria-hidden="true"></ha-icon>
                      <span class="pin-label orphan-id">${id}</span>
                      <span class="pin-meta">
                        ${localize("editor.pin_unpin")}
                      </span>
                    </button>
                  `,
                )}
              </div>
            `
            : nothing
        }
        ${
          dynamicMode
            ? nothing
            : html`<div class="editor-hint">${localize("editor.pinned_helper")}</div>`
        }
      </div>
    `;
  }
}
