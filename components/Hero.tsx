// No client logic needed — pure CSS animations.

const WORDMARK = [
  { letter: "J", color: "#d63031",              delay: "200ms" },
  { letter: "B", color: "rgba(244,241,234,0.85)", delay: "400ms" },
  { letter: "A", color: "rgba(244,241,234,0.85)", delay: "600ms" },
  { letter: "R", color: "rgba(244,241,234,0.85)", delay: "800ms" },
];

const letterStyle = (color: string, delay: string): React.CSSProperties => ({
  fontFamily: "var(--font-inter), sans-serif",
  fontWeight: 900,
  fontSize: "clamp(120px, 22vw, 280px)",
  letterSpacing: "-0.04em",
  color,
  animationDelay: delay,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex flex-col items-center justify-center bg-canvas overflow-hidden"
    >
      {/* Ambient gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div
          className="ambient-blob-1 absolute rounded-full blur-[120px]"
          style={{
            width: "640px",
            height: "640px",
            top: "-200px",
            right: "-80px",
            background:
              "radial-gradient(circle, rgba(214,48,49,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="ambient-blob-2 absolute rounded-full blur-[100px]"
          style={{
            width: "520px",
            height: "520px",
            bottom: "-160px",
            left: "-60px",
            background:
              "radial-gradient(circle, rgba(180,28,28,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 w-full text-center">
        {/* Booking status pill */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red/[0.07] border border-red/20 mb-8"
          style={{ animation: "heroFadeIn 600ms ease 100ms both" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse flex-shrink-0" />
          <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-red/70">
            Booking now
          </span>
        </div>

        {/* Studio label */}
        <p
          className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-muted mb-10"
          style={{ animation: "heroFadeIn 600ms ease 300ms both" }}
        >
          JBAR Design Studio&ensp;—&ensp;Chicago, IL
        </p>

        {/* JBAR Wordmark — letters drop in with spring bounce, staggered */}
        {/* overflow-hidden clips letters above the row until they enter */}
        <div
          className="flex items-end justify-center overflow-hidden select-none"
          style={{ lineHeight: 0.85 }}
        >
          {WORDMARK.map(({ letter, color, delay }) => (
            <span
              key={letter}
              className="letter-drop"
              style={letterStyle(color, delay)}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subheadline, pricing, CTA */}
        <div
          style={{
            animation:
              "heroFadeUp 700ms cubic-bezier(0.16,1,0.3,1) 1400ms both",
          }}
        >
          <h1
            className="font-sans font-black text-paper mx-auto mt-8"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
              letterSpacing: "-0.025em",
              maxWidth: "22ch",
              lineHeight: 1.15,
            }}
          >
            Custom websites for Chicago&apos;s independent businesses.
          </h1>

          <p className="font-mono text-[0.78rem] text-red mt-6 tracking-[0.18em] uppercase">
            $400&ensp;·&ensp;Built in a week&ensp;·&ensp;Live forever
          </p>

          <div className="flex justify-center mt-8">
            <a
              href="#contact"
              className="btn-glow inline-flex items-center gap-2 font-sans text-[0.75rem] font-semibold tracking-[0.12em] uppercase bg-red text-paper px-7 py-3.5 rounded-full"
            >
              Let&apos;s talk
              <span className="inline-block">→</span>
            </a>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className="mt-20 w-full h-px bg-paper/[0.07]"
          style={{ animation: "heroFadeIn 600ms ease 1800ms both" }}
        />
      </div>
    </section>
  );
}
