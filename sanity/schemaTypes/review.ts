import { defineArrayMember, defineField, defineType } from "sanity";
import { isValidReviewSlug, toReviewSlug } from "../../lib/reviewSlug";

const requireAltWhenImageExists = (value: unknown, context: { parent?: unknown }) => {
  const parent = context.parent as { asset?: { _ref?: string } } | undefined;

  if (parent?.asset?._ref && (typeof value !== "string" || value.trim().length === 0)) {
    return "Add a clear description or full text transcript for this image.";
  }

  return true;
};

export const reviewType = defineType({
  name: "review",
  title: "Book Review",
  type: "document",
  groups: [
    { name: "review", title: "Review", default: true },
    { name: "artwork", title: "Artwork" },
    { name: "sharing", title: "Sharing & SEO" },
  ],
  initialValue: () => ({
    publishedOn: new Date().toISOString().slice(0, 10),
    category: "Fiction",
    coverTheme: "espresso",
    readingTimeMinutes: 6,
  }),
  orderings: [
    {
      title: "Publication date, newest first",
      name: "publishedOnDesc",
      by: [{ field: "publishedOn", direction: "desc" }],
    },
  ],
  fields: [
    defineField({
      name: "bookTitle",
      title: "Book title",
      type: "string",
      group: "review",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Book author",
      type: "string",
      group: "review",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Review headline",
      type: "string",
      group: "review",
      description: "The large headline readers see at the top of the review.",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "review",
      description: "Press Generate, then leave this unchanged after publishing.",
      options: { source: "bookTitle", maxLength: 96, slugify: toReviewSlug },
      validation: (Rule) =>
        Rule.required().custom((value) =>
          !value?.current || isValidReviewSlug(value.current)
            ? true
            : "Use only lowercase letters, numbers, and single hyphens.",
        ),
    }),
    defineField({
      name: "publishedOn",
      title: "Publication date",
      type: "date",
      group: "review",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "review",
      options: {
        list: [
          { title: "Fiction", value: "Fiction" },
          { title: "Nonfiction", value: "Nonfiction" },
          { title: "Memoir", value: "Memoir" },
          { title: "Young Adult", value: "Young Adult" },
          { title: "Children's", value: "Children's" },
          { title: "Poetry", value: "Poetry" },
          { title: "Other", value: "Other" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTimeMinutes",
      title: "Reading time (minutes)",
      type: "number",
      group: "review",
      validation: (Rule) => Rule.required().integer().min(1).max(60),
    }),
    defineField({
      name: "excerpt",
      title: "Short introduction",
      type: "text",
      rows: 4,
      group: "review",
      description: "Used on the home page, review archive, and at the top of the review.",
      validation: (Rule) => Rule.required().max(360),
    }),
    defineField({
      name: "pullQuote",
      title: "Krystal's pull quote",
      type: "text",
      rows: 3,
      group: "review",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "body",
      title: "Full review",
      type: "array",
      group: "review",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Section heading", value: "h2" },
            { title: "Quotation", value: "blockquote" },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "coverTheme",
      title: "Fallback color theme",
      type: "string",
      group: "artwork",
      description: "Used only when a review does not yet have artwork.",
      options: {
        list: [
          { title: "Espresso", value: "espresso" },
          { title: "Terracotta", value: "terracotta" },
          { title: "Bronze", value: "bronze" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Book cover",
      type: "image",
      group: "artwork",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          validation: (Rule) => Rule.custom(requireAltWhenImageExists),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value) => (value?.asset ? true : "Add a book cover when one is available.")).warning(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero artwork",
      type: "image",
      group: "artwork",
      description: "Optional wide image shown behind the review headline.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          validation: (Rule) => Rule.custom(requireAltWhenImageExists),
        }),
      ],
    }),
    defineField({
      name: "reviewGraphics",
      title: "Review graphics",
      type: "array",
      group: "artwork",
      description:
        "Upload up to three graphics and drag them into display order. The first receives the largest position.",
      of: [
        defineArrayMember({
          name: "reviewGraphic",
          title: "Review graphic",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Graphic",
              type: "image",
              options: { hotspot: false },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Description or complete text transcript",
              type: "text",
              rows: 4,
              description: "Include every meaningful word if the graphic contains text.",
              validation: (Rule) => Rule.required().min(12),
            }),
            defineField({
              name: "quote",
              title: "Short featured line",
              type: "text",
              rows: 2,
              description: "Optional. Used as a concise editorial label when needed.",
              validation: (Rule) => Rule.max(240),
            }),
          ],
          preview: {
            select: { title: "quote", subtitle: "alt", media: "image" },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Review graphic",
              subtitle,
              media,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "socialExcerpt",
      title: "Notebook / social caption",
      type: "text",
      rows: 4,
      group: "sharing",
      description: "Displayed near the end of the review and used as the default search description.",
      validation: (Rule) => Rule.required().max(360),
    }),
    defineField({
      name: "seoTitle",
      title: "Search title override",
      type: "string",
      group: "sharing",
      description: "Optional. Leave blank to use “[Book title] Review”.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Search description override",
      type: "text",
      rows: 3,
      group: "sharing",
      description: "Optional. Leave blank to use the notebook / social caption.",
      validation: (Rule) => Rule.max(180),
    }),
  ],
  preview: {
    select: {
      title: "bookTitle",
      headline: "headline",
      author: "author",
      media: "coverImage",
    },
    prepare: ({ title, headline, author, media }) => ({
      title: title || "Untitled review",
      subtitle: [author ? `by ${author}` : null, headline].filter(Boolean).join(" · "),
      media,
    }),
  },
});
