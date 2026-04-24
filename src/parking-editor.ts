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
                  @value-changed=${this._valueChanged}
                ></ha-selector>
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
    };
    if (!target.configValue) return;

    const newValue =
      target.checked !== undefined
        ? target.checked
        : ((ev as CustomEvent).detail?.value ?? target.value);

    if (this._config[target.configValue] === newValue) return;

    this._config = { ...this._config, [target.configValue]: newValue };
    fireEvent(this, "config-changed", { config: this._config });
  }

  static styles: CSSResultGroup = editorStyles;
}
