// Top-down parking-slot car icon, rendered into the parking card.
// Extracted from parking-card.ts so the rendering function stays focused
// on layout. The body + mirror fills use a CSS custom property
// `--slot-car-color`; the parking card sets that variable on the slot
// wrapper (inline `style="--slot-car-color: …"`) so each render only
// pipes one string instead of templating every path's `style="fill:…"`.
//
// SVG-attribute `fill="…"` doesn't resolve CSS variables in any browser
// today (it would need `attr(--slot-car-color color)` which is still
// behind flags). The recipe is: inline-style on the affected elements
// references `var(--slot-car-color)`, and the wrapper sets the variable.

import { html, type TemplateResult } from "lit";

export function carSvg(): TemplateResult {
  return html`
    <svg
      viewBox="0 0 50 90"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <!-- Body -->
      <rect
        x="3"
        y="2"
        width="44"
        height="86"
        rx="10"
        style="fill: var(--slot-car-color);"
      />
      <!-- Smoked windshield -->
      <path
        d="M10 18 Q25 14 40 18 L37 36 L13 36 Z"
        fill="rgba(15,20,35,0.7)"
      />
      <!-- Smoked rear window -->
      <path
        d="M13 54 L37 54 L40 70 Q25 74 10 70 Z"
        fill="rgba(15,20,35,0.65)"
      />
      <!-- Headlights -->
      <circle cx="14" cy="9" r="2" fill="#fff8c5" />
      <circle cx="36" cy="9" r="2" fill="#fff8c5" />
      <!-- Taillights -->
      <circle cx="14" cy="81" r="2" fill="#e63946" />
      <circle cx="36" cy="81" r="2" fill="#e63946" />
      <!-- Side mirrors -->
      <rect
        x="1"
        y="22"
        width="3"
        height="5"
        rx="1"
        style="fill: var(--slot-car-color);"
      />
      <rect
        x="46"
        y="22"
        width="3"
        height="5"
        rx="1"
        style="fill: var(--slot-car-color);"
      />
    </svg>
  `;
}
