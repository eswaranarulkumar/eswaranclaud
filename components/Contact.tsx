"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";

export default function Contact() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached("done");

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(59,130,246,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center text-center"
      >
        <span className="font-mono-tech mb-4 text-[10px] tracking-[0.3em] text-amber-sig">
          TRANSMISSION / OPEN
        </span>
        <h2 className="font-display text-4xl leading-tight font-bold tracking-[0.1em] md:text-6xl">
          LET&apos;S BUILD
          <br />
          <span className="text-cyan-sig">THE FUTURE</span>
        </h2>
        <p className="mt-5 max-w-md text-fog md:text-lg" id="insights">
          Ready to start your next project?
        </p>
        <a
          href="mailto:mail@eswaran.no"
          className="font-mono-tech mt-9 border border-cyan-sig bg-cyan-sig/10 px-10 py-4 text-sm tracking-[0.3em] text-cyan-sig uppercase transition-all hover:bg-cyan-sig hover:text-void hover:shadow-[0_0_36px_rgba(34,211,238,0.55)]"
        >
          Initiate contact
        </a>
      </motion.div>

      <footer className="font-mono-tech mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-fog/10 pt-8 text-[10px] tracking-[0.2em] text-fog/50">
        <span>© 2026 ESWARAN ARULKUMAR</span>
        <span>SIGNAL ORIGIN: NORWAY</span>
      </footer>
    </section>
  );
}
