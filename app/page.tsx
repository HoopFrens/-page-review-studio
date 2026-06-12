import About from "@/components/About";
import Audience from "@/components/Audience";
import Authority from "@/components/Authority";
import Contact from "@/components/Contact";
import EditorialPhilosophy from "@/components/EditorialPhilosophy";
import EmailCapture from "@/components/EmailCapture";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Process from "@/components/Process";
import SampleEdits from "@/components/SampleEdits";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Authority />
        <About />
        <EditorialPhilosophy />
        <Services />
        <Process />
        <Audience />
        <SampleEdits />
        <FAQ />
        <EmailCapture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
