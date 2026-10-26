# Four logo colors — October 26, 2026

The website now uses the four opaque panel colors sampled directly from the current Golden logo, superseding the six-color website treatment. This is a website-only change; the supplied logo, photographs, and book covers remain unchanged.

| Color | Exact source | Website role |
| --- | --- | --- |
| Cream | `#FEF5E3` | Main background, cards, text on dark/blue sections |
| Gold | `#FEC262` | Accents, process circles, dark-section details, large metrics |
| Blue | `#516B9C` | Actions, links, borders, experience section |
| Slate | `#363C49` | Body copy, headings, dark sections, footer |

Cream on blue is 4.929:1, cream on slate 10.205:1, and slate on gold 6.901:1. Gold on blue is 3.333:1, so it is used only for large metric numerals or decoration, not small copy. Cream on blue stays fully opaque. Translucent borders and decorative overlays use these same four colors.

Legacy Tailwind names remain compatible with existing stored review themes: `brown` and `muted` map to slate; `tan` and `linen` map to cream; `steel` maps to blue. Saved Sanity values are unchanged; their visible names now describe the palette accurately. Icons and the default sharing preview use the same cream background.

## Reverting this color update

Previous production is commit `642306a32b82cb9eb4908447b2725e9992ae88b8`. The previous palette is recorded in `palette.json`. Revert only this release's palette and component styling changes, preserving later unrelated edits. The Golden PNG and its geometry already existed at that baseline and must remain intact. Earlier complete palette records remain in `../2026-10-23-official-palette/`.

## Validation

Production build and TypeScript passed. Browser checks found no horizontal overflow at 320, 390, 768, 1280, or 1440 pixels. Header, hero, experience strip, process, footer, and review layouts were visually inspected. Mobile navigation opens, the footer hover switches to gold, all three review routes return 200, and no page runtime errors were recorded. Browser/Apple icons remain 256 × 256; the social preview remains 1200 × 630. The PNG SHA-256 remains unchanged. Screenshots are retained locally under `output/playwright/four-colors-*`.

Publishing requires the verified branch preview and the production deployment to match the release commits.
