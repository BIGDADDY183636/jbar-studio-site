import Reveal from "@/components/Reveal";

export default function Studio() {
  return (
    <section id="studio" className="bg-canvas-alt border-t border-paper/[0.06] py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Centered label */}
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-10">
            <span className="text-paper/30">[ </span>
            <span className="text-muted">04 / ABOUT</span>
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
            About JBAR.
          </h2>
        </Reveal>

        {/* Centered narrow body column */}
        <div className="max-w-2xl mx-auto space-y-5">
          <Reveal delay={0.14}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              I&apos;m Jake. I&apos;m 13, and I build the websites at JBAR.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              I know hiring a 13-year-old to build your business&apos;s website
              sounds like a risk. I take that seriously. Every site I build is
              custom-coded, mobile-responsive, fast-loading, and designed around
              your business — not dropped into a template. You can see exactly
              what I build at the demos on this site. That&apos;s the standard.
              If I can&apos;t deliver it, you don&apos;t pay.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              My dad partners with me on the business side — contracts, invoices,
              accountability. I do the design, code, and client calls. We work as
              a team, which is why we can keep the price at $400 instead of
              charging what an agency would.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="font-sans text-[0.92rem] text-paper/65 leading-[1.85]">
              I&apos;m doing this because I want to build things, and I want to
              be good at it. Your business getting a great website is how I get
              there. I take the work as seriously as you take yours.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
