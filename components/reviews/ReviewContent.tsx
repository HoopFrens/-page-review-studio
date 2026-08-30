import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import type { ReviewPost } from "@/lib/reviews";

type ReviewGraphic = NonNullable<ReviewPost["gallery"]>[number];

type ReviewContentProps = {
  post: ReviewPost;
};

function BodyParagraph({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return (
    <p
      className={`${
        lead
          ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[.8] first-letter:text-terracotta"
          : ""
      } mb-7 text-lg leading-[1.9] text-espresso/75`}
    >
      {children}
    </p>
  );
}

function ReviewBody({ blocks, leadFirst = false }: { blocks: PortableTextBlock[]; leadFirst?: boolean }) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children, index }) => (
        <BodyParagraph lead={leadFirst && index === 0}>{children}</BodyParagraph>
      ),
      h2: ({ children }) => (
        <h2 className="mb-6 mt-12 font-serif text-4xl leading-tight text-espresso">{children}</h2>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-10 border-l-2 border-terracotta pl-6 font-serif text-3xl leading-10 text-espresso">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        const href = typeof value?.href === "string" ? value.href : "#";
        const external = /^https?:\/\//.test(href);

        return (
          <a
            href={href}
            className="text-terracotta underline decoration-terracotta/35 underline-offset-4 transition-colors hover:text-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
    },
  };

  return <PortableText value={blocks} components={components} />;
}

function SocialCaption({ children }: { children: string }) {
  return (
    <aside className="review-notebook-note" aria-labelledby="review-social-caption-heading">
      <h2 id="review-social-caption-heading" className="eyebrow text-[#7a3f2f]">
        From Krystal&apos;s notebook
      </h2>
      <p className="mt-4 font-serif text-3xl leading-10 text-espresso">{children}</p>
    </aside>
  );
}

function ReviewTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null;

  return (
    <section className="review-tag-index" aria-labelledby="review-tags-heading">
      <div className="review-tag-index-inner">
        <div className="review-tag-index-heading">
          <p className="eyebrow">Review index</p>
          <h2 id="review-tags-heading">Themes &amp; threads</h2>
        </div>
        <ul className="review-tag-list">
          {tags.map((tag) => (
            <li key={tag} className="review-tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FloatingBookCover({ post }: { post: ReviewPost }) {
  return (
    <aside className="review-floating-cover" aria-labelledby="review-book-details-heading">
      {post.coverImage ? (
        <div className="review-floating-cover-frame">
          <div
            className="relative overflow-hidden bg-espresso"
            style={{ aspectRatio: post.coverAspect ?? 2 / 3 }}
          >
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? `${post.bookTitle} book cover`}
              fill
              sizes="(max-width: 699px) 190px, (max-width: 900px) 220px, 240px"
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <div className={`review-floating-cover-fallback ${post.coverTone}`} aria-hidden="true">
          <p className="eyebrow text-ivory/70">{post.category}</p>
          <div>
            <p className="font-serif text-4xl leading-none text-ivory">{post.bookTitle}</p>
            <p className="mt-4 text-xs text-ivory/70">by {post.author}</p>
          </div>
          <p className="font-serif text-xl leading-7 text-ivory/90">“{post.pullQuote}”</p>
        </div>
      )}
      <div className="mt-6">
        <h2 id="review-book-details-heading" className="eyebrow text-[#765a35]">
          Book details
        </h2>
        <p className="mt-2 font-serif text-2xl leading-7 text-espresso">{post.bookTitle}</p>
        <p className="mt-2 text-xs text-espresso/70">by {post.author}</p>
      </div>
    </aside>
  );
}

function isSectionHeading(block: PortableTextBlock | undefined) {
  return block?._type === "block" && (block as PortableTextBlock & { style?: string }).style === "h2";
}

export function partitionReviewBody(blocks: PortableTextBlock[], sceneCount: number) {
  const groupCount = Math.max(1, sceneCount + 1);
  const editorialUnits: PortableTextBlock[][] = [];
  let pendingBlocks: PortableTextBlock[] = [];

  for (const block of blocks) {
    pendingBlocks.push(block);

    if (!isSectionHeading(block)) {
      editorialUnits.push(pendingBlocks);
      pendingBlocks = [];
    }
  }

  if (pendingBlocks.length > 0) {
    if (editorialUnits.length > 0) {
      editorialUnits[editorialUnits.length - 1].push(...pendingBlocks);
    } else {
      editorialUnits.push(pendingBlocks);
    }
  }

  const sections: PortableTextBlock[][] = [];
  let unitCursor = 0;

  for (let index = 0; index < groupCount; index += 1) {
    const remainingUnits = editorialUnits.length - unitCursor;
    const remainingGroups = groupCount - index;
    const sectionUnitCount =
      index === groupCount - 1 ? remainingUnits : Math.ceil(remainingUnits / remainingGroups);

    sections.push(editorialUnits.slice(unitCursor, unitCursor + sectionUnitCount).flat());
    unitCursor += sectionUnitCount;
  }

  return sections;
}

function ScreeningScene({ graphic, index }: { graphic: ReviewGraphic; index: number }) {
  const sceneNumber = String(index + 1).padStart(2, "0");
  const headingId = `review-scene-${sceneNumber}-heading`;
  const sceneTitle = graphic.sceneTitle?.trim() || graphic.quote?.trim() || "A passage that stayed with me";
  const sceneNote = graphic.sceneNote?.trim();
  const reverse = index % 2 === 1;

  return (
    <section
      className={`review-screening-scene${reverse ? " review-screening-scene--reverse" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="review-screening-scene-inner">
        <div className="review-screening-scene-copy">
          <div className="review-screening-scene-label">
            <p className="eyebrow">Visual interlude · Scene {sceneNumber}</p>
            <span aria-hidden="true" />
          </div>
          <h2 id={headingId}>{sceneTitle}</h2>
          {sceneNote ? <p>{sceneNote}</p> : null}
        </div>

        <figure className="review-screening-scene-image">
          <Image
            src={graphic.src}
            alt=""
            width={graphic.width}
            height={graphic.height}
            sizes="(max-width: 390px) 62vw, (max-width: 700px) 240px, (max-width: 900px) 230px, 310px"
            className="block h-auto w-full object-contain"
          />
          <figcaption className="sr-only">{graphic.alt}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function ReviewContent({ post }: ReviewContentProps) {
  const graphics = post.gallery ?? [];
  const sections = partitionReviewBody(post.body, graphics.length);

  return (
    <div className="review-screening-content">
      {sections.map((blocks, index) => {
        const isFirst = index === 0;
        const isLast = index === sections.length - 1;
        const graphic = graphics[index];
        const renderReadingSection = blocks.length > 0 || isFirst || isLast;

        return (
          <Fragment key={`review-section-${index + 1}`}>
            {renderReadingSection ? (
              <div className="review-screening-reading-shell">
                <div className={`review-screening-reading-column${isFirst ? " review-opening" : ""}`}>
                  {isFirst ? <FloatingBookCover post={post} /> : null}
                  {blocks.length ? <ReviewBody blocks={blocks} leadFirst={isFirst} /> : null}
                  {isLast ? <SocialCaption>{post.socialExcerpt}</SocialCaption> : null}
                </div>
              </div>
            ) : null}
            {graphic ? <ScreeningScene graphic={graphic} index={index} /> : null}
          </Fragment>
        );
      })}
      <ReviewTags tags={post.tags} />
    </div>
  );
}
