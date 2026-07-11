"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  onClick?: () => void;
  className?: string;
};

export default function MagneticButton({
  children,
  href,
  variant = "solid",
  onClick,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.45);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300";
  const solid = "bg-[var(--paper)] text-[var(--void)]";
  const ghost = "border border-[var(--hairline-strong)] text-[var(--paper)]";

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      // @ts-expect-error -- polymorphic ref across a/button
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${base} ${variant === "solid" ? solid : ghost} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === "solid" && (
        <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-[var(--signal)] transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:scale-x-100" />
      )}
      {variant === "ghost" && (
        <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-[var(--paper)] transition-transform duration-400 ease-[var(--ease-out-quart)] group-hover:scale-y-100" />
      )}
      <span
        className={`relative z-10 transition-transform duration-300 group-hover:translate-x-1 ${
          variant === "ghost" ? "group-hover:text-[var(--void)]" : ""
        }`}
      >
        →
      </span>
    </Comp>
  );
}
