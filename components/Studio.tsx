import Reveal from "@/components/Reveal";

export default function Studio() {
  return (
    <section id="studio" className="bg-canvas-alt border-t border-paper/[0.06] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <Reveal>
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.38em] uppercase text-red mb-12">
            04&ensp;/&ensp;STUDIO
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          {/* Left: serif lead */}
          <Reveal delay={0.1} duration={900}>
            <h2
              className="font-serif font-bold text-paper leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                letterSpacing: "-0.02em",
                fontVariationSettings: '"opsz" 72, "WONK" 0',
              }}
            >
              About the studio.
            </h2>
          </Reveal>

          {/* Right: copy */}
          <div className="space-y-5">
            <Reveal delay={0.14}>
              <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
                JBAR Design Studio is a small independent web studio based on
                Chicago&apos;s North Side. We build websites for local businesses
                who&apos;d rather run their business than wrestle with Wix.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
                We work with one client at a time. Every site is built from
                scratch — no templates, no themes, no page builders. The result is
                a site that looks like your business, not like everyone
                else&apos;s. We keep the price flat and the timeline short because
                that&apos;s what small business owners actually need.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
                If you&apos;re a small business owner in Chicago and you&apos;ve
                been meaning to get a real website, that&apos;s why we exist.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
