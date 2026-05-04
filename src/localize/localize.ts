import * as en from "./languages/en.json";
import * as de from "./languages/de.json";

const languages: Record<string, Record<string, unknown>> = {
  en: en,
  de: de,
};

function resolveTranslation(
  path: string,
  dictionary: Record<string, unknown>,
): string | undefined {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dictionary);
  return typeof value === "string" ? value : undefined;
}

/** Resolve the active UI language to a base code (`de`, `en`, …).
 *
 * Source of truth is `hass.language`, which the cards push in via
 * `setLanguage(this.hass.language)` from their `willUpdate` /
 * `render`. `navigator.language` covers the brief window before
 * `hass` is available (e.g. error thrown from `setConfig`); a hard
 * `"en"` is the final floor.
 *
 * The return value is the base language only (`de-AT` → `de`,
 * `en-GB` → `en`). Previous versions returned `de_AT` verbatim, which
 * didn't match the languages map and silently fell back to English —
 * the reason the card read English on Austrian HA installs.
 */
// Explicitly-set active language, pushed from the card's render() via
// setLanguage(this.hass.language). `hass.language` is the server-side
// source of truth — it mirrors HA's configured user-profile language
// directly. The previous `localStorage.selectedLanguage` fallback was
// dropped because the key is a frontend-internal contract that HA does
// not document; reading it left the card silently reading English when
// the frontend stopped writing it.
let activeLanguage: string | undefined;

/** Push the active HA UI language from a component that has `hass`. */
export function setLanguage(lang: string | undefined | null): void {
  if (typeof lang === "string" && lang.length > 0) {
    activeLanguage = lang;
  }
}

function getLang(): string {
  const raw =
    activeLanguage ||
    (typeof navigator !== "undefined" ? navigator.language : "") ||
    "en";
  return raw.replace(/['"]+/g, "").substring(0, 2).toLowerCase();
}

export function localize(
  string: string,
  search = "",
  replace = "",
): string {
  const lang = getLang();
  const englishFallback = languages["en"] ?? {};
  let translated = resolveTranslation(
    string,
    languages[lang] ?? englishFallback,
  );
  if (translated === undefined) {
    translated = resolveTranslation(string, englishFallback);
  }
  if (translated === undefined) translated = string;
  if (search !== "" && replace !== "") {
    translated = translated.replace(search, replace);
  }
  return translated;
}
