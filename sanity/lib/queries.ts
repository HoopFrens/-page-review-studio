import { defineQuery } from "next-sanity";

const reviewProjection = `
  _id,
  "slug": slug.current,
  headline,
  bookTitle,
  author,
  publishedOn,
  category,
  excerpt,
  socialExcerpt,
  pullQuote,
  coverTheme,
  readingTimeMinutes,
  seoTitle,
  seoDescription,
  body[]{...},
  coverImage{
    ...,
    asset,
    "dimensions": asset->metadata.dimensions
  },
  heroImage{
    ...,
    asset,
    "dimensions": asset->metadata.dimensions
  },
  reviewGraphics[]{
    _key,
    alt,
    quote,
    sceneTitle,
    sceneNote,
    image{
      ...,
      asset,
      "dimensions": asset->metadata.dimensions
    }
  }
`;

export const reviewsQuery = defineQuery(`
  *[_type == "review" && defined(slug.current)]
    | order(publishedOn desc, _createdAt desc) {
      ${reviewProjection}
    }
`);

export const reviewBySlugQuery = defineQuery(`
  *[_type == "review" && slug.current == $slug][0] {
    ${reviewProjection}
  }
`);

export const reviewSlugsQuery = defineQuery(`
  *[_type == "review" && defined(slug.current)] {
    "slug": slug.current
  }
`);
