"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import WaveformCanvas from "@/components/WaveformCanvas";
import RevealText from "@/components/ui/RevealText";

export default function Benchmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitX, setSplitX] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitX(Math.min(96, Math.max(4, pct)));
  };

  return (
    <section className="relative border-t border-[var(--hairline)] py-32 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)]">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <RevealText as="span" className="text-eyebrow block text-[var(--signal)]">
              Benchmark visual
            </RevealText>
            <RevealText
              as="h2"
              delay={0.05}
              className="text-display mt-6 max-w-2xl text-[2.6rem] text-[var(--paper)] sm:text-[3.4rem] lg:text-[3.8rem]"
            >
              Arrastra. Verás
              <br />
              la diferencia.
            </RevealText>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-[var(--graphite)]">
            Ambas señales representan frame-time real capturado con el mismo
            hardware, la misma carga, y quince minutos de diferencia.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden border border-[var(--hairline-strong)] sm:aspect-[21/9]"
          onMouseMove={(e) => dragging && updateFromClientX(e.clientX)}
          onMouseDown={(e) => {
            setDragging(true);
            updateFromClientX(e.clientX);
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
          onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
        >
          {/* Base layer: unoptimized, chaotic */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--surface)]">
            <WaveformCanvas progress={0.02} className="h-1/2 w-[92%]" strokeColor="#6b6e76" glow={false} />
            <span className="text-mono absolute bottom-6 left-6 text-xs text-[var(--graphite)]">
              SIN OPTIMIZAR — 14.6ms variance
            </span>
          </div>

          {/* Clipped top layer: optimized, tight */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--void)]"
            style={{ clipPath: `inset(0 ${100 - splitX}% 0 0)` }}
          >
            <WaveformCanvas progress={0.95} className="h-1/2 w-[92%]" strokeColor="#3d5afe" />
            <span className="text-mono absolute bottom-6 left-6 text-xs text-[var(--paper-dim)]">
              LATENT — 1.3ms variance
            </span>
          </div>

          {/* Divider handle */}
          <div
            className="absolute inset-y-0 z-10 w-px bg-[var(--paper)]"
            style={{ left: `${splitX}%` }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--paper)] bg-[var(--void)]">
              <span className="text-xs text-[var(--paper)]">⇔</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
