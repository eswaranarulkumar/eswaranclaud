"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";

/** Slim footer — the contact card lives in the Projects row, like the mockup. */
export default function Contact() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached("done");

  return (
    <motion.footer
      initial={reduced ? false : { opacity: 0 }}
      animate={show ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="font-mono-tech mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-5 pt-4 pb-8 text-[10px] tracking-[0.2em] text-fog/50 md:px-8"
    >
      <span>© 2026 ESWARAN ARULKUMAR</span>
      <span>SIGNAL ORIGIN: NORWAY</span>
    </motion.footer>
  );
}
