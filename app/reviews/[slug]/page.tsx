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
          <header
            className={`relative isolate overflow-hidden border-y ${
              post.heroImage
                ? "border-bronze/35 bg-[#063f31]"
                : "border-transparent bg-linen py-16 sm:py-24"
            }`}
          >
            {post.heroImage ? (
              <>
                <Image
                  src={post.heroImage}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="absolute -z-20 scale-105 object-cover object-center opacity-[.16] blur-[3px] saturate-75"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 -z-10 bg-[linear-gradient(108deg,rgba(3,45,34,.94)_0%,rgba(8,89,65,.82)_48%,rgba(35,24,20,.9)_100%)]"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_45%,rgba(176,138,87,.18),transparent_37%)]"
                  aria-hidden="true"
                />
              </>
            ) : null}
            <div
              className={`container-page relative z-10 grid ${
                post.heroImage
                  ? "gap-0 lg:grid-cols-[26rem_minmax(0,1fr)] xl:grid-cols-[30rem_minmax(0,1fr)]"
                  : "gap-12 lg:grid-cols-[.7fr_1.3fr]"
              }`}
            >
              <div
                className={`${post.coverTone} flex items-center justify-center overflow-hidden text-ivory ${
                  post.heroImage
                    ? "border-x border-bronze/45 bg-black/35 lg:min-h-[32.5rem] xl:min-h-[37.5rem]"
                    : "p-3"
                }`}
              >
                {post.heroImage ? (
                  <div className={`relative w-full ${post.heroAspect ?? "aspect-[4/5]"} lg:h-full lg:aspect-auto`}>
                    <Image
                      src={post.heroImage}
                      alt={`${post.bookTitle} review artwork`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 30rem"
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
              <div
                className={
                  post.heroImage
                    ? "flex flex-col justify-center border-t border-bronze/35 px-2 py-12 sm:px-8 lg:border-l lg:border-t-0 lg:px-12 xl:px-16"
                    : "self-end"
                }
              >
                <Link
                  href="/reviews"
                  className={`text-[.67rem] font-semibold uppercase tracking-[.16em] transition-colors ${
                    post.heroImage ? "text-[#e7bd55] hover:text-ivory" : "text-terracotta hover:text-espresso"
                  }`}
                >
                  All reviews
                </Link>
                <div
                  className={`mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.15em] ${
                    post.heroImage ? "text-ivory/60" : "text-espresso/45"
                  }`}
                >
                  <span>{formatReviewDate(post.date)}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2
                  className={`display mt-6 max-w-4xl text-5xl sm:text-6xl ${
                    post.heroImage ? "text-ivory" : "text-espresso"
                  }`}
                >
                  {post.title}
                </h2>
                <p
                  className={`mt-8 max-w-2xl text-lg leading-8 ${
                    post.heroImage ? "text-ivory/75" : "text-espresso/70"
                  }`}
                >
                  {post.excerpt}
                </p>
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
