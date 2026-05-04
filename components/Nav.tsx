"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "work", href: "#work" },
  { label: "studio", href: "#studio" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/96 backdrop-blur-md border-b border-ink/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Wordmark — serif uppercase, tracked */}
        <a
          href="#"
          className="font-serif font-semibold text-ink tracking-[0.18em] text-[1rem] uppercase leading-none select-none"
          style={{ fontVariationSettings: '"opsz" 24, "WONK" 0' }}
        >
          JBAR
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-sans text-[0.72rem] font-medium text-ink/50 hover:text-ink transition-colors duration-150 tracking-wide"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
