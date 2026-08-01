import { reviewPosts as localReviewPosts, type ReviewPost } from "./reviews";
import { draftMode } from "next/headers";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";
import {
  reviewBySlugQuery,
  reviewSlugsQuery,
  reviewsQuery,
} from "@/sanity/lib/queries";
import {
  normalizeSanityReview,
  type SanityReviewDocument,
} from "@/sanity/lib/reviews";

type FetchOptions = {
  stega?: boolean;
};

export type ReviewsSource = "local" | "sanity";

export function getReviewsSource(): ReviewsSource {
  const source = (process.env.REVIEWS_SOURCE || "local").trim().toLowerCase();

  if (source !== "local" && source !== "sanity") {
    throw new Error('REVIEWS_SOURCE must be either "local" or "sanity".');
  }

  if (source === "sanity" && !isSanityConfigured) {
    throw new Error(
      "REVIEWS_SOURCE is set to sanity, but NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET is missing.",
    );
  }

  return source;
}

async function shouldUseSanityReviews() {
  if (getReviewsSource() === "sanity") return true;
  if (!isSanityConfigured) return false;

  return (await draftMode()).isEnabled;
}

export async function getReviewPosts(options: FetchOptions = {}): Promise<ReviewPost[]> {
  if (!(await shouldUseSanityReviews())) return localReviewPosts;

  const { data } = await sanityFetch({
    query: reviewsQuery,
    tags: ["review"],
    stega: options.stega,
  });

  return ((data || []) as unknown as SanityReviewDocument[])
    .map(normalizeSanityReview)
    .filter((post): post is ReviewPost => Boolean(post));
}

export async function getReviewPost(
  slug: string,
  options: FetchOptions = {},
): Promise<ReviewPost | undefined> {
  if (!(await shouldUseSanityReviews())) {
    return localReviewPosts.find((post) => post.slug === slug);
  }

  const { data } = await sanityFetch({
    query: reviewBySlugQuery,
    params: { slug },
    tags: ["review", `review:${slug}`],
    stega: options.stega,
  });

  if (!data) return undefined;

  return normalizeSanityReview(data as unknown as SanityReviewDocument);
}

export async function getReviewSlugs(): Promise<string[]> {
  if (getReviewsSource() === "local") {
    return localReviewPosts.map((post) => post.slug);
  }

  const { data } = await sanityFetch({
    query: reviewSlugsQuery,
    perspective: "published",
    stega: false,
    tags: ["review"],
  });

  return ((data || []) as unknown as { slug?: string }[])
    .map(({ slug }) => stegaCleanSlug(slug))
    .filter((slug): slug is string => Boolean(slug));
}

function stegaCleanSlug(slug?: string) {
  if (!slug) return undefined;

  // Static parameters are fetched with stega disabled, but trimming here keeps
  // route generation defensive if the query behavior changes later.
  const clean = slug.trim();
  return clean || undefined;
}
