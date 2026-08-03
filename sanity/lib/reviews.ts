import {
  createImageUrlBuilder,
  type SanityImageCrop,
  type SanityImageHotspot,
  type SanityImageSource,
} from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/react";
import { stegaClean } from "next-sanity";
import type { ReviewPost } from "@/lib/reviews";
import { sanityClient } from "./client";

type ImageDimensions = {
  width: number;
  height: number;
  aspectRatio?: number;
};

type SanityImageValue = {
  asset?: { _ref?: string };
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
  dimensions?: ImageDimensions;
};

type SanityReviewGraphic = {
  _key: string;
  alt?: string;
  quote?: string;
  sceneTitle?: string;
  sceneNote?: string;
  image?: SanityImageValue;
};

export type SanityReviewDocument = {
  _id: string;
  slug?: string;
  headline?: string;
  bookTitle?: string;
  author?: string;
  publishedOn?: string;
  category?: string;
  excerpt?: string;
  socialExcerpt?: string;
  pullQuote?: string;
  coverTheme?: "espresso" | "terracotta" | "bronze";
  readingTimeMinutes?: number;
  coverImage?: SanityImageValue;
  heroImage?: SanityImageValue;
  reviewGraphics?: SanityReviewGraphic[];
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

const imageBuilder = createImageUrlBuilder(sanityClient);

const coverToneClasses = {
  espresso: "bg-espresso",
  terracotta: "bg-terracotta",
  bronze: "bg-bronze",
} as const;

function hasImage(image?: SanityImageValue): image is SanityImageValue & {
  asset: { _ref: string };
} {
  return Boolean(image?.asset?._ref);
}

function buildImageUrl(
  image: SanityImageValue,
  options: { width: number; height?: number; quality?: number },
) {
  let builder = imageBuilder
    .image(image as SanityImageSource)
    .width(options.width)
    .quality(options.quality ?? 90)
    .auto("format");

  if (options.height) {
    builder = builder.height(options.height).fit("crop");
  }

  return builder.url();
}

export function normalizeSanityReview(document: SanityReviewDocument): ReviewPost | undefined {
  const slug = stegaClean(document.slug || "").trim();
  const bookTitle = document.bookTitle?.trim();
  const author = document.author?.trim();
  const headline = document.headline?.trim();
  const publishedOn = stegaClean(document.publishedOn || "").trim();

  if (!slug || !bookTitle || !author || !headline || !publishedOn) {
    return undefined;
  }

  const cleanTheme = stegaClean(document.coverTheme || "espresso");
  const coverTheme =
    cleanTheme === "terracotta" || cleanTheme === "bronze" ? cleanTheme : "espresso";
  const cover = hasImage(document.coverImage) ? document.coverImage : undefined;
  const hero = hasImage(document.heroImage) ? document.heroImage : undefined;

  const gallery = (document.reviewGraphics || [])
    .flatMap((graphic) => {
      if (!hasImage(graphic.image) || !graphic.alt?.trim()) return [];

      const dimensions = graphic.image.dimensions;
      const width = Math.max(1, Math.round(dimensions?.width || 1200));
      const height = Math.max(1, Math.round(dimensions?.height || 1500));

      return [
        {
          _key: graphic._key,
          src: buildImageUrl(graphic.image, { width: Math.min(width, 1200), quality: 92 }),
          alt: graphic.alt,
          width,
          height,
          quote: graphic.quote,
          sceneTitle: graphic.sceneTitle,
          sceneNote: graphic.sceneNote,
        },
      ];
    })
    .slice(0, 3);

  return {
    _id: document._id,
    slug,
    title: headline,
    bookTitle,
    author,
    date: publishedOn,
    category: document.category || "Other",
    excerpt: document.excerpt || "",
    socialExcerpt: document.socialExcerpt || "",
    pullQuote: document.pullQuote || "",
    coverTone: coverToneClasses[coverTheme],
    readingTime: `${Math.max(1, Math.round(document.readingTimeMinutes || 1))} min read`,
    coverImage: cover ? buildImageUrl(cover, { width: 1000, quality: 94 }) : undefined,
    coverAlt: cover?.alt,
    coverAspect: cover?.dimensions?.aspectRatio,
    heroImage: hero
      ? buildImageUrl(hero, { width: 2400, height: 1600, quality: 92 })
      : undefined,
    heroAlt: hero?.alt,
    heroAspect: hero ? 3 / 2 : undefined,
    gallery: gallery.length ? gallery : undefined,
    body: document.body || [],
    seoTitle: document.seoTitle,
    seoDescription: document.seoDescription,
  };
}
