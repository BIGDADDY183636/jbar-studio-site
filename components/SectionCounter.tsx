"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",         number: "01", label: "Hero" },
  { id: "work",         number: "02", label: "Concept Work" },
  { id: "what-you-get", number: "03", label: "What You Get" },
  { id: "process",      number: "04", label: "Process" },
  { id: "studio",       number: "05", label: "About" },
  { id: "faq",          number: "06", label: "FAQ" },
  { id: "contact",      number: "07", label: "Contact" },
];

const TOTAL = "07";

export default function SectionCounter() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrent(i);
        },
        { threshold: 0, rootMargin: "-20% 0px -70% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const section = SECTIONS[current];

  return (
    <div
      aria-hidden="true"
      className="section-counter"
      style={{
        position: "fixed",
        right: "1.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transition: "opacity 400ms ease",
        pointerEvents: "none",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "5px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#f4f1ea" }}>{section.number}</span>
        <span style={{ color: "rgba(138,134,128,0.45)" }}> / {TOTAL}</span>
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.48rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(138,134,128,0.45)",
          textAlign: "right",
        }}
      >
        {section.label}
      </p>
    </div>
  );
}
