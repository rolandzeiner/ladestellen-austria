// Visual editor for the parking-slot card. Same `ha-form` shape as
// the list-card editor — entity + name + appearance fields go through
// a declarative schema, the station picker (a click-to-select list of
// the sensor's stations[]) and the colour swatch sit below as bespoke
// `.editor-section` blocks.

import {
  LitElement,
  html,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  fireEvent,
  type HomeAssistant,
  type LovelaceCardEditor,
} from "custom-card-helpers";

import type { ParkingLotCardConfig, Station } from "./types";
import { editorStyles } from "./styles";
import { localize, setLanguage } from "./localize/localize";

// Schema is built inside render() so the car-colour dropdown labels
// can pick up the user's current language without a schema rebuild
// step. Using `any[]` here is the pragmatic shape — ha-form's TS types
// aren't exported in custom-card-helpers, and the runtime accepts the
// declarative JSON-shape directly.
type HaFormSchema = ReadonlyArray<Record<string, unknown>>;

const FORM_DEFAULTS: Record<string, unknown> = {
  hide_header: false,
  show_free_count: true,
  logo_adapt_to_theme: false,
  car_color_mode: "random",
};

@customElement("ladestellen-austria-parking-card-editor")
export class LadestellenAustriaParkingCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config: ParkingLotCardConfig = {
    type: "ladestellen-austria-parking-card",
  };

  public setConfig(config: ParkingLotCardConfig): void {
    this._config = { ...config };
  }

  // Update `_config` locally THEN fire — Lovelace's dashboard persists
  // config-changed but doesn't re-invoke setConfig on this editor
  // instance. The local update is what drives the next render's
  // `data` prop for ha-form AND the conditional rendering of the
  // colour swatch (only shown when car_color_mode === "fixed") and
  // the station picker's selected-state visuals.
  private _formChanged(ev: CustomEvent): void {
    const next = ev.detail.value as ParkingLotCardConfig;
    if (!next) return;
    this._config = next;
    fireEvent(this, "config-changed", { config: next });
  }

  private _computeLabel = (schema: {
    name: string;
    type?: string;
  }): string => {
    const key = schema.type === "expandable"
      ? `editor.section_${schema.name}`
      : `editor.${schema.name}`;
    const resolved = localize(key);
    return resolved === key ? schema.name : resolved;
  };

  // Two schemas — split so the station-picker section can render
  // BETWEEN them. Both ha-forms share the same `_formChanged` handler
  // and the same `data` prop (full _config); each form preserves the
  // fields it doesn't render and writes back the merged config.
  private _topSchema(): HaFormSchema {
    return [
      {
        name: "entity",
        required: true,
        selector: {
          entity: { domain: "sensor", integration: "ladestellen_austria" },
        },
      },
      { name: "name", selector: { text: {} } },
    ];
  }

  private _appearanceSchema(): HaFormSchema {
    // ha-form's `select` selector renders option `label` as the visible
    // string. Resolving at render-time means language switches reflect
    // immediately without a schema rebuild step.
    return [
      {
        type: "expandable",
        name: "appearance",
        // flatten: true keeps the inner fields at the top level of
        // ev.detail.value (data.car_color_mode, not data.appearance.car_color_mode)
        // so the card-side `_config.car_color_mode === "fixed"` check
        // resolves correctly and the colour-swatch reveal works.
        flatten: true,
        schema: [
          { name: "hide_header", selector: { boolean: {} } },
          { name: "show_free_count", selector: { boolean: {} } },
          { name: "logo_adapt_to_theme", selector: { boolean: {} } },
          {
            name: "car_color_mode",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  {
                    value: "random",
                    label: localize("editor.car_color_random"),
                  },
                  {
                    value: "theme",
                    label: localize("editor.car_color_theme"),
                  },
                  {
                    value: "fixed",
                    label: localize("editor.car_color_fixed"),
                  },
                ],
              },
            },
          },
        ],
      },
    ];
  }

  private _selectStation(stationId: string): void {
    const next = this._config.station_id === stationId ? "" : stationId;
    this._config = { ...this._config, station_id: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _carColorFixedChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement | null;
    if (!target) return;
    const value = target.value;
    if (this._config.car_color_fixed === value) return;
    this._config = { ...this._config, car_color_fixed: value };
    fireEvent(this, "config-changed", { config: this._config });
  }

  protected render(): TemplateResult {
    setLanguage(this.hass?.language);
    if (!this.hass) {
      return html`<p>${localize("common.loading")}</p>`;
    }
    const entityId = this._config.entity;
    const stateObj = entityId ? this.hass.states[entityId] : undefined;
    const stations = (stateObj?.attributes?.["stations"] ?? []) as Station[];
    const selectedId = this._config.station_id ?? "";
    const data: Record<string, unknown> = {
      ...FORM_DEFAULTS,
      ...this._config,
    };
    const entityInvalid =
      !!entityId && !this.hass.states[entityId];

    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${this._topSchema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formChanged}
        ></ha-form>
        ${entityInvalid
          ? html`<ha-alert alert-type="error">
              ${localize("editor.entity_missing")}
            </ha-alert>`
          : nothing}

        <div class="editor-section">
          <div class="section-header">
            ${localize("parking.editor_station_heading")}
          </div>
          <div class="editor-hint">
            ${localize("parking.pick_station_hint")}
          </div>
          ${!entityId
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
                    const isSelected = s.stationId === selectedId;
                    const distanceText =
                      typeof s.distance === "number"
                        ? `${s.distance.toFixed(2)} km`
                        : "";
                    return html`
                      <button
                        type="button"
                        class=${isSelected ? "pin-row pinned" : "pin-row"}
                        @click=${() => this._selectStation(s.stationId)}
                      >
                        <ha-icon
                          icon=${isSelected
                            ? "mdi:radiobox-marked"
                            : "mdi:radiobox-blank"}
                        ></ha-icon>
                        <span class="pin-label">${s.label}</span>
                        <span class="pin-meta">${distanceText}</span>
                      </button>
                    `;
                  })}
                </div>
              `}
          ${selectedId && !stations.some((s) => s.stationId === selectedId)
            ? html`<div class="editor-hint editor-hint--muted">
                ${localize("parking.station_not_in_range")}: ${selectedId}
              </div>`
            : nothing}
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${this._appearanceSchema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._formChanged}
        ></ha-form>

        ${this._config.car_color_mode === "fixed"
          ? html`<div class="editor-section">
              <div class="section-header">
                ${localize("editor.car_color_pick")}
              </div>
              <div class="toggle-row">
                <span>${localize("editor.car_color_pick")}</span>
                <label
                  class="color-swatch"
                  style=${`--swatch-color: ${
                    this._config.car_color_fixed || "#1d4ed8"
                  };`}
                >
                  <ha-icon
                    icon="mdi:palette-swatch-variant"
                    aria-hidden="true"
                  ></ha-icon>
                  <span class="color-swatch-hex"
                    >${(
                      this._config.car_color_fixed || "#1d4ed8"
                    ).toUpperCase()}</span
                  >
                  <input
                    type="color"
                    class="color-swatch-input"
                    .value=${this._config.car_color_fixed || "#1d4ed8"}
                    aria-label=${localize("editor.car_color_pick")}
                    @input=${this._carColorFixedChanged}
                    @change=${this._carColorFixedChanged}
                  />
                </label>
              </div>
            </div>`
          : nothing}

        <div class="editor-section">
          <div class="editor-hint">${localize("editor.hint_compliance")}</div>
        </div>
      </div>
    `;
  }

  static styles: CSSResultGroup = editorStyles;
}
