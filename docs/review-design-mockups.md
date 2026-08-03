# Review page design

**Screening Room — Director's Cut was approved as the fixed production review template on August 2, 2026.** It replaces the Gallery Stage trial.

## Production composition

- The hero remains the primary visual moment: a translucent editorial photograph over deep emerald, a fine gold inset frame, and a fully opaque headline and introduction.
- The book cover sits beside the opening review text. Paragraphs wrap beside the cover on desktop, then return to the full reading width below it. The cover stacks above the review on phones.
- Each uploaded review graphic becomes its own cinematic visual interlude between prose sections.
- Interludes alternate composition automatically and preserve each graphic's natural proportions.
- The frontend distributes one to three scenes evenly through the review. Krystal does not choose paragraph indexes, image dimensions, CSS classes, or layouts.
- Reviews without scene graphics keep the same hero and cover-led reading treatment without empty interludes.

## Sanity content contract

Krystal manages content, while the website owns presentation.

- `coverImage`: book cover, displayed uncropped with `object-contain`
- `heroImage`: optional wide editorial photograph with hotspot support
- `reviewGraphics`: ordered array of up to three Screening Room scenes
  - `image`: required scene graphic
  - `sceneTitle`: required short editorial heading, up to 80 characters
  - `sceneNote`: required one-sentence connection to the surrounding review, up to 180 characters
  - `alt`: required complete description or transcript for text-heavy artwork
- Drag order determines scene order. No layout selector is exposed in Studio.

The full graphic transcript is available to assistive technology without visually repeating the graphic's baked-in quotation.

## Image standard

Review graphics do not need one universal size or aspect ratio. The template preserves each composition and assigns a consistent maximum display width.

- Recommended export: at least 1200 px wide for text-heavy graphics
- Rendering: natural aspect ratio with `object-contain`; never crop text-heavy artwork
- Sanity delivery: automatic modern format with a 1200 px source ceiling for scene graphics
- Book covers retain their own natural aspect ratio
- Hero photographs use Sanity hotspot data and a responsive full-width crop

Krystal should always check Presentation at desktop and phone width before publishing.
