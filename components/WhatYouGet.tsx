const included = [
  "Custom design — not a template",
  "Mobile-first, fully responsive build",
  "Up to 5 pages",
  "Contact form",
  "Setup on your custom domain",
  "Hosted free on Vercel",
  "One round of revisions",
  "Live in 7 days",
];

const excluded = [
  "E-commerce or booking systems (separate quote)",
  "Logo design",
  "Photography or copywriting",
  "SEO consulting",
];

export default function WhatYouGet() {
  return (
    <section className="bg-paper py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 pb-6 border-b border-ink/10">
          <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-ink/40 mb-5">
            Scope
          </p>
          <h2
            className="font-serif font-bold text-ink leading-tight max-w-xl"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontVariationSettings: '"opsz" 72, "WONK" 0',
              letterSpacing: "-0.015em",
            }}
          >
            What $400 gets you.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Included */}
          <div>
            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.25em] uppercase text-accent mb-6">
              What&apos;s included
            </p>
            <ul className="space-y-0 divide-y divide-ink/[0.07]">
              {included.map((item) => (
                <li
                  key={item}
                  className="py-3.5 font-sans text-[0.9rem] text-ink/80 leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <p className="font-sans text-[0.62rem] font-semibold tracking-[0.25em] uppercase text-ink/30 mb-6">
              What we don&apos;t do
            </p>
            <ul className="space-y-0 divide-y divide-ink/[0.07]">
              {excluded.map((item) => (
                <li
                  key={item}
                  className="py-3.5 font-sans text-[0.9rem] text-ink-muted leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-sans text-[0.82rem] text-ink-muted leading-relaxed max-w-xs">
              Being clear about what we don&apos;t do means you get a faster result
              and no awkward scope conversations halfway through.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
