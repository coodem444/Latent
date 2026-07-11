"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const NAV = [
  { label: "Método", href: "#metodo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tarifas", href: "#tarifas" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-b border-[var(--hairline)] bg-[var(--void)]/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div
        className="mx-auto flex max-w-[1600px] items-center justify-between px-[var(--container-pad)] transition-[padding] duration-500"
        style={{ paddingTop: scrolled ? "1.1rem" : "1.75rem", paddingBottom: scrolled ? "1.1rem" : "1.75rem" }}
      >
        <a href="#top" data-cursor="link" className="text-mono text-[0.95rem] font-semibold tracking-[0.02em] text-[var(--paper)]">
          LATENT<span className="text-[var(--signal)]">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-eyebrow relative text-[var(--paper-dim)] transition-colors duration-300 hover:text-[var(--paper)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href="https://discord.com/users/coodem" variant="ghost" className="!px-6 !py-3 !text-xs">
            Reservar en Discord
          </MagneticButton>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Abrir menú"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            className="h-px w-6 bg-[var(--paper)]"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="h-px w-6 bg-[var(--paper)]"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            className="h-px w-6 bg-[var(--paper)]"
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 top-0 z-50 flex flex-col justify-center bg-[var(--void)] px-[var(--container-pad)] md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-display border-b border-[var(--hairline)] py-5 text-4xl text-[var(--paper)]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10"
            >
              <MagneticButton href="https://discord.com/users/coodem" onClick={() => setMenuOpen(false)}>
                Reservar en Discord
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
