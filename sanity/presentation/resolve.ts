import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    essay: defineLocations({
      select: { title: "title", slug: "slug.current", reviewSlug: "review.slug.current", bookTitle: "review.bookTitle" },
      resolve: doc => ({
        locations: [
          ...(doc?.slug ? [{ title: doc.title || "Essay", href: `/essays/${doc.slug}` }] : []),
          ...(doc?.reviewSlug ? [{ title: doc.bookTitle || "Original review", href: `/reviews/${doc.reviewSlug}` }] : []),
          { title: "All essays", href: "/essays" },
        ],
      }),
    }),
    review: defineLocations({
      select: {
        bookTitle: "bookTitle",
        slug: "slug.current",
      },
      resolve: (document) => ({
        locations: [
          ...(document?.slug
            ? [
                {
                  title: document.bookTitle || "Review",
                  href: `/reviews/${document.slug}`,
                },
              ]
            : []),
          { title: "All reviews", href: "/reviews" },
          { title: "Home page", href: "/" },
        ],
      }),
    }),
  },
};
