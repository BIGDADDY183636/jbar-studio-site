"use client";

import { useEffect, useRef, useState } from "react";

const DOTS_PER_LETTER = 40; // outline needs more points to read as a shape
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
  tx: number; ty: number; // outline target   — viewport px
}

type Phase = "scattered" | "coalesced" | "filling";

interface Props {
  letterRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  onComplete: () => void;
}

// Returns pixels that are on (alpha > 100) AND have at least one off-neighbour.
function edgePixels(
  data: Uint8ClampedArray,
  sw: number,
  sh: number,
): [number, number][] {
  const on = (x: number, y: number): boolean =>
    x >= 0 && x < sw && y >= 0 && y < sh &&
    data[(y * sw + x) * 4 + 3] > 100;

  const out: [number, number][] = [];
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      if (on(x, y) && (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1))) {
        out.push([x, y]);
      }
    }
  }
  return out;
}

export default function HeroEntrance({ letterRefs, onComplete }: Props) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [phase, setPhase] = useState<Phase>("scattered");
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
        if (!span) {
          console.log(`[HeroEntrance] ${letter} (${li}): ref is null`);
          return;
        }

        const rect = span.getBoundingClientRect();
        console.log(
          `[HeroEntrance] ${letter} (${li}): rect w=${rect.width.toFixed(1)} h=${rect.height.toFixed(1)} left=${rect.left.toFixed(1)} top=${rect.top.toFixed(1)}`
        );

        if (rect.width < 2 || rect.height < 2) {
          console.log(`[HeroEntrance] ${letter}: skipped — zero rect (hidden span)`);
          return;
        }

        // Extra canvas width/height to ensure glyphs aren't clipped.
        // Draw at x=4 so left-side anti-aliasing isn't cropped.
        const sw = Math.ceil(rect.width) + 12;
        const sh = Math.ceil(rect.height * 1.25);
        const fontSize = Math.round(rect.height);

        const canvas = document.createElement("canvas");
        canvas.width  = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle    = "#fff";
        ctx.font         = `900 ${fontSize}px Inter`;
        ctx.textBaseline = "top";
        ctx.fillText(letter, 4, 0);

        const { data } = ctx.getImageData(0, 0, sw, sh);

        // Diagnostic: total on-pixels
        let totalOn = 0;
        for (let i = 3; i < data.length; i += 4) if (data[i] > 100) totalOn++;
        console.log(`[HeroEntrance] ${letter}: total on-pixels=${totalOn}, canvas ${sw}×${sh}, fontSize=${fontSize}`);

        const edges = edgePixels(data, sw, sh);
        console.log(`[HeroEntrance] ${letter}: edge pixels=${edges.length}`);

        if (!edges.length) return;

        for (let i = 0; i < DOTS_PER_LETTER; i++) {
          const [px, py] = edges[Math.floor(Math.random() * edges.length)];
          allDots.push({
            id: li * DOTS_PER_LETTER + i,
            color: LETTER_COLORS[letter],
            sx: Math.random() * vw,
            sy: Math.random() * vh,
            tx: rect.left + (px - 4),               // undo x=4 draw offset
            ty: rect.top  + py * (rect.height / sh), // scale canvas-y → span-y
          });
        }
        console.log(`[HeroEntrance] ${letter}: created ${DOTS_PER_LETTER} dots`);
      });

      if (cancelled.current) return;

      if (!allDots.length) {
        // No visible desktop spans (e.g. mobile viewport) — skip animation
        setTimeout(() => { if (!cancelled.current) onComplete(); }, 1200);
        return;
      }

      setDots(allDots);

      // Two RAF frames ensure the browser paints the scattered state first.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled.current) return;
        setPhase("coalesced");

        // Timeline from coalesce trigger:
        //   opacity 0→1:   200ms (no delay)
        //   transform:     800ms + 200ms delay → settled at 1000ms
        //   hold outline:  300ms                → 1300ms total
        //   then fill phase (letters in, dots out) over 600ms
        setTimeout(() => {
          if (cancelled.current) return;
          setPhase("filling");
          onComplete(); // → wordmarkVisible=true → letters fade in (600ms)
          setTimeout(() => { if (!cancelled.current) setDots([]); }, 650);
        }, 1300);
      }));
    });

    return () => { cancelled.current = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!dots.length) return null;

  const coalesced = phase !== "scattered";
  const filling   = phase === "filling";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0,
        pointerEvents: "none",
        // Sits above letters (z:200) but letters fade in behind during fill phase
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
            opacity: filling ? 0 : coalesced ? 1 : 0,
            transform: coalesced
              ? `translate(${d.tx - 2.5}px, ${d.ty - 2.5}px)`
              : `translate(${d.sx - 2.5}px, ${d.sy - 2.5}px)`,
            // Scatter→coalesce: opacity 200ms (immediate), transform 800ms + 200ms delay
            // Fill phase:       opacity 600ms, transform locked (0ms)
            transition: filling
              ? "transform 0ms, opacity 600ms ease"
              : "transform 800ms cubic-bezier(0.16,1,0.3,1) 200ms, opacity 200ms ease",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
