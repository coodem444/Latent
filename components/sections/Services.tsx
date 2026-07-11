"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";

const SERVICES = [
  {
    num: "01",
    title: "Optimización de FPS",
    span: "lg:col-span-7",
    detail:
      "Reescribimos la asignación de núcleos, prioridades de proceso y planificación de GPU para que cada frame se renderice sin competir por recursos.",
    metric: { value: "+38%", label: "1% low FPS medio en clientes" },
  },
  {
    num: "02",
    title: "Input Lag",
    span: "lg:col-span-5",
    detail:
      "Desde el USB polling hasta el compositor de Windows: cerramos cada hueco entre tu clic y la acción en pantalla.",
    metric: { value: "−9ms", label: "click-to-photon" },
  },
  {
    num: "03",
    title: "Latencia de sistema",
    span: "lg:col-span-5",
    detail:
      "Eliminamos los picos de DPC y las interrupciones que generan microcortes invisibles al ojo, pero no al marcador.",
    metric: { value: "−91%", label: "varianza de frame-time" },
  },
  {
    num: "04",
    title: "Tweaks avanzados",
    span: "lg:col-span-7",
    detail:
      "Registro, servicios, telemetría, programador de tareas: un perfil de sistema construido pieza a pieza para tu hardware exacto, no una plantilla genérica.",
    metric: { value: "140+", label: "parámetros auditados" },
  },
  {
    num: "05",
    title: "Optimización de Windows",
    span: "lg:col-span-6",
    detail:
      "El sistema operativo reconstruido en su configuración, no en su interfaz: cada servicio innecesario, desactivado con criterio.",
    metric: { value: "0", label: "procesos redundantes" },
  },
  {
    num: "06",
    title: "Optimización BIOS",
    span: "lg:col-span-6",
    detail:
      "Ajustamos C-states, timers de firmware y curvas de energía directamente en el nivel más bajo del sistema.",
    metric: { value: "1ms", label: "resolución de timer" },
  },
  {
    num: "07",
    title: "Optimización de Red",
    span: "lg:col-span-7",
    detail:
      "Buffers, QoS y stack TCP/IP calibrados para paquetes pequeños y frecuentes, el patrón real de un juego competitivo.",
    metric: { value: "−14ms", label: "latencia percibida en partida" },
  },
  {
    num: "08",
    title: "PCs de alto rendimiento",
    span: "lg:col-span-5",
    detail:
      "Configuraciones completas, desde la selección de componentes hasta el primer arranque, diseñadas para sostener rendimiento bajo carga real.",
    metric: { value: "100%", label: "validado bajo estrés" },
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative border-t border-[var(--hairline)] py-32 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)]">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <RevealText as="span" className="text-eyebrow block text-[var(--signal)]">
              Servicios
            </RevealText>
            <RevealText
              as="h2"
              delay={0.05}
              className="text-display mt-6 max-w-2xl text-[2.6rem] text-[var(--paper)] sm:text-[3.4rem] lg:text-[3.8rem]"
            >
              Ocho disciplinas.
              <br />
              Un solo objetivo.
            </RevealText>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7 }}
            className="max-w-sm text-[0.98rem] leading-relaxed text-[var(--graphite)]"
          >
            No aplicamos un paquete cerrado. Cada disciplina se ajusta a lo
            que tu sistema y tu juego necesitan, y solo a eso.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden bg-[var(--hairline)] lg:grid-cols-12">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col justify-between bg-[var(--void)] p-8 transition-colors duration-500 hover:bg-[var(--surface)] sm:p-10 ${service.span}`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-mono text-xs text-[var(--graphite)]">{service.num}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--hairline-strong)] transition-colors duration-500 group-hover:bg-[var(--signal)]" />
                </div>
                <h3 className="mt-6 text-[1.6rem] font-semibold tracking-tight text-[var(--paper)] sm:text-[1.9rem]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[var(--graphite)]">
                  {service.detail}
                </p>
              </div>
              <div className="mt-10 flex items-baseline gap-3 border-t border-[var(--hairline)] pt-6">
                <span className="text-display text-2xl text-[var(--paper)]">{service.metric.value}</span>
                <span className="text-mono text-[0.7rem] text-[var(--graphite)]">{service.metric.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
