# Monogram — Project Context

> **AI collaborators: read [`PROJECT_CONTEXT.md`](https://github.com/SterlingEly/Radium2/blob/master/PROJECT_CONTEXT.md) first** for the authoritative platform table, shared build rules, and role split. (Shared context lives in the Radium2 repo.)

---

## Purpose

Monogram is a Pebble watchface inspired by traditional monogram designs — tall decorative digit characters arranged in columns within a circular boundary, with the outermost columns curved to follow the watchface edge. Time is displayed as four large custom bitmap digits (HH:MM), with the radial tick ring from Radium 2 providing ambient time context in the background.

Primary target: gabbro (Pebble Round 2, 260×260). Must work on all platforms.

---

## Current Status

- **NOT submitted to store — EARLY STAGE SCAFFOLD ONLY**
- **PLACEHOLDER UUID — must be replaced before any submission**
- GitHub repo: https://github.com/SterlingEly/Monogram (branch: `main`)
- The watchface builds and runs with a LECO font placeholder where monogram digits will appear
- **Blocked on digit asset creation** (see Design Challenge below)

---

## Human / AI Role Split

**Sterling:** Digit asset design (Photoshop), visual aesthetic, all design decisions.
**Claude:** C/JS scaffold, eventual bitmap rendering implementation, documentation.

The digit design is Sterling's creative work — AI approaches to this problem have all failed (see Design Challenge).

---

## Repository Structure

```
SterlingEly/Monogram (branch: main — not master)
├── CONTEXT_MONOGRAM.md   ← this file
└── src/
    ├── main.c            ← scaffold with LECO placeholder
    └── pkjs/
        ├── config.js
        └── index.js
```

**Note:** Branch is `main`, not `master`.

---

## Build / Deployment Rules

- Branch: `main` (not `master`) — don't push to wrong branch
- **Replace placeholder UUID** `a1b2c3d4-e5f6-7890-abcd-ef1234567890` before any submission
- See [PROJECT_CONTEXT.md](https://github.com/SterlingEly/Radium2/blob/master/PROJECT_CONTEXT.md) for shared build rules

---

## Architecture

### Current Scaffold
Inherits Radium 2's infrastructure almost entirely:
- Full radial tick ring background (hours + minutes wedges/arcs)
- Outer battery+steps ring (rect perimeter or round radial)
- B&W InvertBW support, ShowRing toggle
- Settings struct, config page, localStorage persistence

**Key difference from Radium 2:** No `OverlayMode` — overlay always visible. No shake logic.

### Overlay Radius
```c
int overlay_r = is_round
  ? ((w >= 260) ? 110 : (w >= 180) ? 76 : 58)
  : ((w >= 200) ? 64 : 58);
```

### Current Placeholder (to be replaced with bitmap rendering)
```c
// TODO: replace with monogram digit bitmaps
graphics_draw_text(ctx, s_time_buffer,
  fonts_get_system_font(FONT_KEY_LECO_36_BOLD_NUMBERS),
  GRect(0, cy - time_h/2 - 2, w, time_h+4),
  GTextOverflowModeFill, GTextAlignmentCenter, NULL);
```

### Rect — Day/Date Outside Circle
```c
int day_y  = cy - overlay_r - small_h - spacing;  // above circle
int date_y = cy + overlay_r + spacing;             // below circle
```

### Round — No Day/Date Text
Digits fill the circle; no room for day/date on the face.

### Preferred Implementation Path (once assets exist)
**JavaScript SDK (Alloy / Moddable XS engine, ES2025)** — now available via CloudPebble for gabbro. Advantages over C for dynamic bitmap loading and asset selection. This would be a full architectural rebuild from the current C scaffold.

---

## Critical Constants / Message Keys

### Settings Struct (v1.0 scaffold)
```c
typedef struct {
  GColor TimeTextColor, DateTextColor;
  GColor LitHourColor, LitMinuteColor, LitBatteryColor, LitStepsColor;
  GColor DimHourColor, DimMinuteColor, DimBatteryColor, DimStepsColor;
  GColor BackgroundColor, OverlayBgColor;
  int    StepGoal;
  bool   InvertBW;
  bool   ShowRing;
} MonogramSettings;  // SETTINGS_KEY=1
```

### UUID
`a1b2c3d4-e5f6-7890-abcd-ef1234567890` ← **PLACEHOLDER — REPLACE BEFORE SUBMISSION**

---

## Known Bugs / Known Traps

- Placeholder UUID will cause store submission to fail
- Branch is `main` not `master`
- `draw_text_stroked()` helper: may or may not be in current committed code — verify before relying on it
- If Radium 2 gets geometry fixes, consider porting to Monogram scaffold

---

## The Design Challenge

**40 custom bitmap assets required:** 10 digits (0–9) × 4 column positions = 40 PNGs.

Outer two positions (tens-of-hours, ones-of-minutes) need outer edge curved to follow the circular watchface boundary. Inner two positions (ones-of-hours, tens-of-minutes) are straight-edged columns.

**What was tried and failed:**
1. Programmatic SVG/canvas generation — can't capture monogram organic aesthetic
2. AI image generation — beautiful one-offs but inconsistent across 40 variants
3. Systematic template approach — failed on outer-edge curvature problem

**Current conclusion:** Sterling needs to manually design the digits in Photoshop.

---

## Current TODO

1. **Sterling:** Design 40 digit assets in Photoshop (blocked — no timeline set)
2. **Architectural decision:** C bitmap loading vs JavaScript/Alloy SDK rebuild
3. Replace placeholder UUID when ready for submission
4. Config page presets (none yet)
5. Store assets (description, screenshots, banner — not started)

---

## Unresolved Questions

- JavaScript/Alloy SDK vs continue C: not yet decided
- Exact digit visual style: serif vs sans-serif, weight, proportions — not yet decided
- Whether to show seconds: not yet decided
- Config page presets: what themes make sense for a monogram aesthetic?

---

## Source of Truth / External Links

| Resource | URL |
|----------|-----|
| GitHub repo | https://github.com/SterlingEly/Monogram |
| Alloy SDK docs | https://docs.moddable.com |

---

## Last Updated

2026-07-01 — Scaffold only. Blocked on digit asset creation.
