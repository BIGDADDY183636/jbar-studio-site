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
    transform: mounted ? "translateY(0px)" : "translateY(20px)",
    transition: `opacity ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center bg-canvas overflow-hidden">

      {/* Ambient gradient blobs — barely there, only noticed on second visit */}
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

      {/* Content — centered */}
      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 w-full text-center">
        {/* Studio label */}
        <p
          className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-muted mb-10"
          style={reveal(200)}
        >
          JBAR Design Studio&ensp;—&ensp;Chicago, IL
        </p>

        {/* Headline — Inter 900, massive, centered */}
        <h1
          className="font-sans font-black text-paper mx-auto"
          style={{
            fontSize: "clamp(3rem, 6vw, 6.4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            maxWidth: "18ch",
            ...reveal(360, 950),
          }}
        >
          Websites for the businesses that built the neighborhood.
        </h1>

        {/* Red pricing line */}
        <p
          className="font-mono text-[0.78rem] text-red mt-8 tracking-[0.18em] uppercase"
          style={reveal(680)}
        >
          $400&ensp;·&ensp;Built in a week&ensp;·&ensp;Live forever
        </p>

        {/* CTA — centered button with glow */}
        <div
          className="flex justify-center mt-10"
          style={reveal(880)}
        >
          <a
            href="#contact"
            className="btn-glow inline-flex items-center gap-2 font-sans text-[0.75rem] font-semibold tracking-[0.12em] uppercase bg-red text-paper px-7 py-3.5 rounded-full"
          >
            Let&apos;s talk
            <span className="inline-block">→</span>
          </a>
        </div>

        {/* Bottom rule */}
        <div
          className="mt-20 w-full h-px bg-paper/[0.07]"
          style={reveal(1080, 600)}
        />
      </div>
    </section>
  );
}
