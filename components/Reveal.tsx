"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;    // seconds
  duration?: number; // milliseconds
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(22px)",
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay * 1000}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
}
