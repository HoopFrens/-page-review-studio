export const sanityApiVersion = "2026-08-01";

const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const configuredDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const isSanityConfigured = Boolean(configuredProjectId && configuredDataset);

// The placeholder keeps local builds healthy before the Sanity project is connected.
// No content request is made unless REVIEWS_SOURCE=sanity and real values are present.
export const sanityProjectId = configuredProjectId || "project-not-connected";
export const sanityDataset = configuredDataset || "production";

export const sanityStudioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() ||
  (process.env.NODE_ENV === "production"
    ? "https://www.pagereviewstudio.com/studio"
    : "http://localhost:3000/studio");

export const sanityPreviewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.NODE_ENV === "production"
    ? "https://www.pagereviewstudio.com"
    : "http://localhost:3000");
