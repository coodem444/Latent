"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isCoarse, setIsCoarse] = useState(true);
  const [variant, setVariant] = useState<"default" | "link" | "drag">("default");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsCoarse(!mq.matches);

    if (!mq.matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    let raf: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);

    const setLinkState = (on: boolean) => () => setVariant(on ? "link" : "default");
    const interactiveEls = () => document.querySelectorAll("a, button, [data-cursor='link']");

    const attach = () => {
      interactiveEls().forEach((el) => {
        el.addEventListener("mouseenter", setLinkState(true));
        el.addEventListener("mouseleave", setLinkState(false));
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  if (isCoarse) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--paper)] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,background-color] duration-300"
        style={{
          width: variant === "link" ? 56 : 32,
          height: variant === "link" ? 56 : 32,
          borderColor: variant === "link" ? "var(--signal)" : "var(--metal)",
          backgroundColor: variant === "link" ? "rgba(61,90,254,0.08)" : "transparent",
          willChange: "transform",
        }}
      />
    </>
  );
}
