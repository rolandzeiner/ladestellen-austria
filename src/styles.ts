import { css } from "lit";

// ---------------------------------------------------------------------------
// Card styles — Lit shadow-DOM scoped. HA theme CSS variables pierce the
// shadow boundary, so every color resolves to the user's active theme.
//
// Typography: HA's type scale tokens with fallbacks. Tabular numerals
// everywhere numbers appear (kW, km, €) so columns align across rows.
// Color accents route through HA's semantic tokens (--primary-color,
// --warning-color, --success-color, --error-color) so themes map cleanly.
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
    gap: 4px;
    padding: 10px var(--l-space-4);
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
  .station.expanded {
    background: color-mix(
      in srgb,
      var(--primary-color) 4%,
      var(--ha-card-background, var(--card-background-color))
    );
  }

  /* Top row: metrics (kW, plug pills, price) + right cluster
     (maps-link + chevron). Metrics read first since that's what the user
     actually scans for. Name demotes to a muted subtitle below. */
  .row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    min-width: 0;
  }
  .row-metrics {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--l-space-2);
    font-variant-numeric: tabular-nums;
    min-width: 0;
    flex: 1;
  }
  .row-right {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-1);
    flex-shrink: 0;
  }

  /* Station name — muted subtitle under the metrics line. */
  .station-name {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    line-height: 1.35;
    letter-spacing: 0.005em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Maps link — pin + distance form a single click target that opens
     Google Maps. stopPropagation on click so tapping it doesn't also
     toggle the row's expand state. */
  .maps-inline {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    transition: background-color 120ms;
  }
  .maps-inline:hover,
  .maps-inline:focus-visible {
    background: color-mix(
      in srgb,
      var(--primary-color) 14%,
      transparent
    );
    outline: none;
  }
  .maps-inline ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }
  .station-distance {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
  }
  .station-distance .unit {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    margin-left: 3px;
    letter-spacing: 0;
  }
  .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    transition: transform 180ms ease;
  }
  .metric-kw {
    font-size: var(--l-fs-m);
    font-weight: var(--l-fw-bld);
    color: var(--primary-color);
    letter-spacing: -0.01em;
  }
  .metric-kw.dc {
    color: var(--warning-color, #f57c00);
  }
  .metric-price {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    font-weight: var(--l-fw-med);
  }
  .metric-price.free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }

  /* Connector pills (kept per user feedback — "keep plugs as pills"). */
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
    line-height: 1.5;
    background: color-mix(
      in srgb,
      var(--primary-text-color) 8%,
      transparent
    );
    color: var(--primary-text-color);
  }
  .pill.plug {
    background: color-mix(
      in srgb,
      var(--primary-color) 12%,
      transparent
    );
    color: color-mix(in srgb, var(--primary-color) 85%, var(--primary-text-color));
  }

  /* Expanded detail — address, status, amenities, maps link. */
  .detail {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-2);
    margin-top: var(--l-space-1);
    animation: l-reveal 180ms ease;
  }
  @keyframes l-reveal {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .station-address {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    line-height: 1.4;
    letter-spacing: 0.005em;
    opacity: 0.9;
  }

  /* Status line: inactive / live-availability. */
  .station-status {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-1);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    align-self: flex-start;
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

  /* Amenities — icon + label pair. */
  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: var(--l-space-1) var(--l-space-3);
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
// Editor styles — HA form components supply their own theming; we only
// contribute layout + section rhythm.
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
