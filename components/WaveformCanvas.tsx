"use client";

import { useEffect, useRef } from "react";

type WaveformCanvasProps = {
  /** 0 = raw/chaotic frame-time jitter, 1 = fully optimized/flat-fast */
  progress?: number;
  className?: string;
  strokeColor?: string;
  glow?: boolean;
};

/**
 * Draws a live oscilloscope-style waveform representing frame-time variance.
 * At progress=0 it's jagged and irregular (stutter/jitter).
 * At progress=1 it's a tight, fast, near-flat line (optimized system).
 * This is LATENT's signature visual motif, reused across sections.
 */
export default function WaveformCanvas({
  progress = 0,
  className = "",
  strokeColor = "#3d5afe",
  glow = true,
}: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const tRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const points = 140;
    const seeds = Array.from({ length: points }, () => Math.random());

    const draw = () => {
      tRef.current += 1;
      const p = progressRef.current;
      ctx.clearRect(0, 0, width, height);

      const midY = height / 2;
      const chaosAmplitude = height * 0.36 * (1 - p) + height * 0.03;
      const speed = 0.02 + p * 0.05;

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const seed = seeds[i % seeds.length];
        const noise =
          Math.sin(i * 0.35 + tRef.current * speed + seed * 10) * 0.6 +
          Math.sin(i * 0.11 + tRef.current * speed * 0.5) * 0.4;
        const spike = p < 0.85 && seed > 0.94 ? (1 - p) * height * 0.5 * Math.sin(tRef.current * 0.1 + i) : 0;
        const y = midY + noise * chaosAmplitude + spike;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = strokeColor;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      if (glow) {
        ctx.shadowColor = strokeColor;
        ctx.shadowBlur = 8;
      }
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [strokeColor, glow]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
