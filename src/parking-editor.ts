// Visual editor for the parking-slot card. Two decisions to make:
// - which sensor (limited to ladestellen_austria integration entities)
// - which station from that sensor's stations[]
// Plus an optional custom title. Mirrors the shape of the list-card
// editor (ladestellen-austria-card-editor) but stays small.

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

  protected render(): TemplateResult {
    setLanguage(this.hass?.language);
    const entityId = this._config.entity;
    const stateObj = entityId ? this.hass?.states[entityId] : undefined;
    const stations = (stateObj?.attributes?.["stations"] ?? []) as Station[];
    const selectedId = this._config.station_id ?? "";
    // WCAG 3.3.1 (error identification) — flag an invalid entity in
    // text so the error isn't only conveyed by downstream empty states.
    const entityInvalid =
      !!entityId && !!this.hass && !this.hass.states[entityId];
    return html`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${localize("editor.section_main")}</div>

          ${this.hass
            ? html`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{
                    entity: {
                      domain: "sensor",
                      integration: "ladestellen_austria",
                    },
                  }}
                  .value=${this._config.entity || undefined}
                  .configValue=${"entity"}
                  .label=${localize("editor.entity")}
                  .required=${true}
                  aria-invalid=${entityInvalid ? "true" : "false"}
                  aria-describedby=${entityInvalid ? "entity-error" : nothing}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
                ${entityInvalid
                  ? html`<ha-alert
                      id="entity-error"
                      alert-type="error"
                    >
                      ${localize("editor.entity_missing")}
                    </ha-alert>`
                  : nothing}
              `
            : html`<p>${localize("common.loading")}</p>`}

          <ha-textfield
            label=${localize("editor.name")}
            .value=${this._config.name || ""}
            .configValue=${"name"}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

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

        <div class="editor-section">
          <div class="section-header">
            ${localize("editor.section_appearance")}
          </div>

          <div class="toggle-row">
            <label for="parking-toggle-show-free"
              >${localize("editor.show_free_count")}</label
            >
            <ha-switch
              id="parking-toggle-show-free"
              .checked=${this._config.show_free_count !== false}
              .configValue=${"show_free_count"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="parking-toggle-logo-adapt"
              >${localize("editor.logo_adapt_to_theme")}</label
            >
            <ha-switch
              id="parking-toggle-logo-adapt"
              .checked=${this._config.logo_adapt_to_theme ?? false}
              .configValue=${"logo_adapt_to_theme"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="parking-toggle-hide-header"
              >${localize("editor.hide_header")}</label
            >
            <ha-switch
              id="parking-toggle-hide-header"
              .checked=${this._config.hide_header ?? false}
              .configValue=${"hide_header"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <ha-selector
            .hass=${this.hass}
            .selector=${{
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
            }}
            .value=${this._config.car_color_mode ?? "random"}
            .configValue=${"car_color_mode"}
            .label=${localize("editor.car_color_mode")}
            @value-changed=${this._valueChanged}
          ></ha-selector>

          ${this._config.car_color_mode === "fixed"
            ? html`<div class="toggle-row">
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
                    .configValue=${"car_color_fixed"}
                    aria-label=${localize("editor.car_color_pick")}
                    @input=${this._valueChanged}
                    @change=${this._valueChanged}
                  />
                </label>
              </div>`
            : nothing}
        </div>

        <div class="editor-section">
          <div class="editor-hint">${localize("editor.hint_compliance")}</div>
        </div>
      </div>
    `;
  }

  private _selectStation(stationId: string): void {
    const next = this._config.station_id === stationId ? "" : stationId;
    this._config = { ...this._config, station_id: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as EventTarget & {
      configValue?: keyof ParkingLotCardConfig;
      value?: unknown;
      checked?: boolean;
      type?: string;
      tagName?: string;
    };
    if (!target.configValue) return;

    // Discriminate booleans by tag/type, not by `target.checked !==
    // undefined`. Every <input> exposes `.checked` as a real boolean
    // (false on a colour input), so the old check silently routed
    // colour-picker events to the boolean branch and overwrote the
    // config field with `false`.
    const tag = (target.tagName ?? "").toUpperCase();
    const isToggle = tag === "HA-SWITCH" || target.type === "checkbox";

    const newValue = isToggle
      ? Boolean(target.checked)
      : ((ev as CustomEvent).detail?.value ?? target.value);

    if (this._config[target.configValue] === newValue) return;

    this._config = { ...this._config, [target.configValue]: newValue };
    fireEvent(this, "config-changed", { config: this._config });
  }

  static styles: CSSResultGroup = editorStyles;
}
