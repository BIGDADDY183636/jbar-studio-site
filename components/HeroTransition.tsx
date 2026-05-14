"use client";

import { useEffect, useRef, useState } from "react";

const LETTERS = ["J", "B", "A", "R"] as const;
const DIGIT_MS = 70;
const MORPH_MS = 500;
const J_START = 200;
const STAGGER = 6 * DIGIT_MS;
type Phase = "empty" | "counting" | "locked" | "morphed";

const STARTS = LETTERS.reduce<number[]>(
  (acc, _, i) => (i === 0 ? [J_START] : [...acc, acc[i - 1] + STAGGER]),
  []
);
const SUB_REVEAL = STARTS[3] + 9 * DIGIT_MS + MORPH_MS + 400;

const MOBILE_WORDMARK = [
  { letter: "J", color: "#d63031",                delay: "200ms" },
  { letter: "B", color: "rgba(244,241,234,0.85)", delay: "350ms" },
  { letter: "A", color: "rgba(244,241,234,0.85)", delay: "500ms" },
  { letter: "R", color: "rgba(244,241,234,0.85)", delay: "650ms" },
] as const;

const WORDMARK_STYLE = {
  fontFamily: "var(--font-inter), sans-serif",
  fontWeight: 900,
  fontSize: "clamp(120px, 22vw, 280px)",
  letterSpacing: "-0.04em",
} as const;

