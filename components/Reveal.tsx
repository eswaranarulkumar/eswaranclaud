"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro, type IntroPhase } from "./IntroContext";

/** Fades/slides children in once the intro reaches the given phase. */
export default function Reveal({
  phase,
  delay = 0,
  y = 24,
  className,
  children,
}: {
  phase: IntroPhase;
  delay?: number;
  y?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached(phase);

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
