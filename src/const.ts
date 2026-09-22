// Must match CARD_VERSION in custom_components/ladestellen_austria/const.py
// byte-for-byte; tests/test_card_version.py enforces it in CI. On drift the
// WS probe (`ladestellen_austria/card_version`) reports a version different
// from this literal and the card raises its reload banner on first hass-set
// — which clears once the reload fetches the new bundle, or switches to the
// stuck-state message when it cannot (see shared-render.ts).
//
// There is no dev-time suffix. const.py derives its value from manifest.json,
// so a release is one edit there plus one here, in the same commit.
export const CARD_VERSION = "1.1.0";
