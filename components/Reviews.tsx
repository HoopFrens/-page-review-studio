import Image from "next/image";
import Link from "next/link";
import { formatReviewDate, reviewPosts } from "@/lib/reviews";
import Button from "./Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Reviews() {
  const featured = reviewPosts[0];
  const recent = reviewPosts.slice(1, 3);

  return (
    <section id="reviews" className="section-space bg-linen">
      <div className="container-page">
        <Reveal>
          <div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <SectionHeading
                eyebrow="Full reviews"
                title="A home base for every book Krystal reviews."
                intro="Social posts can start the conversation. The website now gives each review room to breathe with the full reflection, craft notes, and reading experience in one lasting place."
              />
              <Button href="/reviews" variant="outline" className="justify-self-start lg:mb-1">
                Read all reviews
              </Button>
            </div>
            <article className="mt-14 grid overflow-hidden border-y hairline lg:grid-cols-[22rem_minmax(0,1fr)] xl:grid-cols-[25rem_minmax(0,1fr)]">
              <Link
                href={`/reviews/${featured.slug}`}
                className={`${featured.coverTone} relative block overflow-hidden border-b hairline text-ivory lg:border-b-0 lg:border-r`}
                aria-label={`Read ${featured.bookTitle} review`}
              >
                {featured.heroImage ? (
                  <div className={`relative w-full ${featured.heroAspect ?? "aspect-[4/5]"}`}>
                    <Image
                      src={featured.heroImage}
                      alt={`${featured.bookTitle} review artwork`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25rem"
                      className="object-contain transition-transform duration-500 hover:scale-[1.015]"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-80 w-full flex-col justify-between p-5">
                    <div>
                      <p className="eyebrow text-ivory/70">{featured.category}</p>
                      <h3 className="mt-8 font-serif text-4xl leading-tight">{featured.bookTitle}</h3>
                      <p className="mt-2 text-sm text-ivory/70">by {featured.author}</p>
                    </div>
                    <p className="font-serif text-2xl leading-8 text-ivory/90">"{featured.pullQuote}"</p>
                  </div>
                )}
              </Link>
              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.15em] text-espresso/45">
                  <span>{formatReviewDate(featured.date)}</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h3 className="mt-6 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
                  <Link href={`/reviews/${featured.slug}`} className="transition-colors hover:text-terracotta">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-6 max-w-2xl leading-8 text-espresso/70">{featured.excerpt}</p>
                <Link
                  href={`/reviews/${featured.slug}`}
                  className="mt-8 inline-flex text-[.67rem] font-semibold uppercase tracking-[.16em] text-terracotta transition-colors hover:text-espresso"
                >
                  Read the full review
                </Link>
              </div>
            </article>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {recent.map((post) => (
            <Reveal key={post.slug}>
              <article className="h-full border-t hairline pt-7">
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.15em] text-espresso/45">
                  <span>{post.category}</span>
                  <span>{formatReviewDate(post.date)}</span>
                </div>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-espresso">
                  <Link href={`/reviews/${post.slug}`} className="transition-colors hover:text-terracotta">
                    {post.bookTitle}
                  </Link>
                </h3>
                <p className="mt-4 leading-7 text-espresso/65">{post.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
