// One config for the whole card toolchain under Vite+ (`vp`): build (Vite 8
// library mode on Rolldown), test (Vitest), lint + type-check (Oxlint with
// tsgolint) and format (Oxfmt).
//
// Decorators are deliberately not configured here. Rolldown reads
// tsconfig.json itself and turns on Lit's legacy (experimental) decorators
// from it. src/card-smoke.test.ts reads `elementProperties` back off each
// element and fails if the tsconfig decorator flags regress; it tests the
// source as Vitest compiles it, not the built bundle.
import { defineConfig } from "vite-plus";

// MUST be a legal comment — `/*! ... */` — not `//`. The minifier strips
// ordinary comments including a `//` banner, silently. `comments: { legal:
// true }` below is the other half of the same requirement.
const banner =
  "/*! Ladestellen Austria Card — bundled by Rolldown. Edit sources in src/, then `npm run build`. */";

// Dev vs prod comes from Vite's mode, not from a watch env var: `npm run dev`
// passes `--mode development`, a plain `vp build` is production.
export default defineConfig(({ mode }) => {
  const dev = mode === "development";
  return {
    build: {
      // Library mode: one ES module, no index.html, no hashed file name.
      lib: {
        // Single-bundle decision: this card ships TWO Lovelace registrations
        // (ladestellen-austria-card + ladestellen-austria-parking-card) from
        // one JS file. The portfolio rule of thumb (ha-lovelace-card skill) is
        // one bundle per card, with an explicit carve-out for cards that share
        // >=40 % of their code AND are always deployed together — both apply
        // here. The list card and the parking card share the localize helper,
        // formatters, status mapping, the rack-slot status palette, the footer
        // + version banner, design tokens, and the CSS Grid 0fr<->1fr collapse
        // pattern. Splitting them would duplicate ~70 % of code AND ship two
        // HACS resources for users who use both — which is the common case
        // since the parking card's typical use is "drill into one station from
        // the list card". One entry, one bundle; don't reflexively split it
        // into per-card environments the way the multi-bundle siblings do.
        entry: "src/ladestellen-austria-card.ts",
        formats: ["es"],
        fileName: () => "ladestellen-austria-card.js",
      },
      outDir: "custom_components/ladestellen_austria/www",
      // www/ sits inside the integration package; never let Vite wipe it.
      emptyOutDir: false,
      copyPublicDir: false,
      target: "es2022",
      sourcemap: dev,
      rolldownOptions: {
        output: {
          banner,
          // HACS users get a single .js file, not a chunked dist/. Nothing is
          // dynamically imported today; this keeps a future `import()` from
          // emitting a chunk next to the bundle.
          codeSplitting: false,
          comments: { legal: true },
          // Set on the Rolldown output, not `build.minify`: Vite's library
          // mode skips whitespace minification for ES output, which grows the
          // bundle silently. Keep console.* (dropConsole: false): the source
          // has none today, but a console call in a catch block is a card's
          // only client-side failure signal, and dropConsole is all-or-nothing.
          minify: dev ? false : { compress: { dropConsole: false }, mangle: true, codegen: true },
        },
      },
    },
    fmt: {
      // Leave Lit html/css templates alone. Formatting them rewrites the
      // whitespace inside rendered elements, which changes the DOM.
      embeddedLanguageFormatting: "off",
      // Skip the integration package (Python side plus the built bundle),
      // Markdown, workflow YAML under .github/, root TOML and any Vitest
      // snapshots. Everything else, root JSON/YAML and this file included,
      // is formatted.
      ignorePatterns: [
        "custom_components/**",
        "**/*.md",
        ".github/**",
        "*.toml",
        "**/__snapshots__/**",
      ],
    },
    lint: {
      ignorePatterns: ["custom_components/**/www/**"],
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: {
        "vite-plus/prefer-vite-plus-imports": "error",
        // Opt-in rules from the `suspicious` category; the rest of that
        // category is mostly noise for Lit code (e.g. `_private` names).
        "typescript/no-unnecessary-type-assertion": "error",
        "eslint/no-shadow": "error",
        "unicorn/no-array-sort": "error",
      },
      // typeCheck makes `vp check` report tsc's errors (strict tsconfig
      // included), so it can stand in for `tsc --noEmit`.
      // denyWarnings: a warning fails `vp check` (and CI) instead of
      // scrolling past with exit 0.
      options: { typeAware: true, typeCheck: true, denyWarnings: true },
    },
  };
});
