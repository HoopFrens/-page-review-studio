type Props = { eyebrow?: string; title: string; intro?: string; align?: "left" | "center"; light?: boolean };

export default function SectionHeading({ eyebrow, title, intro, align = "left", light = false }: Props) {
  return (
    <header className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow mb-6 ${light ? "text-bronze" : "text-terracotta"}`}>{eyebrow}</p>}
      <h2 className={`display text-5xl sm:text-6xl lg:text-7xl ${light ? "text-ivory" : "text-espresso"}`}>{title}</h2>
      {intro && <p className={`mt-7 max-w-2xl text-base leading-8 ${align === "center" ? "mx-auto" : ""} ${light ? "text-stone" : "text-espresso/70"}`}>{intro}</p>}
    </header>
  );
}
