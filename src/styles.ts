import { css } from "lit";

// ---------------------------------------------------------------------------
// Card styles — Lit shadow-DOM scoped. HA theme CSS variables pierce the
// shadow boundary, so every color resolves to the user's active theme.
//
// Typography strategy: HA's type scale tokens first (`--ha-font-size-*`,
// `--ha-font-weight-*`), with sensible fallbacks. Tabular-nums + tight
// letter-spacing for the station-row headline so kW / price / distance
// align vertically across rows and read as structured data.
//
// Color strategy: primary text = `--primary-text-color`. Structural dividers
// = `--divider-color`. Accents borrow HA's semantic tokens so themes map
// correctly: `--primary-color` for the metric emphasis, `--warning-color`
// for DC fast-charging, `--success-color` / `--error-color` for the live
// availability line, `--state-unavailable-color` for inactive stations.
// ---------------------------------------------------------------------------

export const cardStyles = css`
  :host {
    display: block;
    --l-fs-xl: var(--ha-font-size-xl, 1.5rem);
    --l-fs-l: var(--ha-font-size-l, 1rem);
    --l-fs-m: var(--ha-font-size-m, 0.9rem);
    --l-fs-s: var(--ha-font-size-s, 0.85rem);
    --l-fs-xs: var(--ha-font-size-xs, 0.75rem);
    --l-fw-reg: var(--ha-font-weight-normal, 400);
    --l-fw-med: var(--ha-font-weight-medium, 500);
    --l-fw-bld: var(--ha-font-weight-bold, 700);
    --l-space-1: 4px;
    --l-space-2: 8px;
    --l-space-3: 12px;
    --l-space-4: 16px;
    --l-space-5: 20px;
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 14px);
  }

  /* ----- Brand strip (§3c compliance) --------------------------------- */
  .brand-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: var(--l-space-3) var(--l-space-4);
    border-bottom: 1px solid var(--divider-color);
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-2);
    text-decoration: none;
    color: inherit;
    transition: opacity 120ms;
  }
  .brand-link:hover {
    opacity: 0.75;
  }
  .brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    padding: 0 9px;
    background: #0052a5;
    color: #ffffff;
    border-radius: 4px;
    font-weight: var(--l-fw-bld);
    font-size: 12px;
    letter-spacing: 0.6px;
  }
  .brand-logo .accent {
    color: #3fa535;
    margin-right: 1px;
  }
  .card-title {
    font-size: var(--l-fs-m);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    letter-spacing: -0.005em;
  }

  /* ----- Summary row ------------------------------------------------- */
  .summary {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: var(--l-space-4) var(--l-space-4) var(--l-space-3);
    border-bottom: 1px solid var(--divider-color);
  }
  .summary-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .summary-distance {
    font-size: var(--l-fs-xl);
    font-weight: var(--l-fw-bld);
    color: var(--primary-text-color);
    line-height: 1;
    letter-spacing: -0.025em;
    font-variant-numeric: tabular-nums;
  }
  .summary-distance .unit {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    margin-left: 4px;
    color: var(--secondary-text-color);
    letter-spacing: 0;
  }
  .summary-label,
  .summary-count {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  .summary-count {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  /* ----- Station list ------------------------------------------------ */
  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .station {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: var(--l-space-3) var(--l-space-4);
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition: background-color 120ms;
  }
  .station:last-child {
    border-bottom: none;
  }
  .station:hover,
  .station:focus-visible {
    background: color-mix(
      in srgb,
      var(--primary-color) 6%,
      var(--ha-card-background, var(--card-background-color))
    );
    outline: none;
  }

  /* Headline: the key facts — kW · connectors · price vs distance.
     These are what the user said they actually care about. */
  .headline {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--l-space-3);
    font-size: var(--l-fs-l);
    font-weight: var(--l-fw-med);
    line-height: 1.2;
    letter-spacing: -0.005em;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }
  .headline-metrics {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    column-gap: 6px;
    min-width: 0;
  }
  .metric-kw {
    color: var(--primary-color);
    font-weight: var(--l-fw-bld);
  }
  .metric-kw.dc {
    color: var(--warning-color, #f57c00);
  }
  .metric {
    color: var(--primary-text-color);
  }
  .metric-muted {
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
  }
  .metric-price {
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }
  .metric-price.free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }
  .dot {
    color: var(--divider-color);
    font-weight: var(--l-fw-reg);
  }
  .headline-distance {
    flex-shrink: 0;
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
    letter-spacing: 0;
  }
  .headline-distance .unit {
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    margin-left: 3px;
  }

  /* Secondary lines — station label + address, visually subordinate. */
  .station-name {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    color: var(--secondary-text-color);
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .station-address {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    line-height: 1.35;
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Status line: inactive / live-availability. Sits right below address. */
  .station-status {
    display: flex;
    align-items: center;
    gap: var(--l-space-1);
    margin-top: var(--l-space-1);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }
  .station-status.ok {
    color: var(--success-color, #2e7d32);
  }
  .station-status.busy {
    color: var(--error-color, #c62828);
  }
  .station-status.inactive {
    color: var(--state-unavailable-color, #a0a0a0);
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
  }

  /* Amenities — icon + inline label pair, so the user never has to hover
     to know what "leaf" means. Wraps gracefully on narrow cards. */
  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: var(--l-space-1) var(--l-space-3);
    margin-top: var(--l-space-2);
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    letter-spacing: 0.01em;
  }
  .amenity ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .amenity.green ha-icon {
    color: var(--success-color, #2e7d32);
  }

  /* Attribution footer — §3d exact text. */
  .attribution {
    padding: var(--l-space-2) var(--l-space-4) var(--l-space-3);
    text-align: right;
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.02em;
    opacity: 0.8;
  }

  /* Empty states */
  .empty-state {
    padding: var(--l-space-5);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }
`;

// ---------------------------------------------------------------------------
// Editor styles — the config panel users see via ⋮ → Edit card.
// Kept minimal so HA's form components (ha-textfield, ha-selector, ha-switch)
// supply their own theming.
// ---------------------------------------------------------------------------

export const editorStyles = css`
  :host {
    display: block;
  }
  .editor {
    padding: var(--ha-space-4, 16px);
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-3, 12px);
  }
  .editor-section {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    border-radius: var(--ha-border-radius-lg, 12px);
    padding: var(--ha-space-3, 14px) var(--ha-space-4, 16px);
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 10px);
  }
  .section-header {
    font-size: var(--ha-font-size-xs, 11px);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .editor-hint {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    line-height: 1.4;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .filter-chip {
    appearance: none;
    border: 1px solid var(--divider-color);
    border-radius: 999px;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    padding: 4px 12px;
    font-size: var(--ha-font-size-s, 13px);
    cursor: pointer;
    transition:
      background-color 120ms,
      color 120ms,
      border-color 120ms;
  }
  .filter-chip:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .filter-chip.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
    font-weight: 600;
  }
`;
