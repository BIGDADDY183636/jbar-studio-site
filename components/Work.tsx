import IframePreview from "@/components/IframePreview";

const projects = [
  {
    number: "01",
    category: "Café",
    name: "Linden & Oak",
    description:
      "Independent neighborhood café in Lincoln Square, Chicago. Full menu, hours, and story.",
    url: "https://cafe.jbar.studio",
  },
  {
    number: "02",
    category: "Auto",
    name: "Belmont Auto Works",
    description:
      "Family-run auto repair shop on Chicago's North Side. Three generations, one address.",
    url: "https://auto.jbar.studio",
  },
  {
    number: "03",
    category: "Salon",
    name: "Maren Studio",
    description:
      "Owner-operated hair salon in Lincoln Square. By appointment, built around one stylist.",
    url: "https://salon.jbar.studio",
  },
];

export default function Work() {
  return (
    <section id="work" className="bg-paper-warm">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-0 pb-6 border-b border-ink/10">
          <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-ink/40">
            Selected Work
          </p>
          <p className="font-sans text-[0.65rem] text-ink/30 tracking-wide">
            2024 – 2025
          </p>
        </div>

        {/* Case studies */}
        {projects.map((p) => (
          <div key={p.number} className="border-b border-ink/10 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
              {/* Left: metadata + title */}
              <div>
                <p className="font-sans text-[0.6rem] font-semibold tracking-[0.3em] uppercase text-accent mb-5">
                  {p.number}&ensp;/&ensp;{p.category}
                </p>
                <h2
                  className="font-serif font-bold text-ink leading-tight"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    fontVariationSettings: '"opsz" 72, "WONK" 0',
                    letterSpacing: "-0.015em",
                  }}
                >
                  {p.name}
                </h2>
                <p className="font-sans text-[0.88rem] text-ink-muted mt-4 leading-relaxed max-w-xs">
                  {p.description}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 font-sans text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-accent hover:text-accent-hover transition-colors"
                >
                  View live site&nbsp;→
                </a>
              </div>

              {/* Right: iframe preview */}
              <IframePreview src={p.url} title={p.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
