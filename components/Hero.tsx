export default function Hero() {
  return (
    <section className="min-h-[88vh] flex flex-col justify-center bg-paper">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        {/* Studio label */}
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.28em] uppercase text-ink/35 mb-10">
          JBAR Design Studio&ensp;—&ensp;Chicago, IL
        </p>

        {/* Headline — authoritative, Fraunces at maximum sharpness */}
        <h1
          className="font-serif font-bold text-ink max-w-4xl"
          style={{
            fontSize: "clamp(3rem, 5.8vw, 5.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontVariationSettings: '"opsz" 144, "WONK" 0',
          }}
        >
          Websites for the businesses
          <br />
          that built the neighborhood.
        </h1>

        {/* Subhead */}
        <p className="font-sans text-[1rem] font-normal text-ink/55 mt-8 tracking-wide">
          $400 flat.&ensp;Built in a week.&ensp;Live forever.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="#contact"
            className="inline-block font-sans text-[0.75rem] font-semibold tracking-[0.12em] uppercase bg-accent text-paper px-7 py-3.5 rounded-sm hover:bg-accent-hover transition-colors duration-200"
          >
            Start a project&nbsp;→
          </a>
        </div>

        {/* Bottom rule — structural, not decorative */}
        <div className="mt-20 w-full h-px bg-ink/8" />
      </div>
    </section>
  );
}
