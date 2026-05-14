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

  // ── 3. Scroll-driven animation + autoplay blow-through ────────
  useEffect(() => {
    if (!scrollEnabled) return;

    const outer       = outerRef.current;
    const anchor      = anchorRef.current;
    const content     = contentRef.current;
    const sub         = subRef.current;
    const bgOverlay   = bgOverlayRef.current;
    const workOverlay = workOverlayRef.current;
    if (!outer || !anchor || !content || !sub || !bgOverlay || !workOverlay) return;

    let raf = 0;
    let autoplayRaf = 0;
    let autoplayed = false;

    // Autoplay: 400ms rAF loop driving the blow-through.
    // Scroll listener detached before start; re-attached on completion.
    function startAutoplay() {
      autoplayed = true;
      window.removeEventListener("scroll", onScroll);
      const t0 = performance.now();

      function tick(now: number) {
        const u = Math.min((now - t0) / 400, 1);
        const a = letterRefs.current[2];
        if (a) {
          anchor!.style.transform = `scale(${4 + u * 40})`;
          a.style.transform = `rotate(${540 + u * 600}deg)`;
          a.style.color = "#00A7E1";
        }
        const bgG = Math.round(u * 167);
        const bgB = Math.round(u * 225);
        bgOverlay!.style.backgroundColor = `rgb(0,${bgG},${bgB})`;
        bgOverlay!.style.opacity = String(u);
        content!.style.opacity = String(Math.max(0, 1 - u));
        workOverlay!.style.opacity = String(Math.min(u * 1.4, 1));

        if (u < 1) {
          autoplayRaf = requestAnimationFrame(tick);
        } else {
          autoplayRaf = 0;
          // Collapse outer height so sticky releases immediately.
          // outer_bottom = outerTop + height; sticky releases when ≤ innerHeight.
          // Subtract 1px past the boundary; force a sync layout read so the
          // browser re-evaluates sticky before the next scroll event fires.
          const outerTop = outer!.getBoundingClientRect().top;
          if (outerTop <= 0) {
            outer!.style.height = `${Math.round(window.innerHeight - outerTop) - 1}px`;
            void outer!.getBoundingClientRect(); // force layout / sticky recalc
          }
          window.addEventListener("scroll", onScroll, { passive: true });
        }
      }
      autoplayRaf = requestAnimationFrame(tick);
    }

    function update() {
      const outerRect = outer!.getBoundingClientRect();
      const scrolled  = -outerRect.top;
      // 160vh outer → 60vh travel → raw 0→1 over 0.6×innerHeight
      const raw = Math.max(0, Math.min(scrolled / (0.6 * window.innerHeight), 1));

      const [j, b, a, r] = letterRefs.current;
      if (!j || !b || !a || !r) { raf = 0; return; }

      // Re-measure transform-origin each tick as a percentage.
      // getBoundingClientRect reflects current transforms; the ratio of
      // A's AABB-center within anchor's width is preserved under uniform
      // scale, and pure rotation around an element's own center keeps
      // its AABB center fixed — so the percentage stays correct at any
      // scale or rotation angle.
      const anchorRect = anchor!.getBoundingClientRect();
      const aRect = a.getBoundingClientRect();
      if (anchorRect.width > 0) {
        const pct = (aRect.left + aRect.width / 2 - anchorRect.left) / anchorRect.width * 100;
        anchor!.style.transformOrigin = `${pct.toFixed(2)}% center`;
      }

      // Reset flag + restore outer height when user scrolls well back
      if (autoplayed && raw < 0.5) {
        autoplayed = false;
        outer!.style.height = ""; // restore CSS 130vh
      }

      if (autoplayed) {
        // Hold blow-through at completion; don't disturb anchor/a transforms
        bgOverlay!.style.backgroundColor = "rgb(0,167,225)";
        bgOverlay!.style.opacity = "1";
        content!.style.opacity = "0";
        workOverlay!.style.opacity = "1";
        raf = 0;
        return;
      }

      // ── Phase progress ─────────────────────────────────────
      // settle 0.00–0.15 | spin 0.15–1.00
      const pSettle = Math.min(raw / 0.15, 1);
      const pSpin   = Math.max(0, Math.min((raw - 0.15) / 0.85, 1));

      // ── Scale ──────────────────────────────────────────────
      const scale = raw <= 0.15
        ? 1 + pSettle * 0.2       // 1→1.2
        : 1.2 + pSpin * 2.8;      // 1.2→4

      // ── A rotation — ease-in (t²) ──────────────────────────
      const aRotate = raw <= 0.15 ? 0 : pSpin * pSpin * 540;  // 0→540deg

      // ── A color — white → #00A7E1 over spin ───────────────
      // rgb(0,167,225); deltas from white: r:−255, g:−88, b:−30
      let aColor: string;
      if (raw <= 0.15) {
        aColor = "rgb(255,255,255)";
      } else {
        const cr = Math.round(255 - pSpin * 255);
        const cg = Math.round(255 - pSpin * 88);
        const cb = Math.round(255 - pSpin * 30);
        aColor = `rgb(${cr},${cg},${cb})`;
      }

      // ── J/B/R — out by pSpin ≈ 0.6 ────────────────────────
      const jbrOpacity = raw <= 0.15 ? 1 : Math.max(0, 1 - pSpin / 0.6);

      // ── Tagline — 1→0.7 in settle, 0.7→0 over spin ────────
      const subOpacity = raw <= 0.15
        ? 1 - pSettle * 0.3
        : Math.max(0, 0.7 * (1 - pSpin));

      // ── Pre-autoplay: blow elements cleared ────────────────
      bgOverlay!.style.opacity = "0";
      content!.style.opacity = "1";
      workOverlay!.style.opacity = "0";

      // ── Apply ───────────────────────────────────────────────
      anchor!.style.transform = `scale(${scale})`;
      a.style.transform       = `rotate(${aRotate}deg)`;
      a.style.color           = aColor;
      j.style.opacity         = String(jbrOpacity);
      b.style.opacity         = String(jbrOpacity);
      r.style.opacity         = String(jbrOpacity);
      sub!.style.opacity      = String(subOpacity);

      // ── Trigger autoplay once at raw ≥ 0.98 ────────────────
      if (raw >= 0.98) startAutoplay();

      raf = 0;
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      // Re-run full update on resize (remeasures transform-origin + re-applies state)
      resizeTimer = setTimeout(() => { if (!raf) raf = requestAnimationFrame(update); }, 100);
    }

    document.fonts.ready.then(() => { if (!raf) raf = requestAnimationFrame(update); });
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      if (autoplayRaf) cancelAnimationFrame(autoplayRaf);
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
  // 160vh outer / 60vh travel. Work section (cyan) follows directly
  // so the user lands on it when the sticky releases after autoplay.
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
              style={{ display: "inline-block", willChange: "transform" }}
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
