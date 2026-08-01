# Review page design mockups

These concepts were evaluated with the existing *The Seven Husbands of Evelyn Hugo* review, cover, hero image, and three published quote graphics. **Gallery Stage was selected for the current production-template trial on August 1, 2026, replacing the earlier Story Interludes trial.**

## What the mockups address

The original page gave three very tall graphics equal weight in a single row after the article. That made them feel appended to the review and made their typography difficult to read. The selected direction gives the gallery an editorial purpose and lets hierarchy, scale, and spacing respond to each graphic.

## Concepts

### 1. Editorial mosaic

- Keeps the current sticky book-cover placement.
- Moves the graphics into a titled “Visual notes” section before the end of the review.
- Uses the first ordered graphic as the feature and stacks the other two beside it.
- Changes to a horizontal, scroll-snap gallery on phones.
- Best balance of visual impact, reading flow, and implementation simplicity.

### 2. Story interludes

- Removes the bottom gallery.
- Distributes the graphics between fixed article sections as magazine-style visual pauses.
- Alternates the image and related passage on desktop and stacks them on phones.
- Most integrated with the writing, but produces the longest mobile page.

### 3. Gallery stage

- Moves the book cover into the hero so the book identity appears immediately.
- Places the graphics on a cinematic dark stage with one emphasized card.
- Uses horizontal scrolling on phones, with the next card visible as a cue.
- Most distinctive, but introduces more interaction than the mosaic.

## Selected direction

Use **Concept 3: Gallery Stage** as the production gallery pattern.

- The book cover moves into the hero for reviews with graphics.
- The complete review remains readable in order around one full-width, dark gallery stage.
- Each graphic keeps its natural proportions and is never automatically cropped.
- Array order creates a stable visual hierarchy: the first graphic is the feature, the second is supporting, and the third is the accent.
- Desktop uses an asymmetric “Emerald Salon” composition with intentionally different sizes and offsets.
- Phones use native horizontal scrolling and scroll snap with varied card widths and the next card left partly visible as a cue.
- Reviews without graphics retain the standard reading layout.
- The presentation is chosen by the frontend; no layout controls are exposed to Krystal in Sanity.

## Sanity content contract

Krystal should manage content, not layouts. The selected template should be fixed across every review.

- `coverImage`: required image, uncropped, displayed with `object-contain`
- `coverAlt`: required text
- `heroImage`: optional editorial photograph with hotspot support
- `heroAlt`: required when a hero image exists
- `reviewGraphics`: ordered array with up to three items during migration
  - `image`: required
  - `alt`: required; for text-heavy graphics, provide a concise but complete transcript (up to 320 characters during migration)
  - optional `quote`: source text retained for accessible captions or a future presentation
- Drag-and-drop array order determines visual hierarchy; the first graphic appears largest. No layout selector is exposed in the CMS.

The frontend should not ask Krystal to enter image width, height, CSS classes, or aspect-ratio choices. Dimensions come from Sanity asset metadata and the template assigns display hierarchy automatically.

## Image standard

Review graphics do not need one universal size or aspect ratio. Preserve each composition exactly as designed and let the template use its natural dimensions.

- Recommended future export: at least **1200 px wide** for text-heavy graphics, using whatever height the composition requires
- Supported migration range: width-to-height ratio between **0.5 and 1.25**, covering tall portrait through modest landscape compositions without forcing one shape
- Active Evelyn Hugo masters: `917 × 1716`, `916 × 1717`, and `916 × 1716`. Each supports its assigned Gallery Stage role at better than 2× display density, while the original `374 × 701` files remain available for rollback.
- Rendering: natural aspect ratio with `object-contain`; never automatically crop text-heavy graphics
- Validation: require adequate source dimensions and a complete text transcript instead of enforcing one ratio
- Book cover: preserve its natural cover ratio separately

If a future graphic uses a different shape, Krystal can upload it as designed. Sanity preview and the website preview should show the complete image before publication.
