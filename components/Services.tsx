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
                <span className="eyebrow text-terracotta">{service.number}</span>
                <div className="border-l border-stone pl-6 text-right">
                  <span className="eyebrow text-espresso/40">Investment</span>
                  <p className="mt-3 font-serif text-2xl text-espresso">{service.investment}</p>
                </div>
              </div>

              <div className="mt-12 max-w-3xl">
                <h3 className="font-serif text-4xl text-espresso sm:text-5xl">{service.name}</h3>
                <p className="mt-6 text-lg leading-8 text-espresso/70">{service.description}</p>
              </div>

              <div className="mt-10 grid gap-6 border-t border-stone pt-8 text-sm leading-7 sm:grid-cols-2">
                <p>
                  <span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-terracotta">Ideal for</span>
                  {service.ideal}
                </p>
                <p>
                  <span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-terracotta">Includes</span>
                  {service.deliverables}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal className="h-full">
            <div className="relative flex min-h-[28rem] h-full overflow-hidden bg-espresso p-6 text-ivory sm:p-8">
              <div className="absolute inset-x-8 top-8 h-px bg-bronze/50" />
              <div className="absolute bottom-8 left-8 top-16 w-px bg-bronze/40" />
              <div className="ml-auto flex w-[88%] max-w-md flex-col bg-ivory p-7 text-espresso shadow-2xl shadow-espresso/20">
                <div className="flex items-center justify-between border-b border-stone pb-4">
                  <span className="eyebrow text-terracotta">Manuscript pass</span>
                  <span className="font-serif text-3xl text-bronze">01</span>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="h-2 w-11/12 bg-stone" />
                  <div className="h-2 w-full bg-stone" />
                  <div className="h-2 w-10/12 bg-stone" />
                  <div className="relative mt-7 border-l-2 border-terracotta pl-5">
                    <div className="h-2 w-9/12 bg-terracotta/35" />
                    <p className="mt-4 font-serif text-2xl leading-8 text-espresso">Sharper rhythm, cleaner meaning, steadier voice.</p>
                  </div>
                  <div className="pt-4 space-y-4">
                    <div className="h-2 w-full bg-stone" />
                    <div className="h-2 w-8/12 bg-stone" />
                    <div className="h-2 w-11/12 bg-stone" />
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between pt-10">
                  <span className="text-xs uppercase tracking-[.16em] text-espresso/45">Clarity</span>
                  <span className="font-serif text-5xl text-terracotta">+</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
