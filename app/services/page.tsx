import type { Metadata } from "next";
import { linkPreview } from "@/lib/link-preview";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { editorialIntro, editorialServices, editorialClosing, pricingNotes, editorialSignoff } from "@/lib/editorial-services";

export const metadata: Metadata = {
  title: "Editorial Services & Pricing | Page Review Studio",
  description: "Explore substantive editing, line editing, partial manuscript critiques, and collaborative narrative development with clear rates and deliverables.",
  alternates: { canonical: "/services" },
  ...linkPreview("Editorial Services & Pricing", "Explore editing services, manuscript critiques, and pricing at Page Review Studio."),
};

export default function EditorialServicesPage() {
  return <><Navigation /><main>
    <section className="section-space border-b border-brand-blue/40"><div className="container-page">
      <p className="eyebrow text-brand-blue">Editorial services</p>
      <h1 className="display mt-8 max-w-4xl text-6xl text-brand-brown sm:text-7xl">Your Story. Your Voice. Stronger Writing.</h1>
      <div className="mt-10 max-w-3xl space-y-5 text-lg leading-8">{editorialIntro.map(text => <p key={text}>{text}</p>)}</div>
      <nav aria-label="Editorial services" className="mt-10 flex flex-wrap gap-3">{editorialServices.map(service => <a key={service.id} href={`#${service.id}`} className="border border-brand-blue/40 px-4 py-3 text-sm text-brand-blue hover:bg-brand-blue hover:text-brand-cream">{service.name}</a>)}</nav>
      <p className="mt-6 text-sm">All rates are in U.S. dollars. See <a href="#pricing" className="text-brand-blue underline underline-offset-4">pricing and scope details</a> below.</p>
    </div></section>
    {editorialServices.map(service => <section id={service.id} key={service.id} className="section-space border-b border-brand-blue/40 scroll-mt-24"><div className="container-page grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
      <div><p className="eyebrow text-brand-blue">Service {service.number}</p><h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">{service.name}</h2><p className="mt-6 text-lg leading-8">{service.description}</p><div className="my-8 border-l-4 border-brand-gold pl-5"><p className="eyebrow text-brand-blue">Investment</p><p className="mt-2 font-serif text-3xl">{service.investment}</p><p className="mt-2 text-sm">{service.priceNote}</p><p className="mt-2 text-sm leading-6">{service.paymentNote}</p></div><Button href={`/?service=${service.id}#contact`}>Discuss this service</Button></div>
      <div className="space-y-6 leading-8">{service.paragraphs.map(text => <p key={text}>{text}</p>)}<h3 className="font-serif text-3xl">What’s included</h3><ul className="list-disc space-y-2 pl-5 marker:text-brand-blue">{service.includes.map(text => <li key={text}>{text}</li>)}</ul><div className="border-y border-brand-blue/40 py-6"><h3 className="eyebrow text-brand-blue">What you’ll receive</h3><p className="mt-3">{service.deliverables}</p><h3 className="eyebrow mt-6 text-brand-blue">Best for</h3><p className="mt-3">{service.ideal}</p></div>{service.notes.map(text => <p key={text}>{text}</p>)}</div>
    </div></section>)}
    <section className="section-space bg-brand-brown text-brand-cream">
      <div className="container-page max-w-4xl">
        <h2 className="display text-5xl">Not Sure Which Service You Need?</h2>
        <div className="mt-8 space-y-5 leading-8">
          {editorialClosing.map(text => text === "Let's talk about your story."
            ? <h3 key={text} className="pt-4 font-serif text-3xl">{text}</h3>
            : <p key={text}>{text}</p>)}
          <h3 id="pricing" className="scroll-mt-24 pt-8 font-serif text-4xl text-brand-gold">A Note About Pricing</h3>
          {pricingNotes.map(text => <p key={text}>{text}</p>)}
          <h3 id="payment" className="scroll-mt-24 pt-8 font-serif text-4xl text-brand-gold">How Payment Works</h3>
          <p>Before any work begins, you’ll receive a written agreement outlining your project scope, deliverables, timeline, and fee. I reserve your place on my calendar once the agreement is signed and I receive the initial payment for your service.</p>
          <p><strong>Editing projects.</strong> For projects under $2,000, a 50% deposit begins the work. The balance is due before final files are released. For projects of $2,000 or more, you pay 50% at the start, 25% when I deliver the first half of your manuscript, and 25% at completion before I release the final files.</p>
          <p><strong>Critiques.</strong> First chapter and partial manuscript critiques are paid in full at booking.</p>
          <p><strong>Collaborative projects.</strong> We begin with a paid pilot chapter. After the pilot, you’ll receive a written estimate. If we continue, a deposit starts the larger project, and I invoice you as each phase is completed.</p>
          <p>You’re welcome to bring payment questions to the consultation and ask about any terms before you sign.</p>
          {editorialSignoff.map(text => <p key={text}>{text}</p>)}
        </div>
        <Button href="/?service=not-sure#contact" variant="light" className="mt-8">Start a conversation</Button>
      </div>
    </section>
  </main><Footer /></>;
}
