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
            intro="Editorial support for every stage of your story, alongside custom graphic design. Explore the services, then tell me what you need."
          />
        </Reveal>
        <p className="mt-8 max-w-3xl text-sm leading-7 text-brand-muted">Editorial rates are in U.S. dollars. Per-word rates are starting prices, subject to the stated minimum project fee. Final quotes depend on manuscript length, condition, complexity, and scope.</p>
        <div className="service-cards mt-16 grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <Reveal key={service.id} className="service-card-reveal h-full">
              <article id={service.id} className="service-card flex h-full flex-col border-y hairline py-10 md:px-5 lg:py-12">
                <div className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-6">
                  <span className="eyebrow text-brand-blue">{service.number}</span>
                  <div className="border-l border-brand-steel/50 pl-6 text-left">
                    <span className="eyebrow text-brand-muted">Investment</span>
                    <p className="mt-3 font-serif text-2xl text-brand-brown">{service.investment}</p>{"priceNote" in service ? <p className="mt-2 text-sm text-brand-muted">{service.priceNote}</p> : null}
                  </div>
                </div>
                <h3 className="mt-8 font-serif text-4xl text-brand-brown sm:text-5xl">{service.name}</h3>
                <p className="mt-6 text-lg leading-8 text-brand-muted">{service.description}</p>
                <div className="my-10 grid gap-6 border-t border-brand-steel/50 pt-8 text-sm leading-7 sm:grid-cols-2">
                  <p><span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-brand-blue">Ideal for</span>{service.ideal}</p>
                  <p><span className="mb-2 block text-[.58rem] font-semibold uppercase tracking-[.16em] text-brand-blue">{service.id === "graphic-design" ? "Planning your project" : "Includes"}</span>{service.deliverables}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-5">
                  <Button href={`/?service=${service.id}#contact`} variant="outline">{service.action}</Button>
                  {service.id !== "graphic-design" ? <a href={`/services#${service.id}`} className="text-sm text-brand-blue underline underline-offset-4">Full service details</a> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
