import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
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
    },
  };
}

export default async function ReviewPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getReviewPost(slug);

  if (!post) notFound();

  return (
    <>
      <Navigation />
      <main>
        <article>
          <header className="bg-linen py-16 sm:py-24">
            <div className="container-page grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
              <div className={`${post.coverTone} flex min-h-96 flex-col justify-between p-8 text-ivory`}>
                <p className="eyebrow text-ivory/70">{post.category}</p>
                <div>
                  <h1 className="font-serif text-5xl leading-none sm:text-6xl">{post.bookTitle}</h1>
                  <p className="mt-4 text-sm text-ivory/70">by {post.author}</p>
                </div>
                <p className="font-serif text-2xl leading-8 text-ivory/90">"{post.pullQuote}"</p>
              </div>
              <div className="self-end">
                <Link
                  href="/reviews"
                  className="text-[.67rem] font-semibold uppercase tracking-[.16em] text-terracotta transition-colors hover:text-espresso"
                >
                  All reviews
                </Link>
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.15em] text-espresso/45">
                  <span>{formatReviewDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="display mt-6 max-w-4xl text-5xl text-espresso sm:text-6xl lg:text-7xl">{post.title}</h2>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-espresso/70">{post.excerpt}</p>
              </div>
            </div>
          </header>
          <div className="container-page py-16 sm:py-24">
            <div className="mx-auto max-w-3xl">
              {post.body.map((paragraph) => (
                <p key={paragraph} className="mb-7 text-lg leading-9 text-espresso/75">
                  {paragraph}
                </p>
              ))}
              <aside className="mt-14 border-y hairline py-8">
                <p className="eyebrow text-terracotta">Social caption</p>
                <p className="mt-4 font-serif text-3xl leading-10 text-espresso">{post.socialExcerpt}</p>
              </aside>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
