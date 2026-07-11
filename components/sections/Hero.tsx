"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaveformCanvas from "@/components/WaveformCanvas";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [waveProgress, setWaveProgress] = useState(0);
  const [ms, setMs] = useState(14.2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / 3200);
      const eased = 1 - Math.pow(1 - t, 3);
      setWaveProgress(eased * 0.78);
      setMs(14.2 - eased * 13.1);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <WaveformCanvas
          progress={waveProgress}
          className="h-[42vh] w-[92%] max-w-[1400px] opacity-70"
          strokeColor="#3d5afe"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, var(--void) 78%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-[var(--container-pad)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
          <span className="text-eyebrow text-[var(--paper-dim)]">
            Ingeniería de sistema · No es un tweak, es un rediseño
          </span>
        </motion.div>

        <h1 className="text-display max-w-[20ch] text-[10.5vw] text-[var(--paper)] sm:text-[6.8vw] lg:text-[4.9vw]">
          {["Cero stuttering.", "Input lag medido", "en milisegundos.", "1% low estable,", "frame tras frame."].map(
            (line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.35 + i * 0.08,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${i >= 3 ? "text-[var(--graphite)]" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            )
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-[1.05rem] leading-relaxed text-[var(--paper-dim)]">
            No aplicamos una guía de YouTube a tu sistema. Perfilamos tu
            latencia DPC, tu gestión de interrupciones (MSI) y tu frame
            pacing con telemetría real, y construimos un perfil de
            optimización a medida de tu hardware.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton href="#tarifas" variant="ghost" className="!px-6 !py-3.5 !text-xs">
              Ver tarifas
            </MagneticButton>
            <MagneticButton href="https://discord.com/users/coodem">
              Diagnóstico en Discord
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.9 }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between border-t border-[var(--hairline)] px-[var(--container-pad)] py-6"
      >
        <span className="text-mono text-xs text-[var(--graphite)]">
          FRAME-TIME MONITOR
        </span>
        <span className="text-mono text-xs text-[var(--paper-dim)]">
          {ms.toFixed(1)}ms <span className="text-[var(--graphite)]">variance</span>
        </span>
        <span className="hidden text-mono text-xs text-[var(--graphite)] sm:inline">
          ↓ scroll para ver el proceso
        </span>
      </motion.div>
    </section>
  );
}
