"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  src: string;
  title: string;
  className?: string;
}

const NATIVE_W = 1440;

export default function IframePreview({ src, title, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [nativeH, setNativeH] = useState(900);

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      const s = w / NATIVE_W;
      setScale(s);
      setNativeH(Math.max(900, Math.ceil(h / s)));
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    // Outer anchor — clickable, but only the explicit "View live site →"
    // link below (in Work.tsx) displays the URL as visible text.
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-red rounded-[2px]"
      tabIndex={-1}
      aria-hidden="true"
    >
      {/* Lift + shadow on hover (item #9) */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-[2px] ring-1 ring-red/20 shadow-[0_8px_48px_rgba(214,48,49,0.08)] transition-all duration-[250ms] ease-out group-hover:-translate-y-1 group-hover:shadow-[0_16px_52px_rgba(214,48,49,0.18)] ${className}`}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${NATIVE_W}px`,
            height: `${nativeH}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "none",
            pointerEvents: "none",
          }}
        />
        {/* Hover: red ring only — no text badge (avoids duplicate CTA) */}
        <div className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-red/50 transition-all duration-300 rounded-[2px] pointer-events-none" />
      </div>
    </a>
  );
}
