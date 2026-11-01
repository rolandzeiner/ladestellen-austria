/**
 * Both cards fill their sections-view grid cell instead of painting over the
 * card below -- and only there, so the add-card picker preview keeps its own
 * height.
 *
 * A sections view gives the card a fixed-height cell whenever rows is numeric
 * -- which the USER causes by dragging the height or width handle, since a
 * stored grid_options overrides getGridOptions(). rows: "auto" exempts
 * nobody. Only the PAIR below makes the card take that height.
 *
 * The pair is gated on the layout attribute HA sets ("grid" in a sections
 * view, "panel" in a panel view). The add-card picker sets none and centres
 * each preview in a tile as tall as the tallest one in its row, so an
 * ungated 100% stretches the preview down to it. The selectors only match if
 * the card reflects its `layout` property; card-smoke.test.ts checks that.
 *
 * happy-dom does no layout, so the guard is on the CSS text.
 */
import { describe, expect, it } from "vite-plus/test";

import { cardStyles, parkingLotStyles } from "./styles";

/** The declarations of the first rule in `css` whose selector list starts a
 *  line with `selector`, up to its closing brace. Anchoring on the line keeps
 *  "ha-card" from matching the tail of `:host([layout="panel"]) ha-card`. */
const rule = (css: string, selector: string): string => {
  const start = css.indexOf(`\n  ${selector} {`);
  return start < 0 ? "" : css.slice(start, css.indexOf("}", start));
};

// Each card's own sheet goes last in its array; the shared fragments before
// it carry no :host or ha-card rule.
describe.each([
  ["list card", cardStyles],
  ["parking card", parkingLotStyles],
])("the %s grid cell", (_name, sheets) => {
  const css = sheets.map((s) => s.cssText).join("\n");

  it("is a block on the host", () => {
    expect(rule(css, ":host")).toMatch(/display:\s*block/);
  });

  it("takes the cell's height on the host in grid and panel layouts", () => {
    expect(rule(css, ':host([layout="grid"]),\n  :host([layout="panel"])')).toMatch(
      /block-size:\s*100%/,
    );
  });

  it("resolves ha-card against it there, and clips inside the card", () => {
    expect(rule(css, ':host([layout="grid"]) ha-card,\n  :host([layout="panel"]) ha-card')).toMatch(
      /block-size:\s*100%/,
    );
    expect(rule(css, "ha-card")).toMatch(/overflow:\s*hidden/);
  });

  it("never fills ungated, so the picker preview keeps its own height", () => {
    expect(rule(css, ":host")).not.toMatch(/block-size|height:\s*100%/);
    expect(rule(css, "ha-card")).not.toMatch(/block-size|height:\s*100%/);
  });
});
