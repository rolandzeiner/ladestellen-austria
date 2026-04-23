import {
  LitElement,
  html,
  type CSSResultGroup,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  fireEvent,
  type HomeAssistant,
  type LovelaceCardEditor,
} from "custom-card-helpers";

import type { LadestellenAustriaCardConfig } from "./types";
import { editorStyles } from "./styles";
import { localize } from "./localize/localize";

@customElement("ladestellen-austria-card-editor")
export class LadestellenAustriaCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config: LadestellenAustriaCardConfig = {
    type: "ladestellen-austria-card",
  };

  public setConfig(config: LadestellenAustriaCardConfig): void {
    this._config = { ...config };
  }

  protected render(): TemplateResult {
    return html`
      <div class="editor">
        <div class="editor-section">
          <div class="section-header">${localize("editor.section_main")}</div>

          ${this.hass
            ? html`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{
                    entity: { domain: "sensor", integration: "ladestellen_austria" },
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
          <div class="section-header">${localize("editor.section_display")}</div>

          ${this.hass
            ? html`
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{
                    number: { min: 1, max: 10, step: 1, mode: "slider" },
                  }}
                  .value=${this._config.max_stations ?? 10}
                  .configValue=${"max_stations"}
                  .label=${localize("editor.max_stations")}
                  @value-changed=${this._valueChanged}
                ></ha-selector>
              `
            : ""}

          <div class="toggle-row">
            <label>${localize("editor.show_amenities")}</label>
            <ha-switch
              .checked=${this._config.show_amenities ?? true}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="editor-hint">${localize("editor.hint_compliance")}</div>
        </div>
      </div>
    `;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as EventTarget & {
      configValue?: keyof LadestellenAustriaCardConfig;
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
