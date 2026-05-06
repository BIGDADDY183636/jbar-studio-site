import Reveal from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Talk",
    desc: "A 15-minute call to understand your business, your customers, and what you actually need.",
  },
  {
    number: "02",
    title: "Design",
    desc: "First draft within 3 days. You'll see the full site — desktop and mobile — before we write a line of code.",
  },
  {
    number: "03",
    title: "Build",
    desc: "One round of revisions on the design, then we build. No feature creep. No moving targets.",
  },
  {
    number: "04",
    title: "Launch",
    desc: "Live on your domain, fully working. We handle the deployment so you don't have to.",
  },
];

export default function Process() {
  return (
    <section className="bg-canvas border-t border-paper/[0.06] py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Centered label */}
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center mb-10">
            <span className="text-red">[ </span>
            <span className="text-muted">03 / PROCESS</span>
            <span className="text-red"> ]</span>
          </p>
        </Reveal>

        {/* Centered headline */}
        <Reveal delay={0.1} duration={900}>
          <h2
            className="font-sans font-black text-paper text-center mx-auto mb-16"
            style={{
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              letterSpacing: "-0.025em",
              maxWidth: "12ch",
            }}
          >
            How it works.
          </h2>
        </Reveal>

        {/* 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.12 + i * 0.08}>
              <div className="bg-canvas-raised border border-paper/[0.07] p-7 rounded-sm h-full">
                <p className="font-mono text-[0.58rem] tracking-[0.3em] uppercase text-red mb-6">
                  {step.number}
                </p>
                <h3
                  className="font-sans font-bold text-paper text-[1.5rem] leading-tight mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-[0.83rem] text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
