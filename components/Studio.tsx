import Reveal from "@/components/Reveal";

export default function Studio() {
  return (
    <section id="studio" className="bg-canvas-alt border-t border-paper/[0.06] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Centered label */}
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-10">
            <span className="text-paper/30">[ </span>
            <span className="text-muted">04 / STUDIO</span>
            <span className="text-paper/30"> ]</span>
          </p>
        </Reveal>

        {/* Centered heading */}
        <Reveal delay={0.1} duration={900}>
          <h2
            className="font-sans font-black text-paper text-center mx-auto mb-14"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              letterSpacing: "-0.025em",
              maxWidth: "14ch",
            }}
          >
            About the studio.
          </h2>
        </Reveal>

        {/* Centered narrow body column */}
        <div className="max-w-2xl mx-auto space-y-5">
          <Reveal delay={0.14}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              JBAR Design Studio is an independent web practice based on
              Chicago&apos;s North Side. I build websites for independent
              businesses who&apos;d rather run their business than wrestle with
              Wix.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              I work with one client at a time. Every site is built from
              scratch — no templates, no themes, no page builders. The result is
              a site that looks like your business, not like everyone
              else&apos;s. I keep the price flat and the timeline short because
              that&apos;s what independent business owners actually need.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              If you run an independent business in Chicago and you&apos;ve been
              meaning to get a real website, that&apos;s what JBAR is for.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
