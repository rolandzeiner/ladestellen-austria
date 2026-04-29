"""Regression test — Python and TypeScript status normalisation must agree.

The Python helper (`const.normalize_status`) and the TS helper
(`src/utils.ts normStatus`) bucket upstream RefillPointStatusEnum values
into the same canonical key. The frontend's rack-status colouring and
the coordinator's status-transition diff both lean on this contract; if
they drift, the bus event `ladestellen_austria_slot_status_changed`
fires for transitions that the card silently treats as no-change (or
vice versa) and user automations stop matching the way they should.

This test pins the formula on the Python side and re-derives the TS
formula from the source so a contributor changing one without the other
sees red CI.
"""
from __future__ import annotations

import re
from pathlib import Path

import pytest

from custom_components.ladestellen_austria.const import normalize_status

_TS_UTILS = Path(__file__).resolve().parent.parent / "src" / "utils.ts"
_TS_NORM_RE = re.compile(
    r"export\s+function\s+normStatus\s*\([^)]*\)\s*:\s*string\s*\{\s*"
    r"return\s*\(status\s*\?\?\s*\"\"\)\.toUpperCase\(\)\.replace\(/_/g,\s*\"\"\)"
)


def test_typescript_norm_status_formula_unchanged() -> None:
    """Pin the TS formula's body so a future edit must update both sides."""
    text = _TS_UTILS.read_text(encoding="utf-8")
    assert _TS_NORM_RE.search(text), (
        f"src/utils.ts normStatus body changed; update tests/test_status_parity.py "
        "and confirm the Python helper at const.normalize_status still matches."
    )


@pytest.mark.parametrize(
    ("input_value", "expected"),
    [
        ("AVAILABLE", "AVAILABLE"),
        ("available", "AVAILABLE"),
        ("OUT_OF_ORDER", "OUTOFORDER"),
        ("OUT_OF_STOCK", "OUTOFSTOCK"),
        ("out_of_order", "OUTOFORDER"),
        ("OUTOFORDER", "OUTOFORDER"),
        ("CHARGING", "CHARGING"),
        ("", ""),
        (None, ""),
        ("UNKNOWN_STATE_WITH_UNDERSCORES", "UNKNOWNSTATEWITHUNDERSCORES"),
    ],
)
def test_normalize_status(input_value: str | None, expected: str) -> None:
    """Python normaliser produces the canonical bucket key."""
    assert normalize_status(input_value) == expected
