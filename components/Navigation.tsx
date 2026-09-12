"use client";

import { useState } from "react";
import Button from "./Button";
import PageReviewLogo from "./Logo";

const links = [["About", "/#about"], ["Services", "/#services"], ["Process", "/#process"], ["Reviews", "/#reviews"], ["Sample Edits", "/#sample-edits"], ["Contact", "/#contact"]];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-brand-tan/70 bg-brand-cream/95 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <a href="/" aria-label="Page Review Studio home">
          <PageReviewLogo decorative preload className="w-[10.75rem] sm:w-[13rem]" />
        </a>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="group relative text-[.66rem] font-semibold uppercase tracking-[.14em] text-brand-brown"><span>{label}</span><span className="absolute -bottom-2 left-0 h-px w-0 bg-brand-blue transition-all group-hover:w-full" /></a>)}
          <Button href="/#contact" className="ml-2">Book a consultation</Button>
        </nav>
        <button className="grid h-11 w-11 place-items-center xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">
          <span className="space-y-1.5"><span className="block h-px w-6 bg-brand-brown" /><span className="block h-px w-6 bg-brand-brown" /></span>
        </button>
      </div>
      {open && <nav id="mobile-menu" className="border-t border-brand-tan bg-brand-cream px-4 pb-6 xl:hidden" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-brand-tan/60 py-4 font-serif text-2xl text-brand-brown">{label}</a>)}<Button href="/#contact" className="mt-5 w-full">Book a consultation</Button></nav>}
    </header>
  );
}
