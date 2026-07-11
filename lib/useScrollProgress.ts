"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far a section has progressed through the viewport, 0 -> 1,
 * starting when the top enters the bottom of the viewport and ending
 * when the bottom leaves the top of the viewport.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const p = Math.min(1, Math.max(0, traveled / total));
      setProgress(p);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => cancelAnimationFrame(raf);
  }, []);

  return { ref, progress };
}
