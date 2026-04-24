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

import {
  CONNECTOR_FILTER_OPTIONS,
  type LadestellenAustriaCardConfig,
} from "./types";
import { editorStyles } from "./styles";
import { localize, setLanguage } from "./localize/localize";

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
    setLanguage(this.hass?.language);
    const selectedConnectors = this._config.connector_types ?? [];
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
            : nothing}

          <div class="toggle-row">
            <label>${localize("editor.show_hero")}</label>
            <ha-switch
              .checked=${this._config.show_hero !== false}
              .configValue=${"show_hero"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${localize("editor.show_pricing")}</label>
            <ha-switch
              .checked=${this._config.show_pricing ?? true}
              .configValue=${"show_pricing"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${localize("editor.show_amenities")}</label>
            <ha-switch
              .checked=${this._config.show_amenities ?? true}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        </div>

        <div class="editor-section">
          <div class="section-header">${localize("editor.section_filters")}</div>

          <div class="toggle-row">
            <label>${localize("editor.only_available")}</label>
            <ha-switch
              .checked=${this._config.only_available ?? false}
              .configValue=${"only_available"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label>${localize("editor.only_free")}</label>
            <ha-switch
              .checked=${this._config.only_free ?? false}
              .configValue=${"only_free"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="editor-hint">${localize("editor.connector_filter_hint")}</div>
          <div class="chip-row">
            ${CONNECTOR_FILTER_OPTIONS.map(
              (token) => html`
                <button
                  type="button"
                  class=${selectedConnectors.includes(token)
                    ? "filter-chip active"
                    : "filter-chip"}
                  @click=${() => this._toggleConnector(token)}
                >
                  ${token}
                </button>
              `,
            )}
          </div>

          <div class="editor-hint">${localize("editor.hint_compliance")}</div>
        </div>
      </div>
    `;
  }

  private _toggleConnector(token: string): void {
    const current = this._config.connector_types ?? [];
    const next = current.includes(token)
      ? current.filter((t) => t !== token)
      : [...current, token];
    this._config = { ...this._config, connector_types: next };
    fireEvent(this, "config-changed", { config: this._config });
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
