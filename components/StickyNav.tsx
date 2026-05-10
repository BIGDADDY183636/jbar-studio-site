"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work",         href: "#work",         id: "work" },
  { label: "What you get", href: "#what-you-get", id: "what-you-get" },
  { label: "Studio",       href: "#studio",       id: "studio" },
  { label: "Contact",      href: "#contact",      id: "contact" },
];

export default function StickyNav() {
  const [visible, setVisible]         = useState(false);
  const [activeId, setActiveId]       = useState<string | null>(null);

  // Show after scrolling ~80% of the viewport height (past the hero)
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0, rootMargin: "-20% 0px -70% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(26,23,20,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(237,232,222,0.06)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 350ms cubic-bezier(0.16,1,0.3,1), opacity 280ms ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "3.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          style={{ textDecoration: "none", lineHeight: 1 }}
          aria-label="Back to top"
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 900,
              fontSize: "1.1rem",
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#b04545" }}>J</span>
            <span style={{ color: "#ede8de" }}>BAR</span>
          </span>
        </a>

        {/* Links + CTA — hidden on narrow screens */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Anchor links (hidden below 640px) */}
          <div className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href, id }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={href}
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.04em",
                    color: isActive
                      ? "#ede8de"
                      : "rgba(237,232,222,0.45)",
                    textDecoration: "none",
                    paddingBottom: "2px",
                    transition: "color 150ms ease",
                  }}
                >
                  {label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "1px",
                        background: "#b04545",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "#b04545",
              color: "#ede8de",
              padding: "0.45rem 1rem",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "background 150ms ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.background = "#973b3b")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.background = "#b04545")
            }
          >
            Start a project
          </a>
        </div>
      </div>
    </div>
  );
}
