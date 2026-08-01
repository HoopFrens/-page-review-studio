import Image from "next/image";
import type { ReviewPost } from "@/lib/reviews";

type ReviewGraphic = NonNullable<ReviewPost["gallery"]>[number];

type ReviewContentProps = {
  post: ReviewPost;
};

function BodyParagraph({ children, lead = false }: { children: string; lead?: boolean }) {
  return (
    <p
      className={`${
        lead
          ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[.8] first-letter:text-terracotta"
          : ""
      } mb-7 text-lg leading-9 text-espresso/75`}
    >
      {children}
    </p>
  );
}

function SocialCaption({ children }: { children: string }) {
  return (
    <aside className="border-y hairline py-8" aria-labelledby="review-social-caption-heading">
      <h2 id="review-social-caption-heading" className="eyebrow text-[#7a3f2f]">From Krystal&apos;s notebook</h2>
      <p className="mt-4 font-serif text-3xl leading-10 text-espresso">{children}</p>
    </aside>
  );
}

function BookAside({ post, showQuote = true }: { post: ReviewPost; showQuote?: boolean }) {
  const labelledBy = [
    post.coverImage ? "review-book-details-heading" : null,
    showQuote ? "review-book-quote-heading" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className="space-y-7 lg:self-start" aria-labelledby={labelledBy || undefined}>
      {post.coverImage ? (
        <>
          <div className="border border-bronze/40 bg-linen p-3 shadow-[12px_14px_0_rgba(176,138,87,.12)]">
            <div className={`relative ${post.coverAspect ?? "aspect-[2/3]"} overflow-hidden bg-espresso`}>
              <Image
                src={post.coverImage}
                alt={post.coverAlt ?? `${post.bookTitle} book cover`}
                fill
                sizes="(max-width: 1024px) calc(100vw - 2rem), 18rem"
                className="object-contain"
              />
            </div>
          </div>
          <div className="border-t hairline pt-6">
            <h2 id="review-book-details-heading" className="eyebrow text-[#765a35]">Book details</h2>
            <p className="mt-4 font-serif text-2xl leading-8 text-espresso">{post.bookTitle}</p>
            <p className="mt-2 text-sm text-espresso/55">by {post.author}</p>
          </div>
        </>
      ) : null}
      {showQuote ? (
        <div className="border-t hairline pt-6">
          <h2 id="review-book-quote-heading" className="eyebrow text-[#765a35]">Krystal&apos;s read</h2>
          <blockquote className="mt-4 font-serif text-2xl leading-8 text-espresso">{post.pullQuote}</blockquote>
        </div>
      ) : null}
    </aside>
  );
}

type GalleryRole = "feature" | "support" | "accent";

const galleryRoleClasses: Record<GalleryRole, string> = {
  feature:
    "w-[86vw] max-w-[22rem] xl:w-[22rem] xl:max-w-none xl:justify-self-end",
  support:
    "w-[78vw] max-w-[19.5rem] xl:w-[19.5rem] xl:max-w-none xl:justify-self-center xl:pt-16",
  accent:
    "w-[72vw] max-w-[17.5rem] xl:w-[17.5rem] xl:max-w-none xl:justify-self-start xl:pt-28",
};

const galleryRoleSizes: Record<GalleryRole, string> = {
  feature: "(max-width: 409px) 86vw, 22rem",
  support: "(max-width: 400px) 78vw, 19.5rem",
  accent: "(max-width: 389px) 72vw, 17.5rem",
};

function getGalleryRole(index: number): GalleryRole {
  if (index === 0) return "feature";
  if (index === 1) return "support";
  return "accent";
}

function GalleryCard({
  graphic,
  index,
  total,
  role,
}: {
  graphic: ReviewGraphic;
  index: number;
  total: number;
  role: GalleryRole;
}) {
  const desktopSpan =
    total === 3
      ? role === "feature"
        ? "xl:col-span-5"
        : role === "support"
          ? "xl:col-span-4"
          : "xl:col-span-3"
      : "";

  return (
    <li
      className={`shrink-0 snap-center ${galleryRoleClasses[role]} ${desktopSpan}`}
    >
      <figure>
        <div className="overflow-hidden border border-bronze/55 bg-[#061a15] shadow-[0_28px_80px_rgba(0,0,0,.3)]">
          <Image
            src={graphic.src}
            alt=""
            width={graphic.width}
            height={graphic.height}
            sizes={galleryRoleSizes[role]}
            className="block h-auto w-full object-contain"
          />
        </div>
        <figcaption className="relative mt-3 text-xs font-semibold uppercase tracking-[.16em] text-[#d4aa4d]">
          <span aria-hidden="true">{index + 1} / {total}</span>
          <span className="sr-only">Graphic {index + 1} of {total}. {graphic.alt}</span>
        </figcaption>
      </figure>
    </li>
  );
}

