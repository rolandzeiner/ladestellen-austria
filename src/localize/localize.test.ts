// Unit tests for the localize helper.
//
// Note this module holds mutable module-level state (`activeLanguage`,
// pushed in from the cards' willUpdate). Vitest gives each test FILE a
// fresh module registry but not each test, so the tests below set the
// language explicitly rather than relying on the default — order
// independence is deliberate, not accidental.

import { beforeEach, describe, expect, it } from "vitest";

import { localize, setLanguage } from "./localize";

describe("setLanguage", () => {
  beforeEach(() => setLanguage("en"));

  it("switches the resolved language", () => {
    const english = localize("common.loading");
    setLanguage("de");
    expect(localize("common.loading")).not.toBe(english);
  });

  it("strips the region tag — de-AT resolves as de", () => {
    setLanguage("de");
    const plainDe = localize("common.loading");
    setLanguage("de-AT");
    expect(localize("common.loading")).toBe(plainDe);
  });

  it("is case-insensitive about the language tag", () => {
    setLanguage("de");
    const lower = localize("common.loading");
    setLanguage("DE");
    expect(localize("common.loading")).toBe(lower);
  });

  it("ignores nullish and empty values rather than resetting to English", () => {
    setLanguage("de");
    const german = localize("common.loading");
    setLanguage(undefined);
    setLanguage(null);
    setLanguage("");
    expect(localize("common.loading")).toBe(german);
  });
});

describe("localize", () => {
  beforeEach(() => setLanguage("en"));

  it("resolves a dotted path into the dictionary", () => {
    const value = localize("common.loading");
    expect(typeof value).toBe("string");
    expect(value).not.toBe("common.loading");
  });

  it("returns the key itself when nothing matches", () => {
    // Call sites depend on this: `resolved === key` is how the helpers
    // detect a missing translation and fall back to a raw label.
    expect(localize("no.such.key.exists")).toBe("no.such.key.exists");
  });

  it("returns the key for a path that lands on a non-string node", () => {
    // "common" is an object, not a leaf — it must not stringify.
    expect(localize("common")).toBe("common");
  });

  it("falls back to English when a key is missing in the active language", () => {
    setLanguage("de");
    // Whatever the German dictionary lacks must still resolve via en,
    // never to an empty string.
    expect(localize("common.loading")).toBeTruthy();
  });

  it("falls back to English for an entirely unknown language", () => {
    setLanguage("en");
    const english = localize("common.loading");
    setLanguage("xx");
    expect(localize("common.loading")).toBe(english);
  });

  it("substitutes a placeholder when both search and replace are given", () => {
    const raw = localize("no.such.key.{n}");
    expect(raw).toBe("no.such.key.{n}");
    expect(localize("no.such.key.{n}", "{n}", "7")).toBe("no.such.key.7");
  });

  it("replaces every occurrence, not just the first", () => {
    expect(localize("a.{x}.and.{x}", "{x}", "z")).toBe("a.z.and.z");
  });

  it("leaves the string alone when only one of search/replace is given", () => {
    expect(localize("no.such.key.{n}", "{n}")).toBe("no.such.key.{n}");
    expect(localize("no.such.key.{n}", "", "7")).toBe("no.such.key.{n}");
  });
});
