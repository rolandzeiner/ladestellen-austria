import { css } from "lit";

// ---------------------------------------------------------------------------
// Card styles — Lit shadow-DOM scoped. Designed from UX-first principles:
//   - One primary stat (hero distance), everything else reads as support.
//   - Dense station list, always-visible name + address, optional expand.
//   - Semantic status traffic-light dot per row (ok/partial/busy/inactive).
//   - Typography carries hierarchy; color reserved for meaning (accents,
//     semantic tokens: success, warning, error, unavailable).
//   - All colors via HA theme tokens + color-mix() so light/dark are free.
// ---------------------------------------------------------------------------

export const cardStyles = css`
  :host {
    display: block;
    --l-fs-hero: clamp(2.25rem, 4vw + 1rem, 3rem);
    --l-fs-xl: var(--ha-font-size-xl, 1.5rem);
    --l-fs-l: var(--ha-font-size-l, 1rem);
    --l-fs-m: var(--ha-font-size-m, 0.9375rem);
    --l-fs-s: var(--ha-font-size-s, 0.8125rem);
    --l-fs-xs: var(--ha-font-size-xs, 0.75rem);
    --l-fs-2xs: 11px;
    --l-fw-reg: var(--ha-font-weight-normal, 400);
    --l-fw-med: var(--ha-font-weight-medium, 500);
    --l-fw-bld: var(--ha-font-weight-bold, 700);
    --l-space-1: 4px;
    --l-space-2: 8px;
    --l-space-3: 12px;
    --l-space-4: 16px;
    --l-space-5: 20px;
    --l-space-6: 24px;
    --l-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --l-dot-ok: var(--success-color, #22c55e);
    --l-dot-partial: var(--warning-color, #f59e0b);
    --l-dot-busy: var(--error-color, #ef4444);
    --l-dot-inactive: var(--state-unavailable-color, #9ca3af);
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 14px);
    /* Container query scope — every @container rule below resolves against
       the actual card width, not the viewport. HA dashboards place cards
       in columns of widely varying widths (250-700px+), so sizing against
       the card itself is the correct 2026 pattern. */
    container-type: inline-size;
    container-name: lscard;
  }

  /* ----- Brand (used in the footer: §3c logo-link + §3d attribution) --- */
  .brand-link {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 160ms var(--l-ease);
  }
  .brand-link:hover {
    opacity: 0.7;
  }
  /* Official E-Control logo PNG (2274x598, RGBA). Width auto-scales to
     preserve the aspect ratio. 20px tall in the footer reads as a
     credit-line mark, not a hero — subtle but still legible. */
  .brand-logo {
    display: block;
    height: 20px;
    width: auto;
    max-width: 140px;
    object-fit: contain;
    transition: filter 160ms var(--l-ease);
  }
  /* Optional theme-adaptive rendering. brightness(0) collapses all
     channels to black while keeping alpha; invert(1) flips to white for
     dark mode. Enabled by the card's logo_adapt_to_theme config. */
  .brand-logo.adaptive.adaptive-light {
    filter: brightness(0);
  }
  .brand-logo.adaptive.adaptive-dark {
    filter: brightness(0) invert(1);
  }

  /* Optional user-set card title. Only rendered when config.name differs
     from the default "Ladestellen Austria". */
  .custom-title {
    padding: var(--l-space-3) var(--l-space-4) 0;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
  }

  /* ----- Hero — single big stat + context ---------------------------- */
  .hero {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--l-space-4);
    padding: var(--l-space-3) var(--l-space-4) var(--l-space-4);
  }
  .hero--empty {
    padding: var(--l-space-5) var(--l-space-4);
    justify-content: center;
  }
  .hero-value {
    display: inline-flex;
    align-items: baseline;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .hero-number {
    font-size: var(--l-fs-hero);
    font-weight: var(--l-fw-bld);
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .hero-unit {
    font-size: var(--l-fs-m);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    margin-left: 6px;
    letter-spacing: 0;
  }
  .hero-context {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    min-width: 0;
    text-align: right;
  }
  .hero-context-1 {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    color: var(--primary-text-color);
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
  .hero-context-2 {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
  }
  .hero-label {
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
  }

  /* ----- Station list ------------------------------------------------ */
  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--divider-color);
  }
  .station {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition: background-color 200ms var(--l-ease);
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
    background: color-mix(
      in srgb,
      var(--primary-color) 3%,
      var(--ha-card-background, var(--card-background-color))
    );
  }

  /* Body: status dot + text column. Two lines always (name+metrics / address). */
  .station-body {
    display: flex;
    gap: var(--l-space-3);
    padding: var(--l-space-3) var(--l-space-4);
    align-items: flex-start;
  }
  .station-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  /* Status dot — 9px circle that communicates live availability at a glance.
     Aligned to the baseline of the first text line for tidy vertical rhythm. */
  .status-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 7px; /* aligns with the baseline of .station-name */
    background: currentColor;
  }
  .status-dot.status-ok {
    color: var(--l-dot-ok);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-ok) 18%, transparent);
  }
  .status-dot.status-partial {
    color: var(--l-dot-partial);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-partial) 20%, transparent);
  }
  .status-dot.status-busy {
    color: var(--l-dot-busy);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--l-dot-busy) 18%, transparent);
  }
  .status-dot.status-inactive {
    color: var(--l-dot-inactive);
    opacity: 0.7;
  }
  .status-dot.status-unknown {
    color: transparent;
    border: 1.5px solid var(--secondary-text-color);
    opacity: 0.6;
  }

  /* Line 1: metrics (the user's real question: "what, how fast, how much")
     take the primary position. Distance + chevron sit on the right. Name
     moves to line 2 as a subtitle; address moves to the expanded detail. */
  .station-line-1 {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas: "metrics distance chevron";
    align-items: baseline;
    column-gap: var(--l-space-3);
    row-gap: 2px;
    min-width: 0;
  }
  .station-metrics {
    grid-area: metrics;
    justify-self: start;
  }
  .station-distance {
    grid-area: distance;
  }
  .chevron {
    grid-area: chevron;
  }
  /* Name sits on line 2 as a secondary identifier. Kept legible but
     visually subordinate to the metrics line above. */
  .station-name {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-reg);
    color: var(--secondary-text-color);
    line-height: 1.4;
    letter-spacing: 0.005em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .station-metrics {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 2px 6px;
    font-size: var(--l-fs-m);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  /* kW reads as a digital readout — system monospace gives it the
     electrifying/tech feel the user asked for, while staying 100%
     system-native (no CDN). Tinted pill adds visual weight so it reads
     as the row's leading metric. DC switches to --warning-color for
     the fast-charge accent. */
  .metric-kw {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    border-radius: 6px;
    background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    color: var(--primary-color);
    font-family: ui-monospace, "SFMono-Regular", "SF Mono", "Menlo",
      "Monaco", "Cascadia Code", "Cascadia Mono", "Consolas",
      "Liberation Mono", "DejaVu Sans Mono", monospace;
    font-weight: var(--l-fw-bld);
    font-size: var(--l-fs-m);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.015em;
    line-height: 1.3;
    white-space: nowrap;
    transition: background-color 160ms var(--l-ease);
  }
  .metric-kw--dc {
    color: var(--warning-color, #f57c00);
    background: color-mix(
      in srgb,
      var(--warning-color, #f57c00) 14%,
      transparent
    );
  }
  .station:hover .metric-kw {
    background: color-mix(in srgb, var(--primary-color) 16%, transparent);
  }
  .station:hover .metric-kw--dc {
    background: color-mix(
      in srgb,
      var(--warning-color, #f57c00) 18%,
      transparent
    );
  }
  .metric-price {
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
    font-variant-numeric: tabular-nums;
  }
  .metric-free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }

  /* Connector chips — neutral tint so they read as secondary to kW. */
  .pill.plug {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 12%,
      transparent
    );
    color: var(--primary-text-color);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.015em;
    line-height: 1.5;
    white-space: nowrap;
  }
  .pill.plug.plug-more {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 6%,
      transparent
    );
    color: var(--secondary-text-color);
  }

  /* Distance-pill — map link. Pin + number together, compact click target. */
  .station-distance {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    transition:
      background-color 160ms var(--l-ease),
      transform 160ms var(--l-ease);
    flex-shrink: 0;
  }
  .station-distance:hover,
  .station-distance:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
    outline: none;
  }
  .station-distance:active {
    transform: scale(0.96);
  }
  .station-distance ha-icon {
    --mdc-icon-size: 15px;
    color: var(--primary-color);
  }
  .distance-value {
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
  }
  .distance-value .unit {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-weight: var(--l-fw-reg);
    margin-left: 2px;
    letter-spacing: 0;
  }
  .chevron {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
    transition: transform 200ms var(--l-ease);
  }

  /* (Line 2 is now .station-name — address moved to .detail-address in
     the expanded panel.) */
  .detail-address {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    line-height: 1.4;
    letter-spacing: 0.003em;
  }

  /* ----- Expanded detail -------------------------------------------- */
  .detail {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-3);
    padding: 0 var(--l-space-4) var(--l-space-4) calc(var(--l-space-4) + 9px + var(--l-space-3));
    animation: l-reveal 220ms var(--l-ease);
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
  .detail-section {
    display: flex;
    flex-direction: column;
    gap: var(--l-space-1);
  }
  .detail-label {
    font-size: var(--l-fs-2xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    opacity: 0.7;
  }

  /* Status row (in expanded detail) */
  .status-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.005em;
    font-variant-numeric: tabular-nums;
    align-self: flex-start;
  }
  .status-row .status-dot {
    margin-top: 0;
  }
  .status-row.status-ok {
    color: var(--l-dot-ok);
  }
  .status-row.status-partial {
    color: var(--l-dot-partial);
  }
  .status-row.status-busy {
    color: var(--l-dot-busy);
  }
  .status-row.status-inactive,
  .status-row.status-unknown {
    color: var(--secondary-text-color);
  }

  /* Amenities — compact wrap of icon+label pairs. */
  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    font-size: var(--l-fs-s);
    color: var(--secondary-text-color);
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    letter-spacing: 0.005em;
  }
  .amenity ha-icon {
    --mdc-icon-size: 15px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }

  /* Action row — clear, tappable, colored primary for Maps. */
  .detail-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--l-space-2);
    padding-top: var(--l-space-1);
  }
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.005em;
    text-decoration: none;
    color: var(--primary-text-color);
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 10%,
      transparent
    );
    transition:
      background-color 160ms var(--l-ease),
      transform 160ms var(--l-ease);
  }
  .action-btn:hover,
  .action-btn:focus-visible {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 18%,
      transparent
    );
    outline: none;
  }
  .action-btn:active {
    transform: scale(0.97);
  }
  .action-btn ha-icon {
    --mdc-icon-size: 16px;
  }
  .action-btn.primary {
    background: color-mix(in srgb, var(--primary-color) 15%, transparent);
    color: color-mix(
      in srgb,
      var(--primary-color) 85%,
      var(--primary-text-color)
    );
  }
  .action-btn.primary:hover,
  .action-btn.primary:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 22%, transparent);
  }
  .action-btn.primary ha-icon {
    color: var(--primary-color);
  }

  /* Footer — §3c logo-link on the left, §3d attribution on the right.
     Both compliance items collapse into a single credit-line row. */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    padding: 10px var(--l-space-4);
    border-top: 1px solid var(--divider-color);
  }
  .attribution-text {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.03em;
    opacity: 0.8;
  }

  /* Empty states */
  .empty-state {
    padding: var(--l-space-5);
    text-align: center;
    color: var(--secondary-text-color);
    font-size: var(--l-fs-s);
  }

  /* ==========================================================
     RESPONSIVE: container queries against the card's own width
     ========================================================== */

  /* Compact — below ~440px (most phone dashboards). Line 1 stays as
     metrics + distance + chevron; line 2 stays as the station name.
     Only typography and padding tighten. */
  @container lscard (max-width: 439px) {
    .station-body {
      padding: 10px var(--l-space-3);
      gap: var(--l-space-2);
    }
    .station-metrics {
      font-size: var(--l-fs-s);
    }
    .station-name {
      font-size: var(--l-fs-xs);
    }

    /* Hero stacks vertically so the big number and context each get
       their own line. */
    .hero {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--l-space-2);
      padding: var(--l-space-3) var(--l-space-3) var(--l-space-4);
    }
    .hero-context {
      align-items: flex-start;
      text-align: left;
    }

    .custom-title {
      padding: var(--l-space-2) var(--l-space-3) 0;
    }

    .detail {
      padding: 0 var(--l-space-3) var(--l-space-3)
        calc(var(--l-space-3) + 9px + var(--l-space-2));
    }
    .amenities {
      gap: 4px 10px;
    }
    .action-btn {
      font-size: var(--l-fs-xs);
      padding: 5px 10px;
    }
    .footer {
      padding: 8px var(--l-space-3);
      gap: var(--l-space-2);
    }
    .brand-logo {
      height: 18px;
    }
    .metric-kw {
      font-size: var(--l-fs-s);
      padding: 2px 8px;
    }
  }

  /* Ultra-compact — below 320px. Drop more ornamentation; let overflow
     wrap instead of ellipsis-truncate. */
  @container lscard (max-width: 319px) {
    .station-body {
      padding: 8px var(--l-space-3);
    }
    .station-metrics {
      font-size: var(--l-fs-xs);
    }
    .distance-value {
      font-size: var(--l-fs-s);
    }
    .distance-value .unit {
      font-size: 10px;
    }
    .station-distance {
      padding: 2px 8px;
    }
    .station-distance ha-icon {
      --mdc-icon-size: 14px;
    }
    .chevron {
      --mdc-icon-size: 16px;
    }
    .hero {
      padding: var(--l-space-2) var(--l-space-3) var(--l-space-3);
    }
    .hero-context-1,
    .hero-context-2 {
      white-space: normal;
    }
  }
`;

// ---------------------------------------------------------------------------
// Editor styles — unchanged, HA form widgets carry their own theming.
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
