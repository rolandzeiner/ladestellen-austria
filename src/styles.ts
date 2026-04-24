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

  /* 2-row grid for the station row. Distance sits on line 1, price on
     line 2. Both live in the same grid column (width = wider-of-the-two,
     usually the distance pill), and both use justify-self: center so
     their geometric midpoints line up vertically — harmonic column
     centred under the distance. Chevron spans both rows and remains
     vertically centred against the full cluster. */
  .station-grid {
    flex: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    grid-template-areas:
      "metrics distance chevron"
      "name    price    chevron";
    column-gap: var(--l-space-3);
    row-gap: 4px;
    align-items: center;
    min-width: 0;
  }
  .station-metrics {
    grid-area: metrics;
    justify-self: start;
    align-self: center;
  }
  .station-distance {
    grid-area: distance;
    justify-self: center;
  }
  .metric-price,
  .metric-price-placeholder {
    grid-area: price;
    justify-self: center;
    align-self: center;
  }
  .chevron {
    grid-area: chevron;
    align-self: center;
  }
  .station-name {
    grid-area: name;
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
    /* center alignment keeps pill padding from descending past the row
       baseline — baseline alignment put chip-bottoms below the kW
       numeral, visually bleeding into line 2 */
    align-items: center;
    flex-wrap: wrap;
    gap: 2px 6px;
    font-size: var(--l-fs-m);
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* Pin indicator on pinned stations — small accent icon at the start
     of the metrics row. */
  .pin-indicator {
    --mdc-icon-size: 14px;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  .station.pinned {
    background: color-mix(in srgb, var(--primary-color) 4%, transparent);
  }
  .station.pinned:hover,
  .station.pinned:focus-visible {
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }

  /* Orphan-pin placeholder row — for pinned IDs whose stations aren't in
     the current /search response (out of range / decommissioned). Click
     the ✕ to unpin. */
  .orphan-pin {
    cursor: default;
  }
  .orphan-pin:hover {
    background: transparent;
  }
  .orphan-body {
    display: flex;
    align-items: center;
    gap: var(--l-space-3);
    padding: 10px var(--l-space-4);
    opacity: 0.75;
  }
  .orphan-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .orphan-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .orphan-title {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
  }
  .orphan-id {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-family: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
    letter-spacing: 0;
  }
  .orphan-remove {
    appearance: none;
    border: none;
    background: transparent;
    padding: 6px;
    border-radius: 999px;
    cursor: pointer;
    color: var(--secondary-text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 160ms var(--l-ease);
  }
  .orphan-remove:hover,
  .orphan-remove:focus-visible {
    background: color-mix(in srgb, var(--error-color, #c62828) 14%, transparent);
    color: var(--error-color, #c62828);
    outline: none;
  }
  .orphan-remove ha-icon {
    --mdc-icon-size: 16px;
  }
  /* kW — pure typographic treatment inspired by nextbike-austria's
     "bikes available" number. Big bold primary-text number with a
     small muted unit alongside; no pill, no background. DC distinction
     rides on the unit colour only so the overall style stays clean. */
  .metric-kw {
    display: inline-flex;
    align-items: baseline;
    gap: 3px;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    white-space: nowrap;
  }
  .kw-num {
    font-size: 1.45em;
    font-weight: var(--l-fw-bld);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .kw-unit {
    font-size: 0.85em;
    font-weight: var(--l-fw-med);
    color: var(--secondary-text-color);
    letter-spacing: 0.01em;
  }
  /* DC fast-charge: both the number and the unit take the warning
     accent so the full "80 kW" reads as one amber token. */
  .metric-kw--dc {
    color: var(--warning-color, #f57c00);
  }
  .metric-kw--dc .kw-unit {
    color: var(--warning-color, #f57c00);
  }
  /* Price sits above distance in the right-stack — right-aligned so
     digits line up column-wise for easy comparison across rows. */
  .metric-price {
    color: var(--primary-text-color);
    font-size: var(--l-fs-s);
    font-weight: var(--l-fw-med);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.005em;
    line-height: 1.2;
    white-space: nowrap;
  }
  .metric-free {
    color: var(--success-color, #2e7d32);
    font-weight: var(--l-fw-bld);
  }

  /* Connector chips — neutral tint, tight vertical footprint so they
     never overshoot the kW's numeric box when sat next to it. */
  .pill.plug {
    display: inline-flex;
    align-items: center;
    padding: 1px 8px;
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
    line-height: 1.3;
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

  /* Distance-pill — map link. Vertical padding + line-height matched to
     .pill.plug so everything in line 1 (kW numeral, connector chips,
     distance pill) sits at a shared visual height. */
  .station-distance {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 10px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    line-height: 1.3;
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
    --mdc-icon-size: 14px;
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

  /* ----- Operator byline (top of expanded detail) ------------------ */
  .operator-line {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
    min-width: 0;
  }
  .operator-name {
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  /* ----- Rack (per-point availability grid, nextbike-style) ---------
     Centred cluster — small point counts (1-4 typical) sit in the middle
     of the container rather than left-hugging, which kept looking like a
     half-empty row. */
  .rack {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 4%,
      transparent
    );
  }
  .rack-slot {
    position: relative;
    flex: 0 0 80px;
    width: 80px;
    height: 72px;
    box-sizing: border-box;
    border-radius: 10px;
    /* kW + connector sit as a tight vertically-centred group (small gap
       between them); the status dot lives absolute in the bottom-right
       corner so it stays put regardless of connector length. */
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    border: 1px solid transparent;
    transition: background-color 160ms var(--l-ease),
      border-color 160ms var(--l-ease);
    cursor: default;
  }
  .rack-slot[data-status="ok"] {
    background: color-mix(in srgb, var(--success-color, #22c55e) 14%, transparent);
    border-color: color-mix(in srgb, var(--success-color, #22c55e) 40%, transparent);
  }
  .rack-slot[data-status="busy"] {
    background: color-mix(in srgb, var(--error-color, #ef4444) 12%, transparent);
    border-color: color-mix(in srgb, var(--error-color, #ef4444) 35%, transparent);
  }
  .rack-slot[data-status="warn"] {
    background: color-mix(in srgb, var(--warning-color, #f59e0b) 12%, transparent);
    border-color: color-mix(in srgb, var(--warning-color, #f59e0b) 35%, transparent);
  }
  .rack-slot[data-status="empty"] {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 8%,
      transparent
    );
    border: 1px dashed
      color-mix(in srgb, var(--secondary-text-color) 35%, transparent);
  }
  .rack-kw {
    display: inline-flex;
    align-items: baseline;
    gap: 2px;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    white-space: nowrap;
  }
  /* Number + unit share the same primary-text colour on every slot —
     status tint lives on the slot background + status dot, not on the
     kW label. DC is carried by the top-left bolt icon. */
  .rack-kw-num {
    font-size: 1.15rem;
    font-weight: var(--l-fw-bld);
    letter-spacing: -0.02em;
  }
  .rack-kw-unit {
    font-size: 0.72rem;
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
  }
  .rack-connector {
    /* Reserve ~14px on the right so the centred label stays clear of the
       absolute-positioned status dot; overflow clips via ellipsis. */
    max-width: calc(100% - 14px);
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    letter-spacing: 0.005em;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rack-warn-icon {
    --mdc-icon-size: 28px;
    color: var(--warning-color, #f57c00);
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  /* Status dot — anchored to the slot's bottom-right corner. Sitting
     absolute keeps it inside the slot even when the connector label
     overflows; the connector's right-margin reservation handles the
     text/dot collision. */
  .rack-dot {
    position: absolute;
    bottom: 5px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .rack-dot.status-ok {
    background: var(--l-dot-ok);
  }
  .rack-dot.status-busy {
    background: var(--l-dot-busy);
  }
  .rack-dot.status-warn {
    background: var(--l-dot-partial);
  }
  .rack-dot.status-empty {
    background: transparent;
    border: 1px solid
      color-mix(in srgb, var(--secondary-text-color) 60%, transparent);
  }
  /* AC/DC badge — small uppercase tag in the top-left corner. DC takes
     the warning accent (fast-charge signal), AC stays secondary so it
     recedes on the much more common AC case. */
  .power-badge {
    position: absolute;
    top: 4px;
    left: 5px;
    font-size: 9px;
    font-weight: var(--l-fw-bld);
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
  .power-badge[data-type="dc"] {
    color: var(--warning-color, #f57c00);
  }
  .power-badge[data-type="ac"] {
    color: var(--secondary-text-color);
    opacity: 0.75;
  }

  /* Fees line under the rack — quiet secondary text. */
  .fees-line {
    font-size: var(--l-fs-xs);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.005em;
    line-height: 1.4;
    padding-top: 4px;
  }

  /* ----- Opening hours --------------------------------------------- */
  .hours-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--l-space-3);
    flex-wrap: wrap;
    font-size: var(--l-fs-s);
    color: var(--primary-text-color);
    line-height: 1.4;
  }
  .hours-lines {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .hours-line {
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.005em;
  }
  .hours-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.01em;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 10%,
      transparent
    );
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .hours-chip.status-ok {
    background: color-mix(
      in srgb,
      var(--success-color, #22c55e) 14%,
      transparent
    );
    color: var(--success-color, #22c55e);
  }
  .hours-chip.status-inactive {
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 12%,
      transparent
    );
    color: var(--secondary-text-color);
  }
  .hours-chip .status-dot {
    margin-top: 0;
    width: 7px;
    height: 7px;
    box-shadow: none;
  }

  /* ----- Payment chips --------------------------------------------- */
  .payment-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .payment-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--secondary-text-color) 10%,
      transparent
    );
    color: var(--primary-text-color);
    font-size: var(--l-fs-xs);
    font-weight: var(--l-fw-med);
    letter-spacing: 0.005em;
    line-height: 1.3;
    white-space: nowrap;
  }
  .payment-chip ha-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
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
  }

  /* Narrow rack — slots shrink from 80×72 to 60×56 so even 4-point DC
     hubs wrap to two rows at worst on phone-width dashboards. */
  @container lscard (max-width: 359px) {
    .rack {
      gap: 6px;
      padding: 8px;
    }
    .rack-slot {
      flex: 0 0 60px;
      width: 60px;
      height: 56px;
      padding: 6px;
      gap: 2px;
    }
    .rack-kw-num {
      font-size: 1rem;
    }
    .rack-kw-unit {
      font-size: 0.65rem;
    }
    .rack-connector {
      font-size: 10px;
      max-width: calc(100% - 12px);
    }
    .rack-warn-icon {
      --mdc-icon-size: 22px;
    }
    .rack-dot {
      bottom: 4px;
      right: 5px;
      width: 7px;
      height: 7px;
    }
    .power-badge {
      top: 3px;
      left: 4px;
      font-size: 8px;
      letter-spacing: 0.06em;
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

  /* Pin list — editor section for toggling which stations are pinned. */
  .pin-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .pin-row {
    appearance: none;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-s, 13px);
    cursor: pointer;
    transition:
      background-color 160ms cubic-bezier(0.4, 0, 0.2, 1),
      border-color 160ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .pin-row:hover,
  .pin-row:focus-visible {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    outline: none;
  }
  .pin-row.pinned {
    background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    border-color: color-mix(in srgb, var(--primary-color) 40%, transparent);
  }
  .pin-row.orphan {
    opacity: 0.75;
  }
  .pin-row ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
    flex-shrink: 0;
  }
  .pin-row.pinned ha-icon {
    color: var(--primary-color);
  }
  .pin-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
  .pin-meta {
    font-size: var(--ha-font-size-xs, 11px);
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
  .editor-hint--muted {
    opacity: 0.7;
  }
`;
