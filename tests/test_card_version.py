"""Regression test — Python and TypeScript CARD_VERSION must stay byte-identical.

The Lovelace resource URL appends `?v=<CARD_VERSION>` from const.py as a
cache-buster, while the bundled card itself imports CARD_VERSION from
src/const.ts and prints it in the boot-time console banner. If the two
strings drift, the cache-buster URL won't match what the card thinks it
is — which is silent today (no WS version probe is registered) but
breaks the diagnostic value of the banner and the future option to add
one.

Bump both in the same commit; this test catches drift in CI.
"""
from __future__ import annotations

import re
from pathlib import Path

from custom_components.ladestellen_austria.const import CARD_VERSION as PY_VERSION

_TS_CONST = (
    Path(__file__).resolve().parent.parent / "src" / "const.ts"
)
_VERSION_RE = re.compile(
    r'export\s+const\s+CARD_VERSION\s*=\s*"([^"]+)"\s*;'
)


def test_card_version_matches_typescript() -> None:
    """src/const.ts CARD_VERSION must be byte-identical to const.py."""
    text = _TS_CONST.read_text(encoding="utf-8")
    match = _VERSION_RE.search(text)
    assert match, (
        f"Could not locate CARD_VERSION export in {_TS_CONST}; the regex "
        "expects `export const CARD_VERSION = \"…\";`."
    )
    ts_version = match.group(1)
    assert ts_version == PY_VERSION, (
        f"CARD_VERSION drift: const.py={PY_VERSION!r} vs "
        f"src/const.ts={ts_version!r}. Bump both in the same commit."
    )
