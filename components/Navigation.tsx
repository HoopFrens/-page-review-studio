"use client";

import { useState } from "react";
import Button from "./Button";
import PageReviewLogo from "./Logo";

const links = [["About", "/#about"], ["Services", "/#services"], ["Process", "/#process"], ["Reviews", "/#reviews"], ["Sample Edits", "/#sample-edits"], ["Contact", "/#contact"]];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-brand-steel/50 bg-brand-cream">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <a href="/" aria-label="Page Review Studio home">
          <PageReviewLogo decorative preload className="w-[14rem] sm:w-[20rem]" />
        </a>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="group relative text-[.66rem] font-semibold uppercase tracking-[.14em] text-brand-brown"><span>{label}</span><span className="absolute -bottom-2 left-0 h-px w-0 bg-brand-gold transition-all group-hover:w-full" /></a>)}
          <Button href="/#contact" className="ml-2">Book a consultation</Button>
        </nav>
        <button className="grid h-11 w-11 place-items-center xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <span className="space-y-1.5"><span className="block h-px w-6 bg-brand-brown" /><span className="block h-px w-6 bg-brand-brown" /></span>
        </button>
      </div>
      {open && <nav id="mobile-menu" className="border-t border-brand-steel/50 bg-brand-cream px-4 pb-6 xl:hidden" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-brand-steel/40 py-4 font-serif text-2xl text-brand-brown">{label}</a>)}<Button href="/#contact" className="mt-5 w-full">Book a consultation</Button></nav>}
    </header>
  );
}
