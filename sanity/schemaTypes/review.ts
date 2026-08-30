import { defineArrayMember, defineField, defineType, type ValidationContext } from "sanity";
import { isValidReviewSlug, toReviewSlug } from "../../lib/reviewSlug";

const requireAltWhenImageExists = (value: unknown, context: { parent?: unknown }) => {
  const parent = context.parent as { asset?: { _ref?: string } } | undefined;

  if (parent?.asset?._ref && (typeof value !== "string" || value.trim().length === 0)) {
    return "Add a clear description or full text transcript for this image.";
  }

  return true;
};

type ReviewBodyBlock = {
  _type?: string;
  style?: string;
};

const validateReviewBody = (
  value: unknown,
  context: ValidationContext,
) => {
  if (!Array.isArray(value)) {
    return true;
  }

  const blocks = value.filter(
    (item): item is ReviewBodyBlock =>
      typeof item === "object" && item !== null && (item as ReviewBodyBlock)._type === "block",
  );
  const proseBlocks = blocks.filter((block) => block.style !== "h2");
  const reviewGraphics = (context.document as { reviewGraphics?: unknown[] } | undefined)
    ?.reviewGraphics;
  const sceneCount = Array.isArray(reviewGraphics)
    ? reviewGraphics.length
    : 0;

  if (sceneCount > 0 && proseBlocks.length < sceneCount + 1) {
    return `Add at least ${sceneCount + 1} review passages so every visual scene has prose before and after it.`;
  }

  if (blocks.at(-1)?.style === "h2") {
    return "Add review text after the final section heading.";
  }

  if (blocks.some((block, index) => block.style === "h2" && blocks[index + 1]?.style === "h2")) {
    return "Add review text between consecutive section headings.";
  }

  return true;
};

const validateReviewTags = (value: unknown) => {
  if (!Array.isArray(value)) {
    return true;
  }

  const tags = value.filter((tag): tag is string => typeof tag === "string");

  if (tags.length !== value.length || tags.some((tag) => tag.trim().length === 0)) {
    return "Remove any empty tags.";
  }

  const normalizedTags = tags.map((tag) => tag.trim().toLocaleLowerCase());

  if (new Set(normalizedTags).size !== normalizedTags.length) {
    return "Remove duplicate tags, including tags that differ only by capitalization.";
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
      name: "tags",
      title: "Review tags",
      type: "array",
      group: "review",
      description:
        "Add 3–6 short themes or reading qualities. Press Enter after each tag, then drag to reorder.",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required().min(2).max(32),
        }),
      ],
      options: { layout: "tags" },
      validation: (Rule) => Rule.max(8).unique().custom(validateReviewTags),
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
      validation: (Rule) => Rule.required().min(1).custom(validateReviewBody),
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
      title: "Screening Room scenes",
      type: "array",
      group: "artwork",
      description:
        "Add up to three visual scenes and drag them into reading order. The website places and alternates them automatically.",
      of: [
        defineArrayMember({
          name: "reviewGraphic",
          title: "Review graphic",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Scene graphic",
              type: "image",
              options: { hotspot: false },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sceneTitle",
              title: "Scene heading",
              type: "string",
              description: "A short editorial heading shown beside the graphic.",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "sceneNote",
              title: "Scene note",
              type: "text",
              rows: 2,
              description: "One sentence connecting this visual to the surrounding review.",
              validation: (Rule) => Rule.required().max(180),
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
              description: "Retained for older reviews.",
              hidden: true,
              validation: (Rule) => Rule.max(240),
            }),
          ],
          preview: {
            select: { title: "sceneTitle", subtitle: "sceneNote", media: "image" },
            prepare: ({ title, subtitle, media }) => ({
              title: title || "Untitled scene",
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
