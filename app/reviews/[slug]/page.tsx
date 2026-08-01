import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ReviewContent from "@/components/reviews/ReviewContent";
import { formatReviewDate, getReviewPost, reviewPosts } from "@/lib/reviews";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reviewPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getReviewPost(slug);

  if (!post) {
    return { title: "Review Not Found | Page Review Studio" };
  }

  return {
    title: `${post.bookTitle} Review | Page Review Studio`,
    description: post.socialExcerpt,
    openGraph: {
      title: `${post.bookTitle} Review`,
      description: post.socialExcerpt,
      type: "article",
      publishedTime: post.date,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function ReviewPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getReviewPost(slug);

  if (!post) notFound();

  const showCoverInHero = Boolean(post.coverImage && post.gallery?.length);

  return (
    <>
      <Navigation />
      <main>
        <article>
          <header
            className={`relative isolate overflow-hidden border-y ${
              post.heroImage
                ? "border-bronze/35 bg-espresso"
                : `border-transparent bg-linen ${showCoverInHero ? "" : "py-16 sm:py-24"}`
            }`}
          >
            {post.heroImage ? (
              <>
                <Image
                  src={post.heroImage}
                  alt={post.heroAlt ?? `${post.bookTitle} review artwork`}
                  fill
                  priority
                  sizes="100vw"
                  className="absolute -z-20 object-cover object-[70%_58%] sm:object-[70%_56%] lg:object-[center_58%]"
                />
                <div
                  className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,14,11,.96)_0%,rgba(3,31,23,.9)_42%,rgba(3,38,29,.58)_68%,rgba(13,13,11,.3)_100%)]"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(3,18,14,.72)_0%,transparent_40%,rgba(0,0,0,.18)_100%)]"
                  aria-hidden="true"
                />
              </>
            ) : null}
            <div
              className={`container-page relative z-10 ${
                post.heroImage
                  ? showCoverInHero
                    ? "grid min-h-[44rem] items-center gap-12 py-14 md:grid-cols-[minmax(0,1fr)_15rem] sm:py-20 lg:min-h-[42rem] lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20"
                    : "flex min-h-[44rem] items-center py-14 sm:py-20 lg:min-h-[42rem]"
                  : showCoverInHero
                    ? "grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.3fr_.7fr]"
                    : "grid gap-12 lg:grid-cols-[.7fr_1.3fr]"
              }`}
            >
              {!post.heroImage && !showCoverInHero ? (
                <div className={`${post.coverTone} flex items-center justify-center overflow-hidden p-3 text-ivory`}>
                  <div className="flex min-h-80 w-full flex-col justify-between p-5">
                    <p className="eyebrow text-ivory/70">{post.category}</p>
                    <div>
                      <p className="font-serif text-5xl leading-none sm:text-6xl">{post.bookTitle}</p>
                      <p className="mt-4 text-sm text-ivory/70">by {post.author}</p>
                    </div>
                    <p className="font-serif text-2xl leading-8 text-ivory/90">"{post.pullQuote}"</p>
                  </div>
                </div>
              ) : null}
              <div
                className={
                  post.heroImage
                    ? showCoverInHero
                      ? "max-w-4xl"
                      : "max-w-2xl"
                    : "self-end"
                }
              >
                <Link
                  href="/reviews"
                  className={`text-[.67rem] font-semibold uppercase tracking-[.16em] transition-colors ${
                    post.heroImage ? "text-[#e7bd55] hover:text-ivory" : "text-[#7a3f2f] hover:text-espresso"
                  }`}
                >
                  All reviews
                </Link>
                <div
                  className={`mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.15em] ${
                    post.heroImage ? "text-ivory/60" : "text-espresso/70"
                  }`}
                >
                  <span>{formatReviewDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                  <span>{post.category}</span>
                </div>
                {showCoverInHero ? (
                  <p className={`mt-5 text-sm leading-6 ${post.heroImage ? "text-ivory/70" : "text-espresso/70"}`}>
                    Review of <cite className="not-italic">{post.bookTitle}</cite> by {post.author}
                  </p>
                ) : null}
                <h1
                  className={`display ${showCoverInHero ? "mt-4" : "mt-6"} max-w-4xl text-5xl tracking-normal sm:text-6xl ${
                    post.heroImage ? "text-ivory lg:text-[4rem]" : "text-espresso lg:text-7xl"
                  }`}
                >
                  {post.title}
                </h1>
                <p
                  className={`mt-8 max-w-2xl text-lg leading-8 ${
                    post.heroImage ? "text-ivory/75" : "text-espresso/70"
                  }`}
                >
                  {post.excerpt}
                </p>
              </div>
              {showCoverInHero && post.coverImage ? (
                <div className="relative mx-auto w-full max-w-[12rem] md:max-w-[15rem] lg:max-w-[18rem] lg:justify-self-end">
                  <div
                    className="absolute inset-0 translate-x-4 translate-y-5 bg-[#d4aa4d]/15"
                    aria-hidden="true"
                  />
                  <div className="relative border border-[#d4aa4d]/65 bg-[#071b16] p-3 shadow-[0_28px_90px_rgba(0,0,0,.35)]">
                    <div className={`relative ${post.coverAspect ?? "aspect-[2/3]"} overflow-hidden bg-espresso`}>
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt ?? `${post.bookTitle} book cover`}
                        fill
                        sizes="(max-width: 767px) 12rem, (max-width: 1023px) 15rem, 18rem"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </header>
          <ReviewContent post={post} />
        </article>
      </main>
      <Footer />
    </>
  );
}
