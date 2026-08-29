import Image from "next/image";
import Button from "./Button";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-stone">
      <div className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.18fr_.82fr] lg:py-20">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-4 text-terracotta"><span className="h-px w-10 bg-bronze" /> Boutique Editorial Studio</p>
          <h1 className="display max-w-4xl text-[clamp(4rem,8vw,7.5rem)] text-espresso">From rough draft to work worth remembering.</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-espresso/70 sm:text-lg">Editorial guidance, manuscript development, and writing partnership for authors and experts who want their ideas presented at their highest level.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button href="#contact">Book a consultation</Button><Button href="#sample-edits" variant="outline">Request a sample edit</Button></div>
          <p className="mt-10 max-w-xl border-l border-bronze pl-5 font-serif text-xl italic text-espresso/80">For authors, founders, memoirists, and subject matter experts with something worth saying.</p>
        </Reveal>
        <Reveal className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -left-5 -top-5 hidden h-full w-full border border-bronze/60 sm:block" />
          <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
            <Image
              src="/images/krystal-williams-headshot.jpeg"
              alt="Krystal Williams, founder of Page Review Studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[50%_38%] transition-transform duration-700 hover:scale-[1.025]"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espresso/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-ivory/20 p-5 text-ivory">
              <div><p className="font-serif text-2xl">Krystal Williams</p><p className="mt-1 text-[.55rem] uppercase tracking-[.2em] text-stone">Founder & Editorial Director</p></div>
              <span className="text-[.55rem] uppercase tracking-[.2em] text-stone">Page Review Studio</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
