import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  ["Discover", "We begin with a conversation about your goals, audience, manuscript, timeline, and what success looks like for the work."],
  ["Assess", "Your draft, outline, or idea is reviewed with care. You receive honest guidance about what is working, what needs attention, and where the strongest opportunities are."],
  ["Develop", "Together, we shape the work through restructuring, editing, writing, revising, or developing the manuscript from the ground up."],
  ["Deliver", "You receive polished, purposeful work ready for publishing, submission, presentation, or continued development."],
];

export default function Process() {
  return <section id="process" className="section-space bg-linen"><div className="container-page"><Reveal><SectionHeading eyebrow="The process" title="A thoughtful process for important work." intro="Clear steps. Direct collaboration. No guesswork." /></Reveal><div className="relative mt-16 grid gap-0 lg:grid-cols-4"><div className="absolute left-0 right-0 top-7 hidden h-px bg-bronze/50 lg:block" />{steps.map(([title, copy], i) => <Reveal key={title}><article className="relative border-l border-bronze/50 pb-12 pl-7 lg:border-0 lg:pb-0 lg:pl-0 lg:pr-10"><div className="relative z-10 mb-7 grid h-14 w-14 place-items-center rounded-full border border-bronze bg-linen font-serif text-xl text-terracotta">{String(i + 1).padStart(2, "0")}</div><h3 className="font-serif text-3xl text-espresso">{title}</h3><p className="mt-4 leading-7 text-espresso/65">{copy}</p></article></Reveal>)}</div></div></section>;
}
