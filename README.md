# Monogram

> **DEFERRED (2026-10-24).** Sterling's decision: [TallBoy](https://github.com/SterlingEly/TallBoy) on round watches delivers about 90% of what Monogram was meant to be, so TallBoy is the face that ships. This repo is kept, not deleted, as design history and a possible future branch point. See [Status](#status).

> **Collaborators (human or AI):** read [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md) before making any code changes. It has current status, architecture, build rules, critical constants, and the deferral rationale and revival path.

A Pebble watchface concept built around custom monogram-style digit designs — tall vertical letterforms arranged within a circular boundary, inspired by traditional monogram aesthetics.

---

## Status

**Deferred (2026-10-24).** Superseded in practice by TallBoy. Not in any app store; no release is planned.

Why: TallBoy on round (Pebble Time Round, Pebble Round 2) already gets about 90% of the look Monogram was aiming for, without the 40 hand-drawn digit bitmaps this design needed.

Revival path: if a future TallBoy technique can dynamically push every digit bound out to fit the circle even more tightly, in the way a true monogram does, Monogram would be **branched off TallBoy** rather than revived from this scaffold — unless the same fit can simply be added to TallBoy itself, in which case no separate face is needed.

State at deferral: implementation scaffold only (derived from Radium 2). The overlay renders a `LECO_36_BOLD_NUMBERS` system-font placeholder. The 40 digit assets (10 digits × 4 positions) were never completed.

---

## Design

Designed by **Sterling Ely**.

- Round watches: digits fill the overlay circle, no day/date on face
- Rect watches: digits in overlay circle, day/date above/below outside the circle
- Outer ring: battery (right half) and step count (left half)
- Overlay always visible (no shake/art mode)

---

## Implementation

Implementation by Sterling Ely & Claude (Anthropic). Skeleton derived from [Radium 2](https://github.com/SterlingEly/Radium2). Would have used the Alloy JavaScript SDK for final digit asset loading and rendering.

---

## Platforms

| Platform | Watch | Resolution | Colors |
|----------|-------|------------|--------|
| Aplite   | Pebble Classic / Steel | 144×168 | B&W |
| Basalt   | Pebble Time / Steel | 144×168 | color |
| Chalk    | Pebble Time Round | 180×180 | color |
| Diorite  | Pebble 2 | 144×168 | B&W |
| Emery    | Pebble Time 2 | 200×228 | color |
| Flint    | Pebble 2 Duo | 144×168 | B&W |
| **Gabbro** | **Pebble Round 2** | **260×260** | **color** |

---

## License

MIT
