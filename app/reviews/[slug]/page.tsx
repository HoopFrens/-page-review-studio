import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SanityPreview from "@/components/SanityPreview";
import ReviewContent from "@/components/reviews/ReviewContent";
import { getReviewPost, getReviewSlugs } from "@/lib/reviewRepository";
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

  return {
    title: post.seoTitle || `${post.bookTitle} Review | Page Review Studio`,
    description: post.seoDescription || post.socialExcerpt,
    openGraph: {
      title: post.seoTitle || `${post.bookTitle} Review`,
      description: post.seoDescription || post.socialExcerpt,
      type: "article",
      publishedTime: post.date,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function ReviewPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getReviewPost(slug);

  if (!post) notFound();

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
        </article>
      </main>
      <Footer />
      <SanityPreview />
    </>
  );
}
