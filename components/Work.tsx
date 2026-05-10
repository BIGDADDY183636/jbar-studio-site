import IframePreview from "@/components/IframePreview";
import Reveal from "@/components/Reveal";

const projects = [
  {
    number: "01",
    category: "Florist",
    name: "Ash & Birch",
    description:
      "Independent Chicago florist. Hand-tied stems, weekly subscriptions, custom event florals. Logan Square.",
    url: "https://florist.jbar.studio",
  },
  {
    number: "02",
    category: "Accounting",
    name: "Halsted Ledger",
    description:
      "Independent tax and accounting firm for Chicago's small businesses. Advisory, bookkeeping, year-round support.",
    url: "https://tax.jbar.studio",
  },
  {
    number: "03",
    category: "Salon",
    name: "Maren Studio",
    description:
      "Owner-operated hair salon in Lincoln Square. By appointment, built around one stylist.",
    url: "https://salon.jbar.studio",
  },
  {
    number: "04",
    category: "Bookstore",
    name: "Page & Spine",
    description:
      "Independent neighborhood bookstore. Carefully chosen books, Western Avenue.",
    url: "https://books.jbar.studio",
  },
  {
    number: "05",
    category: "Café",
    name: "Linden & Oak",
    description:
      "Independent neighborhood café in Lincoln Square, Chicago. Full menu, hours, and story.",
    url: "https://cafe.jbar.studio",
  },
  {
    number: "06",
    category: "Auto",
    name: "Belmont Auto Works",
    description:
      "Family-run auto repair shop on Chicago's North Side. Three generations, one address.",
    url: "https://auto.jbar.studio",
  },
  {
    number: "07",
    category: "Fitness",
    name: "Northbridge Athletic",
    description:
      "Independent strength gym on Chicago's North Side. Coach-led, no-mirror.",
    url: "https://gym.jbar.studio",
  },
];

export default function Work() {
  return (
    <>
      {/* Section header */}
      <div id="work" className="bg-canvas border-t border-red/[0.12] py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase">
              <span className="text-red">[ </span>
              <span className="text-muted">01 / CONCEPT WORK</span>
              <span className="text-red"> ]</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-[0.56rem] tracking-[0.12em] text-muted/40 mt-3">
              Concept builds — designed to demonstrate range. Not real businesses.
            </p>
          </Reveal>
        </div>
      </div>

      {/* 2-column compact grid */}
      <section className="border-t border-red/[0.12]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal
                key={p.number}
                delay={i % 2 === 0 ? 0 : 0.08}
                className={[
                  "px-8 py-10",
                  "border-b border-red/[0.08]",
                  i % 2 === 0 ? "md:border-r border-red/[0.08]" : "",
                  Math.floor(i / 2) % 2 === 0 ? "bg-canvas" : "bg-canvas-alt",
                ].join(" ")}
              >
                {/* Bracket label */}
                <p className="font-mono text-[0.58rem] tracking-[0.2em] uppercase mb-5">
                  <span className="text-red">[ </span>
                  <span className="text-muted">
                    {p.number} / {p.category}
                  </span>
                  <span className="text-red"> ]</span>
                </p>

                {/* Project name */}
                <h2
                  className="font-sans font-black text-paper leading-none mb-3"
                  style={{
                    fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {p.name}
                </h2>

                {/* Description */}
                <p className="font-sans text-[0.82rem] text-muted mb-6 max-w-xs leading-relaxed">
                  {p.description}
                </p>

                {/* Iframe */}
                <IframePreview
                  src={p.url}
                  title={p.name}
                  className="h-[210px]"
                />

                {/* View live */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 mt-5 font-sans text-[0.72rem] font-bold tracking-[0.16em] uppercase text-red hover:text-red-dark transition-colors duration-150"
                >
                  View live site
                  <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-150">
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
