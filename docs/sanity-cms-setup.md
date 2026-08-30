# Page Review Studio CMS setup

The website includes an embedded, Sanity-authenticated dashboard at `/studio`. When `REVIEWS_SOURCE=sanity`, published reviews come from the active Sanity project while drafts remain private to Studio preview.

## Editorial workflow

Krystal's normal workflow is:

1. Open `https://www.pagereviewstudio.com/studio` and sign in with her own invited Sanity account.
2. Choose **Book Reviews**, then **New Book Review**.
3. Enter the review, book details, excerpts, and artwork. Under **Review tags**, type a short theme and press Enter after each one. Add 3–6 tags and drag them into the order readers should see.
4. Add up to three **Screening Room scenes**. For each scene, upload the graphic, provide its complete text transcript, and write a short scene heading and one-sentence scene note.
5. Drag the scenes into reading order. The website distributes and alternates them automatically.
6. Open **Presentation** to preview the unpublished review at desktop or phone width.
7. Press **Publish**. A signed webhook refreshes the home page, archive, and review URL.

Krystal never needs GitHub, Vercel, local files, or code access.

## Provision the Sanity project

Use a public `production` dataset. Public website requests can then read published reviews without an API token; drafts remain protected.

```bash
npx sanity projects create "Page Review Studio" --dataset production --dataset-visibility public
```

Add the returned project ID to `.env.local` and Vercel. Never commit `.env.local`.

```dotenv
REVIEWS_SOURCE=local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_READ_TOKEN=viewer-token
SANITY_REVALIDATE_SECRET=independent-random-secret
```

In Vercel, use the production URLs for `NEXT_PUBLIC_SANITY_STUDIO_URL` and `NEXT_PUBLIC_SITE_URL`.

## Access and API settings

In `sanity.io/manage`:

- Invite Antwone and Krystal as separate members. Krystal needs the least-privileged role that includes **Publish**; on plans that provide it, use **Editor**, not Administrator.
- Create a Viewer token for `SANITY_API_READ_TOKEN`. Do not create a browser-public token or a general read/write token.
- Add these exact CORS origins with credentials enabled:
  - `http://localhost:3000`
  - `https://pagereviewstudio.com`
  - `https://www.pagereviewstudio.com`
- Create a webhook to `https://www.pagereviewstudio.com/api/revalidate`.
  - Trigger on create, update, and delete.
  - Filter: `_type == "review"`
  - Projection: `{_type, "slug": slug.current}`
  - Use the same secret stored in `SANITY_REVALIDATE_SECRET`.

## Validate and migrate

Before changing production:

```bash
npm run sanity:validate
npm run sanity:migrate:dry
npm run sanity:migrate
```

The migration is a guarded, one-time import. It uses stable review document IDs, reuses uploaded assets by filename, and imports only the five active Evelyn Hugo images. Its dry run checks the seed data, local asset files, authenticated dataset access, and target-ID collisions. Once a target review or draft exists, the normal migration command refuses to overwrite it so later Studio edits remain safe. The unused rollback graphics stay in Git and are not added to the CMS.

Compare every migrated review in Presentation. Check titles, dates, text, metadata, tags, image transcripts, scene headings and notes, scene order, and both desktop and phone layouts.

## Cut over and roll back

After preview verification, set `REVIEWS_SOURCE=sanity` in Vercel Preview first. Preview deployments are for published-content parity; use local `/studio` or the production embedded Studio for authenticated Presentation previews. Draft Mode always reads Sanity even while ordinary production visitors still receive the local fallback. Once the editorial workflow passes, set `REVIEWS_SOURCE=sanity` in Production and redeploy.

Rollback is one environment-variable change: set `REVIEWS_SOURCE=local` and redeploy. The original four reviews remain in the repository until the CMS has completed a full stable release cycle.
