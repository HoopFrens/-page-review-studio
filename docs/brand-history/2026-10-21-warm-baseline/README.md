# Website warm-palette baseline

Preserved on October 21, 2026 at the user's request before changing the website to the supplied Warm Blues logo and palette. This folder is a historical backup, not the active website branding.

- Baseline Git commit: `095556ea9fcd9c006049b7730ac1a27b7dbc344c`
- Previous production deployment: `dpl_2k5L9vkrqiWzeSSVRLp83NnuKNEg`
- Original website logo: `public/brand/page-review-studio-logo.png`
- Archived logo: [`page-review-studio-logo.png`](page-review-studio-logo.png)
- Logo SHA-256: `f2a4799884d3bd9507af53020dd061b21b35a2fd3f7a8f29f7df97a26c87c7c0`
- Machine-readable colors and logo geometry: [`palette.json`](palette.json)

The archived PNG was extracted directly from the baseline Git object and its SHA-256 was verified. It retains its original artwork, transparency, colors, and dimensions.

| Existing website color | Hex |
| --- | --- |
| Blue | `#105E8D` |
| Gold | `#C8872A` |
| Dark brown | `#37190F` |
| Tan | `#DDB795` |
| Cream | `#FCE9DF` |
| Linen | `#F4DDCD` |
| White | `#FFFFFF` |

## Restoring this branding

Restore branding only. Do not reset the entire repository to this commit, because that would discard unrelated changes made after this baseline.

For a straightforward rollback, revert the isolated Warm Blues branding pull request, review the resulting diff, then build, preview, and deploy it through the normal website release process. If later work touches the same files, resolve conflicts while retaining that later work.

For a selective restoration, use this commit as the source for the old palette in `tailwind.config.ts` and `app/globals.css`, the logo asset, the logo viewport in `lib/brand.ts`, and relevant logo presentation in `components/Logo.tsx`, navigation, footer, and icon/social-image routes. Apply only the branding differences needed. The original logo's viewport is recorded in `palette.json`; using the old PNG with the new logo's geometry would crop or size it incorrectly.

Review all color and logo presentation changes introduced by the Warm Blues branding PR, including component-level contrast adjustments. Copying the palette values alone may not fully restore the previous appearance. Preserve subsequent content, service, form, and functionality changes. Verify desktop/mobile layouts and social/icon images before publishing any restoration.