export default function HeroTransition() {
  const [chars, setChars]   = useState(["J", "B", "A", "R"]);
  const [phases, setPhases] = useState<Phase[]>(["empty", "empty", "empty", "empty"]);
  const [showSub, setShowSub]         = useState(false);
  // false on SSR / first render; set to true on desktop after mount
  const [scrollEnabled, setScrollEnabled] = useState(false);

  // ── Refs (scroll-animation branch only, populated after switch) ─
  const outerRef      = useRef<HTMLDivElement>(null);
  const anchorRef     = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const subRef        = useRef<HTMLDivElement>(null);
  const bgOverlayRef  = useRef<HTMLDivElement>(null);
  const workOverlayRef= useRef<HTMLDivElement>(null);

  // Letter refs used by the count-up animation in both branches
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const slotCallbacks = useRef(
    LETTERS.map((_, i) => (el: HTMLSpanElement | null) => {
      letterRefs.current[i] = el;
    })
  );

  // ── 1. Detect scroll capability — re-check on resize ────────
  useEffect(() => {
    function check() {
      setScrollEnabled(
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        window.innerWidth >= 1100
      );
    }
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── 2. Count-up animation (runs in both branches) ───────────
  useEffect(() => {
    let rafId: number;
    const timers: ReturnType<typeof setTimeout>[] = [];

    rafId = requestAnimationFrame(() => {
      LETTERS.forEach((letter, li) => {
        const t0 = STARTS[li];

        timers.push(
          setTimeout(() => {
            setChars((p) => p.map((c, i) => (i === li ? "1" : c)));
            setPhases((p) => p.map((ph, i) => (i === li ? "counting" : ph)) as Phase[]);
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
            setPhases((p) => p.map((ph, i) => (i === li ? "locked" : ph)) as Phase[]);
          }, snapAt)
        );
        timers.push(
          setTimeout(() => {
            setPhases((p) => p.map((ph, i) => (i === li ? "morphed" : ph)) as Phase[]);
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

  // ── 3. Scroll-driven animation (desktop only) ───────────────
  useEffect(() => {
    if (!scrollEnabled) return;

    const outer      = outerRef.current;
    const anchor     = anchorRef.current;
    const content    = contentRef.current;
    const sub        = subRef.current;
    const bgOverlay  = bgOverlayRef.current;
    const workOverlay= workOverlayRef.current;
    if (!outer || !anchor || !content || !sub || !bgOverlay || !workOverlay) return;

    let raf = 0;

    function measureA() {
      const a = letterRefs.current[2];
      if (!anchor || !a) return;
      const aRect     = a.getBoundingClientRect();
      const anchorRect= anchor.getBoundingClientRect();
      anchor.style.transformOrigin =
        `${aRect.left - anchorRect.left + aRect.width / 2}px center`;
    }

    function update() {
      const outerRect = outer!.getBoundingClientRect();
      const scrolled  = -outerRect.top;
      const raw = Math.max(0, Math.min(scrolled / (2 * window.innerHeight), 1));

      const [j, b, a, r] = letterRefs.current;
      if (!j || !b || !a || !r) { raf = 0; return; }

      // Normalised phase progress, each 0→1
      const p1 = Math.min(raw / 0.25, 1);
      const p2 = Math.max(0, Math.min((raw - 0.25) / 0.53, 1));
      const p3 = Math.max(0, Math.min((raw - 0.78) / 0.22, 1));

      // ── Scale (.wm-anchor) ─────────────────────────────────
      let scale: number;
      if (raw <= 0.25)       scale = 1 + p1 * 1;       // 1→2
      else if (raw <= 0.78)  scale = 2 + p2 * 2;       // 2→4
      else                    scale = 4 + p3 * 40;      // 4→44

      // ── A rotation ─────────────────────────────────────────
      // Starts at raw=0.10 (while A is still readable).
      // 0.10→0.78: ease-in (t²) 0→540deg.
      // P3 adds +600deg on top.
      let aRotate: number;
      if (raw <= 0.10) {
        aRotate = 0;
      } else if (raw <= 0.78) {
        const t = (raw - 0.10) / 0.68;   // 0→1 across 0.10–0.78
        aRotate = t * t * 540;            // ease-in
      } else {
        aRotate = 540 + p3 * 600;         // 540→1140deg
      }

      // ── A color — white → #00A7E1 over P2 ─────────────────
      // rgb(0,167,225); deltas from white: r:−255, g:−88, b:−30
      let aColor: string;
      if (raw <= 0.25) {
        aColor = "rgb(255,255,255)";
      } else if (raw <= 0.78) {
        const cr = Math.round(255 - p2 * 255);
        const cg = Math.round(255 - p2 * 88);
        const cb = Math.round(255 - p2 * 30);
        aColor = `rgb(${cr},${cg},${cb})`;
      } else {
        aColor = "#00A7E1";
      }

      // ── J/B/R fade out in early P2 ─────────────────────────
      const jbrOpacity = raw <= 0.25 ? 1 : Math.max(0, 1 - p2 / 0.15);

      // ── Tagline+CTA fade out over P1 ───────────────────────
      const subOpacity = Math.max(0, 1 - p1);

      // ── P3: bg flood, content fade, work veil ──────────────
      const bgG = Math.round(p3 * 167);
      const bgB = Math.round(p3 * 225);
      bgOverlay!.style.backgroundColor = `rgb(0,${bgG},${bgB})`;
      bgOverlay!.style.opacity = raw < 0.78 ? "0" : String(p3);

      content!.style.opacity = raw < 0.78 ? "1" : String(Math.max(0, 1 - p3));

      workOverlay!.style.opacity = raw < 0.78 ? "0" : String(Math.min(p3 * 1.4, 1));

      // ── Apply ───────────────────────────────────────────────
      anchor!.style.transform = `scale(${scale})`;
      a.style.transform       = `rotate(${aRotate}deg)`;
      a.style.color           = aColor;
      j.style.opacity         = String(jbrOpacity);
      b.style.opacity         = String(jbrOpacity);
      r.style.opacity         = String(jbrOpacity);
      sub!.style.opacity      = String(subOpacity);

      raf = 0;
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureA, 100);
    }

    measureA();
    document.fonts.ready.then(measureA);
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
    };
  }, [scrollEnabled]);

  // ── Shared inner content ────────────────────────────────────
  // Rendered in both branches; refs attached only in the scroll branch.
  const blobs = (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        className="ambient-blob-1 absolute rounded-full blur-[120px]"
        style={{
          width: "640px", height: "640px", top: "-200px", right: "-80px",
          background: "radial-gradient(circle, rgba(214,48,49,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient-blob-2 absolute rounded-full blur-[100px]"
        style={{
          width: "520px", height: "520px", bottom: "-160px", left: "-60px",
          background: "radial-gradient(circle, rgba(180,28,28,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );

  // ── PLAIN HERO — mobile / reduced-motion ────────────────────
  // Normal document flow, no 300vh wrapper, Work follows immediately.
  if (!scrollEnabled) {
    return (
      <section
        id="hero"
        className="relative min-h-[88vh] flex flex-col items-center justify-center bg-canvas overflow-hidden"
      >
        {blobs}

        <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 w-full text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper/[0.04] border border-paper/40 mb-8"
            style={{ animation: "heroFadeIn 600ms ease 100ms both" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse flex-shrink-0" />
            <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-paper/60">
              Booking now
            </span>
          </div>

          <p
            className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-muted mb-10"
            style={{ animation: "heroFadeIn 600ms ease 300ms both" }}
          >
            JBAR Design Studio&ensp;—&ensp;Chicago, IL
          </p>

          {/* Mobile wordmark */}
          <div className="flex md:hidden items-end justify-center select-none" style={{ lineHeight: 0.85 }}>
            {MOBILE_WORDMARK.map(({ letter, color, delay }) => (
              <span key={letter} className="mobile-letter" style={{ ...WORDMARK_STYLE, color, animationDelay: delay }}>
                {letter}
              </span>
            ))}
          </div>

          {/* Desktop wordmark (count-up, no scroll anchor needed) */}
          <div
            className="hidden md:flex items-end justify-center select-none"
            style={{ lineHeight: 0.85, minHeight: "clamp(102px, 18.7vw, 238px)" }}
          >
            <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
              {LETTERS.map((letter, i) => (
                <span
                  key={letter}
                  ref={slotCallbacks.current[i]}
                  className={phases[i] === "locked" ? "letter-morph" : ""}
                  style={{
                    ...WORDMARK_STYLE,
                    display: "inline-block",
                    color: i === 0 ? "#d63031" : "rgba(244,241,234,0.85)",
                    opacity: phases[i] === "empty" ? 0 : 1,
                  }}
                >
                  {chars[i]}
                </span>
              ))}
            </div>
          </div>

          <div
            className="hero-sub-mobile"
            style={{
              opacity: showSub ? 1 : 0,
              transform: showSub ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h1
              className="font-sans font-black text-paper mx-auto mt-8"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", letterSpacing: "-0.025em", maxWidth: "22ch", lineHeight: 1.15 }}
            >
              Custom websites for Chicago&apos;s independent businesses.
            </h1>
            <p className="font-mono text-[0.78rem] text-paper/50 mt-6 tracking-[0.18em] uppercase">
              $400&ensp;·&ensp;Built in a week&ensp;·&ensp;Yours to keep
            </p>
            <p className="font-sans text-[0.78rem] text-muted/70 mt-3 leading-relaxed max-w-sm mx-auto">
              Recent work: DJE Advisors — independent accounting firm. Still
              booking first paid clients — early projects get priority slots and
              an extra round of revisions.
            </p>
            <div className="flex justify-center mt-8">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-2 font-sans text-[0.75rem] font-semibold tracking-[0.12em] uppercase bg-paper text-canvas px-7 py-3.5 rounded-full"
              >
                Let&apos;s talk
                <span className="inline-block">→</span>
              </a>
            </div>
          </div>

          <div
            className="mt-20 w-full h-px bg-paper/[0.07]"
            style={{ opacity: showSub ? 1 : 0, transition: "opacity 600ms ease 400ms" }}
          />
        </div>
      </section>
    );
  }

  // ── SCROLL HERO — desktop ───────────────────────────────────
  // 300vh outer gives the sticky section 200vh of scroll budget.
  return (
    <div ref={outerRef} className="hero-outer">
      <section
        id="hero"
        className="hero-sticky relative flex flex-col items-center justify-center bg-canvas overflow-hidden"
      >
        {blobs}

        {/* P3 bg flood: canvas → #00A7E1 */}
        <div
          ref={bgOverlayRef}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            backgroundColor: "#000", opacity: 0,
            zIndex: 1, pointerEvents: "none",
          }}
        />

        {/* Hero content — fades out in P3 */}
        <div
          ref={contentRef}
          className="relative max-w-5xl mx-auto px-6 pt-28 pb-20 w-full text-center"
          style={{ zIndex: 2, willChange: "opacity" }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper/[0.04] border border-paper/40 mb-8"
            style={{ animation: "heroFadeIn 600ms ease 100ms both" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse flex-shrink-0" />
            <span className="font-mono text-[0.56rem] tracking-[0.2em] uppercase text-paper/60">
              Booking now
            </span>
          </div>

          <p
            className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-muted mb-10"
            style={{ animation: "heroFadeIn 600ms ease 300ms both" }}
          >
            JBAR Design Studio&ensp;—&ensp;Chicago, IL
          </p>

          {/* Mobile wordmark */}
          <div className="flex md:hidden items-end justify-center select-none" style={{ lineHeight: 0.85 }}>
            {MOBILE_WORDMARK.map(({ letter, color, delay }) => (
              <span key={letter} className="mobile-letter" style={{ ...WORDMARK_STYLE, color, animationDelay: delay }}>
                {letter}
              </span>
            ))}
          </div>

          {/* Desktop wordmark — .wm-anchor scales; A rotates independently */}
          <div
            className="hidden md:flex items-end justify-center select-none"
            style={{ lineHeight: 0.85, minHeight: "clamp(102px, 18.7vw, 238px)" }}
          >
            <div
              ref={anchorRef}
              style={{ display: "inline-flex", alignItems: "flex-end", willChange: "transform" }}
            >
              {LETTERS.map((letter, i) => (
                <span
                  key={letter}
                  ref={slotCallbacks.current[i]}
                  className={phases[i] === "locked" ? "letter-morph" : ""}
                  style={{
                    ...WORDMARK_STYLE,
                    display: "inline-block",
                    color: i === 0 ? "#d63031" : "rgba(244,241,234,0.85)",
                    opacity: phases[i] === "empty" ? 0 : 1,
                    willChange: i === 2 ? "transform, color" : "opacity",
                  }}
                >
                  {chars[i]}
                </span>
              ))}
            </div>
          </div>

          {/* Tagline + CTA — fades out in P1 */}
          <div
            ref={subRef}
            className="hero-sub-mobile"
            style={{
              opacity: showSub ? 1 : 0,
              transform: showSub ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
              willChange: "opacity",
            }}
          >
            <h1
              className="font-sans font-black text-paper mx-auto mt-8"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", letterSpacing: "-0.025em", maxWidth: "22ch", lineHeight: 1.15 }}
            >
              Custom websites for Chicago&apos;s independent businesses.
            </h1>
            <p className="font-mono text-[0.78rem] text-paper/50 mt-6 tracking-[0.18em] uppercase">
              $400&ensp;·&ensp;Built in a week&ensp;·&ensp;Yours to keep
            </p>
            <p className="font-sans text-[0.78rem] text-muted/70 mt-3 leading-relaxed max-w-sm mx-auto">
              Recent work: DJE Advisors — independent accounting firm. Still
              booking first paid clients — early projects get priority slots and
              an extra round of revisions.
            </p>
            <div className="flex justify-center mt-8">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-2 font-sans text-[0.75rem] font-semibold tracking-[0.12em] uppercase bg-paper text-canvas px-7 py-3.5 rounded-full"
              >
                Let&apos;s talk
                <span className="inline-block">→</span>
              </a>
            </div>
          </div>

          <div
            className="mt-20 w-full h-px bg-paper/[0.07]"
            style={{ opacity: showSub ? 1 : 0, transition: "opacity 600ms ease 400ms" }}
          />
        </div>

        {/* Work veil — canvas dark, arrives at end of P3 for seamless handoff */}
        <div
          ref={workOverlayRef}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            backgroundColor: "#0a0908", opacity: 0,
            zIndex: 3, pointerEvents: "none",
          }}
        />
      </section>
    </div>
  );
}
