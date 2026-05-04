import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import WhatYouGet from "@/components/WhatYouGet";
import Process from "@/components/Process";
import Studio from "@/components/Studio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <WhatYouGet />
        <Process />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
