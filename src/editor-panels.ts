// What both card editors share: the collapsible groups, the labels and
// helpers for their ha-forms, and how a form's value becomes the saved
// config.

import {
  LitElement,
  html,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";

import { fireEvent, type HomeAssistant, type LovelaceCardConfig } from "./types";
import { syncCardLanguage } from "./card-lifecycle";
import { localize } from "./localize/localize";
import { editorStyles } from "./styles";

// ha-form's TS types aren't shipped on a stable channel by HA core, so
// HaFormSchema is a permissive shape; the runtime accepts the
// declarative JSON shape directly.
export type HaFormSchema = ReadonlyArray<Record<string, unknown>>;

/** One collapsible group of the editor. */
export interface EditorPanel {
  id: string;
  icon: string;
  header: string;
  /** The group's current state in a few words, shown while it is closed. */
  summary: string;
  body: () => TemplateResult;
}

/** A box select: one tile per option, with an optional picture. */
export interface BoxOption {
  value: string;
  label: string;
  description?: string;
  image?: string;
}

export const boxSelector = (options: ReadonlyArray<BoxOption>, columns?: number) => ({
  select: { mode: "box", options, ...(columns ? { box_max_columns: columns } : {}) },
});

/** An SVG drawing as an image URL a box-select tile can show. */
export const svgImage = (body: string, viewBox = "0 0 72 44"): string =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>`,
  )}`;

/** The first namespace with a translation for `key`, or undefined. */
function lookup(namespaces: ReadonlyArray<string>, key: string): string | undefined {
  for (const ns of namespaces) {
    const path = `${ns}.${key}`;
    const text = localize(path);
    if (text !== path) return text;
  }
  return undefined;
}

/**
 * ha-form's computeLabel / computeHelper for an editor whose strings live
 * in `namespaces`, searched in order: `<ns>.<name>` is the label,
 * `<ns>.<name>_helper` the helper below it. A field without a helper
 * gets none.
 */
export function formText(...namespaces: string[]) {
  return {
    computeLabel: (schema: { name: string }): string =>
      lookup(namespaces, schema.name) ?? schema.name,
    computeHelper: (schema: { name: string }): string | undefined =>
      lookup(namespaces, `${schema.name}_helper`),
  };
}

/**
 * The saved config for a form value: the form shows `defaults` for keys
 * the config leaves out, and sends them back with every change. They are
 * dropped again here, so the YAML holds only what differs from the card's
 * own defaults.
 */
export function withoutDefaults<T extends object>(value: T, defaults: Record<string, unknown>): T {
  const out = { ...value } as Record<string, unknown>;
  for (const [key, fallback] of Object.entries(defaults)) {
    if (out[key] === fallback) delete out[key];
  }
  return out as T;
}

/** A value built once per key, so a schema keeps its identity until what
 *  it depends on (the language, a colour) changes: ha-form skips work on
 *  an identical schema array. `key` must change whenever `arg` does. */
export function keyedMemo<T, A = void>(build: (arg: A) => T): (key: string, arg: A) => T {
  let cached: { key: string; value: T } | undefined;
  return (key, arg) => {
    if (cached?.key !== key) cached = { key, value: build(arg) };
    return cached.value;
  };
}

export abstract class PanelEditor<C extends LovelaceCardConfig> extends LitElement {
  static override styles: CSSResultGroup = editorStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() protected _config = {} as C;

  /** The card's own defaults. The forms show them for keys the config
   *  leaves out; withoutDefaults drops them again before saving. */
  protected abstract readonly _defaults: Record<string, unknown>;

  /** Labels and helpers for this editor's ha-forms (see formText). */
  protected abstract readonly _text: ReturnType<typeof formText>;

  /** A form value with the form's own field names mapped back to the
   *  config keys they stand for. */
  protected abstract _fromForm(value: Record<string, unknown>): Record<string, unknown>;

  public setConfig(config: C): void {
    this._config = { ...config };
  }

  // Update `_config` locally THEN fire config-changed. Lovelace's
  // dashboard persists the new config but does NOT re-invoke setConfig on
  // this editor instance — the editor element persists across edits, so
  // `_config` is the single source of truth for the next render's form
  // `data` AND for the hand-written widgets whose selected state reads
  // from it. Without the local update, toggles flip in ha-form briefly
  // then snap back on the next render.
  protected _commit(config: C): void {
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  // Every ha-form gets the whole config as `data`, so each one sends back
  // the merged config, not only its own fields.
  private _formChanged = (ev: CustomEvent): void => {
    const value = ev.detail.value as Record<string, unknown> | undefined;
    if (!value) return;
    this._commit(withoutDefaults(this._fromForm(value), this._defaults) as C);
  };

  /** An ha-form over `data`; nothing until hass arrives, which it needs. */
  protected _form(
    schema: HaFormSchema,
    data: Record<string, unknown>,
  ): TemplateResult | typeof nothing {
    if (!this.hass) return nothing;
    return html`<ha-form
      .hass=${this.hass}
      .data=${data}
      .schema=${schema}
      .computeLabel=${this._text.computeLabel}
      .computeHelper=${this._text.computeHelper}
      @value-changed=${this._formChanged}
    ></ha-form>`;
  }

  /** Groups whose panel is open, so their bodies are built only then. A
   *  record of what the panel did, never an instruction to it: binding
   *  `expanded` pins the panel's height (see _renderPanel). */
  @state() protected _open = new Set<string>();

  /** Whether ha-expansion-panel is registered. Home Assistant loads it
   *  lazily, so a card editor can't count on it. Until it is, the groups
   *  are drawn open, and a hidden ha-form expandable loads it. */
  @state() protected _panels = customElements.get("ha-expansion-panel") !== undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this._panels) {
      void customElements.whenDefined("ha-expansion-panel").then(() => {
        this._panels = true;
      });
    }
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    syncCardLanguage(changedProps, this.hass);
  }

  // WCAG 3.3.1 (error identification) — flag a configured entity that
  // isn't in hass.states (e.g. integration removed). ha-form's entity
  // selector shows its own validity styling but doesn't surface a
  // user-facing message; this alert below it does.
  protected _renderEntityAlert(): TemplateResult | typeof nothing {
    const entity = this._config.entity as string | undefined;
    if (!entity || !this.hass || this.hass.states[entity]) return nothing;
    return html`<ha-alert alert-type="error">${localize("editor.entity_missing")}</ha-alert>`;
  }

  /** Both cards end on the same footer: the E-Control logo and source. */
  protected _footerPanel(data: Record<string, unknown>): EditorPanel {
    return {
      id: "footer",
      icon: "mdi:information-outline",
      header: localize("editor.group_footer"),
      summary: localize(
        this._config.logo_adapt_to_theme === true
          ? "editor.summary_logo_theme"
          : "editor.summary_logo_colour",
      ),
      body: () => html`
        ${this._form(FOOTER_SCHEMA, data)}
        <div class="editor-hint">${localize("editor.hint_compliance")}</div>
      `,
    };
  }

  protected _renderPanels(panels: ReadonlyArray<EditorPanel>): TemplateResult {
    if (this._panels) return html`${panels.map((p) => this._renderPanel(p))}`;
    return html`
      ${
        this.hass
          ? html`<ha-form
            hidden
            .hass=${this.hass}
            .data=${{}}
            .schema=${PANEL_LOADER}
          ></ha-form>`
          : nothing
      }
      ${panels.map(
        (p) => html`<section class="editor-section">
          <div class="section-header" role="heading" aria-level="3">${p.header}</div>
          <div class="editor-hint">${p.summary}</div>
          ${p.body()}
        </section>`,
      )}
    `;
  }

  /**
   * A collapsible group. Its body is built only while it is open: behind
   * a closed panel the forms would otherwise still render on every edit.
   *
   * `expanded` is deliberately not bound. When clicked, the panel fires
   * expanded-will-change, renders its slot, measures it, pins that height
   * in pixels and animates to it; only transitionend unpins it. Bound to
   * this editor's state, the re-render sets `expanded` before the panel
   * measures, nothing animates, transitionend never fires, and whatever
   * the body grows by later spills over the panels below.
   */
  private _renderPanel(panel: EditorPanel): TemplateResult {
    return html`<ha-expansion-panel
      outlined
      .header=${panel.header}
      .secondary=${panel.summary}
      @expanded-will-change=${(ev: CustomEvent<{ expanded: boolean }>) => {
        ev.stopPropagation();
        const open = new Set(this._open);
        if (ev.detail.expanded) open.add(panel.id);
        else open.delete(panel.id);
        this._open = open;
      }}
    >
      <ha-icon slot="leading-icon" icon=${panel.icon}></ha-icon>
      ${this._open.has(panel.id) ? html`<div class="panel-body">${panel.body()}</div>` : nothing}
    </ha-expansion-panel>`;
  }
}

const FOOTER_SCHEMA: HaFormSchema = [{ name: "logo_adapt_to_theme", selector: { boolean: {} } }];

const PANEL_LOADER: HaFormSchema = [
  { type: "expandable", name: "panel_loader", title: "", flatten: true, schema: [] },
];
