"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delayMs: number, durationMs = 700): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0px)" : "translateY(22px)",
    transition: `opacity ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <section className="min-h-[88vh] flex flex-col justify-center bg-canvas">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        {/* Studio label */}
        <p
          className="font-sans text-[0.62rem] font-semibold tracking-[0.32em] uppercase text-muted mb-10"
          style={reveal(200)}
        >
          JBAR Design Studio&ensp;—&ensp;Chicago, IL
        </p>

        {/* Headline */}
        <h1
          className="font-serif font-bold text-paper max-w-4xl"
          style={{
            fontSize: "clamp(3.4rem, 6.5vw, 6.8rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            fontVariationSettings: '"opsz" 144, "WONK" 0',
            ...reveal(380, 950),
          }}
        >
          Websites for the businesses
          <br />
          that built the neighborhood.
        </h1>

        {/* Red pricing line */}
        <p
          className="font-sans text-[0.88rem] font-medium text-red mt-8 tracking-wide"
          style={reveal(700)}
        >
          $400&ensp;·&ensp;Built in a week&ensp;·&ensp;Live forever
        </p>

        {/* CTA */}
        <div style={reveal(900)}>
          <a
            href="#contact"
            className="inline-block mt-8 font-sans text-[0.78rem] font-semibold tracking-[0.12em] uppercase text-red hover:text-red-dark transition-colors duration-200"
          >
            Let&apos;s talk&nbsp;→
          </a>
        </div>

        {/* Bottom rule */}
        <div
          className="mt-20 w-full h-px bg-paper/[0.07]"
          style={reveal(1100, 600)}
        />
      </div>
    </section>
  );
}
