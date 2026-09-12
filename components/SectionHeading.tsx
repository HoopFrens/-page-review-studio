type Props = { eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; light?: boolean };

export default function SectionHeading({ eyebrow, title, intro, align = "left", light = false }: Props) {
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow mb-6 ${light ? "text-brand-gold" : "text-brand-blue"}`}>{eyebrow}</p>}
      <h2 className={`display text-5xl sm:text-6xl lg:text-7xl ${light ? "text-brand-cream" : "text-brand-brown"}`}>{title}</h2>
      {intro && <p className={`mt-7 max-w-2xl text-base leading-8 ${align === "center" ? "mx-auto" : ""} ${light ? "text-brand-tan" : "text-brand-brown/70"}`}>{intro}</p>}
    </header>
  );
}
