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
function getLang(): string {
  const raw =
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
