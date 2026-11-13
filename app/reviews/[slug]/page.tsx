import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-preview";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SanityPreview from "@/components/SanityPreview";
import ReviewContent from "@/components/reviews/ReviewContent";
import { getReviewPost, getReviewSlugs } from "@/lib/reviewRepository";
import { essays } from "@/lib/essays";
import { formatReviewDate } from "@/lib/reviews";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getReviewSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getReviewPost(slug, { stega: false });

  if (!post) {
    return { title: "Review Not Found | Page Review Studio" };
  }

  const description = post.seoDescription || post.socialExcerpt;
  return {
    title: post.seoTitle || `${post.bookTitle} Review | Page Review Studio`,
    description,
    ...linkPreview(post.seoTitle || `${post.bookTitle} Review`, description, post.date),
  };
}

export default async function ReviewPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getReviewPost(slug);

  if (!post) notFound();

  const relatedEssays = essays.filter(essay => new URL(essay.reviewUrl).pathname === `/reviews/${slug}`);

  return (
    <>
      <Navigation />
      <main>
        <article>
          <header className="review-screening-hero">
            {post.heroImage ? (
              <Image
                src={post.heroImage}
                alt={post.heroAlt ?? `${post.bookTitle} review artwork`}
                fill
                preload
                sizes="100vw"
                className="review-screening-hero-image"
              />
            ) : null}

            <div className="review-screening-hero-content">
              <Link href="/reviews" className="review-screening-back-link">
                All reviews
              </Link>
              <div className="review-screening-hero-meta">
                <span>{formatReviewDate(post.date)}</span>
                <span>{post.readingTime}</span>
                <span>{post.category}</span>
              </div>
              <h1>{post.title}</h1>
              <p className="review-screening-hero-dek">{post.excerpt}</p>
            </div>
          </header>

          <ReviewContent post={post} />
          {relatedEssays.length > 0 && (
            <nav aria-labelledby="beyond-the-review" className="container-page max-w-3xl border-t hairline py-12">
              <h2 id="beyond-the-review" className="font-serif text-4xl">Beyond the Review</h2>
              <ul className="mt-5 space-y-3">
                {relatedEssays.map(essay => (
                  <li key={essay.slug}>
                    <Link className="text-lg text-brand-blue underline underline-offset-4" href={`/essays/${essay.slug}`}>
                      {essay.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>
      <Footer />
      <SanityPreview />
    </>
  );
}
