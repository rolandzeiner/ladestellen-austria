// Visual editor for the parking-slot card. The sensor, the station (a
// picked one, or the nearest; the card shows nothing without one) and
// the title sit at the top; the header, the lot's look and the footer
// each get a collapsible group. Typed fields go through <ha-form>; the
// station picker and the colour swatch are hand-written.

import { html, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import {
  CONNECTOR_FILTER_OPTIONS,
  type LovelaceCardEditor,
  type ParkingLotCardConfig,
  type Station,
} from "./types";
import { localize } from "./localize/localize";
import { formatKw } from "./utils";
import {
  PanelEditor,
  boxSelector,
  chipGroup,
  filterChip,
  formText,
  keyedMemo,
  svgImage,
  type BoxOption,
  type HaFormSchema,
} from "./editor-panels";

// The card's own defaults. The form shows them for keys the config
// leaves out; withoutDefaults drops them again.
const FORM_DEFAULTS: Record<string, unknown> = {
  auto_nearest: false,
  only_available: false,
  min_kw: 0,
  hide_header: false,
  show_free_count: true,
  logo_adapt_to_theme: false,
  car_color_mode: "random",
  asphalt_style: "default",
  paint_width: "medium",
  icon_paint_mode: "default",
};

const DEFAULT_FIXED_COLOUR = "#1d4ed8";
/** The theme's accent, when the editor can't read it from the page. */
const FALLBACK_ACCENT = "#03a9f4";

const ENTITY_SCHEMA: HaFormSchema = [
  {
    name: "entity",
    required: true,
    selector: { entity: { filter: { domain: "sensor", integration: "ladestellen_austria" } } },
  },
];

const NAME_SCHEMA: HaFormSchema = [{ name: "name", selector: { text: {} } }];

// Follow the nearest station instead of a picked one. `only_available`
// narrows the nearest station, so it is greyed out until the card
// follows one.
const stationSchema = (freeOff: boolean): HaFormSchema => [
  { name: "auto_nearest", selector: { boolean: {} } },
  { name: "only_available", disabled: freeOff, selector: { boolean: {} } },
];
const STATION_SCHEMA_AUTO = stationSchema(false);
const STATION_SCHEMA_FIXED = stationSchema(true);

// The power minimum as tiles: the four steps a driver tells apart (any,
// normal AC, fast DC, high power). A YAML value off those steps gets a
// tile of its own, so the form never shows a blank choice. Option values
// are strings, as box selects need; _fromForm turns them back into kW.
const POWER_STEPS = [0, 11, 50, 150];
const powerSchema = keyedMemo<HaFormSchema, number>((current) => {
  const steps = POWER_STEPS.includes(current)
    ? POWER_STEPS
    : [
        ...POWER_STEPS.filter((kw) => kw < current),
        current,
        ...POWER_STEPS.filter((kw) => kw > current),
      ];
  return [
    {
      name: "min_kw",
      selector: boxSelector(
        steps.map((kw) => ({
          value: String(kw),
          label:
            kw === 0
              ? localize("parking_editor.min_kw_any")
              : localize("parking_editor.min_kw_from", "{kw}", formatKw(kw)),
          ...(POWER_STEPS.includes(kw)
            ? { description: localize(`parking_editor.min_kw_${kw === 0 ? "any" : kw}_helper`) }
            : {}),
        })),
        2,
      ),
    },
  ];
});

/** The plug and power group's state: "CCS · ab 50 kW", "Alle Stecker · jede Leistung". */
function plugSummary(c: ParkingLotCardConfig): string {
  const plugs = c.connector_types?.length
    ? c.connector_types.join(", ")
    : localize("parking_editor.summary_all_plugs");
  const power = c.min_kw
    ? localize("parking_editor.summary_min_kw", "{kw}", formatKw(c.min_kw))
    : localize("parking_editor.summary_any_power");
  return `${plugs} · ${power}`;
}

// `show_header` is the form's name for `hide_header`: a positive switch
// reads better than one whose "off" shows the header. It never reaches
// the saved config (see _fromForm). The counter sits in the header,
// so it is greyed out while the header is hidden.
const headerSchema = (counterOff: boolean): HaFormSchema => [
  { name: "show_header", selector: { boolean: {} } },
  { name: "show_free_count", disabled: counterOff, selector: { boolean: {} } },
];
const HEADER_SCHEMA = headerSchema(false);
const HEADER_SCHEMA_NO_HEADER = headerSchema(true);

// ── Tile pictures: a lot seen from above, 72 × 44 ──────────────────────
const LOT_GREY = "#9aa3ab";
const LINE_GREY = "#e8ecef";

const lines = (colour: string, width: number): string =>
  [18, 36, 54]
    .map((x) => `<rect x="${x - width / 2}" y="6" width="${width}" height="32" fill="${colour}"/>`)
    .join("");
const lot = (inner: string, width = 1.6, line = LINE_GREY): string =>
  svgImage(`<rect width="72" height="44" rx="6" fill="${LOT_GREY}"/>${lines(line, width)}${inner}`);
const car = (x: number, fill: string): string =>
  `<rect x="${x}" y="12" width="12" height="20" rx="4" fill="${fill}" stroke="rgba(0,0,0,.25)"/>` +
  `<rect x="${x + 2}" y="16" width="8" height="4" rx="1" fill="rgba(255,255,255,.55)"/>`;
const cars = (colours: ReadonlyArray<string>): string =>
  lot([3, 21, 39, 57].map((x, i) => car(x, colours[i % colours.length]!)).join(""));

const TEXTURED = svgImage(
  `<defs><pattern id="g" width="5" height="5" patternUnits="userSpaceOnUse">` +
    `<circle cx="1" cy="1" r=".6" fill="#5b6168"/><circle cx="3.5" cy="3.2" r=".5" fill="#3a3f45"/>` +
    `</pattern></defs><rect width="72" height="44" rx="6" fill="#2c3035"/>` +
    `<rect width="72" height="44" rx="6" fill="url(#g)"/>${lines("#f1f1f1", 1.6)}`,
);
const kwLabel = (fill: string): string =>
  `<text x="36" y="27" text-anchor="middle" font-size="12" font-weight="700" fill="${fill}" font-family="Roboto, sans-serif">22 kW</text>`;
const LABEL_STATUS = svgImage(
  `<rect width="72" height="44" rx="6" fill="${LOT_GREY}"/>` +
    `<rect x="8" y="9" width="56" height="26" rx="4" fill="#cfe9d8"/>${kwLabel("#1e7d4a")}`,
);
const LABEL_WHITE = svgImage(
  `<rect width="72" height="44" rx="6" fill="#4b5157"/>${kwLabel("#ffffff")}`,
);

const option = (value: string, key: string, image: string): BoxOption => ({
  value,
  label: localize(`parking_editor.${key}`),
  image,
});

// The cars' pictures show the theme's accent and the picked colour, so
// this schema is keyed on both as well as on the language.
const carsSchema = keyedMemo<HaFormSchema, { accent: string; fixed: string }>((colours) => [
  {
    name: "asphalt_style",
    selector: boxSelector(
      [
        option("default", "asphalt_default", lot("")),
        option("textured", "asphalt_textured", TEXTURED),
      ],
      2,
    ),
  },
  {
    name: "car_color_mode",
    selector: boxSelector(
      [
        option("random", "car_color_random", cars(["#dc2626", "#1d4ed8", "#e5e7eb", "#059669"])),
        option("theme", "car_color_theme", cars([colours.accent])),
        option("fixed", "car_color_fixed", cars([colours.fixed])),
      ],
      3,
    ),
  },
]);

const paintSchema = keyedMemo<HaFormSchema>(() => [
  {
    name: "paint_width",
    selector: boxSelector(
      [
        option("thin", "paint_width_thin", lot("", 1.2, "#f4f4f4")),
        option("medium", "paint_width_medium", lot("", 2, "#f4f4f4")),
        option("wide", "paint_width_wide", lot("", 3.4, "#f4f4f4")),
      ],
      3,
    ),
  },
  {
    name: "icon_paint_mode",
    selector: boxSelector(
      [
        option("default", "icon_paint_default", LABEL_STATUS),
        option("white", "icon_paint_white", LABEL_WHITE),
      ],
      2,
    ),
  },
]);

@customElement("ladestellen-austria-parking-card-editor")
export class LadestellenAustriaParkingCardEditor
  extends PanelEditor<ParkingLotCardConfig>
  implements LovelaceCardEditor
{
  protected readonly _defaults = FORM_DEFAULTS;
  protected readonly _text = formText("parking_editor", "editor");

  protected _fromForm(value: Record<string, unknown>): Record<string, unknown> {
    const { show_header, ...next } = value;
    if (show_header !== undefined) next["hide_header"] = show_header === false;
    if (typeof next["min_kw"] === "string") next["min_kw"] = Number(next["min_kw"]) || 0;
    return next;
  }

  private _selectStation(stationId: string): void {
    const next: ParkingLotCardConfig = { ...this._config, station_id: stationId };
    if (this._config.station_id === stationId) delete next.station_id;
    this._commit(next);
  }

  private _carColorFixedChanged = (ev: Event): void => {
    const value = (ev.target as HTMLInputElement | null)?.value;
    if (!value || this._config.car_color_fixed === value) return;
    this._commit({ ...this._config, car_color_fixed: value });
  };

  protected override render(): TemplateResult {
    const c = this._config;
    const entityId = c.entity;
    const stateObj = entityId ? this.hass?.states[entityId] : undefined;
    const stations = (stateObj?.attributes?.["stations"] ?? []) as Station[];
    const minKw = typeof c.min_kw === "number" && c.min_kw > 0 ? c.min_kw : 0;
    const data: Record<string, unknown> = {
      ...FORM_DEFAULTS,
      ...c,
      show_header: c.hide_header !== true,
      min_kw: String(minKw),
    };
    const form = (schema: HaFormSchema) => this._form(schema, data);
    const lang = this.hass?.language ?? "";
    const mode = String(c.car_color_mode ?? FORM_DEFAULTS["car_color_mode"]);
    const auto = c.auto_nearest === true;

    return html`
      <div class="editor">
        ${form(ENTITY_SCHEMA)} ${this._renderEntityAlert()}
        <div class="field">
          <div class="field-label" id="station-picker-heading">
            ${localize("parking.editor_station_heading")}
          </div>
          ${form(auto ? STATION_SCHEMA_AUTO : STATION_SCHEMA_FIXED)}
          ${auto ? nothing : this._renderStationPicker(entityId, stations, c.station_id ?? "")}
        </div>
        ${form(NAME_SCHEMA)}
        ${this._renderPanels([
          // Leads the part groups: in nearest mode it decides which
          // station the card shows at all.
          {
            id: "plug",
            icon: "mdi:ev-plug-type2",
            header: localize("parking_editor.group_plug"),
            summary: plugSummary(c),
            body: () => html`
              ${this._renderPlugChips()}
              <hr />
              ${form(powerSchema(`${lang}|${minKw}`, minKw))}
              <div class="editor-hint">${localize("parking_editor.plug_power_hint")}</div>
            `,
          },
          {
            id: "header",
            icon: "mdi:page-layout-header",
            header: localize("parking_editor.group_header"),
            summary:
              c.hide_header === true
                ? localize("editor.summary_hidden")
                : [
                    localize("editor.summary_header"),
                    c.show_free_count !== false && localize("parking_editor.summary_counter"),
                  ]
                    .filter(Boolean)
                    .join(" · "),
            body: () =>
              html`${form(c.hide_header === true ? HEADER_SCHEMA_NO_HEADER : HEADER_SCHEMA)}`,
          },
          {
            id: "lot",
            icon: "mdi:car",
            header: localize("parking_editor.group_lot"),
            summary: [
              localize(`parking_editor.asphalt_${c.asphalt_style ?? "default"}`),
              localize(`parking_editor.car_color_${mode}`),
              localize(`parking_editor.paint_width_${c.paint_width ?? "medium"}`),
            ].join(" · "),
            body: () => {
              const colours = {
                accent: this._accent(),
                fixed: c.car_color_fixed || DEFAULT_FIXED_COLOUR,
              };
              return html`
                ${form(carsSchema(`${lang}|${colours.accent}|${colours.fixed}`, colours))}
                ${mode === "fixed" ? this._renderCarColorPicker() : nothing}
                <hr />
                ${form(paintSchema(lang))}
              `;
            },
          },
          this._footerPanel(data),
        ])}
      </div>
    `;
  }

  /** The plug chips, the same row the list card's filters use. */
  private _renderPlugChips(): TemplateResult {
    const picked = this._config.connector_types ?? [];
    return chipGroup(
      "plug",
      localize("parking_editor.plugs"),
      localize("parking_editor.plugs_helper"),
      CONNECTOR_FILTER_OPTIONS.map((token) =>
        filterChip(
          picked.includes(token),
          () => this._toggleListItem("connector_types", token),
          token,
        ),
      ),
    );
  }

  /** The theme's accent colour, for the "accent colour" tile's cars. */
  private _accent(): string {
    return getComputedStyle(this).getPropertyValue("--primary-color").trim() || FALLBACK_ACCENT;
  }

  /** The fixed-station radio list with its hints; hidden while the card
   *  follows the nearest station. */
  private _renderStationPicker(
    entityId: string | undefined,
    stations: Station[],
    selectedId: string,
  ): TemplateResult {
    return html`
      ${
        !entityId
          ? html`<div class="editor-hint editor-hint--muted">
            ${localize("editor.pin_select_sensor_first")}
          </div>`
          : stations.length === 0
            ? html`<div class="editor-hint editor-hint--muted">
            ${localize("editor.pin_no_stations_yet")}
          </div>`
            : html`
            <div
              class="pin-list"
              role="radiogroup"
              aria-labelledby="station-picker-heading"
              aria-describedby="station-picker-hint"
            >
              ${stations.map((s) => this._renderStationOption(s, s.stationId === selectedId))}
            </div>
          `
      }
      ${
        selectedId && !stations.some((s) => s.stationId === selectedId)
          ? html`<div class="editor-hint editor-hint--muted">
            ${localize("parking.station_not_in_range")}
            <span class="orphan-id">${selectedId}</span>
          </div>`
          : nothing
      }
      <div class="editor-hint" id="station-picker-hint">
        ${localize("parking.pick_station_hint")}
      </div>
    `;
  }

  private _renderStationOption(s: Station, isSelected: boolean): TemplateResult {
    const distanceText = typeof s.distance === "number" ? `${s.distance.toFixed(2)} km` : "";
    return html`
      <button
        type="button"
        class=${isSelected ? "pin-row pinned" : "pin-row"}
        role="radio"
        aria-checked=${isSelected}
        @click=${() => this._selectStation(s.stationId)}
      >
        <ha-icon
          icon=${isSelected ? "mdi:radiobox-marked" : "mdi:radiobox-blank"}
          aria-hidden="true"
        ></ha-icon>
        <span class="pin-label">${s.label}</span>
        <span class="pin-meta">${distanceText}</span>
      </button>
    `;
  }

  private _renderCarColorPicker(): TemplateResult {
    const color = this._config.car_color_fixed || DEFAULT_FIXED_COLOUR;
    const label = localize("parking_editor.car_colour");
    return html`<div class="field">
      <div class="field-label">${label}</div>
      <div class="toggle-row">
        <label class="color-swatch" style=${`--swatch-color: ${color};`}>
          <ha-icon icon="mdi:palette-swatch-variant" aria-hidden="true"></ha-icon>
          <span class="color-swatch-hex">${color.toUpperCase()}</span>
          <input
            type="color"
            class="color-swatch-input"
            .value=${color}
            aria-label=${label}
            @input=${this._carColorFixedChanged}
            @change=${this._carColorFixedChanged}
          />
        </label>
      </div>
    </div>`;
  }
}
