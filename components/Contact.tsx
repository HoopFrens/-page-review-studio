"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeading from "./SectionHeading";

const projectTypes = ["Line editing", "Graphic design", "Not sure yet"];
const designStatuses = ["Idea or brief", "Materials ready", "Updating an existing design", "Not sure yet"];
const statuses = ["Idea or outline", "In progress", "Complete draft", "Previously edited"];
const budgets = ["$2,500–$5,000", "$5,000–$10,000", "$10,000+", "Not sure yet"];

export default function Contact() {
  return <Suspense><ContactForm /></Suspense>;
}

function ContactForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const [project, setProject] = useState("");
  const isEditing = project === "Line editing";
  useEffect(() => {
    if (requestedService === "graphic-design") setProject("Graphic design");
    if (requestedService === "line-editing") setProject("Line editing");
  }, [requestedService]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: form.get("name"),
          email: form.get("email"),
          project: form.get("project"),
          status: form.get("status"),
          wordCount: form.get("wordCount"),
          timeline: form.get("timeline"),
          budget: form.get("budget"),
          message: form.get("message"),
          projectLink: form.get("projectLink"),
        }),
      });

      if (!response.ok) {
        setError("Something went wrong. Please email Page Review Studio directly.");
        return;
      }

      setSent(true);
    } catch {
      setError("Your inquiry could not be sent. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="section-space">
      <div className="container-page grid gap-16 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <SectionHeading
            eyebrow="Begin a conversation"
            title="Let’s make your best work inevitable."
            intro="Tell us about your manuscript or graphic design project. You will receive a thoughtful response within two business days."
          />
          <div className="mt-10 border-t hairline pt-6">
            <p className="eyebrow text-brand-muted">Response time</p>
            <p className="mt-2 font-serif text-2xl text-brand-brown">Within two business days.</p>
          </div>
        </div>
        {sent ? (
          <div role="status" className="self-start border border-brand-gold bg-brand-linen p-10">
            <p className="font-serif text-4xl text-brand-brown">Thank you.</p>
            <p className="mt-4 leading-8 text-brand-muted">Your inquiry has been received. I will respond within two business days.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2" aria-label="Project inquiry form">
            <label className="text-xs uppercase tracking-wider">Name<input required className="field" name="name" autoComplete="name" /></label>
            <label className="text-xs uppercase tracking-wider">Email<input required type="email" className="field" name="email" autoComplete="email" /></label>
            <label className="text-xs uppercase tracking-wider">Project type<select required className="field" name="project" value={project} onChange={(event) => setProject(event.target.value)}><option value="">Select one</option>{projectTypes.map(x => <option key={x}>{x}</option>)}</select></label>
            <label className="text-xs uppercase tracking-wider">{isEditing ? "Manuscript status" : "Project stage"}<select key={isEditing ? "manuscript" : "design"} required className="field" name="status"><option value="">Select one</option>{(isEditing ? statuses : designStatuses).map(x => <option key={x}>{x}</option>)}</select></label>
            {isEditing ? <label className="text-xs uppercase tracking-wider">Estimated word count<input className="field" name="wordCount" placeholder="e.g. 65,000" /></label> : null}
            <label className="text-xs uppercase tracking-wider">Desired timeline<input className="field" name="timeline" placeholder="e.g. Within the next two months" /></label>
            {isEditing ? (
              <label className="text-xs uppercase tracking-wider sm:col-span-2">Budget range<select required className="field" name="budget"><option value="">Select one</option>{budgets.map(x => <option key={x}>{x}</option>)}</select></label>
            ) : (
              <label className="text-xs uppercase tracking-wider sm:col-span-2">Budget <span className="normal-case tracking-normal text-brand-muted">(optional)</span><input className="field" name="budget" placeholder="Share a budget, or leave blank to request a quote" /><span className="mt-2 block normal-case tracking-normal text-brand-muted">Graphic design is quoted individually based on your project.</span></label>
            )}
            <label className="text-xs uppercase tracking-wider sm:col-span-2">Project or reference link <span className="normal-case tracking-normal text-brand-muted">(optional)</span><input className="field" name="projectLink" placeholder="Google Drive, Dropbox, or website link" /></label>
            <label className="text-xs uppercase tracking-wider sm:col-span-2">Tell us about the work<textarea required className="field min-h-32 resize-y" name="message" rows={4} placeholder={isEditing ? "Tell us about your manuscript and the support you need." : "What would you like to create, who is it for, and how will it be used?"} /></label>
            <label className="flex gap-3 text-sm leading-6 text-brand-muted sm:col-span-2"><input required type="checkbox" className="mt-1 h-4 w-4 accent-brand-blue" /><span>I give Page Review Studio permission to review the material submitted for the purpose of responding to this inquiry.</span></label>
            {error ? <p role="alert" className="text-sm text-brand-blue sm:col-span-2">{error}</p> : null}
            <button disabled={sending} type="submit" className="min-h-12 bg-brand-blue px-7 py-3 text-[.67rem] font-semibold uppercase tracking-[.16em] text-brand-cream transition-colors hover:bg-brand-brown disabled:cursor-wait disabled:opacity-65 sm:col-span-2 sm:justify-self-start">{sending ? "Sending..." : "Submit inquiry"}</button>
          </form>
        )}
      </div>
    </section>
  );
}
