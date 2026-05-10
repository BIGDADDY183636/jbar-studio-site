"use client";

import { memo, useEffect, useRef, useState } from "react";

const LETTERS = ["J", "B", "A", "R"] as const;
const DIGIT_MS = 70;
const MORPH_MS = 500;
const J_START  = 200;
const STAGGER  = 6 * DIGIT_MS;

type Phase = "empty" | "counting" | "locked" | "morphed";

const STARTS: number[] = LETTERS.reduce<number[]>(
  (acc, _, i) =>
    i === 0 ? [J_START] : [...acc, acc[i - 1] + STAGGER],
  []
);

const SUB_REVEAL = STARTS[3] + 9 * DIGIT_MS + MORPH_MS + 400;

// Mobile drop-in: pure CSS, no JS state machine
const MOBILE_WORDMARK = [
  { letter: "J", color: "#b04545",                delay: "200ms" },
  { letter: "B", color: "rgba(237,232,222,0.85)", delay: "350ms" },
  { letter: "A", color: "rgba(237,232,222,0.85)", delay: "500ms" },
  { letter: "R", color: "rgba(237,232,222,0.85)", delay: "650ms" },
] as const;

// Memoized — only re-renders when phase or char changes
const LetterSlot = memo(
  ({
    char,
    phase,
    isRed,
    slotRef,
  }: {
    char: string;
    phase: Phase;
    isRed: boolean;
    slotRef: (el: HTMLSpanElement | null) => void;
  }) => (
    <span
      ref={slotRef}
      className={phase === "locked" ? "letter-morph" : ""}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-inter), sans-serif",
        fontWeight: 900,
        fontSize: "clamp(120px, 22vw, 280px)",
        letterSpacing: "-0.04em",
        color: isRed ? "#b04545" : "rgba(237,232,222,0.85)",
        opacity: phase === "empty" ? 0 : 1,
        willChange: "transform",
      }}
    >
      {char}
    </span>
  ),
  (prev, next) => prev.phase === next.phase && prev.char === next.char
);
LetterSlot.displayName = "LetterSlot";

export default function Hero() {
  // chars="JBAR" gives SSR the text for accessibility/SEO.
  // phases="empty" means opacity:0 — no flash before the animation starts.
  const [chars, setChars] = useState<string[]>(["J", "B", "A", "R"]);
  const [phases, setPhases] = useState<Phase[]>([
    "empty", "empty", "empty", "empty",
  ]);
  const [showSub, setShowSub] = useState(false);

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const slotRefCallbacks = useRef(
    LETTERS.map((_, i) => (el: HTMLSpanElement | null) => {
      letterRefs.current[i] = el;
    })
  );

  useEffect(() => {
    let rafId: number;
    const timers: ReturnType<typeof setTimeout>[] = [];

    rafId = requestAnimationFrame(() => {
      // Initial state is already "empty" — just start the timers.
      LETTERS.forEach((letter, li) => {
        const t0 = STARTS[li];

        timers.push(
          setTimeout(() => {
            setChars((p) => p.map((c, i) => (i === li ? "1" : c)));
            setPhases((p) =>
              p.map((ph, i) => (i === li ? "counting" : ph)) as Phase[]
            );
          }, t0)
        );

        for (let d = 2; d <= 9; d++) {
          timers.push(
            setTimeout(() => {
              const el = letterRefs.current[li];
              if (el) el.textContent = String(d);
            }, t0 + (d - 1) * DIGIT_MS)
          );
        }

        const snapAt = t0 + 9 * DIGIT_MS;
        timers.push(
          setTimeout(() => {
            setChars((p) => p.map((c, i) => (i === li ? letter : c)));
            setPhases((p) =>
              p.map((ph, i) => (i === li ? "locked" : ph)) as Phase[]
            );
          }, snapAt)
        );

        timers.push(
          setTimeout(() => {
            setPhases((p) =>
              p.map((ph, i) => (i === li ? "morphed" : ph)) as Phase[]
            );
          }, snapAt + MORPH_MS)
        );
      });

      timers.push(setTimeout(() => setShowSub(true), SUB_REVEAL));
    });

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
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
              "radial-gradient(circle, rgba(176,69,69,0.07) 0%, transparent 70%)",
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
              "radial-gradient(circle, rgba(140,56,56,0.05) 0%, transparent 70%)",
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

        {/* Mobile wordmark: pure CSS drop-in, no JS — hidden on desktop */}
        <div
          className="flex md:hidden items-end justify-center select-none"
          style={{ lineHeight: 0.85 }}
        >
          {MOBILE_WORDMARK.map(({ letter, color, delay }) => (
            <span
              key={letter}
              className="mobile-letter"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(120px, 22vw, 280px)",
                letterSpacing: "-0.04em",
                color,
                animationDelay: delay,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Desktop wordmark: count-up state machine — hidden on mobile */}
        <div
          className="hidden md:flex items-end justify-center select-none"
          style={{
            lineHeight: 0.85,
            minHeight: "clamp(102px, 18.7vw, 238px)",
          }}
        >
          {LETTERS.map((letter, i) => (
            <LetterSlot
              key={letter}
              char={chars[i]}
              phase={phases[i]}
              isRed={i === 0}
              slotRef={slotRefCallbacks.current[i]}
            />
          ))}
        </div>

        {/* Subheadline, pricing, CTA.
            hero-sub-mobile: on mobile, CSS animation overrides the React
            inline opacity/transform and reveals at 1500ms instead of SUB_REVEAL. */}
        <div
          className="hero-sub-mobile"
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
