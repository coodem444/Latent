"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";

const LEAKS = [
  {
    code: "DPC",
    title: "Latencia DPC sin auditar",
    detail:
      "Drivers mal firmados o mal configurados generan Deferred Procedure Calls que bloquean el hilo de renderizado sin que aparezca en el Administrador de tareas.",
  },
  {
    code: "MSI",
    title: "Interrupciones sin afinidad",
    detail:
      "Con MSI-X mal configurado, tu GPU y tu tarjeta de red compiten por el mismo núcleo, generando picos de latencia impredecibles en el peor momento.",
  },
  {
    code: "C-ST",
    title: "Estados de energía genéricos",
    detail:
      "El firmware reduce el reloj del núcleo entre frames para ahorrar vatios por defecto. Ese ahorro se paga en microstutter.",
  },
  {
    code: "SVC",
    title: "Servicios y telemetría acumulados",
    detail:
      "Cada actualización de Windows reactiva procesos en segundo plano que nadie vuelve a auditar. Se acumulan silenciosamente, versión tras versión.",
  },
];

const TOOLS = [
  { tool: "LatencyMon", measures: "Latencia DPC/ISR real, por driver, en carga sostenida" },
  { tool: "CapFrameX", measures: "Frame pacing, 1% y 0.1% lows, varianza de frame-time" },
  { tool: "Process Lasso / afinidad manual", measures: "Distribución de interrupciones y prioridad de proceso por núcleo" },
  { tool: "HWiNFO", measures: "Comportamiento térmico y de C-States bajo carga real" },
];

export default function Problem() {
  return (
    <section className="relative border-t border-[var(--hairline)] py-32 sm:py-40" id="problema">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealText as="span" className="text-eyebrow block text-[var(--signal)]">
              El problema
            </RevealText>
            <RevealText
              as="h2"
              delay={0.05}
              className="text-display mt-6 text-[2.6rem] text-[var(--paper)] sm:text-[3.4rem] lg:text-[3.8rem]"
            >
              Windows de stock
              <br />
              no está roto.
              <br />
              <span className="text-[var(--graphite)]">Está mal calibrado.</span>
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-[var(--paper-dim)]"
            >
              Sale de fábrica optimizado para el caso promedio: ofimática,
              ahorro de batería, compatibilidad universal. Ese equilibrio es
              exactamente lo que sobra cuando lo que importa es el frame que
              llega en el milisegundo correcto.
            </motion.p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-col">
              {LEAKS.map((leak, i) => (
                <motion.div
                  key={leak.code}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-[3.5rem_1fr] gap-6 border-b border-[var(--hairline)] py-8 first:pt-0"
                >
                  <span className="text-mono pt-1 text-xs text-[var(--graphite)] transition-colors duration-300 group-hover:text-[var(--signal)]">
                    {leak.code}
                  </span>
                  <div>
                    <h3 className="text-[1.35rem] font-semibold tracking-tight text-[var(--paper)]">
                      {leak.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-[var(--graphite)]">
                      {leak.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why generic guides make it worse */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
          className="mt-28 border-t border-[var(--hairline-strong)] pt-16"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-eyebrow block text-[var(--graphite)]">
                Por qué las guías genéricas empeoran las cosas
              </span>
              <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-[var(--paper-dim)]">
                Un script de &ldquo;debloat&rdquo; descargado de un foro no
                conoce tu placa base, tu firmware ni tu combinación específica
                de drivers. Desactiva servicios a ciegas, aplicando el mismo
                <code className="text-mono mx-1 rounded bg-[var(--surface)] px-1.5 py-0.5 text-[0.85em] text-[var(--paper)]">.bat</code>
                a un i5 de 2019 que a un 9800X3D de este año. El resultado
                más común no es más rendimiento: es un sistema inestable,
                con BSOD intermitentes y sin forma clara de revertir el daño.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <span className="text-eyebrow block text-[var(--signal)]">
                Nuestro enfoque: medir antes de tocar nada
              </span>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-[var(--graphite)]">
                No adivinamos. Auditamos con las mismas herramientas que usan
                los ingenieros de driver, y solo después de ver los datos de
                tu sistema específico decidimos qué se toca y qué no.
              </p>

              <div className="mt-10 overflow-x-auto">
                <div className="min-w-[520px]">
                  <div className="grid grid-cols-[1fr_1.6fr] border-b border-[var(--hairline-strong)] pb-4">
                    <span className="text-mono text-xs text-[var(--graphite)]">Herramienta</span>
                    <span className="text-mono text-xs text-[var(--graphite)]">Qué medimos</span>
                  </div>
                  {TOOLS.map((row, i) => (
                    <motion.div
                      key={row.tool}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="grid grid-cols-[1fr_1.6fr] border-b border-[var(--hairline)] py-5"
                    >
                      <span className="pr-4 text-[0.92rem] font-medium text-[var(--paper)]">{row.tool}</span>
                      <span className="text-[0.9rem] text-[var(--paper-dim)]">{row.measures}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
