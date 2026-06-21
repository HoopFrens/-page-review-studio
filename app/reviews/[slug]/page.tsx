import type { Metadata } from "next";
import Image from "next/image";
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
      images: post.heroImage ? [post.heroImage] : undefined,
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
              <div className={`${post.coverTone} flex items-center justify-center overflow-hidden p-3 text-ivory`}>
                {post.heroImage ? (
                  <div className={`relative w-full ${post.heroAspect ?? "aspect-[4/5]"}`}>
                    <Image
                      src={post.heroImage}
                      alt={`${post.bookTitle} review artwork`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 34vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-80 w-full flex-col justify-between p-5">
                    <p className="eyebrow text-ivory/70">{post.category}</p>
                    <div>
                      <h1 className="font-serif text-5xl leading-none sm:text-6xl">{post.bookTitle}</h1>
                      <p className="mt-4 text-sm text-ivory/70">by {post.author}</p>
                    </div>
                    <p className="font-serif text-2xl leading-8 text-ivory/90">"{post.pullQuote}"</p>
                  </div>
                )}
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
            <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="max-w-3xl">
                {post.body.map((paragraph, index) => (
                  <p key={paragraph} className={`${index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[.8] first-letter:text-terracotta" : ""} mb-7 text-lg leading-9 text-espresso/75`}>
                    {paragraph}
                  </p>
                ))}
                <aside className="mt-14 border-y hairline py-8">
                  <p className="eyebrow text-terracotta">Social caption</p>
                  <p className="mt-4 font-serif text-3xl leading-10 text-espresso">{post.socialExcerpt}</p>
                </aside>
              </div>
              <aside className="space-y-7 lg:sticky lg:top-24 lg:self-start">
                {post.coverImage ? (
                  <div className="border border-bronze/40 bg-linen p-3">
                    <div className={`relative ${post.coverAspect ?? "aspect-[2/3]"} overflow-hidden bg-espresso`}>
                      <Image
                        src={post.coverImage}
                        alt={`${post.bookTitle} book cover`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 18rem"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ) : null}
                <div className="border-t hairline pt-6">
                  <p className="eyebrow text-bronze">Krystal's read</p>
                  <p className="mt-4 font-serif text-2xl leading-8 text-espresso">{post.pullQuote}</p>
                </div>
              </aside>
            </div>
            {post.gallery ? (
              <div className="mt-20 grid items-start gap-5 sm:grid-cols-3">
                {post.gallery.map((image) => (
                  <div key={image.src} className="relative aspect-[374/701] overflow-hidden bg-espresso">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-left"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
