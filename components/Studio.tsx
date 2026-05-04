export default function Studio() {
  return (
    <section id="studio" className="bg-paper py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 pb-6 border-b border-ink/10">
          <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-ink/40">
            Studio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start">
          {/* Label col */}
          <div>
            <h2
              className="font-serif font-bold text-ink leading-tight"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontVariationSettings: '"opsz" 72, "WONK" 0',
                letterSpacing: "-0.015em",
              }}
            >
              JBAR Design Studio
            </h2>
          </div>

          {/* Copy col */}
          <div className="space-y-6 font-sans text-[0.95rem] leading-[1.82] text-ink/70">
            <p>
              JBAR Design Studio is a small independent web studio based on
              Chicago&apos;s North Side. We build websites for local businesses
              who&apos;d rather run their business than wrestle with Wix.
            </p>
            <p>
              We work with one client at a time. Every site is built from
              scratch — no templates, no themes, no page builders. The result is
              a site that looks like your business, not like everyone
              else&apos;s. We keep the price flat and the timeline short because
              that&apos;s what small business owners actually need.
            </p>
            <p>
              If you&apos;re a small business owner in Chicago and you&apos;ve
              been meaning to get a real website, that&apos;s why we exist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
