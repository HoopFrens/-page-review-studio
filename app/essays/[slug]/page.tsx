import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { essays } from "@/lib/essays";
import { linkPreview } from "@/lib/link-preview";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return essays.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = essays.find(item => item.slug === slug);
  if (!essay) notFound();
  return {
    title: `${essay.title} | Page Review Studio`,
    description: essay.excerpt,
    alternates: { canonical: `/essays/${slug}` },
    ...linkPreview(essay.title, essay.excerpt),
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = essays.find(item => item.slug === slug);
  if (!essay) notFound();
  return (
    <>
      <Navigation />
      <main className="container-page py-12 sm:py-20">
        <article className="mx-auto max-w-[44rem]">
          <header className="border-b hairline pb-8">
            <Link href="/essays" className="text-sm text-brand-blue underline underline-offset-4">← All essays</Link>
            <h1 className="display mt-8 text-5xl sm:text-7xl">{essay.title}</h1>
            <p className="mt-4 font-serif text-2xl italic">{essay.subtitle}</p>
            <p className="mt-3 text-sm">By Krystal Williams</p>
          </header>
          <div className="space-y-5 py-8 text-lg leading-8 [&_h2]:pt-4 [&_h2]:font-serif [&_h2]:text-4xl [&_blockquote]:border-l-2 [&_blockquote]:border-brand-gold [&_blockquote]:pl-5 [&_blockquote]:font-serif [&_blockquote]:text-2xl">
            {essay.body}
          </div>
          <footer className="border-t hairline pt-6">
            <a href={essay.reviewUrl} className="font-medium text-brand-blue underline underline-offset-4">Read Krystal’s full review of <cite>Jade City</cite> →</a>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
