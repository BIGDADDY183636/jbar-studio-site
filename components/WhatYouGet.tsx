import Reveal from "@/components/Reveal";

const included = [
  "Custom design (not a template)",
  "Mobile-first, fully responsive build",
  "Up to 5 pages",
  "Contact form",
  "Setup on your custom domain",
  "Free hosting on Vercel",
  "Two rounds of revisions",
  "Live launch in 7 days",
];

const excluded = [
  "E-commerce or booking systems (separate quote)",
  "Logo design",
  "Photography or copywriting",
  "SEO consulting",
];

export default function WhatYouGet() {
  return (
    <section className="bg-canvas-alt border-t border-paper/[0.06] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Centered label */}
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-10">
            <span className="text-red">[ </span>
            <span className="text-muted">02 / WHAT YOU GET</span>
            <span className="text-red"> ]</span>
          </p>
        </Reveal>

        {/* Centered headline */}
        <Reveal delay={0.1} duration={900}>
          <h2
            className="font-display font-semibold text-paper text-center mx-auto mb-16"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              maxWidth: "14ch",
            }}
          >
            What $400 gets you.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Included */}
          <div>
            <Reveal delay={0.14}>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-red mb-6">
                Included
              </p>
            </Reveal>
            <ul>
              {included.map((item, i) => (
                <Reveal key={item} delay={0.16 + i * 0.04}>
                  <li className="flex items-baseline gap-4 py-3.5 border-b border-paper/[0.07]">
                    <span className="text-red text-[0.75rem] flex-shrink-0 select-none">
                      →
                    </span>
                    <span className="font-sans text-[0.88rem] text-paper/80 leading-snug">
                      {item}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <Reveal delay={0.18}>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted mb-6">
                Not included
              </p>
            </Reveal>
            <ul>
              {excluded.map((item, i) => (
                <Reveal key={item} delay={0.2 + i * 0.04}>
                  <li className="flex items-baseline gap-4 py-3.5 border-b border-paper/[0.07]">
                    <span className="text-muted text-[0.75rem] flex-shrink-0 select-none">
                      —
                    </span>
                    <span className="font-sans text-[0.88rem] text-muted leading-snug">
                      {item}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4}>
              <p className="mt-10 font-sans text-[0.82rem] text-muted leading-relaxed max-w-xs">
                I&apos;m clear about scope so you get a faster site and no
                awkward conversations halfway through.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
