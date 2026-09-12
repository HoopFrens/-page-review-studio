"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "./SectionHeading";

export default function SampleEdits() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "sample-edit",
        name: form.get("name"),
        email: form.get("email"),
        project: form.get("project"),
        status: form.get("status"),
        projectLink: form.get("projectLink"),
        message: form.get("message"),
      }),
    });

    setSending(false);

    if (!response.ok) {
      setError("Something went wrong. Please email Page Review Studio directly.");
      return;
    }

    setSent(true);
  }

  return (
    <section id="sample-edits" className="section-space bg-brand-brown text-brand-cream">
      <div className="container-page">
        <SectionHeading light eyebrow="Sample edits" title="See what thoughtful editing can reveal." intro="Request a sample edit and receive a clear sense of how Page Review Studio approaches voice, structure, clarity, and reader experience." />
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="grid gap-5 sm:grid-cols-2">{[["Line Edit Sample", "Clarity · Rhythm · Precision"], ["Voice & Style Notes", "Flow · Consistency · Polish"]].map(([title, detail], i) => <article key={title} className="group flex min-h-72 flex-col justify-between border border-brand-gold/50 p-7 transition-colors hover:bg-brand-cream/[.04]"><div className="flex justify-between"><span className="eyebrow text-brand-gold">Example {String(i + 1).padStart(2, "0")}</span><span className="font-serif text-3xl text-brand-gold">↗</span></div><div><h3 className="font-serif text-3xl">{title}</h3><p className="mt-3 text-sm text-brand-tan">{detail}</p></div></article>)}</div>
          <form onSubmit={submit} className="border-t border-brand-gold/50 pt-8" aria-label="Request a sample edit">
            {sent ? (
              <div role="status" className="border border-brand-gold p-8">
                <p className="font-serif text-3xl">Thank you.</p>
                <p className="mt-3 text-brand-tan">Your request has been received. I will respond within two business days.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <label className="text-xs uppercase tracking-wider text-brand-tan">Name<input required name="name" className="field !text-brand-cream" autoComplete="name" /></label>
                  <label className="text-xs uppercase tracking-wider text-brand-tan">Email<input required type="email" name="email" className="field !text-brand-cream" autoComplete="email" /></label>
                  <label className="text-xs uppercase tracking-wider text-brand-tan">Type of project<select required name="project" className="field !text-brand-cream"><option className="text-brand-brown" value="">Select one</option><option className="text-brand-brown">Book or memoir</option><option className="text-brand-brown">Thought leadership</option><option className="text-brand-brown">Essay or article</option><option className="text-brand-brown">Other</option></select></label>
                  <label className="text-xs uppercase tracking-wider text-brand-tan">Manuscript status<select required name="status" className="field !text-brand-cream"><option className="text-brand-brown" value="">Select one</option><option className="text-brand-brown">Idea or outline</option><option className="text-brand-brown">In progress</option><option className="text-brand-brown">Complete draft</option><option className="text-brand-brown">Previously edited</option></select></label>
                  <label className="text-xs uppercase tracking-wider text-brand-tan sm:col-span-2">Writing sample link <span className="normal-case tracking-normal text-brand-tan/70">(optional)</span><input name="projectLink" className="field !text-brand-cream" placeholder="Google Drive, Dropbox, or website link" /></label>
                  <label className="text-xs uppercase tracking-wider text-brand-tan sm:col-span-2">What would you like reviewed? <span className="normal-case tracking-normal text-brand-tan/70">(optional)</span><textarea name="message" className="field min-h-24 resize-y !text-brand-cream" rows={3} /></label>
                </div>
                {error ? <p role="alert" className="mt-5 text-sm text-brand-gold">{error}</p> : null}
                <button disabled={sending} className="mt-8 min-h-12 border border-brand-cream bg-brand-cream px-7 py-3 text-[.67rem] font-semibold uppercase tracking-[.16em] text-brand-brown transition-colors hover:border-brand-gold hover:bg-brand-gold disabled:cursor-wait disabled:opacity-65" type="submit">{sending ? "Sending..." : "Request sample edit"}</button>
                <p className="mt-5 text-xs text-brand-tan">Your writing will be treated with discretion and care.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
