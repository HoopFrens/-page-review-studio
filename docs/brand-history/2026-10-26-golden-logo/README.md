# Golden website logo — October 26, 2026

Replace the website logo with the supplied `PRS Golden Logo.png`. Keep the approved October 23 six-color website palette. This change applies to the website header, footer, browser/Apple icons, and default social sharing preview through their existing shared source.

The transparent PNG is copied unchanged: 13310 × 1951 pixels, 763007 bytes, SHA-256 `89c675a0a77efbf91752980046762c521def3991a065b3b48e83b7c4bc6c8e40`. Display geometry trims only transparent margins; no artwork is cropped, stretched, recolored, or regenerated.

Full wordmark viewport: `{ x: 1175, y: 474, width: 10386, height: 1133 }` (64 pixels of padding around artwork). Icon viewport: `{ x: 1098, y: 579, width: 762, height: 762 }`, isolating the four-panel mark without lettering.

For a logo-only rollback, restore `public/brand/page-review-studio-logo.png` and its matching `lib/brand.ts` geometry from previous production commit `57c1d2360386de62c99a8c02b4403c569dc06227`. Preserve all later changes to other files. The previous logo SHA-256 is `eefb05444ac9d85cd620b21305ed9d6bad42678b0dfd7e2ffbd7faeb812c5f9a`. The official palette record remains at `../2026-10-23-official-palette/`.

Validation before release: production build and TypeScript passed; header and footer visually inspected at desktop and phone sizes; no horizontal overflow at 320, 390, 768, 1280, or 1440 pixels; mobile navigation opened successfully. Browser/Apple icons return 256 × 256 PNGs, and the social sharing image returns 1200 × 630. No page runtime errors during the browser check.
