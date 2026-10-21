# Warm Blues website treatment

Prepared October 21, 2026 from the user-supplied `Warm Blues Logo.png`. The original website palette and paper-sheet logo are preserved in [the warm baseline](../2026-10-21-warm-baseline/README.md) and in Git commit `095556ea9fcd9c006049b7730ac1a27b7dbc344c`.

## Artwork

The website PNG is a byte-for-byte copy of the supplied transparent 2996 × 354 PNG. SHA-256: `990b9f477f9e62e1d3114af652d19c0da1a156588ee82d154d9d3dee9a537e6d`.

| Original logo color | Role |
| --- | --- |
| `#5979BC` | Lettering; decorative blue accent |
| `#B4DDF6` | Sky blue square; light text on dark sections; light cover backgrounds |
| `#85A0D3` | Periwinkle square; lines and borders |
| `#8494AD` | Steel blue square |
| `#414758` | Slate square; headlines and dark sections |

## Website treatments

| Color | Use |
| --- | --- |
| `#4563A0` | Darker blue derivative for buttons, links, focus, small labels |
| `#F6F8FC` | Near-white blue tint for page background and light text |
| `#EAF0F9` | Pale blue tint for alternating sections |
| `#596579` | Secondary text derived from slate |
| `#FFFFFF` | Header/logo surface and social card |

The logo lettering stays its supplied `#5979BC`. Small white text on that color has only 4.30:1 contrast, so buttons use `#4563A0` (5.92:1 with white; 5.57:1 with page-paper text). Main slate text is 8.71:1 on the page background. Secondary text is at least 5.15:1 on either light section background. Pale blue text on slate is 6.45:1.

Existing Tailwind color keys are retained for compatibility: blue=action blue, gold=periwinkle, brown=slate, tan=sky, cream=paper, linen=pale-blue wash. Saved CMS theme values remain unchanged; their editor labels and rendering reflect the new palette. Previously faded copy uses solid secondary text. Dark forms and all fallback book covers use explicit readable colors.

The full horizontal logo appears in header, footer and social preview. Browser and Apple icons display the four-square mark from the same source via an image viewport; the source pixels are unchanged.

## Restoring the earlier look

Follow the linked baseline guidance. Revert this isolated branding change or selectively restore its presentation changes while retaining any later content/functionality work. Do not reset the whole repository. Rebuild and verify before publishing a restoration.