function GalleryStage({ graphics }: { graphics: ReviewGraphic[] }) {
  const countWords = ["No", "One", "Two", "Three"];
  const countLabel = countWords[graphics.length] ?? String(graphics.length);
  const passageLabel = graphics.length === 1 ? "passage" : "passages";
  const usesDesktopComposition = graphics.length <= 3;
  const desktopGrid =
    graphics.length === 1
      ? "xl:grid xl:max-w-[22rem] xl:grid-cols-1"
      : graphics.length === 2
        ? "xl:grid xl:max-w-[46rem] xl:grid-cols-2"
        : graphics.length === 3
          ? "xl:grid xl:max-w-6xl xl:grid-cols-12"
          : "";

  return (
    <section
      className="relative isolate overflow-hidden bg-[#031a14] py-20 text-ivory sm:py-28"
      aria-labelledby="review-gallery-heading"
    >
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_46%_58%,rgba(176,138,87,.18),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="container-page max-w-6xl">
        <div className="grid gap-8 border-b border-bronze/30 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div>
            <p className="eyebrow text-[#e7bd55]">Krystal&apos;s highlights</p>
            <h2
              id="review-gallery-heading"
              className="mt-6 max-w-3xl font-serif text-5xl leading-[.96] sm:text-6xl lg:text-7xl"
            >
              {countLabel} {passageLabel} that stayed with me.
            </h2>
          </div>
          <div className="border-l border-bronze/40 pl-6">
            <p className="font-serif text-2xl leading-8 text-ivory/85">
              A visual notebook of the lines, images, and ideas that linger after the final page.
            </p>
            <p className="mt-5 text-sm leading-7 text-ivory/55">
              Arranged in reading order, with each piece given the space its composition deserves.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`mt-14 overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7bd55] xl:mt-20 ${
          usesDesktopComposition ? "xl:overflow-visible" : ""
        }`}
        role="region"
        aria-label="Review highlight graphics"
        tabIndex={graphics.length > 1 ? 0 : undefined}
      >
        <ol
          className={`flex list-none items-end gap-5 px-4 pb-8 sm:px-8 ${
            graphics.length === 1 ? "justify-center" : "snap-x snap-proximity"
          } ${usesDesktopComposition ? "xl:mx-auto xl:items-start xl:gap-0 xl:px-0 xl:pb-28" : ""} ${desktopGrid}`}
          role="list"
        >
          {graphics.map((graphic, index) => {
            const role = getGalleryRole(index);

            return (
              <GalleryCard
                key={graphic._key ?? `${graphic.src}-${index}`}
                graphic={graphic}
                index={index}
                total={graphics.length}
                role={role}
              />
            );
          })}
        </ol>
      </div>

      {graphics.length > 1 ? (
        <p className="container-page mt-7 text-center text-[.65rem] font-semibold uppercase tracking-[.24em] text-ivory/65 xl:mt-0">
          <span className="min-[1120px]:hidden">Swipe to explore</span>
          <span className="hidden min-[1120px]:inline">Art-directed in reading order</span>
          <span aria-hidden="true"> · </span>
          Original proportions preserved
        </p>
      ) : null}
    </section>
  );
}

function StandardReviewContent({ post }: ReviewContentProps) {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="max-w-3xl">
          {post.body.map((paragraph, index) => (
            <BodyParagraph key={paragraph} lead={index === 0}>{paragraph}</BodyParagraph>
          ))}
          <div className="mt-14">
            <SocialCaption>{post.socialExcerpt}</SocialCaption>
          </div>
        </div>
        <BookAside post={post} />
      </div>
    </div>
  );
}

function GalleryStageReviewContent({ post, graphics }: ReviewContentProps & { graphics: ReviewGraphic[] }) {
  const splitIndex = Math.max(1, Math.ceil(post.body.length / 2));
  const openingParagraphs = post.body.slice(0, splitIndex);
  const closingParagraphs = post.body.slice(splitIndex);

  return (
    <>
      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          {openingParagraphs.map((paragraph, index) => (
            <BodyParagraph key={paragraph} lead={index === 0}>{paragraph}</BodyParagraph>
          ))}
        </div>
      </div>

      <GalleryStage graphics={graphics} />

      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          {closingParagraphs.map((paragraph) => (
            <BodyParagraph key={paragraph}>{paragraph}</BodyParagraph>
          ))}
          <div className="mt-14">
            <SocialCaption>{post.socialExcerpt}</SocialCaption>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ReviewContent({ post }: ReviewContentProps) {
  const graphics = post.gallery ?? [];

  if (graphics.length === 0) {
    return <StandardReviewContent post={post} />;
  }

  return <GalleryStageReviewContent post={post} graphics={graphics} />;
}
