import { services } from "@/lib/services";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const [service] = services;

  return (
    <section id="services" className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Ways to work together"
            title="Focused line editing for finished manuscripts ready for refinement."
            intro="A single, careful service for writers who want every sentence to feel clearer, smoother, and more intentional without losing the voice on the page."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
          <Reveal>
            <article className="h-full border-y hairline py-10 md:px-5 lg:py-12">
              <div className="flex items-start justify-between gap-6">
                <span className="eyebrow text-brand-blue">{service.number}</span>
                <div className="border-l border-brand-tan pl-6 text-right">
                  <span className="eyebrow text-brand-brown/40">Investment</span>
                  <p className="mt-3 font-serif text-2xl text-brand-brown">{service.investment}</p>
                </div>
              </div>

              <div className="mt-12 max-w-3xl">
                <h3 className="font-serif text-4xl text-brand-brown sm:text-5xl">{service.name}</h3>
                <p className="mt-6 text-lg leading-8 text-brand-brown/70">{service.description}</p>
              </div>

              <div className="mt-10 grid gap-6 border-t border-brand-tan pt-8 text-sm leading-7 sm:grid-cols-2">
                <p>
                  <span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-brand-blue">Ideal for</span>
                  {service.ideal}
                </p>
                <p>
                  <span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-brand-blue">Includes</span>
                  {service.deliverables}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="h-full">
            <div className="relative flex min-h-[28rem] h-full overflow-hidden bg-brand-brown p-6 text-brand-cream sm:p-8">
              <div className="absolute inset-x-8 top-8 h-px bg-brand-gold/50" />
              <div className="absolute bottom-8 left-8 top-16 w-px bg-brand-gold/40" />
              <div className="ml-auto flex w-[88%] max-w-md flex-col bg-brand-cream p-7 text-brand-brown shadow-2xl shadow-brand-brown/20">
                <div className="flex items-center justify-between border-b border-brand-tan pb-4">
                  <span className="eyebrow text-brand-blue">Manuscript pass</span>
                  <span className="font-serif text-3xl text-brand-gold">01</span>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="h-2 w-11/12 bg-brand-tan" />
                  <div className="h-2 w-full bg-brand-tan" />
                  <div className="h-2 w-10/12 bg-brand-tan" />
                  <div className="relative mt-7 border-l-2 border-brand-blue pl-5">
                    <div className="h-2 w-9/12 bg-brand-blue/35" />
                    <p className="mt-4 font-serif text-2xl leading-8 text-brand-brown">Sharper rhythm, cleaner meaning, steadier voice.</p>
                  </div>
                  <div className="pt-4 space-y-4">
                    <div className="h-2 w-full bg-brand-tan" />
                    <div className="h-2 w-8/12 bg-brand-tan" />
                    <div className="h-2 w-11/12 bg-brand-tan" />
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between pt-10">
                  <span className="text-xs uppercase tracking-[.16em] text-brand-brown/45">Clarity</span>
                  <span className="font-serif text-5xl text-brand-blue">+</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
