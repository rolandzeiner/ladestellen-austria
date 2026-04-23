import { css } from "lit";

// ---------------------------------------------------------------------------
// Card styles — Lit shadow-DOM scoped. HA theme CSS variables pierce the
// shadow boundary; every accent resolves through the user's active theme.
//
// 2026 conventions in play:
// - color-mix() for theme-aware tints (light/dark automatically)
// - cubic-bezier(0.4, 0, 0.2, 1) Material Standard easing on all transitions
// - Soft tinted chips for metrics (--primary-color wash, not filled)
// - Two-column layouts for dense data (header + expanded detail)
// - Tabular numerics + tight tracking on display numerals
// - Dashed lines avoided; separation via vertical rhythm + subtle fills
// - Uppercase micro-labels above data blocks (tracking 0.08em)
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
    --l-ease: cubic-bezier(0.4, 0, 0.2, 1);
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
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-2);
    text-decoration: none;
    color: inherit;
    transition: opacity 160ms var(--l-ease);
  }
  .brand-link:hover {
    opacity: 0.7;
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
    letter-spacing: 0.06em;
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
    padding: var(--l-space-4);
    background: color-mix(
      in srgb,
      var(--primary-color) 5%,
      var(--ha-card-background, var(--card-background-color))
    );
    border-top: 1px solid
      color-mix(in srgb, var(--primary-color) 10%, transparent);
    border-bottom: 1px solid
      color-mix(in srgb, var(--primary-color) 10%, transparent);
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
    letter-spacing: -0.035em;
    font-variant-numeric: tabular-nums;
  }
  .summary-distance .unit {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    margin-left: 5px;
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
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: var(--l-space-3);
    row-gap: 4px;
    padding: var(--l-space-3) var(--l-space-4);
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition:
      background-color 200ms var(--l-ease),
      padding 200ms var(--l-ease);
  }
  .station:last-child {
    border-bottom: none;
  }
  .station:hover,
  .station:focus-visible {
    background: color-mix(
      in srgb,
      var(--primary-color) 5%,
      var(--ha-card-background, var(--card-background-color))
    );
    outline: none;
  }
  .station.expanded {
    padding-bottom: var(--l-space-2);
    background: color-mix(
      in srgb,
      var(--primary-color) 3%,
      var(--ha-card-background, var(--card-background-color))
    );
  }

  /* kW as a leading data chip: tinted pill-ish backdrop, row-span 2.
     Uses --primary-color tint for AC, --warning-color for DC — mirrors
     how HA's own tile cards badge sensor-class accents. */
  .metric-kw {
    grid-column: 1;
    grid-row: 1 / span 2;
    align-self: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 68px;
    padding: 10px 14px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    color: var(--primary-color);
    font-size: 1.35rem;
    font-weight: var(--l-fw-bld);
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    transition:
      background-color 200ms var(--l-ease),
      transform 200ms var(--l-ease);
  }
  .station:hover .metric-kw {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
  }
  .metric-kw.dc {
    background: color-mix(
      in srgb,
      var(--warning-color, #f57c00) 12%,
      transparent
    );
    color: var(--warning-color, #f57c00);
  }
  .station:hover .metric-kw.dc {
    background: color-mix(
      in srgb,
      var(--warning-color, #f57c00) 16%,
      transparent
    );
  }
  .metric-kw.empty {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 8%,
      transparent
    );
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    opacity: 0.7;
  }

  /* Right side of the grid: metrics + maps link + chevron (row 1), name
     below (row 2). */
  .row-main {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    min-width: 0;
  }
  .row-inline-metrics {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--l-space-2);
    min-width: 0;
    flex: 1;
  }
  .row-right {
    display: inline-flex;
    align-items: center;
    gap: var(--l-space-1);
    flex-shrink: 0;
  }

  .station-name {
    grid-column: 2;
    grid-row: 2;
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    line-height: 1.35;
    letter-spacing: 0.005em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Maps link — pin + distance, single click target. */
  .maps-inline {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    transition:
      background-color 160ms var(--l-ease),
      transform 160ms var(--l-ease);
  }
  .maps-inline:hover,
  .maps-inline:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 16%, transparent);
    outline: none;
  }
  .maps-inline:active {
    transform: scale(0.96);
  }
  .maps-inline ha-icon {
    --mdc-icon-size: 18px;
    color: var(--primary-color);
  }
  .station-distance {
    font-size: var(--l-fs-l);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }
  .station-distance .unit {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    margin-left: 3px;
    letter-spacing: 0;
  }
  .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    transition: transform 200ms var(--l-ease);
  }

  /* Price reads quieter than kW — it's a contextual detail, not the hero. */
  .metric-price {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    font-weight: var(--l-fw-med);
    letter-spacing: -0.005em;
  }
  .metric-price.free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }

  /* Connector pills — theme-accent soft wash (consistent with kW). */
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.02em;
    line-height: 1.4;
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    color: color-mix(in srgb, var(--primary-color) 85%, var(--primary-text-color));
  }

  /* Expanded detail — 2 columns: address left, status + amenities right. */
  .detail {
    grid-column: 1 / -1;
    grid-row: 3;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    column-gap: var(--l-space-4);
    row-gap: var(--l-space-2);
    margin-top: var(--l-space-2);
    padding: var(--l-space-3);
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-color) 4%,
      var(--ha-card-background, var(--card-background-color))
    );
    animation: l-reveal 220ms var(--l-ease);
  }
  .detail-col {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-1);
    min-width: 0;
  }
  .detail-heading {
    font-size: 10px;
    font-weight: var(--l-fw-med);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    opacity: 0.75;
    margin-bottom: 2px;
  }
  .detail-address-col {
    /* Keep address on the left */
  }
  .detail-right-col {
    gap: var(--l-space-2);
    align-items: flex-end;
  }

  @keyframes l-reveal {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .station-address {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    line-height: 1.45;
    letter-spacing: 0.003em;
  }

  /* Status line: inactive / live-availability. */
  .station-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(in srgb, currentColor 12%, transparent);
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

  /* Amenities — icon + label pair, right-aligned within the right col. */
  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: var(--l-space-1) var(--l-space-2);
    justify-content: flex-end;
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 8%,
      transparent
    );
    letter-spacing: 0.01em;
  }
  .amenity ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .amenity.green {
    background: color-mix(
      in srgb,
      var(--success-color, #2e7d32) 12%,
      transparent
    );
    color: color-mix(
      in srgb,
      var(--success-color, #2e7d32) 90%,
      var(--primary-text-color)
    );
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
    letter-spacing: 0.03em;
    opacity: 0.75;
  }

  /* Empty states */
  .empty-state {
    padding: var(--l-space-5);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }

  /* Narrow-card fallback: detail panel stacks when the card is below ~360px. */
  @container (max-width: 360px) {
    .detail {
      grid-template-columns: 1fr;
    }
    .detail-right-col {
      align-items: flex-start;
    }
    .amenities {
      justify-content: flex-start;
    }
  }
`;

// ---------------------------------------------------------------------------
// Editor styles
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
      background-color 160ms cubic-bezier(0.4, 0, 0.2, 1),
      color 160ms cubic-bezier(0.4, 0, 0.2, 1),
      border-color 160ms cubic-bezier(0.4, 0, 0.2, 1);
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
