# Monogram

A Pebble watchface built around custom monogram-style digit designs — tall vertical letterforms arranged within a circular boundary, inspired by traditional monogram aesthetics.

---

## Status

Early development. Digit assets are being designed manually in Photoshop (10 digits × 4 positions = 40 variants). Implementation scaffold is in place; final rendering will replace the placeholder overlay once assets are ready.

---

## Design

Designed by **Sterling Ely**.

- Round watches: digits fill the overlay circle, no day/date on face
- Rect watches: digits in overlay circle, day/date above/below outside the circle
- Outer ring: battery (right half) and step count (left half)
- Overlay always visible (no shake/art mode)

---

## Implementation

Implementation by Sterling Ely & Claude (Anthropic). Skeleton derived from [Radium 2](https://github.com/SterlingEly/Radium2). Will use the Alloy JavaScript SDK for final digit asset loading and rendering.

---

## Platforms

| Platform | Watch | Resolution |
|----------|-------|------------|
| Aplite   | Pebble Classic / Steel | 144×168 (B&W) |
| Basalt   | Pebble Time / Steel | 144×168 (color) |
| Chalk    | Pebble Time Round | 180×180 (color) |
| Diorite  | Pebble 2 | 144×168 (B&W) |
| Emery    | Pebble Time 2 | 200×228 (color) |
| Flint    | Pebble 2 Duo | 144×168 (color) |
| Gabbro   | Pebble Round 2 | 260×260 (color) |

---

## License

MIT
