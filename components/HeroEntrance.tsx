"use client";

import { useEffect, useRef, useState } from "react";

const DOTS_PER_LETTER = 30;
const LETTER_COLORS: Record<string, string> = {
  J: "#ffffff",
  B: "#ffffff",
  A: "#c8102e",
  R: "#ffffff",
};
const LETTERS = ["J", "B", "A", "R"] as const;

interface Dot {
  id: number;
  color: string;
  sx: number; sy: number; // scattered start — viewport px
  tx: number; ty: number; // letter-outline target — viewport px
}

interface Props {
  letterRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  onComplete: () => void;
}

export default function HeroEntrance({ letterRefs, onComplete }: Props) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [phase, setPhase] = useState<"scattered" | "coalesced" | "fading">("scattered");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    document.fonts.ready.then(() => {
      if (cancelled.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const allDots: Dot[] = [];

      LETTERS.forEach((letter, li) => {
        const span = letterRefs.current[li];
        if (!span) return;

        const rect = span.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return; // hidden (mobile CSS hides desktop spans)

        // Canvas slightly taller than the span to avoid ascender clipping.
        // Draw with textBaseline="top" so the glyph starts near y=0.
        const sw = Math.ceil(rect.width) + 4; // +4 for letter-spacing edge trim
        const sh = Math.ceil(rect.height * 1.15);
        const fontSize = Math.round(rect.height);

        const canvas = document.createElement("canvas");
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.font = `900 ${fontSize}px Inter`;
        ctx.textBaseline = "top";
        ctx.fillText(letter, 2, 0); // x=2 to match the +4 width buffer

        const { data } = ctx.getImageData(0, 0, sw, sh);
        const onPx: [number, number][] = [];

        for (let y = 0; y < sh; y++) {
          for (let x = 0; x < sw; x++) {
            if (data[(y * sw + x) * 4 + 3] > 100) onPx.push([x, y]);
          }
        }

        if (!onPx.length) return;

        for (let i = 0; i < DOTS_PER_LETTER; i++) {
          const [px, py] = onPx[Math.floor(Math.random() * onPx.length)];
          allDots.push({
            id: li * DOTS_PER_LETTER + i,
            color: LETTER_COLORS[letter],
            sx: Math.random() * vw,
            sy: Math.random() * vh,
            // Map canvas pixel back to viewport coords.
            // px offset -2 to undo the x=2 draw offset.
            tx: rect.left + (px - 2),
            ty: rect.top + py * (rect.height / sh),
          });
        }
      });

      if (cancelled.current) return;

      if (!allDots.length) {
        // No visible desktop spans (e.g. mobile screen) — skip animation
        setTimeout(() => { if (!cancelled.current) onComplete(); }, 1200);
        return;
      }

      setDots(allDots);

      // Two RAF frames so the browser paints the scattered state before
      // we trigger the coalesce transition.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled.current) return;
        setPhase("coalesced");

        // 200ms opacity-in delay on transform + 800ms transition + 400ms hold
        setTimeout(() => {
          if (cancelled.current) return;
          setPhase("fading");
          onComplete();
          setTimeout(() => { if (!cancelled.current) setDots([]); }, 350);
        }, 1600);
      }));
    });

    return () => { cancelled.current = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!dots.length) return null;

  const coalesced = phase !== "scattered";
  const fading    = phase === "fading";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        pointerEvents: "none",
        zIndex: 200,
      }}
    >
      {dots.map(d => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: 5, height: 5,
            borderRadius: "50%",
            backgroundColor: d.color,
            opacity: fading ? 0 : coalesced ? 1 : 0,
            transform: coalesced
              ? `translate(${d.tx - 2.5}px, ${d.ty - 2.5}px)`
              : `translate(${d.sx - 2.5}px, ${d.sy - 2.5}px)`,
            // opacity: no delay (fades in immediately on coalesce)
            // transform: 200ms delay so dots are visible at scatter before moving
            transition:
              "transform 800ms cubic-bezier(0.16,1,0.3,1) 200ms, opacity 200ms ease",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
