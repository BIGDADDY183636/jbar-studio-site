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
          ? "bg-canvas/95 backdrop-blur-md border-b border-paper/[0.07]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Wordmark — Inter 900, tight, technical */}
        <a
          href="#"
          className="font-sans font-black text-paper leading-none select-none"
          style={{ fontSize: "0.9rem", letterSpacing: "-0.02em" }}
        >
          JBAR
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-underline font-sans text-[0.72rem] font-medium text-paper/45 hover:text-paper transition-colors duration-200 tracking-wide"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-glow font-sans text-[0.7rem] font-semibold tracking-[0.1em] bg-red text-paper px-4 py-2.5 rounded-full"
          >
            Start a project
          </a>
        </div>
      </nav>
    </header>
  );
}
