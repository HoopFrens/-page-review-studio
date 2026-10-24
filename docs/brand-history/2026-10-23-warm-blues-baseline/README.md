# Warm Blues website baseline — October 23, 2026

This is a branding snapshot of commit `c40b6d91f2c6fe68a017717d87b9f2ae44919370`, preserved before the official six-color rebrand. It is website-only; it does not change Studio Snapshots or correspondence branding.

`palette.json` records the prior colors and SHA-256 hashes. `source/` contains the original PNG and the relevant styling, logo rendering, and theme-label source files copied directly from that commit. Archived `.ts`, `.tsx`, and `.css` snapshots have a `.txt` suffix so the website build does not compile them. `palette.json` maps each original source `path` to its `archivePath`; content hashes remain unchanged. Files are evidence for comparison, not an instruction to replace current files wholesale.

| Previous role | HEX |
|---|---|
| Buttons / links | `#4563A0` |
| Accent borders | `#85A0D3` |
| Headings / dark sections | `#414758` |
| Light text / sky | `#B4DDF6` |
| Main surface | `#F6F8FC` |
| Alternate surface | `#EAF0F9` |
| Secondary text | `#596579` |
| Logo blue | `#5979BC` |
| Steel | `#8494AD` |

## Narrow rollback

1. Start a branch from the latest website code. Preserve any later content, functionality, and unrelated design changes.
2. Restore the archived PNG to `public/brand/page-review-studio-logo.png` and restore only its matching geometry in `lib/brand.ts`.
3. Restore the recorded color values in the current shared CSS variables and Tailwind mappings. Compare the archived files to restore only rebrand-specific component color classes, icon/social backgrounds, and lead-email color. Keep current code structure and content.
4. Preserve saved Sanity theme values (`espresso`, `terracotta`, `bronze`); only adjust their display labels if needed.
5. Build and verify the header, footer, mobile layout, reviews, forms, focus states, icon, and social preview. Publish the resulting branding-only change and verify the production deployment.

Do not reset the repository to the baseline commit or overwrite complete components from `source/`: either could remove later content or fixes. The older warm brown/gold treatment remains separately preserved in `../2026-10-21-warm-baseline/`.
