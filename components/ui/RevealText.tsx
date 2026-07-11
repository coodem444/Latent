"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type RevealTextProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export default function RevealText({
  children,
  as = "div",
  className = "",
  delay = 0,
  duration = 0.9,
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const Comp = motion[as];

  return (
    <div ref={ref} className="overflow-hidden">
      <Comp
        className={className}
        initial={{ y: "110%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </Comp>
    </div>
  );
}
