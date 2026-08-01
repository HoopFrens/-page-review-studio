import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import { isValidReviewSlug } from "../lib/reviewSlug";
import { reviewPosts, type ReviewPost } from "../lib/reviews";
import { sanityApiVersion } from "../sanity/env";

type AssetReference = {
  _type: "reference";
  _ref: string;
};

type ImageSeed = {
  path: string;
  alt: string;
};

const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const client = getCliClient({ apiVersion: sanityApiVersion });
const projectRoot = process.cwd();

const imageSeeds: Record<
  string,
  {
    cover?: ImageSeed;
    hero?: ImageSeed;
    gallery?: ImageSeed[];
  }
> = {
  "the-seven-husbands-of-evelyn-hugo-review": {
    cover: {
      path: "public/images/reviews/evelyn-hugo/cover.jpg",
      alt: "The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid book cover",
    },
    hero: {
      path: "public/images/reviews/evelyn-hugo/hero-rings-focused.jpg",
      alt: "Gold wedding rings resting on deep green velvet",
    },
    gallery: [
      {
        path: "public/images/reviews/evelyn-hugo/post-2-emerald-hd.png",
        alt: reviewPosts[0].gallery?.[0]?.alt || "Review quote graphic",
      },
      {
        path: "public/images/reviews/evelyn-hugo/post-1-emerald-hd.png",
        alt: reviewPosts[0].gallery?.[1]?.alt || "Review quote graphic",
      },
      {
        path: "public/images/reviews/evelyn-hugo/post-5.png",
        alt: reviewPosts[0].gallery?.[2]?.alt || "Review quote graphic",
      },
    ],
  },
};

function coverTheme(post: ReviewPost) {
  if (post.coverTone === "bg-terracotta") return "terracotta";
  if (post.coverTone === "bg-bronze") return "bronze";
  return "espresso";
}

function readingTimeMinutes(post: ReviewPost) {
  const minutes = Number.parseInt(post.readingTime, 10);
  return Number.isFinite(minutes) && minutes > 0 ? minutes : 1;
}

async function uploadImage(seed: ImageSeed): Promise<AssetReference | undefined> {
  const absolutePath = resolve(projectRoot, seed.path);
  const filename = basename(absolutePath);
  const existingId = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  );

  if (existingId) {
    return { _type: "reference", _ref: existingId };
  }

  const asset = await client.assets.upload("image", createReadStream(absolutePath), {
    filename,
  });

  return { _type: "reference", _ref: asset._id };
}

function reviewDocumentId(post: ReviewPost) {
  return `review-${post.slug}`;
}

function allImageSeeds() {
  return Object.values(imageSeeds).flatMap(({ cover, hero, gallery }) => [
    ...(cover ? [cover] : []),
    ...(hero ? [hero] : []),
    ...(gallery || []),
  ]);
}

async function preflight() {
  for (const post of reviewPosts) {
    if (!isValidReviewSlug(post.slug)) {
      throw new Error(`Invalid review slug in migration seed: ${post.slug}`);
    }

    if (!post.bookTitle.trim() || !post.author.trim() || !post.title.trim() || !post.body.length) {
      throw new Error(`Incomplete migration seed: ${post.slug}`);
    }
  }

  await Promise.all(allImageSeeds().map((seed) => access(resolve(projectRoot, seed.path))));

  const ids = reviewPosts.map(reviewDocumentId);
  const draftIds = ids.map((id) => `drafts.${id}`);
  const existingIds = await client.fetch<string[]>(
    `*[_id in $ids || _id in $draftIds]._id`,
    { ids, draftIds },
  );

  if (existingIds.length && !dryRun && !force) {
    throw new Error(
      `Migration stopped because ${existingIds.length} target document(s) already exist. ` +
        "This protects Studio edits. Use --force only for an intentional reset.",
    );
  }

  return existingIds;
}

async function buildReviewDocument(post: ReviewPost) {
  const seeds = imageSeeds[post.slug];
  const coverAsset = seeds?.cover ? await uploadImage(seeds.cover) : undefined;
  const heroAsset = seeds?.hero ? await uploadImage(seeds.hero) : undefined;
  const galleryAssets = seeds?.gallery
    ? await Promise.all(seeds.gallery.map((seed) => uploadImage(seed)))
    : [];

  return {
    _id: reviewDocumentId(post),
    _type: "review",
    bookTitle: post.bookTitle,
    author: post.author,
    headline: post.title,
    slug: { _type: "slug", current: post.slug },
    publishedOn: post.date,
    category: post.category,
    readingTimeMinutes: readingTimeMinutes(post),
    excerpt: post.excerpt,
    pullQuote: post.pullQuote,
    body: post.body,
    coverTheme: coverTheme(post),
    socialExcerpt: post.socialExcerpt,
    ...(coverAsset && seeds?.cover
      ? {
          coverImage: {
            _type: "image",
            asset: coverAsset,
            alt: seeds.cover.alt,
          },
        }
      : {}),
    ...(heroAsset && seeds?.hero
      ? {
          heroImage: {
            _type: "image",
            asset: heroAsset,
            alt: seeds.hero.alt,
          },
        }
      : {}),
    ...(post.gallery?.length && seeds?.gallery
      ? {
          reviewGraphics: post.gallery.flatMap((graphic, index) => {
            const asset = galleryAssets[index];
            if (!asset) return [];

            return [
              {
                _type: "reviewGraphic",
                _key: graphic._key || `graphic-${index + 1}`,
                image: { _type: "image", asset },
                alt: seeds.gallery?.[index]?.alt || graphic.alt,
                ...(graphic.quote ? { quote: graphic.quote } : {}),
              },
            ];
          }),
        }
      : {}),
  };
}

async function migrate() {
  const config = client.config();

  if (!config.projectId || config.projectId === "project-not-connected") {
    throw new Error("Connect the Sanity project before running the migration.");
  }

  console.log(
    `${dryRun ? "Checking" : "Migrating"} ${reviewPosts.length} reviews in dataset ${config.dataset}.`,
  );

  const existingIds = await preflight();

  if (dryRun) {
    for (const post of reviewPosts) {
      console.log(`Validated seed: ${post.bookTitle} (${post.slug})`);
    }
    console.log(
      existingIds.length
        ? `Dry run complete; ${existingIds.length} target document(s) already exist and no content changed.`
        : "Dry run complete; all files and target IDs are ready and no content changed.",
    );
    return;
  }

  for (const post of reviewPosts) {
    const document = await buildReviewDocument(post);
    if (force) {
      await client.createOrReplace(document);
    } else {
      await client.createIfNotExists(document);
    }
    console.log(`Migrated: ${post.bookTitle}`);
  }

  console.log("Migration complete.");
}

migrate().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown migration error";
  console.error(`Migration failed: ${message}`);
  process.exitCode = 1;
});
