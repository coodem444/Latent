"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "@/components/ui/RevealText";

const FAQS = [
  {
    q: "¿Es seguro el proceso? ¿Pierdo la garantía?",
    a: "Sí, es seguro. No usamos scripts automáticos de \u201cdebloat\u201d que desactivan servicios a ciegas ni rompen componentes del sistema operativo. Cada cambio se aplica de forma manual, se documenta y es reversible. No modificamos el hardware físicamente ni hacemos nada que invalide la garantía del fabricante; los ajustes de BIOS que aplicamos son los mismos parámetros que tú mismo podrías tocar desde el menú de tu placa base.",
  },
  {
    q: "¿Cómo se realiza el servicio?",
    a: "De forma 100% remota, a través de software de asistencia como AnyDesk o TeamViewer. Tú mantienes el control total de la sesión en todo momento y puedes ver cada cambio mientras se aplica. No se instala nada oculto ni se deja acceso permanente al finalizar.",
  },
  {
    q: "¿Qué gano realmente en mis juegos y aplicaciones?",
    a: "No prometemos un número de FPS mágico — eso depende de tu hardware. Lo que sí puedes esperar, medido antes y después con CapFrameX: mejores 1% y 0.1% lows con menos caídas puntuales, reducción real de input lag entre tu clic y la acción en pantalla, y mayor estabilidad general con menos microcortes atribuibles a servicios o drivers mal configurados.",
  },
  {
    q: "¿Necesito estar delante del PC todo el tiempo?",
    a: "Sí, durante toda la sesión, para autorizar cambios de BIOS (si aplica) y confirmar que todo funciona correctamente antes de cerrar la conexión remota.",
  },
  {
    q: "¿Puedo revertir los cambios si algo no me convence?",
    a: "Sí. Documentamos cada ajuste aplicado para que pueda revertirse total o parcialmente si lo solicitas.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-[var(--hairline)] py-32 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealText as="span" className="text-eyebrow block text-[var(--signal)]">
              Preguntas frecuentes
            </RevealText>
            <RevealText
              as="h2"
              delay={0.05}
              className="text-display mt-6 max-w-xs text-[2.4rem] text-[var(--paper)] sm:text-[2.8rem]"
            >
              Antes de que preguntes.
            </RevealText>
          </div>

          <div className="lg:col-span-8">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="border-b border-[var(--hairline)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-8 py-7 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1.05rem] font-medium text-[var(--paper)] sm:text-[1.2rem]">
                      {faq.q}
                    </span>
                    <span className="relative h-4 w-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-[var(--paper-dim)]" />
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[var(--paper-dim)]"
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-8 text-[0.98rem] leading-relaxed text-[var(--graphite)]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
