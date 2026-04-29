import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

const dev = !!process.env.ROLLUP_WATCH;

const banner =
  "// Ladestellen Austria Card — bundled by Rollup. Edit sources in src/, then `npm run build`.";

// Suppress noisy node_modules `this` warnings (e.g. from custom-card-helpers'
// CommonJS internals after Rollup converts them). Real warnings still surface.
const onwarn = (warning, warn) => {
  if (
    warning.code === "THIS_IS_UNDEFINED" &&
    warning.id?.includes("/node_modules/")
  ) {
    return;
  }
  warn(warning);
};

// Single-bundle decision: this card ships TWO Lovelace registrations
// (ladestellen-austria-card + ladestellen-austria-parking-card) from one
// JS file. The skill's default rule of thumb is one bundle per card,
// with an explicit carve-out for cards that share ≥40 % of their code
// AND are always deployed together — both apply here. The list card
// and the parking card share the localize helper, formatters, status
// mapping, the rack-slot status palette, the footer + version banner,
// design tokens, and the recent CSS Grid 0fr↔1fr collapse pattern.
// Splitting them would duplicate ~70 % of code AND ship two HACS
// resources for users who use both — which is the common case since
// the parking card's typical use is "drill into one station from the
// list card". One bundle is the right call; tracked here so a future
// reviewer doesn't reflexively split.
export default {
  input: "src/ladestellen-austria-card.ts",
  output: {
    file: "custom_components/ladestellen_austria/www/ladestellen-austria-card.js",
    format: "es",
    sourcemap: dev,
    banner,
    // HACS users get a single .js file, not a chunked dist/. The editor's
    // dynamic import (getConfigElement) gets inlined into the main bundle.
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    json(),
    !dev && terser({ format: { comments: /Ladestellen Austria Card/ } }),
  ].filter(Boolean),
  onwarn,
};
