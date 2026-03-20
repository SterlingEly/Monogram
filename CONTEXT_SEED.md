# MONOGRAM — CONTEXT SEED FOR NEW THREAD
*Everything a fresh Claude session needs to resume Monogram watchface development*

---

## 1. WHAT IS THIS PROJECT?

**Monogram** is a Pebble watchface inspired by traditional monogram designs — the kind seen on stationery or cufflinks, where letters are arranged in stylized columnar patterns within a circular boundary. The concept is to display the time as large digit characters using custom bitmap assets in a tall, decorative "monogram" style. The outermost digits have their outer edges curved to follow the circle of the watchface, giving it an authentic monogram medallion feel.

**Sterling's role:** Design/concept lead. The visual aesthetic is the core creative challenge.
**Claude's role:** Technical implementation partner.

**This watchface is at an early stage.** The scaffold builds and runs, but the time display is a placeholder (LECO_36 system font). The hard part — custom digit bitmap assets — has not yet been created.

---

## 2. HISTORY

- Conceived alongside Radium 2 (2026) as a sibling watchface
- Primary target: Pebble Round (chalk), but supports all platforms
- Scaffold derived from Radium 2 (same settings architecture, same radial tick ring, same outer ring)
- Multiple asset generation approaches attempted and abandoned (see section 7)

---

## 3. CURRENT STATUS

- **NOT in the app store** (as of March 2026)
- **UUID IS A PLACEHOLDER — MUST REPLACE BEFORE ANY SUBMISSION**
- GitHub repo: https://github.com/SterlingEly/Monogram (branch: `main`)
- Builds and runs with LECO font placeholder
- Infrastructure (tick ring, outer ring, overlay circle) all working

---

## 4. REPO STRUCTURE

```
SterlingEly/Monogram (main)
└── src/
    ├── main.c       ← SHA: 2d509fa9f7ed33a5a35c16aa0e9c48c66a531ba0
    └── pkjs/
        ├── config.js
        └── index.js
```

**CRITICAL:** Replace UUID `a1b2c3d4-e5f6-7890-abcd-ef1234567890` before any store submission.

---

## 5. CURRENT VERSION SPEC

- Version: **1.0** (versionCode 1, SETTINGS_KEY: 1)
- UUID: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` ← **PLACEHOLDER**
- Capabilities: configurable, health
- 15 messageKeys/appKeys: TimeTextColor(0) through ShowRing(14)

### Settings struct (MonogramSettings)
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

Note: **No OverlayMode** — unlike Radium 2, overlay is always visible. No shake mechanism.

### Defaults (color)
- Lit hours: GColorWhite; Lit minutes: GColorLightGray (slightly dimmer)
- Dim: DarkGray; Background: black; Overlay: black

---

## 6. DRAWING ARCHITECTURE

### What's the same as Radium 2
- Full radial tick ring background (hours + minutes)
- Outer battery+steps ring (rect perimeter or round radial)
- Inner gap strip (rect only)
- B&W InvertBW support
- ShowRing toggle

### What's different from Radium 2
- **No OverlayMode** — no shake, always on
- **Overlay content:** Currently LECO_36 placeholder. Planned: custom monogram digit bitmaps.
- **Rect:** day text ABOVE overlay circle, date text BELOW (outside the circle)
- **Round:** no day/date text on face at all

### Overlay sizes
```c
int overlay_r = is_round
  ? ((w >= 260) ? 110 : (w >= 180) ? 76 : 58)
  : ((w >= 200) ? 64 : 58);
```

### Rect day/date positions
```c
int day_y  = cy - overlay_r - small_h - spacing;  // above circle
int date_y = cy + overlay_r + spacing;             // below circle
```

### Current placeholder (TODO: replace with bitmaps)
```c
graphics_draw_text(ctx, s_time_buffer,
  fonts_get_system_font(FONT_KEY_LECO_36_BOLD_NUMBERS),
  GRect(0, cy - time_h/2 - 2, w, time_h+4),
  GTextOverflowModeFill, GTextAlignmentCenter, NULL);
