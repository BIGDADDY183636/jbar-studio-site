"use client";

import { useEffect, useRef, useState } from "react";

const LETTERS = ["J", "B", "A", "R"] as const;
const LOCK_TIMES = [700, 950, 1200, 1450] as const;
const MORPH_TIME = 1700;
const SUBHEAD_TIME = 2400;
const DIGITS = "0123456789";

type LetterPhase = "scrambling" | "locked" | "morphed";

function randDigit() {
  return DIGITS[Math.floor(Math.random() * 10)];
}

export default function Hero() {
  // Initialize to "JBAR" so server and client render identical HTML.
  // useEffect immediately kicks off the scramble — no hydration mismatch.
  const [chars, setChars] = useState<string[]>(["J", "B", "A", "R"]);
  const [phases, setPhases] = useState<LetterPhase[]>([
    "scrambling", "scrambling", "scrambling", "scrambling",
  ]);
  const [showSub, setShowSub] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lockedRef = useRef([false, false, false, false]);

  useEffect(() => {
    setMounted(true);

    // Immediately replace JBAR with random digits to start the scramble
    setChars([randDigit(), randDigit(), randDigit(), randDigit()]);

    const interval = setInterval(() => {
      setChars(
        LETTERS.map((letter, i) =>
          lockedRef.current[i] ? letter : randDigit()
        )
      );
    }, 70);

    const lockTimers = LOCK_TIMES.map((t, i) =>
      setTimeout(() => {
        console.log(`[Hero] lock ${LETTERS[i]} at ${t}ms`);
        lockedRef.current[i] = true;
        setPhases((prev) =>
          prev.map((p, j) => (j === i ? "locked" : p)) as LetterPhase[]
        );
      }, t)
    );

    const morphTimer = setTimeout(() => {
      console.log("[Hero] morph triggered at 1700ms");
      // Clear interval BEFORE updating phases so no stray tick overwrites chars
      clearInterval(interval);
      setPhases(["morphed", "morphed", "morphed", "morphed"]);
    }, MORPH_TIME);

    const subTimer = setTimeout(() => {
      setShowSub(true);
    }, SUBHEAD_TIME);

    return () => {
      clearInterval(interval);
      lockTimers.forEach(clearTimeout);
      clearTimeout(morphTimer);
      clearTimeout(subTimer);
    };
  }, []);

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
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 600ms ease 200ms",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse flex-shrink-0" />
          <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-red/70">
            Booking now
          </span>
        </div>

        {/* Studio label */}
        <p
          className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-muted mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 600ms ease 400ms",
          }}
        >
          JBAR Design Studio&ensp;—&ensp;Chicago, IL
        </p>

        {/* JBAR Wordmark — Variant O */}
        <div
          className="flex items-end justify-center select-none"
          style={{ lineHeight: 0.85 }}
        >
          {LETTERS.map((letter, i) => {
            const isMorphed = phases[i] === "morphed";
            return (
              <span
                key={letter}
                className={isMorphed ? "letter-morph" : ""}
                style={{
                  display: "inline-block",
                  fontFamily: isMorphed
                    ? "var(--font-inter), sans-serif"
                    : "var(--font-mono), monospace",
                  fontWeight: isMorphed ? 900 : 500,
                  fontSize: isMorphed
                    ? "clamp(120px, 22vw, 280px)"
                    : "clamp(88px, 16vw, 200px)",
                  letterSpacing: isMorphed ? "-0.04em" : "0.01em",
                  color: i === 0 ? "#d63031" : "rgba(244,241,234,0.85)",
                  willChange: "transform",
                }}
              >
                {chars[i]}
              </span>
            );
          })}
        </div>

        {/* Subheadline, pricing, CTA — fade in after morph */}
        <div
          style={{
            opacity: showSub ? 1 : 0,
            transform: showSub ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
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
          style={{
            opacity: showSub ? 1 : 0,
            transition: "opacity 600ms ease 400ms",
          }}
        />
      </div>
    </section>
  );
}
