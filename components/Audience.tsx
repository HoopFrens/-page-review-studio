import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const audiences = [
  ["First-Time Authors", "You have the draft, idea, or calling. You need a steady editorial partner to make the work clear, structured, and publication-ready."],
  ["Memoir Writers", "You are carrying a story that deserves sensitivity, narrative shape, and a voice that remains unmistakably yours."],
  ["Founders", "You want to translate hard-won insight into a book, essay, or body of work that extends the reach of your ideas."],
  ["Executives", "Your experience has value beyond the room. The right editorial guidance helps you articulate it with authority and nuance."],
  ["Subject Matter Experts", "You know the material deeply. Together, we make it accessible, compelling, and rewarding for the reader."],
  ["Self-Publishing Authors", "You want independent publishing without compromising on the care, rigor, or finish of a traditional house."],
];

export default function Audience() {
  return <section className="section-space"><div className="container-page"><Reveal><SectionHeading eyebrow="Who I work with" title="For writers and experts who care about the weight of their words." /></Reveal><div className="mt-16 grid border-l border-t hairline sm:grid-cols-2 lg:grid-cols-3">{audiences.map(([title, copy]) => <Reveal key={title}><article className="min-h-64 border-b border-r hairline p-8 transition-colors hover:bg-linen lg:p-10"><span className="mb-8 block h-px w-10 bg-terracotta" /><h3 className="font-serif text-3xl text-espresso">{title}</h3><p className="mt-5 leading-7 text-espresso/65">{copy}</p></article></Reveal>)}</div></div></section>;
}
