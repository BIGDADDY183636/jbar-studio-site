import Nav from "@/components/Nav";
import HeroTransition from "@/components/HeroTransition";
import WhatYouGet from "@/components/WhatYouGet";
import Process from "@/components/Process";
import Studio from "@/components/Studio";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionCounter from "@/components/SectionCounter";
import StickyNav from "@/components/StickyNav";
import ScreenshotReveal from "@/components/ScreenshotReveal";
import FooterManifesto from "@/components/FooterManifesto";

export default function Home() {
  return (
    <>
      <ScreenshotReveal />
      <Nav />
      <StickyNav />
      <SectionCounter />
      <main>
        <HeroTransition />
        <div id="what-you-get">
          <WhatYouGet />
        </div>
        <div id="process">
          <Process />
        </div>
        <Studio />
        <FAQ />
        <Contact />
      </main>
      <FooterManifesto />
      <Footer />
    </>
  );
}
