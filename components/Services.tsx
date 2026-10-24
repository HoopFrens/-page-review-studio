import { services } from "@/lib/services";
import Button from "./Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Ways to work together"
            title="Care for the words. Intention in the design."
            intro="From refining a manuscript to shaping a visual idea, choose the support your project needs."
          />
        </Reveal>
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <Reveal key={service.id} className="h-full">
              <article id={service.id} className="flex h-full flex-col border-y hairline py-10 md:px-5 lg:py-12">
                <div className="flex items-start justify-between gap-6">
                  <span className="eyebrow text-brand-blue">{service.number}</span>
                  <div className="border-l border-brand-steel/50 pl-6 text-right">
                    <span className="eyebrow text-brand-muted">Investment</span>
                    <p className="mt-3 font-serif text-2xl text-brand-brown">{service.investment}</p>
                  </div>
                </div>
                <h3 className="mt-12 font-serif text-4xl text-brand-brown sm:text-5xl">{service.name}</h3>
                <p className="mt-6 text-lg leading-8 text-brand-muted">{service.description}</p>
                <div className="my-10 grid gap-6 border-t border-brand-steel/50 pt-8 text-sm leading-7 sm:grid-cols-2">
                  <p><span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-brand-blue">Ideal for</span>{service.ideal}</p>
                  <p><span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-brand-blue">{service.id === "graphic-design" ? "Planning your project" : "Includes"}</span>{service.deliverables}</p>
                </div>
                <Button href={service.id === "graphic-design" ? "?service=graphic-design#contact" : "?service=line-editing#contact"} variant="outline" className="mt-auto self-start">{service.action}</Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
