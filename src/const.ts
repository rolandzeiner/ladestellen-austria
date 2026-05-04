// Must match CARD_VERSION in custom_components/ladestellen_austria/const.py
// byte-for-byte. tests/test_card_version.py enforces the invariant in CI.
// If they drift, the WS probe (`ladestellen_austria/card_version`) returns
// a different version than this hard-coded value; the card detects the
// mismatch on first hass-set and shows a reload banner. The reload picks
// up the freshly-cached JS and the banner clears.
//
// Bump both in the same commit. The README badge + manifest.json stay at
// the clean version; this constant + const.py can carry a `-beta-N`
// suffix during development.
export const CARD_VERSION = "0.3.3";