```

---

## 7. THE BIG CHALLENGE: DIGIT ASSETS

### The concept
40 custom bitmap digit assets needed:
- **4 positions:** HH:MM = tens-of-hours, ones-of-hours, tens-of-minutes, ones-of-minutes
- **10 digits per position:** 0–9
- Left and right outer positions have edges curved to follow the circular screen boundary

### What was tried and failed
1. **Programmatic SVG/canvas generation** — couldn't capture organic curves/proportions
2. **AI image generation** — beautiful one-offs, but couldn't be made consistent across 40 variants
3. **Systematic template approaches** — failed especially on outer-edge circle curvature

### Current conclusion
**Sterling needs to design digits manually in Photoshop.** Once 40 PNGs exist, Claude handles technical implementation.

### Implementation plan (once assets exist)
Preferred path: **JavaScript SDK** (newly available for Pebble) — better for dynamic image loading, time-based digit selection, cleaner asset management. This would be a major architectural shift from current C.

---

## 8. CONFIG PAGE

Derived from Radium 2:
- Same 12 color slots and cascade hierarchy
- No OverlayMode section
- ShowRing toggle, InvertBW, StepGoal slider
- No presets yet (future work)
- localStorage persistence (same approach as Radium 2)

---

## 9. CLOUDPEBBLE / BUILD RULES (CRITICAL)

1. No resources/media block in appinfo.json
2. Menu icons via CloudPebble UI only
3. No tilde (~) in resource filenames
4. CloudPebble imports from GitHub main branch
5. **Replace placeholder UUID before any submission**

---

## 10. DESIGN PHILOSOPHY

- **Monogram aesthetic:** Formal, elegant. Digits in tall columns, with outermost columns curved to the circular watch boundary — feels "set into" the circle rather than floating in it.
- **Background as depth:** Radial tick ring gives time-of-cycle context at a glance.
- **Primary platform:** Pebble Round (chalk, 180x180), but all platforms supported.

---

## 11. OPEN ITEMS / NEXT STEPS (in priority order)

1. **Design digit assets in Photoshop** (40 variants)
   - Decide on visual style (serif vs. sans-serif, height, weight, decorativeness)
   - Left/right edge columns need outer-edge circle curvature
   - All 40 must be visually consistent

2. **Decide implementation approach:**
   - Option A: Continue C, load bitmaps via `gbitmap_create_with_resource()`
   - Option B: Rebuild in JavaScript SDK (Sterling's preference)

3. **Replace placeholder UUID** with real Rebble UUID

4. **Config page presets** — a few themed starting points

5. **Store assets** — description, screenshots, banner (not started)

6. **Round screen optimization** — digits must fit 76px radius circle on chalk

---

## 12. DEV ENVIRONMENT

- **CloudPebble:** https://cloudpebble.repebble.com
- **GitHub MCP connector:** Live on Mac desktop
- **Photoshop:** For digit asset creation
- **JavaScript SDK:** Preferred future implementation path
- **Rebble Developer Portal:** https://dev.rebble.io

---

## 13. RELATIONSHIP TO RADIUM 2

Monogram shares almost all infrastructure with Radium 2:
- Same tick ring drawing code
- Same outer ring drawing code
- Same settings struct shape (minus OverlayMode)
- Same config.js architecture
- Same localStorage persistence

Port any Radium 2 bug fixes to Monogram as appropriate.

---

## 14. PLATFORM NOTES (CRITICAL)

| Platform | Screen | Colors | Health | Notes |
|----------|--------|--------|--------|-------|
| aplite   | 144×168 rect | B&W | No | |
| basalt   | 144×168 rect | 64 color | Yes | |
| chalk    | 180×180 round | 64 color | Yes | Primary round target |
| diorite  | 144×168 rect | B&W | Yes | |
| emery    | 200×228 rect | 64 color | Yes | |
| flint    | 144×168 rect | B&W | No | |
| **gabbro** | **260×260 round** | **color** | **Yes** | Pebble Round 2 (Core Devices, 2026) |

**B&W platforms:** aplite, diorite, flint only. Gabbro is color.
`index.js` bwPlatforms list = `['aplite', 'diorite', 'flint']` — gabbro intentionally excluded.

---

## 15. QUICK REFERENCE

```
Repo:         https://github.com/SterlingEly/Monogram
Branch:       main
Store status: NOT SUBMITTED — PLACEHOLDER UUID
UUID:         a1b2c3d4-e5f6-7890-abcd-ef1234567890  ← REPLACE THIS
Version:      1.0 (versionCode 1)
SETTINGS_KEY: 1
main.c SHA:   2d509fa9f7ed33a5a35c16aa0e9c48c66a531ba0
```

---

*Scaffold complete and builds. Blocked on digit asset creation. Next: design digits in Photoshop, then implement.*
