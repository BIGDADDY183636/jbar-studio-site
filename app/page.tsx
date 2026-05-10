import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import WhatYouGet from "@/components/WhatYouGet";
import Process from "@/components/Process";
import Studio from "@/components/Studio";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionCounter from "@/components/SectionCounter";
import StickyNav from "@/components/StickyNav";
import FooterManifesto from "@/components/FooterManifesto";

export default function Home() {
  return (
    <>
      <Nav />
      <StickyNav />
      <SectionCounter />
      <main>
        <Hero />
        <Work />
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
