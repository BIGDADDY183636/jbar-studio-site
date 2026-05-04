"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  src: string;
  title: string;
}

// Native desktop dimensions the iframe renders at
const NATIVE_W = 1440;
const NATIVE_H = 900;

export default function IframePreview({ src, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    function update() {
      if (!containerRef.current) return;
      setScale(containerRef.current.offsetWidth / NATIVE_W);
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const containerH = Math.round(NATIVE_H * scale);

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[3px]"
      aria-label={`View ${title} live site`}
    >
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-[3px] border border-ink/[0.09] bg-paper-warm"
        style={{ height: containerH || 320 }}
      >
        {/* Live iframe — pointer-events off so the anchor handles clicks */}
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
            height: `${NATIVE_H}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "none",
            pointerEvents: "none",
          }}
        />
        {/* Hover affordance */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-ink/20 to-transparent">
          <span className="font-sans text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-paper bg-accent px-3 py-1.5 rounded-sm">
            View full site ↗
          </span>
        </div>
      </div>
    </a>
  );
}
