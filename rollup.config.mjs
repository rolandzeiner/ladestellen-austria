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
