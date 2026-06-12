import Reveal from "./Reveal";

const metrics = [["75+", "Projects Delivered"], ["10+", "Years Editorial Experience"], ["100%", "On-Time Delivery"], ["1:1", "Direct Collaboration"]];

export default function Authority() {
  return <section className="bg-linen"><div className="container-page section-space"><Reveal><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-terracotta">A considered practice</p><h2 className="display mt-6 text-5xl text-espresso sm:text-6xl">Experience in the margins. Clarity on the page.</h2></div><p className="max-w-xl self-end text-base leading-8 text-espresso/70">Page Review Studio brings structure, precision, and editorial judgment to work that deserves more than a surface-level review.</p></div><div className="mt-16 grid border-y hairline sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([number, label], i) => <div key={label} className={`py-8 sm:px-7 lg:py-10 ${i > 0 ? "lg:border-l lg:hairline" : ""}`}><p className="font-serif text-5xl text-espresso">{number}</p><p className="mt-2 text-[.64rem] font-semibold uppercase tracking-[.15em] text-espresso/55">{label}</p></div>)}</div></Reveal></div></section>;
}
