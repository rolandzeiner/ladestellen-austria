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
  AMENITY_FILTER_OPTIONS,
  CONNECTOR_FILTER_OPTIONS,
  PAYMENT_FILTER_OPTIONS,
  type LadestellenAustriaCardConfig,
  type Station,
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
    // WCAG 3.3.7 (redundant entry) — derive `name` from the selected
    // sensor's friendly_name when the user hasn't explicitly set it, so
    // the second field doesn't re-ask for data already implied by the
    // first.
    const friendlyName =
      config.entity && this.hass?.states[config.entity]?.attributes
        .friendly_name;
    this._config = {
      name: typeof friendlyName === "string" ? friendlyName : undefined,
      ...config,
    };
  }

  protected render(): TemplateResult {
    setLanguage(this.hass?.language);
    const selectedConnectors = this._config.connector_types ?? [];
    const selectedAmenities = this._config.amenities ?? [];
    const selectedPayments = this._config.payment_methods ?? [];
    // WCAG 3.3.1 (error identification) — flag an entity that isn't in
    // hass.states so the error is conveyed in text, not just by the
    // downstream empty-state. aria-describedby points AT users at the
    // <ha-alert> rendered below.
    const entityInvalid =
      !!this._config.entity && !!this.hass && !this.hass.states[this._config.entity];
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
            <label for="toggle-show-hero"
              >${localize("editor.show_hero")}</label
            >
            <ha-switch
              id="toggle-show-hero"
              .checked=${this._config.show_hero !== false}
              .configValue=${"show_hero"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-show-pricing"
              >${localize("editor.show_pricing")}</label
            >
            <ha-switch
              id="toggle-show-pricing"
              .checked=${this._config.show_pricing ?? true}
              .configValue=${"show_pricing"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-show-amenities"
              >${localize("editor.show_amenities")}</label
            >
            <ha-switch
              id="toggle-show-amenities"
              .checked=${this._config.show_amenities ?? true}
              .configValue=${"show_amenities"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-sort-by-power"
              >${localize("editor.sort_by_power")}</label
            >
            <ha-switch
              id="toggle-sort-by-power"
              .checked=${this._config.sort_by_power ?? false}
              .configValue=${"sort_by_power"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-logo-adapt"
              >${localize("editor.logo_adapt_to_theme")}</label
            >
            <ha-switch
              id="toggle-logo-adapt"
              .checked=${this._config.logo_adapt_to_theme ?? false}
              .configValue=${"logo_adapt_to_theme"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-hide-header"
              >${localize("editor.hide_header")}</label
            >
            <ha-switch
              id="toggle-hide-header"
              .checked=${this._config.hide_header ?? false}
              .configValue=${"hide_header"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>
        </div>

        <div class="editor-section">
          <div class="section-header">${localize("editor.section_filters")}</div>

          <div class="toggle-row">
            <label for="toggle-only-available"
              >${localize("editor.only_available")}</label
            >
            <ha-switch
              id="toggle-only-available"
              .checked=${this._config.only_available ?? false}
              .configValue=${"only_available"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-only-free"
              >${localize("editor.only_free")}</label
            >
            <ha-switch
              id="toggle-only-free"
              .checked=${this._config.only_free ?? false}
              .configValue=${"only_free"}
              @change=${this._valueChanged}
            ></ha-switch>
          </div>

          <div class="toggle-row">
            <label for="toggle-only-open"
              >${localize("editor.only_open")}</label
            >
            <ha-switch
              id="toggle-only-open"
              .checked=${this._config.only_open ?? false}
              .configValue=${"only_open"}
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

          <div class="editor-hint">${localize("editor.amenity_filter_hint")}</div>
          <div class="chip-row">
            ${AMENITY_FILTER_OPTIONS.map(
              (opt) => html`
                <button
                  type="button"
                  class=${selectedAmenities.includes(opt.key)
                    ? "filter-chip icon-chip active"
                    : "filter-chip icon-chip"}
                  @click=${() => this._toggleAmenity(opt.key)}
                >
                  <ha-icon icon=${opt.icon}></ha-icon>
                  <span>${localize(opt.label_key)}</span>
                </button>
              `,
            )}
          </div>

          <div class="editor-hint">${localize("editor.payment_filter_hint")}</div>
          <div class="chip-row">
            ${PAYMENT_FILTER_OPTIONS.map(
              (opt) => html`
                <button
                  type="button"
                  class=${selectedPayments.includes(opt.key)
                    ? "filter-chip icon-chip active"
                    : "filter-chip icon-chip"}
                  @click=${() => this._togglePayment(opt.key)}
                >
                  <ha-icon icon=${opt.icon}></ha-icon>
                  <span>${localize(opt.label_key)}</span>
                </button>
              `,
            )}
          </div>

          <div class="editor-hint">${localize("editor.hint_compliance")}</div>
        </div>

        ${this._renderPinSection()}
      </div>
    `;
  }

  private _renderPinSection(): TemplateResult {
    const entityId = this._config.entity;
    const stateObj = entityId ? this.hass?.states[entityId] : undefined;
    const stations = (stateObj?.attributes?.["stations"] ?? []) as Station[];
    const pinned = this._config.pinned_station_ids ?? [];
    const pinnedSet = new Set(pinned);
    const liveIds = new Set(stations.map((s) => s.stationId));
    const orphanIds = pinned.filter((id) => !liveIds.has(id));
    // When the chosen sensor follows a device_tracker, pinning is moot —
    // the nearby-stations list changes every time the user moves. Show a
    // hint instead of the pin list, but keep the section visible so users
    // don't wonder where their old pins went (they're preserved in the
    // config until the user switches back to static mode).
    const dynamicMode =
      (stateObj?.attributes?.["dynamic_mode"] as boolean) === true;

    return html`
      <div class="editor-section">
        <div class="section-header">${localize("editor.section_pinned")}</div>
        <div class="editor-hint">${localize("editor.pin_hint")}</div>

        ${dynamicMode
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
                    typeof s.distance === "number"
                      ? `${s.distance.toFixed(2)} km`
                      : "";
                  return html`
                    <button
                      type="button"
                      class=${isPinned ? "pin-row pinned" : "pin-row"}
                      @click=${() => this._togglePin(s.stationId)}
                    >
                      <ha-icon
                        icon=${isPinned ? "mdi:pin" : "mdi:pin-outline"}
                      ></ha-icon>
                      <span class="pin-label">${s.label}</span>
                      <span class="pin-meta">${distanceText}</span>
                    </button>
                  `;
                })}
              </div>
            `}
        ${orphanIds.length > 0
          ? html`
              <div class="editor-hint editor-hint--muted">
                ${localize("editor.pin_orphans_heading")}
              </div>
              <div class="pin-list">
                ${orphanIds.map(
                  (id) => html`
                    <button
                      type="button"
                      class="pin-row orphan"
                      @click=${() => this._togglePin(id)}
                    >
                      <ha-icon icon="mdi:pin-off-outline"></ha-icon>
                      <span class="pin-label">${id}</span>
                      <span class="pin-meta">${localize("editor.pin_unpin")}</span>
                    </button>
                  `,
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _togglePin(stationId: string): void {
    const current = this._config.pinned_station_ids ?? [];
    const next = current.includes(stationId)
      ? current.filter((id) => id !== stationId)
      : [...current, stationId];
    this._config = { ...this._config, pinned_station_ids: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _toggleConnector(token: string): void {
    const current = this._config.connector_types ?? [];
    const next = current.includes(token)
      ? current.filter((t) => t !== token)
      : [...current, token];
    this._config = { ...this._config, connector_types: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _toggleAmenity(key: string): void {
    const current = this._config.amenities ?? [];
    const next = current.includes(key)
      ? current.filter((t) => t !== key)
      : [...current, key];
    this._config = { ...this._config, amenities: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _togglePayment(key: string): void {
    const current = this._config.payment_methods ?? [];
    const next = current.includes(key)
      ? current.filter((t) => t !== key)
      : [...current, key];
    this._config = { ...this._config, payment_methods: next };
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
