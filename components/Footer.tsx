export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--hairline)] py-16">
      <div className="mx-auto max-w-[1600px] px-[var(--container-pad)]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-mono text-[0.95rem] font-semibold text-[var(--paper)]">
              LATENT<span className="text-[var(--signal)]">.</span>
            </span>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-[var(--graphite)]">
              Optimización de sistema medida, no adivinada. Ingeniería de
              rendimiento para Windows.
            </p>
          </div>

          <div>
            <span className="text-eyebrow text-[var(--graphite)]">Servicios</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-[var(--paper-dim)]">
              <li><a href="#tarifas" className="transition-colors hover:text-[var(--paper)]">Visita Estándar</a></li>
              <li><a href="#tarifas" className="transition-colors hover:text-[var(--paper)]">Optimización Windows</a></li>
              <li><a href="#tarifas" className="transition-colors hover:text-[var(--paper)]">Optimización Avanzada (BIOS)</a></li>
            </ul>
          </div>

          <div>
            <span className="text-eyebrow text-[var(--graphite)]">Estudio</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-[var(--paper-dim)]">
              <li><a href="#metodo" className="transition-colors hover:text-[var(--paper)]">Método</a></li>
              <li><a href="#problema" className="transition-colors hover:text-[var(--paper)]">El problema</a></li>
              <li><a href="#faq" className="transition-colors hover:text-[var(--paper)]">FAQ</a></li>
            </ul>
          </div>

          <div>
            <span className="text-eyebrow text-[var(--graphite)]">Contacto</span>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-[var(--paper-dim)]">
              <li>
                <a href="https://discord.com/users/coodem" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--paper)]">
                  Discord — coodem
                </a>
              </li>
              <li>
                <a href="https://x.com/coodem_" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--paper)]">
                  X — @coodem_
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-6 border-t border-[var(--hairline)] pt-8 sm:flex-row sm:items-center">
          <span className="text-mono text-xs text-[var(--graphite)]">
            © {new Date().getFullYear()} LATENT. Todos los derechos reservados.
          </span>
          <span className="text-mono text-xs text-[var(--graphite)]">
            Optimización de sistema medida, no adivinada.
          </span>
        </div>
      </div>
    </footer>
  );
}
