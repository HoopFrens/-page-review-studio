# Official website palette — October 23, 2026

The user supplied the updated logo and these six official colors for the website. The design uses warm cream surfaces, slate typography, blue actions, and restrained gold accents. Sky and periwinkle support borders and light details. This record describes the implementation palette; deployment must be verified separately.

| Official color | Intended use |
|---|---|
| `#FEC262` | Gold accents and highlights |
| `#FFF3E1` | Cream surfaces and light text |
| `#516A9B` | Blue links, actions, and accents |
| `#363C48` | Slate body text, headings, and dark sections |
| `#85A0D3` | Periwinkle borders and decorative details |
| `#B4DBF5` | Sky details and light text on slate |

`palette.json` records the legacy theme-key mapping. Existing key names are retained for compatibility with saved review themes. `brand-linen` is `#F0EEE5`, a rounded sRGB mixture of 20% official sky and 80% official cream; it is a derived surface, not an additional official brand color. Shared CSS variables should remain the styling source of truth.

## Readability

Cream on blue is **4.93:1**; cream on slate **10.10:1**; sky on slate **7.59:1**; gold on slate **6.91:1**; blue on the derived linen surface **4.65:1**. These pass the 4.5:1 contrast threshold for normal-sized text.

Blue on sky (**3.70:1**) and slate on periwinkle (**4.20:1**) do not pass for normal-sized text. Avoid those pairings for small labels and copy. Gold on cream (**1.46:1**) is for decorative accents only, not text or the sole visible boundary of an interactive control. Keep small blue copy fully opaque. Check image overlays, hover states, and translucent colors in the rendered page separately.

## Supplied artwork

The supplied transparent PNG is preserved byte-for-byte: **10528 × 1352** pixels, SHA-256 `eefb05444ac9d85cd620b21305ed9d6bad42678b0dfd7e2ffbd7faeb812c5f9a`.

Its embedded solid colors are `#516B9C`, `#B4DDF6`, `#85A0D3`, and `#363C49`. Three differ slightly from the explicit website codes. The website uses the user's exact requested codes; the PNG is not recolored to force a match. Preserve its native proportions, including the four-panel mark's shape.

The full-logo display viewport is `{ x: 182, y: 167, width: 10266, height: 1122 }`, retaining 64 source pixels around the nontransparent artwork. The icon viewport is `{ x: 106, y: 267, width: 760, height: 760 }`, which isolates the four-panel mark without including lettering. These are display viewports; the source image is unchanged.

The preceding Warm Blues logo, palette, and source snapshots are in `../2026-10-23-warm-blues-baseline/`, with instructions for a branding-only rollback that preserves future content and features.

## Verification before release

Production build and TypeScript checks passed. Browser checks covered the homepage at 320, 390, 768, 1280, and 1440 pixels with no horizontal overflow; mobile navigation; graphic-design quote selection; 2px blue and gold keyboard-focus outlines; the review index and both published review routes. Icon routes return 256 × 256 PNGs; the sharing preview returns a 1200 × 630 PNG. No browser runtime errors appeared during these checks. Form submissions were not sent. The source logo hash matches the supplied file.
