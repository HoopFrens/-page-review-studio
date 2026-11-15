import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";
import { cache } from "react";
import { sanityClient } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { essays as localEssays } from "./essays";
import { shouldUseSanityReviews } from "./reviewRepository";

type Summary = {
  slug: string;
  title: string;
  categoryLabel?: string | null;
  excerpt: string;
  reviewSlug: string;
  bookTitle: string;
  author: string;
};

const fields = `title, categoryLabel, excerpt, "slug": slug.current, "reviewSlug": review->slug.current,
  "bookTitle": review->bookTitle, "author": review->author`;
const essaysWithReview = '_type == "essay" && defined(slug.current) && defined(review->slug.current)';
const listQuery = defineQuery(`*[${essaysWithReview} && ($reviewSlug == null || review->slug.current == $reviewSlug)]
  | order(publishedOn desc, slug.current desc){${fields}}`);
const detailQuery = defineQuery(`*[${essaysWithReview} && slug.current == $slug][0]{
  ${fields}, body, companionIntro,
  "companion": companion->{title, "slug": select(defined(review->slug.current) => slug.current)}
}`);

async function readEssays<T>(query: string, params: Record<string, string | null>): Promise<T> {
  if ((await draftMode()).isEnabled) {
    const { data } = await sanityFetch({ query, params, stega: false, tags: ["essay", "review"] });
    return data as T;
  }
  // Read published content on request, including the current review reference after reassignment.
  return sanityClient.withConfig({ useCdn: false }).fetch<T>(query, params, {
    perspective: "published", stega: false, cache: "no-store",
  });
}

const localSummaries: Summary[] = localEssays.map(({ slug, title, excerpt, categoryLabel }) => ({
  slug, title, excerpt, categoryLabel,
  reviewSlug: "jade-city", bookTitle: "Jade City", author: "Fonda Lee",
}));

export const getEssays = cache(async (reviewSlug: string | null = null): Promise<Summary[]> => {
  if (await shouldUseSanityReviews()) return readEssays<Summary[]>(listQuery, { reviewSlug });
  return localSummaries.filter(essay => !reviewSlug || essay.reviewSlug === reviewSlug);
});

export const getEssay = cache(async (slug: string) => {
  if (!(await shouldUseSanityReviews())) {
    const local = localEssays.find(essay => essay.slug === slug);
    const summary = localSummaries.find(essay => essay.slug === slug);
    return local && summary ? {
      ...summary, reviewUrl: local.reviewUrl, body: local.body, companionIntro: local.companionIntro,
      companion: localSummaries.find(essay => essay.slug === local.companionSlug),
    } : null;
  }
  const essay = await readEssays<(Summary & {
    body?: PortableTextBlock[];
    companionIntro?: string;
    companion?: { title: string; slug: string | null } | null;
  }) | null>(detailQuery, { slug });
  if (!essay) return null;
  return {
    ...essay,
    reviewUrl: `/reviews/${essay.reviewSlug}`,
    body: <PortableText value={essay.body || []} />,
  };
});
