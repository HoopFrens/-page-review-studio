import { defineArrayMember, defineField, defineType } from "sanity";
import { isValidReviewSlug, toReviewSlug } from "../../lib/reviewSlug";

export const essayType = defineType({
  name: "essay",
  title: "Essay",
  type: "document",
  initialValue: () => ({ publishedOn: new Date().toISOString().slice(0, 10) }),
  fields: [
    defineField({ name: "title", title: "Essay title", type: "string", validation: rule => rule.required() }),
    defineField({
      name: "categoryLabel", title: "Category label", type: "string",
      description: "Optional. Appears above the title on the Essays page.",
    }),
    defineField({
      name: "listingThumbnail", title: "Listing thumbnail", type: "image",
      description: "Optional. Choose the artwork to show beside this essay on the Essays page.",
    }),
    defineField({
      name: "slug", title: "Web address", type: "slug",
      description: "Generate the address from the title. Keep it the same after publishing so shared links continue to work.",
      options: { source: "title", slugify: toReviewSlug, maxLength: 96 },
      validation: rule => rule.required().custom(value =>
        !value?.current || isValidReviewSlug(value.current) || "Use lowercase letters, numbers, and single hyphens."
      ),
    }),
    defineField({
      name: "review", title: "Original book review", type: "reference", to: [{ type: "review" }],
      options: { disableNew: true, filter: "defined(slug.current)" },
      description: "Choose the review this essay explores. The website links the essay and review to each other.",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "excerpt", title: "Short introduction", type: "text", rows: 3,
      description: "Shown on the Essays page and when someone shares the essay.",
      validation: rule => rule.required(),
    }),
    defineField({ name: "publishedOn", title: "Publication date", type: "date", validation: rule => rule.required() }),
    defineField({
      name: "body", title: "Essay text", type: "array", validation: rule => rule.required().min(1),
      of: [defineArrayMember({
        type: "block",
        styles: [{ title: "Paragraph", value: "normal" }, { title: "Section heading", value: "h2" }, { title: "Quotation", value: "blockquote" }],
        lists: [],
        marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }] },
      })],
    }),
    defineField({
      name: "companion", title: "Companion essay", type: "reference", to: [{ type: "essay" }], weak: true,
      options: {
        disableNew: true,
        filter: ({ document }) => ({
          filter: "defined(slug.current) && !(_id in $exclude)",
          params: { exclude: [document._id, document._id.replace(/^drafts\./, "")] },
        }),
      },
    }),
    defineField({
      name: "companionIntro", title: "Companion link introduction", type: "string",
      description: "Optional wording between “Continue the conversation:” and the linked essay title.",
      hidden: ({ document }) => !document?.companion,
    }),
  ],
  preview: { select: { title: "title", subtitle: "review.bookTitle" } },
});
