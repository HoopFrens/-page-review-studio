import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getEssays } from "@/lib/essayRepository";
import SanityPreview from "@/components/SanityPreview";
import { linkPreview } from "@/lib/link-preview";

const description = "Krystal Williams explores the questions that linger after reading, from character and relationships to moral dilemmas and the art of storytelling.";
export const metadata: Metadata = {
  title: "Essays · Beyond the Review | Page Review Studio",
  description,
  alternates: { canonical: "/essays" },
  ...linkPreview("Beyond the Review · Essays", description),
};

export default async function EssaysPage() {
  const essays = await getEssays();
  const groups = new Map<string, typeof essays>();
  for (const essay of essays) {
    const group = groups.get(essay.reviewSlug);
    if (group) group.push(essay);
    else groups.set(essay.reviewSlug, [essay]);
  }
  return (
    <>
      <Navigation />
      <main>
        <header className="border-b border-brand-gold bg-brand-brown text-brand-cream">
          <div className="container-page py-14 sm:py-20">
            <p className="eyebrow text-brand-gold">Essays</p>
            <h1 className="display mt-6 text-6xl sm:text-8xl">Beyond the Review</h1>
            <p className="mt-6 font-serif text-2xl italic sm:text-3xl">The last page isn't always the end of the conversation.</p>
          </div>
        </header>
        <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_.85fr] lg:gap-24">
          <div className="space-y-5 text-base leading-8 sm:text-lg sm:leading-8">
            <p>My book reviews explore the reading experience itself: the characters, the storytelling, the craft, and the lasting impressions a book leaves behind.</p>
            <p>Beyond the Review takes those conversations a little further.</p>
            <p>These essays explore the questions, ideas, and complexities of the human experience that emerge from the stories we read. Through reflections on character, relationships, moral dilemmas, and the art of storytelling, I invite readers to look beyond the narrative and consider what literature might reveal about ourselves and one another.</p>
            <p>The goal isn't always to arrive at an answer. Sometimes it's to examine our assumptions, consider unfamiliar perspectives, or develop a deeper understanding of why we think and choose as we do.</p>
            <p>Because sometimes the most meaningful part of a book is what it invites us to explore long after we've finished reading.</p>
          </div>
          <div className="space-y-10">
            {Array.from(groups, ([reviewSlug, group]) => {
              const first = group[0];
              return (
                <section key={reviewSlug} aria-labelledby={`essays-${reviewSlug}`}>
                  <h2 id={`essays-${reviewSlug}`} className="eyebrow mb-4 text-brand-blue">Essays on <cite className="normal-case tracking-normal">{first.bookTitle}</cite> by {first.author}</h2>
                  <ul className="divide-y divide-brand-steel/50 border-y hairline">
                    {group.map(essay => (
                      <li key={essay.slug}>
                        <Link href={`/essays/${essay.slug}`} className="group block py-7">
                          <h3 className="font-serif text-4xl leading-tight group-hover:text-brand-blue">{essay.title}</h3>
                          <p className="mt-3 leading-7">{essay.excerpt}</p>
                          <span className="mt-4 inline-block text-sm text-brand-blue underline underline-offset-4">Read essay <span aria-hidden="true">→</span></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
      <SanityPreview />
    </>
  );
}
