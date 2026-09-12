"use client";

import { useState, type FormEvent } from "react";

export default function EmailCapture() {
  const [sent, setSent] = useState(false);
  return (
    <section className="border-y border-brand-tan bg-brand-linen">
      <div className="container-page grid gap-8 py-16 lg:grid-cols-[1fr_.85fr] lg:items-end">
        <div>
          <p className="eyebrow text-brand-blue">The studio letter</p>
          <h2 className="display mt-4 text-5xl text-brand-brown sm:text-6xl">Notes From The Margin</h2>
          <p className="mt-4 text-brand-brown/65">
            Occasional insights on writing, editing, publishing, and manuscript development.
          </p>
        </div>
        {sent ? (
          <p role="status" className="border-l border-brand-gold pl-5 font-serif text-2xl text-brand-brown">
            You’re on the list. A thoughtful note will arrive soon.
          </p>
        ) : (
          <form
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                required
                type="email"
                placeholder="Email address"
                className="field flex-1"
                autoComplete="email"
              />
              <button className="min-h-12 bg-brand-blue px-7 text-[.67rem] font-semibold uppercase tracking-[.16em] text-brand-cream transition-colors hover:bg-brand-brown">
                Subscribe
              </button>
            </div>
            <p className="mt-3 text-xs text-brand-brown/50">No noise. Just thoughtful notes for serious writers.</p>
          </form>
        )}
      </div>
    </section>
  );
}
