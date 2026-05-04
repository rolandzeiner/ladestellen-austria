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

// Source of truth is `hass.language`, pushed in via setLanguage() from
// the card's willUpdate. `navigator.language` covers the brief window
// before hass is available; a hard `"en"` is the final floor. getLang
// strips region tags (`de-AT` → `de`) so lookups match the languages
// map keys.
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
