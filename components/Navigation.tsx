"use client";

import { useState } from "react";
import Button from "./Button";
import PageReviewLogo from "./Logo";

const links = [["About", "#about"], ["Services", "#services"], ["Process", "#process"], ["Sample Edits", "#sample-edits"], ["Contact", "#contact"]];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-stone/70 bg-ivory/95 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between">
        <a href="#top" aria-label="Page Review Studio home"><PageReviewLogo /></a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="group relative text-[.66rem] font-semibold uppercase tracking-[.14em] text-espresso"><span>{label}</span><span className="absolute -bottom-2 left-0 h-px w-0 bg-terracotta transition-all group-hover:w-full" /></a>)}
          <Button href="#contact" className="ml-2">Book a consultation</Button>
        </nav>
        <button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <span className="space-y-1.5"><span className="block h-px w-6 bg-espresso" /><span className="block h-px w-6 bg-espresso" /></span>
        </button>
      </div>
      {open && <nav id="mobile-menu" className="border-t border-stone bg-ivory px-4 pb-6 lg:hidden" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-stone/60 py-4 font-serif text-2xl text-espresso">{label}</a>)}<Button href="#contact" className="mt-5 w-full">Book a consultation</Button></nav>}
    </header>
  );
}
