"use client";
import { useEffect } from "react";

const FROM_SCALE = 1.06;
const TO_RADIUS  = 20; // px

// cubic-bezier(0.22, 1, 0.36, 1): binary-search for t given x, then eval y.
// 12 iterations → < 0.05 px error at any scale.
function ease(p: number): number {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  let lo = 0, hi = 1, t = 0.5;
  for (let i = 0; i < 12; i++) {
    t = (lo + hi) * 0.5;
    const x = 3*0.22*t*(1-t)*(1-t) + 3*0.36*t*t*(1-t) + t*t*t;
    if (x < p) lo = t; else hi = t;
  }
  return 3*t*(1-t)*(1-t) + 3*t*t*(1-t) + t*t*t;
}

export default function ScreenshotReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".project-screenshot")
    );
    if (!els.length) return;

    // Prime below-fold elements at entry state to prevent flash on first scroll
    const vh = window.innerHeight;
    els.forEach(el => {
      if (el.getBoundingClientRect().top > vh) {
        el.style.transform    = `scale(${FROM_SCALE})`;
        el.style.borderRadius = "0px";
      }
    });

    const visible = new Set<HTMLElement>();
    let raf = 0;

    function tick() {
      const h = window.innerHeight;
      for (const el of visible) {
        const top = el.getBoundingClientRect().top;
        const p   = ease(Math.max(0, Math.min(1, (h - top) / (h * 0.5))));
        el.style.transform    = `scale(${FROM_SCALE + (1 - FROM_SCALE) * p})`;
        el.style.borderRadius = `${TO_RADIUS * p}px`;
      }
      raf = visible.size ? requestAnimationFrame(tick) : 0;
    }

    const io = new IntersectionObserver(
      entries => {
        for (const { target, isIntersecting } of entries) {
          const el = target as HTMLElement;
          if (isIntersecting) {
            el.style.willChange = "transform, border-radius";
            visible.add(el);
            if (!raf) raf = requestAnimationFrame(tick);
          } else {
            visible.delete(el);
            el.style.willChange = "auto";
            if (!visible.size && raf) { cancelAnimationFrame(raf); raf = 0; }
          }
        }
      },
      { rootMargin: "20% 0px 20% 0px" }
    );

    els.forEach(el => io.observe(el));
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return null;
}
