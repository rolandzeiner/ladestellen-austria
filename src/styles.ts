import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }
  ha-card {
    overflow: hidden;
  }

  /* Header: E-Control branding strip — §3c compliance.
     The <a> wrapping the logo is the legally-required image-link back to
     www.e-control.at. Do not remove the anchor or the href. */
  .brand-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    border-bottom: 1px solid var(--divider-color);
  }
  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    text-decoration: none;
    color: inherit;
  }
  /* Styled-text E-Control wordmark as a placeholder for the official logo
     asset (TODO: bundle SVG from e-control.at/presse/pressebilder pre-v1.0). */
  .brand-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    padding: 0 10px;
    background: #0052a5;
    color: #ffffff;
    border-radius: 4px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.5px;
    font-family: var(--ha-font-family-body, system-ui, sans-serif);
  }
  .brand-logo .accent {
    color: #3fa535;
    margin-right: 1px;
  }
  .card-title {
    font-size: var(--ha-font-size-l, 1rem);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
  }

  /* Summary row — distance to nearest station. */
  .summary {
    padding: var(--ha-space-4, 16px);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    border-bottom: 1px solid var(--divider-color);
  }
  .summary-distance {
    font-size: var(--ha-font-size-xxl, 2rem);
    font-weight: var(--ha-font-weight-bold, 700);
    color: var(--primary-text-color);
    line-height: 1;
  }
  .summary-distance .unit {
    font-size: var(--ha-font-size-m, 0.9rem);
    font-weight: var(--ha-font-weight-normal, 400);
    margin-left: 4px;
    color: var(--secondary-text-color);
  }
  .summary-count {
    font-size: var(--ha-font-size-s, 0.85rem);
    color: var(--secondary-text-color);
    text-align: right;
  }

  /* Station list. */
  .stations {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .station {
    display: flex;
    flex-direction: column;
    padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px);
    border-bottom: 1px solid var(--divider-color);
    gap: 4px;
    cursor: pointer;
    transition: background-color 120ms;
  }
  .station:last-child {
    border-bottom: none;
  }
  .station:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .station-row-1 {
    display: flex;
    justify-content: space-between;
    gap: var(--ha-space-3, 12px);
    align-items: baseline;
  }
  .station-label {
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--primary-text-color);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .station-distance {
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 0.85rem);
    white-space: nowrap;
  }
  .station-row-2 {
    display: flex;
    gap: var(--ha-space-2, 8px);
    align-items: center;
    flex-wrap: wrap;
    font-size: var(--ha-font-size-s, 0.85rem);
    color: var(--secondary-text-color);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    font-size: var(--ha-font-size-xs, 0.75rem);
    font-variant-numeric: tabular-nums;
    line-height: 1.4;
  }
  .chip.power {
    background: rgba(63, 165, 53, 0.15);
    color: #2f7a27;
    font-weight: 600;
  }
  .chip.dc {
    background: rgba(255, 143, 0, 0.15);
    color: #a15c00;
    font-weight: 600;
  }
  .chip.inactive {
    background: rgba(158, 0, 0, 0.12);
    color: #9e0000;
  }
  .chip.free {
    background: rgba(63, 165, 53, 0.2);
    color: #2f7a27;
    font-weight: 600;
  }
  .chip.price {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    color: var(--primary-text-color);
    font-weight: 500;
  }
  .amenity {
    display: inline-flex;
    align-items: center;
    color: var(--secondary-text-color);
  }
  .amenity ha-icon {
    --mdc-icon-size: 16px;
  }

  /* Attribution footer — §3d. Required text: "Datenquelle: E-Control". */
  .attribution {
    padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px);
    text-align: right;
    font-size: var(--ha-font-size-xs, 0.75rem);
    color: var(--secondary-text-color);
    font-style: italic;
  }

  .empty-state {
    padding: var(--ha-space-5, 20px);
    text-align: center;
    color: var(--secondary-text-color);
  }
`;

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
    letter-spacing: 0.6px;
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
