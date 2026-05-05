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
      // Render enough native height to fill the container exactly
      setNativeH(Math.max(900, Math.ceil(h / s)));
    }
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="block group focus:outline-none"
      aria-label={`View ${title} live site`}
    >
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-[2px] ring-1 ring-red/20 shadow-[0_8px_48px_rgba(214,48,49,0.08)] ${className}`}
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
        {/* Hover: red ring + badge */}
        <div className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-red/50 transition-all duration-300 rounded-[2px]">
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="font-sans text-[0.68rem] font-bold tracking-[0.1em] uppercase text-paper bg-red px-4 py-2 rounded-sm">
              View full site ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
