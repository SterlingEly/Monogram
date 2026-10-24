# Monogram — Project Context

> **Read this before making code changes.** This file is the primary AI/human handoff doc for this repo. Stable sections describe things that rarely change; Live sections describe current state and should be kept up to date as work progresses.

> **DEFERRED (2026-10-24).** Do not resume work on this repo unless Sterling asks. See "Deferral Decision" below.

---

## Deferral Decision
*(Live, decided 2026-10-24 by Sterling)*

- **Decision:** Monogram is **deferred** indefinitely (superseded in practice by TallBoy, with a conditional revival path). The repo is kept (not deleted) as design history and a possible branch point. Status-term note: Sterling's own words were "shelved forever in its favor… unless I can someday dynamically push all bounds to fit the circle"; "deferred" was chosen on 2026-10-24 as the portfolio-wide term because the revival condition is real. Earlier docs said "shelved"; same meaning.
- **Why:** [TallBoy](https://github.com/SterlingEly/TallBoy) on round watches delivers about 90% of what Monogram was meant to achieve (tall vector-drawn digits filling the circular face), without needing 40 hand-drawn digit bitmaps. Sterling's words: TallBoy on round is "about 90% of what I was trying to do with monogram".
- **Revival path:** If TallBoy can someday dynamically push all digit bounds to fit the circle even more tightly, as a true monogram does, then either (a) add that fit to TallBoy itself, or (b) if Sterling does not want such changes in TallBoy, **branch a new Monogram off TallBoy** (not off this scaffold). The bitmap-asset plan below is superseded.
- **Consequences:** no store listing, no UUID replacement, no asset design. The TODO list below is frozen.

---

## Purpose
*(Stable)*

Monogram is a Pebble watchface inspired by traditional monogram designs — the kind seen on stationery or cufflinks, where letters are arranged in stylized columnar patterns within a circular boundary. The concept: display the time as large digit characters using custom bitmap assets in a tall, decorative "monogram" style. The outermost digits (leftmost and rightmost) have their outer edges curved to follow the circular watchface boundary, giving it an authentic monogram-medallion feel.

Conceived alongside Radium 2 (2026) as a sibling watchface. Primary target is Pebble Round (chalk/gabbro), but it supports all platforms. The scaffold was derived directly from Radium 2 (same settings architecture, same radial tick ring, same outer ring).

---

## Current Status
*(Live)*

- **DEFERRED as of 2026-10-24** (see Deferral Decision above).
- **NOT in the app store** (as of March 2026; re-verified 2026-09-28)
- **UUID is a placeholder** — it would have to be replaced before any submission.
- Scaffold builds and runs. Overlay shows a `LECO_36_BOLD_NUMBERS` system-font placeholder instead of custom digit bitmaps.
- Infrastructure is functional: radial tick ring, outer battery/steps ring, overlay circle sizing.
- Was blocked on: 40 custom digit bitmap assets. Multiple AI/programmatic generation approaches were attempted and abandoned (see Known Traps). Sterling was designing these manually in Photoshop; that work stopped when the project was deferred.

---

## Human / AI Role Split

- **Sterling Ely:** design direction, product decisions, digit asset design (Photoshop), on-device testing and verification.
- **AI collaborator (Claude):** technical implementation (C/JS), refactoring, GitHub commits, documentation support.

This split applies throughout unless a specific section of this repo says otherwise.

---

## Repository Structure
*(Stable, verify against live tree if in doubt)*

```
SterlingEly/Monogram (main)
├── PROJECT_CONTEXT.md   ← this file
├── README.md
├── STORE_LISTING.md     (stub; deferred, no listing will be written unless revived)
├── appinfo.json
└── src/
    ├── main.c
    └── pkjs/
        ├── config.js
        └── index.js
```

---

## Build / Deployment Rules
*(Stable, CRITICAL)*

1. **No `resources/media` block** in `appinfo.json` — causes "Unsupported published resource type" errors.
2. **Menu icons** must be added via the CloudPebble UI directly, not via GitHub import.
3. **No tilde (`~`) in resource filenames** — breaks CloudPebble's GitHub import.
4. CloudPebble imports from the GitHub `main` branch.
5. C source must live at the flat path `src/main.c` (not nested `src/c/main.c`) — nested paths break CloudPebble import validation.
6. **Replace the placeholder UUID before any store submission.**
7. CloudPebble re-import fails if duplicate source files exist at different paths — delete before re-import.

### GitHub MCP notes (for AI collaborators)
- `push_files` sends **empty content** — do not use it. Use `create_or_update_file` with actual inline content.
- Always fetch the current file SHA via `get_file_contents` before updating — SHAs from a prior session are stale. Pass the full 40-character SHA.
- "Deleting" a file via MCP produces a zero-byte file, not a true removal — actual deletion requires the GitHub web UI trash icon.
- Cannot create release tags/releases via MCP — manual web UI step.

---

## Architecture
*(Stable)*

Shares almost all infrastructure with [Radium 2](https://github.com/SterlingEly/Radium2):
- Same tick ring drawing code (hours + minutes)
- Same outer battery/steps ring drawing code
- Same settings struct shape, **minus `OverlayMode`**
- Same `config.js` cascade architecture
- Same `localStorage` settings persistence (in `index.js`)

**Key difference from Radium 2:** no `OverlayMode` — the overlay is always visible, with no shake-to-toggle mechanism.

### Overlay sizing
```c
int overlay_r = is_round
  ? ((w >= 260) ? 110 : (w >= 180) ? 76 : 58)
  : ((w >= 200) ? 64 : 58);
```

### Layout by shape
- **Rect:** day text above the overlay circle, date text below it (both outside the circle)
  ```c
  int day_y  = cy - overlay_r - small_h - spacing;  // above circle
  int date_y = cy + overlay_r + spacing;             // below circle
  ```
- **Round:** no day/date text on the face at all — digits fill the circle, no room for extra text.

### Current placeholder rendering (never replaced)
```c
// TODO: replace with monogram digit bitmaps
graphics_draw_text(ctx, s_time_buffer,
  fonts_get_system_font(FONT_KEY_LECO_36_BOLD_NUMBERS),
  GRect(0, cy - time_h/2 - 2, w, time_h+4),
  GTextOverflowModeFill, GTextAlignmentCenter, NULL);
```

### Digit asset concept (design target, superseded by the deferral decision)
- **40 bitmap variants** = 4 digit positions (tens-of-hours, ones-of-hours, tens-of-minutes, ones-of-minutes) × 10 digits (0–9)
- The two **outer** positions (tens-of-hours on the left, ones-of-minutes on the right) need their outer edge curved to match the circular screen boundary
- The two **inner** positions are more standard straight-edged columns

### Implementation path for digit rendering (decision never made)
- **Option A:** Continue in C, load bitmaps via `gbitmap_create_with_resource()`
- **Option B (Sterling's stated preference):** Rebuild digit rendering in the JavaScript/Alloy SDK (Moddable XS engine, ES2025). Significant architectural shift from the current C implementation.
- If revived, the preferred path is now to branch off TallBoy's vector-drawn digit approach instead (see Deferral Decision).

---

## Critical Constants / Message Keys
*(Frozen at deferral — verify UUID/SHA against repo before trusting)*

- **UUID:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890` ← **PLACEHOLDER, must replace before submission**
- **Version:** 1.0 (versionCode 1)
- **SETTINGS_KEY:** 1
- **Capabilities:** `configurable`, `health`
- **Target platforms:** aplite, basalt, chalk, diorite, emery, flint, gabbro
- **`src/main.c` SHA (last verified):** `2d509fa9f7ed33a5a35c16aa0e9c48c66a531ba0`

### messageKeys (15 total, indices 0–14)
```
TimeTextColor(0), DateTextColor(1),
LitHourColor(2), LitMinuteColor(3), LitBatteryColor(4), LitStepsColor(5),
DimHourColor(6), DimMinuteColor(7), DimBatteryColor(8), DimStepsColor(9),
BackgroundColor(10), OverlayBgColor(11),
StepGoal(12), InvertBW(13), ShowRing(14)
```

### Settings struct (`MonogramSettings`)
```c
typedef struct {
  GColor TimeTextColor, DateTextColor;
  GColor LitHourColor, LitMinuteColor, LitBatteryColor, LitStepsColor;
  GColor DimHourColor, DimMinuteColor, DimBatteryColor, DimStepsColor;
  GColor BackgroundColor, OverlayBgColor;
  int    StepGoal;
  bool   InvertBW;
  bool   ShowRing;
} MonogramSettings;
```

### Defaults
- Lit hours: `GColorWhite`; lit minutes: `GColorLightGray` (slightly dimmer)
- Dim tones: `DarkGray`; background: black; overlay background: black
- `ShowRing`: true; `InvertBW`: false; `StepGoal`: 10000

### Platform table
| Platform | Watch | Resolution | Colors | Health capability |
|----------|-------|------------|--------|--------|
| aplite   | Pebble Classic / Steel | 144×168 rect | B&W | No |
| basalt   | Pebble Time | 144×168 rect | color | Yes |
| chalk    | Pebble Time Round | 180×180 round | color | Yes |
| diorite  | Pebble 2 | 144×168 rect | B&W | Yes |
| emery    | Pebble Time 2 | 200×228 rect | color | Yes |
| flint    | Pebble 2 Duo | 144×168 rect | B&W | No |
| gabbro   | Pebble Round 2 (Core Devices, 2026) | 260×260 round | color | Yes |

`index.js` B&W platform list = `['aplite', 'diorite', 'flint']` — gabbro is intentionally excluded (it's color).

---

## Known Bugs / Known Traps
*(Frozen at deferral)*

- No functional bugs logged — the app never became feature-complete (digit rendering stayed a font placeholder).
- Three prior approaches to generating the 40 digit assets were tried and abandoned:
  1. **Programmatic SVG/canvas generation** — couldn't capture the organic curves/proportions of real monogram letterforms, especially the outer-edge circle curvature.
  2. **AI image generation** — produced appealing individual digits but couldn't be made visually consistent across all 40 variants.
  3. **Systematic template approaches** — repeatedly failed on the outer-edge curvature specifically; see chat history for the extended (and largely unsuccessful) iteration log.
- See Build/Deployment Rules above for CloudPebble-specific traps (resource blocks, tildes, nested source paths).

---

## Current TODO
*(FROZEN — project deferred 2026-10-24; kept for history only)*

1. ~~Design 40 digit bitmap assets in Photoshop~~ — superseded by TallBoy
2. ~~Decide digit-rendering implementation approach~~ — superseded; if revived, branch off TallBoy
3. ~~Replace placeholder UUID~~ — only if revived
4. ~~Add config page presets~~
5. ~~Write store assets~~ — if revived, model the listing on the live Radium 2 repebble listing
6. ~~Optimize round-screen digit layout~~ — TallBoy's round layouts cover this

---

## Verification Plan

- Not applicable while deferred. If revived: build via [CloudPebble](https://cloudpebble.repebble.com) from the GitHub `main` branch, test in the emulator, and Sterling performs final on-device verification.

---

## Source of Truth / External Links

- Repo: https://github.com/SterlingEly/Monogram (branch: `main`)
- Successor in spirit: https://github.com/SterlingEly/TallBoy
- Sibling project / architecture source: https://github.com/SterlingEly/Radium2
- CloudPebble: https://cloudpebble.repebble.com
- Rebble Developer Portal: https://dev.rebble.io
- Pebble Appstore listing: not listed (deferred)
- Rebble Appstore listing: not listed (deferred)
- CloudPebble / Round 2 / JS SDK announcement: https://repebble.com/blog/cloudpebble-returns-plus-pure-javascript-and-round-2-sdk
- Pebble Plugins preview (announced 2026-10-23, future-only for any Sterling face): https://developer.repebble.com/guides/plugins/

---

## Related Projects

Sibling Pebble watchface/tool repositories by Sterling Ely. This section is a pointer, not documentation — see each repo's own `PROJECT_CONTEXT.md` for details.

- **TallBoy** — https://github.com/SterlingEly/TallBoy — Large vector-drawn digits. On round watches it delivers about 90% of Monogram's intent, which is why Monogram is deferred. The branch point if Monogram is ever revived.
- **Radium2** — https://github.com/SterlingEly/Radium2 — Monogram's architectural parent; shares its settings struct shape, tick ring, and outer ring drawing code.
- **BarGraph2** — https://github.com/SterlingEly/BarGraph2 — Sibling watchface (rebuild of the original 2013 Bar Graph concept); no shared code with Monogram.
- **PixelSampler** — https://github.com/SterlingEly/PixelSampler — Developer reference app for fonts, colors, and hardware capabilities across Pebble platforms.

---

## Unresolved Questions

- Whether the `draw_text_stroked()` day/date stroke technique (mentioned in prior notes) is actually present in the currently committed `main.c` was never re-verified. Only matters if revived.
- Everything else (digit style, implementation language, test suite) is moot while deferred.

---

## Last Updated

- Consolidated from `CONTEXT_MONOGRAM.md` + `CONTEXT_SEED.md` by Claude (AI collaborator), March 2026.
- Related Projects section added and structure re-aligned to the cross-repo project-context standard, July 2026.
- 2026-10-24: Marked inactive at Sterling's direction (TallBoy on round covers ~90% of the intent); added the decision section, froze TODO, README and STORE_LISTING updated to match.
- 2026-10-24 (later): status term standardized from "shelved" to **deferred** portfolio-wide at Sterling's request; Deferral Decision wording, links and Related Projects updated.
- **Maintainers:** update the Live-marked sections as status changes; Stable sections should only change when the underlying design/architecture actually changes.
