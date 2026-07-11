"use client";

import { motion } from "framer-motion";
import WaveformCanvas from "@/components/WaveformCanvas";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FinalCTA() {
  return (
    <section id="contacto" className="relative overflow-hidden border-t border-[var(--hairline)] py-40 sm:py-52">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50">
        <WaveformCanvas progress={0.98} className="h-[30vh] w-[92%] max-w-[1300px]" strokeColor="#3d5afe" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, var(--void) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-[var(--container-pad)] text-center">
        <RevealText
          as="h2"
          className="text-display mx-auto max-w-4xl text-[2.8rem] text-[var(--paper)] sm:text-[4.5rem] lg:text-[5.5rem]"
        >
          ¿Listo para dejar de perder
          <br />
          frames por un sistema
          <br />
          mal calibrado?
        </RevealText>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-8 max-w-md text-[1.02rem] leading-relaxed text-[var(--paper-dim)]"
        >
          Agenda tu sesión o resuelve cualquier duda técnica antes de decidir.
          Respondemos directamente, sin bots ni formularios eternos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="https://discord.com/users/coodem">Reservar en Discord</MagneticButton>
          <MagneticButton href="https://x.com/coodem_" variant="ghost">Seguir en X</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
