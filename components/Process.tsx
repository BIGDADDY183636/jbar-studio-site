const steps = [
  {
    number: "01",
    title: "Talk",
    description:
      "A 15-minute call to understand your business, your customers, and what you actually need.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "First draft within 3 days. You&apos;ll see the full site — desktop and mobile — before we write a line of code.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "One round of revisions on the design, then we build. No feature creep. No moving targets.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Live on your domain, fully working. We handle the deployment so you don&apos;t have to.",
  },
];

export default function Process() {
  return (
    <section className="bg-paper-warm py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 pb-6 border-b border-ink/10">
          <p className="font-sans text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-ink/40 mb-5">
            Process
          </p>
          <h2
            className="font-serif font-bold text-ink leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontVariationSettings: '"opsz" 72, "WONK" 0',
              letterSpacing: "-0.015em",
            }}
          >
            How it works.
          </h2>
        </div>

        {/* 4-step grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-ink/10">
          {steps.map((step) => (
            <div key={step.number} className="px-0 sm:px-8 lg:px-10 py-8 sm:py-0 first:pl-0 last:pr-0">
              <p className="font-sans text-[0.6rem] font-semibold tracking-[0.28em] uppercase text-accent mb-4">
                {step.number}
              </p>
              <h3
                className="font-serif font-bold text-ink text-[1.5rem] leading-tight mb-3"
                style={{ fontVariationSettings: '"opsz" 24, "WONK" 0' }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans text-[0.83rem] text-ink-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
