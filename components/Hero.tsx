"use client";

import { useEffect, useState } from "react";

const LETTERS = ["J", "B", "A", "R"] as const;
const DIGIT_MS = 80;   // ms between digit steps
const MORPH_MS = 500;  // CSS morph animation duration
const J_START  = 200;  // ms from mount before J begins counting

type Phase = "empty" | "counting" | "locked" | "morphed";

// Absolute ms from mount when each letter begins its count.
// Each letter starts only after the previous letter's morph completes.
// 9 digits × 80ms = 720ms counting, + 500ms morph = 1220ms per letter.
const STARTS: number[] = LETTERS.reduce<number[]>(
  (acc, _, i) =>
    i === 0 ? [J_START] : [...acc, acc[i - 1] + 9 * DIGIT_MS + MORPH_MS],
  []
);
// J:200  B:1420  A:2640  R:3860

const SUB_REVEAL = STARTS[3] + 9 * DIGIT_MS + MORPH_MS + 400; // ~5480ms

export default function Hero() {
  // SSR: render "JBAR" in mono so server/client HTML matches.
  // useEffect resets to empty immediately on mount before the count begins.
  const [chars, setChars] = useState<string[]>(["J", "B", "A", "R"]);
  const [phases, setPhases] = useState<Phase[]>([
    "counting", "counting", "counting", "counting",
  ]);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    // Reset to empty — count-up begins from a blank slate
    setChars([" ", " ", " ", " "]);
    setPhases(["empty", "empty", "empty", "empty"]);

    const timers: ReturnType<typeof setTimeout>[] = [];

    LETTERS.forEach((letter, li) => {
      const t0 = STARTS[li];

      // Digits 1 → 9, one per DIGIT_MS
      for (let d = 1; d <= 9; d++) {
        timers.push(
          setTimeout(() => {
            setChars((p) => p.map((c, i) => (i === li ? String(d) : c)));
            setPhases((p) =>
              p.map((ph, i) => (i === li ? "counting" : ph)) as Phase[]
            );
          }, t0 + (d - 1) * DIGIT_MS)
        );
      }

      // Snap to letter + trigger CSS morph animation
      const snapAt = t0 + 9 * DIGIT_MS;
      timers.push(
        setTimeout(() => {
          setChars((p) => p.map((c, i) => (i === li ? letter : c)));
          setPhases((p) =>
            p.map((ph, i) => (i === li ? "locked" : ph)) as Phase[]
          );
        }, snapAt)
      );

      // Morph complete — remove .letter-morph class (forwards fill keeps final state)
      timers.push(
        setTimeout(() => {
          setPhases((p) =>
            p.map((ph, i) => (i === li ? "morphed" : ph)) as Phase[]
          );
        }, snapAt + MORPH_MS)
      );
    });

    timers.push(setTimeout(() => setShowSub(true), SUB_REVEAL));

    return () => timers.forEach(clearTimeout);
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

        {/* JBAR Wordmark — sequential count-up → snap → bounce-morph */}
        <div
          className="flex items-end justify-center select-none"
          style={{ lineHeight: 0.85 }}
        >
          {LETTERS.map((letter, i) => {
            const phase = phases[i];
            const isMorphed = phase === "locked" || phase === "morphed";
            return (
              <span
                key={letter}
                className={phase === "locked" ? "letter-morph" : ""}
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
                  opacity: phase === "empty" ? 0 : 1,
                  willChange: "transform",
                }}
              >
                {chars[i]}
              </span>
            );
          })}
        </div>

        {/* Subheadline, pricing, CTA — fade in after R's morph + 400ms */}
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
