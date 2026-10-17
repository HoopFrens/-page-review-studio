import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  ["Discover", "We begin with a conversation about your goals, audience, project, timeline, and what success looks like for the work."],
  ["Assess", "We review your manuscript or design brief, discuss what you need, and agree on the scope, deliverables, and timeline."],
  ["Develop", "We refine your manuscript or develop your visual design, with room for discussion and feedback along the way."],
  ["Deliver", "You receive the agreed project files and a clear handoff for your next steps."],
];

export default function Process() {
  return <section id="process" className="section-space bg-brand-linen"><div className="container-page"><Reveal><SectionHeading eyebrow="The process" title="A thoughtful process for important work." intro="Clear steps. Direct collaboration. No guesswork." /></Reveal><div className="relative mt-16 grid gap-0 lg:grid-cols-4"><div className="absolute left-0 right-0 top-7 hidden h-px bg-brand-gold/50 lg:block" />{steps.map(([title, copy], i) => <Reveal key={title}><article className="relative border-l border-brand-gold/50 pb-12 pl-7 lg:border-0 lg:pb-0 lg:pl-0 lg:pr-10"><div className="relative z-10 mb-7 grid h-14 w-14 place-items-center rounded-full border border-brand-gold bg-brand-linen font-serif text-xl text-brand-blue">{String(i + 1).padStart(2, "0")}</div><h3 className="font-serif text-3xl text-brand-brown">{title}</h3><p className="mt-4 leading-7 text-brand-brown/65">{copy}</p></article></Reveal>)}</div></div></section>;
}
