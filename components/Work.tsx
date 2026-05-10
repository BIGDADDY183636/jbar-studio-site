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
    category: "Café",
    name: "Linden & Oak",
    description:
      "Independent neighborhood café in Lincoln Square, Chicago. Full menu, hours, and story.",
    url: "https://cafe.jbar.studio",
  },
  {
    number: "04",
    category: "Auto",
    name: "Belmont Auto Works",
    description:
      "Family-run auto repair shop on Chicago's North Side. Three generations, one address.",
    url: "https://auto.jbar.studio",
  },
  {
    number: "05",
    category: "Salon",
    name: "Maren Studio",
    description:
      "Owner-operated hair salon in Lincoln Square. By appointment, built around one stylist.",
    url: "https://salon.jbar.studio",
  },
  {
    number: "06",
    category: "Fitness",
    name: "Northbridge Athletic",
    description:
      "Independent strength gym on Chicago's North Side. Coach-led, no-mirror.",
    url: "https://gym.jbar.studio",
  },
  {
    number: "07",
    category: "Bookstore",
    name: "Page & Spine",
    description:
      "Independent neighborhood bookstore. Carefully chosen books, Western Avenue.",
    url: "https://books.jbar.studio",
  },
];

export default function Work() {
  return (
    <>
      {/* Section header — anchors the #work nav link */}
      <div id="work" className="bg-canvas border-t border-red/[0.12] py-16">
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

      {/* Case studies */}
      {projects.map((p, i) => (
        <section
          key={p.number}
          className={`min-h-screen py-24 border-t border-red/[0.12] ${
            i % 2 === 0 ? "bg-canvas" : "bg-canvas-alt"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Technical bracket label */}
            <Reveal>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-8">
                <span className="text-red">[ </span>
                <span className="text-muted">
                  {p.number} / {p.category}
                </span>
                <span className="text-red"> ]</span>
              </p>
            </Reveal>

            {/* Project name */}
            <Reveal delay={0.1} duration={950}>
              <h2
                className="font-sans font-black text-paper leading-none mb-5"
                style={{
                  fontSize: "clamp(4rem, 8vw, 8rem)",
                  letterSpacing: "-0.035em",
                }}
              >
                {p.name}
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.18}>
              <p className="font-sans text-[0.88rem] text-muted mb-10 max-w-md leading-relaxed">
                {p.description}
              </p>
            </Reveal>

            {/* Live iframe */}
            <Reveal delay={0.24} duration={900}>
              <IframePreview
                src={p.url}
                title={p.name}
                className="h-[70vh] min-h-[480px]"
              />
            </Reveal>

            {/* View live — the only visible CTA text for this demo */}
            <Reveal delay={0.36}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 mt-6 font-sans text-[0.72rem] font-bold tracking-[0.16em] uppercase text-red hover:text-red-dark transition-colors duration-150"
              >
                View live site
                <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-150">
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
