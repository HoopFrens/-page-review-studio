import PageReviewLogo from "./Logo";

const links = [["About", "/#about"], ["Services", "/#services"], ["Process", "/#process"], ["Reviews", "/#reviews"], ["Sample Edits", "/#sample-edits"], ["Contact", "/#contact"]];

export default function Footer() {
  return (
    <footer className="bg-brand-brown py-14 text-brand-cream">
      <div className="container-page">
        <div className="grid gap-10 border-b border-brand-gold/40 pb-12 sm:grid-cols-2 lg:grid-cols-[1fr_auto]">
          <div>
            <PageReviewLogo variant="stacked" framed className="w-[12rem] sm:w-[13rem]" />
            <p className="mt-6 max-w-sm font-serif text-2xl text-brand-tan">
              An editorial partner for people with something worth saying.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-4 self-end text-[.65rem] font-semibold uppercase tracking-[.15em] text-brand-tan sm:grid-cols-3 lg:grid-cols-6" aria-label="Footer navigation">
            {links.map(([label, href]) => (
              <a key={href} className="transition-colors hover:text-brand-cream" href={href}>{label}</a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-[.6rem] uppercase tracking-[.14em] text-brand-tan/80 sm:flex-row sm:justify-between">
          <p>© 2026 Page Review Studio. All rights reserved.</p>
          <p>Ideas shaped with care.</p>
        </div>
      </div>
    </footer>
  );
}
