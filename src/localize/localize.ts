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
 * Fallback chain:
 *   1. `localStorage.selectedLanguage` — set by HA when the user changes
 *      their profile language. Stored JSON-stringified (`"de-AT"`), so
 *      we strip quotes.
 *   2. `navigator.language` — browser default, used when HA hasn't
 *      written the key yet (first-time users).
 *   3. Hard `"en"`.
 *
 * The return value is the base language only (`de-AT` → `de`,
 * `en-GB` → `en`). Previous versions returned `de_AT` verbatim, which
 * didn't match the languages map and silently fell back to English —
 * the reason the card read English on Austrian HA installs.
 */
// Explicitly-set active language, pushed from the card's render() via
// setLanguage(this.hass.language). Takes priority over localStorage +
// navigator because `hass.language` is the server-side source of truth —
// it mirrors HA's configured user-profile language even when the frontend
// hasn't written it to localStorage.
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
    localStorage.getItem("selectedLanguage") ||
    (typeof navigator !== "undefined" ? navigator.language : "") ||
    "en";
  const cleaned = raw.replace(/['"]+/g, "");
  return cleaned.substring(0, 2).toLowerCase();
}

export function localize(
  string: string,
  search = "",
  replace = "",
): string {
  const lang = getLang();
  let translated = resolveTranslation(
    string,
    languages[lang] || languages["en"],
  );
  if (translated === undefined) {
    translated = resolveTranslation(string, languages["en"]);
  }
  if (translated === undefined) translated = string;
  if (search !== "" && replace !== "") {
    translated = translated.replace(search, replace);
  }
  return translated;
}
