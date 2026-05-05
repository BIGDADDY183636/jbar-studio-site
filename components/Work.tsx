import IframePreview from "@/components/IframePreview";
import Reveal from "@/components/Reveal";

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
    <>
      {projects.map((p, i) => (
        <section
          key={p.number}
          id={i === 0 ? "work" : undefined}
          className={`min-h-screen py-24 ${
            i % 2 === 0 ? "bg-canvas" : "bg-canvas-alt"
          } ${i > 0 ? "border-t border-red/[0.12]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Number + category */}
            <Reveal>
              <p className="font-sans text-[0.6rem] font-bold tracking-[0.38em] uppercase text-red mb-8">
                {p.number}&ensp;/&ensp;{p.category}
              </p>
            </Reveal>

            {/* Project name — the statement */}
            <Reveal delay={0.1} duration={950}>
              <h2
                className="font-serif font-bold text-paper leading-none mb-5"
                style={{
                  fontSize: "clamp(4rem, 8vw, 8rem)",
                  letterSpacing: "-0.03em",
                  fontVariationSettings: '"opsz" 144, "WONK" 0',
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

            {/* Live iframe — the centerpiece */}
            <Reveal delay={0.24} duration={900}>
              <IframePreview
                src={p.url}
                title={p.name}
                className="h-[70vh] min-h-[480px]"
              />
            </Reveal>

            {/* View live link */}
            <Reveal delay={0.36}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-sans text-[0.72rem] font-bold tracking-[0.16em] uppercase text-red hover:text-red-dark transition-colors duration-150"
              >
                View live site&nbsp;→
              </a>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
