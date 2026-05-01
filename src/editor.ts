// Visual editor for the list card. Implemented "by the book": every
// typed field goes through <ha-form> with a declarative schema array
// (HA 2024+ best practice — same shape as the built-in tile-card,
// entities, gauge editors). Expandable sections group related fields
// the way HA's design system intends, the schema-driven a11y wiring
// (label + describedby + form-field id pairing) is handled by ha-form
// itself, and the value-changed handler is one line that splats the
// merged config back into our reactive state.
//
// Custom widgets (connector / amenity / payment chip filters and the
// pin picker) sit BELOW the ha-form as bespoke `.editor-section`
// blocks — they have no clean ha-form selector equivalent and the
// skill explicitly carves out the "keep-some-custom-rendering path"
// for cases like this. Both layers use the same .editor-section /
// .section-header styling so the editor reads as one coherent flow.

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

// ha-form schema. Each `name` is resolved via computeLabel into
// `editor.<name>` so the localize namespace stays flat. Expandable
// sections wrap the per-section schemas; HA renders them as collapsible
// groups with the section title from `editor.section_<name>`.
//
// `HaFormSchema` is the pragmatic shape — ha-form's TS types aren't
// exported through custom-card-helpers, but the runtime accepts the
// declarative JSON shape directly.
type HaFormSchema = ReadonlyArray<Record<string, unknown>>;

const SCHEMA: HaFormSchema = [
  {
    name: "entity",
    required: true,
    selector: { entity: { domain: "sensor", integration: "ladestellen_austria" } },
  },
  { name: "name", selector: { text: {} } },
  {
    type: "expandable",
    name: "display",
    // flatten: true — without this, ha-form scopes the inner schema's
    // values under data[name] (i.e. data.display.show_hero) when it
    // fires value-changed. The card renderer reads `this.config.show_hero`
    // flat; the nested shape silently leaves every flag at its default.
    // hui-tile-card-editor uses the same flag for the same reason.
    flatten: true,
    schema: [
      {
        name: "max_stations",
        selector: { number: { min: 1, max: 10, step: 1, mode: "slider" } },
      },
      { name: "hide_header", selector: { boolean: {} } },
      { name: "show_hero", selector: { boolean: {} } },
      { name: "show_pricing", selector: { boolean: {} } },
      { name: "show_amenities", selector: { boolean: {} } },
      { name: "sort_by_power", selector: { boolean: {} } },
      { name: "logo_adapt_to_theme", selector: { boolean: {} } },
    ],
  },
  {
    type: "expandable",
    name: "filters",
    flatten: true,
    schema: [
      { name: "only_available", selector: { boolean: {} } },
      { name: "only_free", selector: { boolean: {} } },
      { name: "only_open", selector: { boolean: {} } },
    ],
  },
];

// ha-form reads defaults from `data`, so booleans pre-toggle correctly
// even before the user has touched them (the card's render-time
// `?? true` / `!== false` defaults are mirrored here so what the user
// sees in the editor matches what the card renders).
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

@customElement("ladestellen-austria-card-editor")
class LadestellenAustriaCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config: LadestellenAustriaCardConfig = {
    type: "ladestellen-austria-card",
  };

  public setConfig(config: LadestellenAustriaCardConfig): void {
    // WCAG 3.3.7 (redundant entry) — derive `name` from the selected
    // sensor's friendly_name when the user hasn't explicitly set it.
    const friendlyName =
      config.entity && this.hass?.states[config.entity]?.attributes
        .friendly_name;
    this._config =
      typeof friendlyName === "string"
        ? { name: friendlyName, ...config }
        : { ...config };
  }

  // ha-form's value-changed delivers the merged config (current data +
  // user's edit). Update `_config` locally THEN fire config-changed.
  // Lovelace's dashboard catches the event to persist the new config
  // but does NOT re-invoke setConfig on this editor instance — the
  // editor element persists across edits, so `_config` is the
  // single source of truth for the next render's `data` prop AND for
  // the bespoke widgets below (chip filters, pin picker) whose
  // selected-state visuals read from it. Without the local update
  // toggles flip in ha-form briefly then snap back on the next render.
  private _formChanged(ev: CustomEvent): void {
    const next = ev.detail.value as LadestellenAustriaCardConfig;
    if (!next) return;
    this._config = next;
    fireEvent(this, "config-changed", { config: next });
  }

  // `editor.<name>` for plain fields, `editor.section_<name>` for
  // expandable section titles. Falls back to the raw key when a
  // translation is missing so debugging surfaces the gap visibly.
  private _computeLabel = (schema: { name: string; type?: string }): string => {
    const key = schema.type === "expandable"
      ? `editor.section_${schema.name}`
      : `editor.${schema.name}`;
    const resolved = localize(key);
    return resolved === key ? schema.name : resolved;
  };

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
      ? current.filter((k) => k !== key)
      : [...current, key];
    this._config = { ...this._config, amenities: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _togglePayment(key: string): void {
    const current = this._config.payment_methods ?? [];
    const next = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    this._config = { ...this._config, payment_methods: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _togglePin(stationId: string): void {
    const current = this._config.pinned_station_ids ?? [];
    const next = current.includes(stationId)
      ? current.filter((id) => id !== stationId)
      : [...current, stationId];
    this._config = { ...this._config, pinned_station_ids: next };
    fireEvent(this, "config-changed", { config: this._config });
  }

  protected render(): TemplateResult {
    setLanguage(this.hass?.language);
    if (!this.hass) {
      return html`<p>${localize("common.loading")}</p>`;
    }

    const data: Record<string, unknown> = { ...FORM_DEFAULTS, ...this._config };
    const selectedConnectors = this._config.connector_types ?? [];
    const selectedAmenities = this._config.amenities ?? [];
    const selectedPayments = this._config.payment_methods ?? [];
    // WCAG 3.3.1 (error identification) — flag a configured entity that
    // isn't in hass.states (e.g. integration removed). ha-form's entity
    // selector shows its own validity styling but doesn't surface a
    // user-facing message; the alert below it does.
    const entityInvalid =
      !!this._config.entity && !this.hass.states[this._config.entity];

    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${SCHEMA}
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
            ${localize("editor.section_chip_filters")}
          </div>
          <div class="editor-hint">
            ${localize("editor.connector_filter_hint")}
          </div>
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

          <div class="editor-hint">
            ${localize("editor.amenity_filter_hint")}
          </div>
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

          <div class="editor-hint">
            ${localize("editor.payment_filter_hint")}
          </div>
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
        ${!dynamicMode && orphanIds.length > 0
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
                      @click=${() => this._togglePin(id)}
                    >
                      <ha-icon icon="mdi:pin"></ha-icon>
                      <span class="pin-label orphan-id">${id}</span>
                      <span class="pin-meta">
                        ${localize("editor.pin_unpin")}
                      </span>
                    </button>
                  `,
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  static styles: CSSResultGroup = editorStyles;
}
