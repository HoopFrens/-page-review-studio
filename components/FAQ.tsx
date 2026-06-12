"use client";

import { useState } from "react";
import { faqs } from "@/lib/faq";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="section-space"><div className="container-page grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading eyebrow="Questions, answered" title="Before we begin." /><div className="border-t hairline">{faqs.map(([question, answer], i) => { const active = open === i; return <div className="border-b hairline" key={question}><button onClick={() => setOpen(active ? null : i)} aria-expanded={active} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-6 py-7 text-left"><span className="font-serif text-2xl text-espresso">{question}</span><span className={`text-2xl font-light text-terracotta transition-transform ${active ? "rotate-45" : ""}`} aria-hidden="true">+</span></button><div id={`faq-${i}`} className={`grid transition-all duration-300 ${active ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"}`}><p className="overflow-hidden pr-12 leading-7 text-espresso/65">{answer}</p></div></div>})}</div></div></section>;
}
