import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
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
