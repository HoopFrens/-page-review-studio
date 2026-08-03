import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SanityPreview from "@/components/SanityPreview";
import { getReviewPosts } from "@/lib/reviewRepository";
import { formatReviewDate } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Book Reviews | Page Review Studio",
  description:
    "Read full-length book reviews from Krystal Williams, including craft notes, reading reflections, and complete reviews beyond social posts.",
};

export default async function ReviewsPage() {
  const reviewPosts = await getReviewPosts();

  return (
    <>
      <Navigation />
      <main>
        <section className="bg-espresso py-20 text-ivory sm:py-28">
          <div className="container-page">
            <p className="eyebrow text-bronze">Book reviews</p>
            <h1 className="display mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">The full review lives here.</h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-stone">
              Krystal shares shorter reflections across social platforms. This archive is the lasting home for each complete review.
            </p>
          </div>
        </section>
        <section className="section-space">
          <div className="container-page grid gap-8 lg:grid-cols-3">
            {reviewPosts.map((post) => (
              <article key={post.slug} className="flex h-full flex-col border-t hairline pt-7">
                <div className={`${post.coverTone} relative mb-7 flex overflow-hidden p-3 text-ivory`}>
                  {post.heroImage ? (
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: post.heroAspect ?? 4 / 5 }}
                    >
                      <Image
                        src={post.heroImage}
                        alt={post.heroAlt ?? `${post.bookTitle} review artwork`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-56 w-full flex-col justify-between p-4">
                      <p className="eyebrow text-ivory/70">{post.category}</p>
                      <div>
                        <h2 className="font-serif text-4xl leading-tight">{post.bookTitle}</h2>
                        <p className="mt-2 text-sm text-ivory/70">by {post.author}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.15em] text-espresso/45">
                  <span>{formatReviewDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-espresso">
                  <Link href={`/reviews/${post.slug}`} className="transition-colors hover:text-terracotta">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 grow leading-7 text-espresso/65">{post.excerpt}</p>
                <Link
                  href={`/reviews/${post.slug}`}
                  className="mt-7 text-[.67rem] font-semibold uppercase tracking-[.16em] text-terracotta transition-colors hover:text-espresso"
                >
                  Read full review
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <SanityPreview />
    </>
  );
}
