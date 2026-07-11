"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import WaveformCanvas from "@/components/WaveformCanvas";
import RevealText from "@/components/ui/RevealText";

const PHASES = [
  {
    mark: "Fase 1",
    title: "Auditoría de kernel",
    detail:
      "Perfilamos el planificador, las interrupciones y los drivers en carga real. No adivinamos: medimos cada fuente de latencia con herramientas de trazado a nivel de sistema.",
  },
  {
    mark: "Fase 2",
    title: "Reescritura de políticas",
    detail:
      "Sustituimos las políticas de energía, planificación y E/S por perfiles diseñados para picos de rendimiento sostenido, no para el promedio.",
  },
  {
    mark: "Fase 3",
    title: "Calibración de red y BIOS",
    detail:
      "Ajustamos buffers de red, C-states, timers de firmware y afinidad de IRQ. Cada parámetro se valida contra tu hardware específico.",
  },
  {
    mark: "Fase 4",
    title: "Validación con carga real",
    detail:
      "Sometemos el sistema a las mismas condiciones que vas a vivir: tu juego, tu resolución, tu conexión. Solo entregamos lo que se sostiene.",
  },
];

/** Subscribes a plain number state to a Framer Motion MotionValue. */
function useMotionValueNumber(mv: MotionValue<number>) {
  const [value, setValue] = useState(mv.get());
  useEffect(() => {
    const unsubscribe = mv.on("change", (v) => setValue(v));
    return () => unsubscribe();
  }, [mv]);
  return value;
}

export default function Method() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const waveProgressMv = useTransform(scrollYProgress, [0, 1], [0.05, 0.94]);
  const waveProgress = useMotionValueNumber(waveProgressMv);

  return (
    <section id="metodo" className="relative border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)] pt-32">
        <RevealText as="span" className="text-eyebrow block text-[var(--signal)]">
          Cómo trabajamos
        </RevealText>
        <RevealText
          as="h2"
          delay={0.05}
          className="text-display mt-6 max-w-4xl text-[2.6rem] text-[var(--paper)] sm:text-[3.4rem] lg:text-[3.8rem]"
        >
          Un método de ingeniería,
          <br />
          no una lista de trucos.
        </RevealText>
      </div>

      {/* Sticky horizontal-scroll track — earns its place: this process genuinely
          has sequence, depth, and more content than a single viewport should hold. */}
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-[16%] h-[16vh] opacity-30">
            <WaveformCanvas progress={waveProgress} glow={false} className="h-full w-full" strokeColor="#8c8d91" />
          </div>

          <motion.div style={{ x }} className="flex gap-6 px-[var(--container-pad)] sm:gap-10">
            {PHASES.map((phase) => (
              <div
                key={phase.mark}
                className="flex w-[86vw] shrink-0 flex-col justify-end border-l border-[var(--hairline-strong)] pb-16 pl-8 sm:w-[52vw] lg:w-[38vw]"
                style={{ minHeight: "56vh" }}
              >
                <span className="text-mono text-xs text-[var(--signal)]">{phase.mark}</span>
                <h3 className="text-display mt-4 text-3xl text-[var(--paper)] sm:text-4xl">
                  {phase.title}
                </h3>
                <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-[var(--graphite)]">
                  {phase.detail}
                </p>
              </div>
            ))}
            <div className="flex w-[40vw] shrink-0 items-end pb-16 pl-8">
              <span className="text-mono text-xs text-[var(--graphite)]">
                — fin del proceso, inicio del rendimiento
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
