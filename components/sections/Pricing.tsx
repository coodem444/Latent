"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

type Tier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  note?: string;
  highlight?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Visita Estándar",
    price: "9.95 €",
    tagline: "Análisis y hardware. Para saber qué está pasando antes de decidir.",
    features: [
      "Diagnóstico inicial completo",
      "Comprobación de componentes",
      "Análisis de cuellos de botella térmicos/hardware",
      "Informe de viabilidad del sistema",
    ],
  },
  {
    name: "Optimización Windows",
    price: "19.99 €",
    tagline: "Sin BIOS. El nivel que la mayoría de jugadores competitivos necesita.",
    features: [
      "Todo lo de Visita Estándar",
      "Limpieza profunda de telemetría",
      "Optimización de servicios de Windows",
      "Configuración avanzada de energía",
      "Priorización de procesos",
      "Perfiles de drivers limpios (DDU / NVCleanstall)",
    ],
    highlight: true,
  },
  {
    name: "Optimización Avanzada",
    price: "29.99 €",
    tagline: "Con BIOS. El techo real de tu hardware.",
    features: [
      "Todo lo de Optimización Windows",
      "Configuración de BIOS: XMP/EXPO",
      "Evaluación de C-States / HPET según el caso",
      "Optimización de curvas de ventilación",
      "Mitigaciones de CPU y ReBAR",
    ],
    note:
      "No desactivamos C-States por defecto — los evaluamos bajo carga real. Apagarlos a ciegas puede degradar el boost de un solo núcleo y disparar temperaturas. Se ajustan solo cuando los datos lo justifican.",
  },
];

export default function Pricing() {
  return (
    <section id="tarifas" className="relative border-t border-[var(--hairline)] py-32 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)]">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <RevealText as="span" className="text-eyebrow block text-[var(--signal)]">
              Tarifas y servicios
            </RevealText>
            <RevealText
              as="h2"
              delay={0.05}
              className="text-display mt-6 max-w-2xl text-[2.6rem] text-[var(--paper)] sm:text-[3.4rem] lg:text-[3.8rem]"
            >
              Tres niveles.
              <br />
              Cada uno incluye el anterior.
            </RevealText>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7 }}
            className="max-w-sm text-[0.98rem] leading-relaxed text-[var(--graphite)]"
          >
            ¿No sabes qué nivel necesitas? Empieza por la Visita Estándar — el
            informe te dice exactamente qué falta.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden bg-[var(--hairline)] lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col justify-between p-8 sm:p-10 ${
                tier.highlight ? "bg-[var(--surface)]" : "bg-[var(--void)]"
              }`}
            >
              {tier.highlight && (
                <span className="text-mono absolute right-8 top-8 text-[0.65rem] text-[var(--signal)] sm:right-10 sm:top-10">
                  MÁS ELEGIDO
                </span>
              )}
              <div>
                <span className="text-mono text-xs text-[var(--graphite)]">{tier.name}</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-display text-[2.8rem] text-[var(--paper)]">{tier.price}</span>
                </div>
                <p className="mt-4 max-w-xs text-[0.92rem] leading-relaxed text-[var(--graphite)]">
                  {tier.tagline}
                </p>

                <ul className="mt-8 flex flex-col gap-3 border-t border-[var(--hairline)] pt-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[0.88rem] text-[var(--paper-dim)]">
                      <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-[var(--signal)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {tier.note && (
                  <p className="text-mono mt-6 border-t border-[var(--hairline)] pt-6 text-[0.72rem] leading-relaxed text-[var(--graphite)]">
                    {tier.note}
                  </p>
                )}
              </div>

              <div className="mt-10">
                <MagneticButton
                  href="https://discord.com/users/coodem"
                  variant={tier.highlight ? "solid" : "ghost"}
                  className="w-full !justify-center"
                >
                  Reservar
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
