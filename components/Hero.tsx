"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";
import Hologram from "./Hologram";

export default function Hero() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached("nav");

  const line = (i: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 28 } as const),
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay: 0.1 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="home" className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 pt-28 pb-16 md:flex-row md:items-center md:gap-6 md:px-8 md:pt-40 md:pb-24">
      <div className="relative z-10 md:w-3/5">
        {/* Cyan line that draws in with the logo phase */}
        <motion.div
          aria-hidden="true"
          className="mb-8 h-px bg-gradient-to-r from-cyan-sig via-blue-sig to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={reached("logo") ? { scaleX: 1, opacity: 1 } : {}}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <h1 className="font-display text-5xl leading-[1.02] font-bold tracking-wide md:text-7xl lg:text-8xl">
          <motion.span className="block" {...line(0)}>
            DIGITAL SYSTEMS /
          </motion.span>
          <motion.span className="block text-transparent [-webkit-text-stroke:1.5px_#22d3ee] md:[-webkit-text-stroke:2px_#22d3ee]" {...line(1)}>
            BUILT FOR GROWTH
          </motion.span>
        </h1>

        <motion.p className="mt-7 max-w-md text-base text-fog md:text-lg" {...line(2)}>
          I design and build intelligent digital systems: web, AI, design and
          automation.
        </motion.p>

        <motion.div className="mt-9 flex flex-wrap gap-4" {...line(3)}>
          <a
            href="#work"
            className="font-mono-tech border border-cyan-sig bg-cyan-sig/10 px-7 py-3.5 text-xs tracking-[0.25em] text-cyan-sig uppercase transition-all hover:bg-cyan-sig hover:text-void hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]"
          >
            Explore my work
          </a>
          <a
            href="#services"
            className="font-mono-tech border border-fog/30 px-7 py-3.5 text-xs tracking-[0.25em] text-fog uppercase transition-all hover:border-amber-sig hover:text-amber-sig"
          >
            Enter the lab
          </a>
        </motion.div>

        {/* Small technical data fields */}
        <motion.div className="font-mono-tech mt-12 flex gap-8 text-[10px] tracking-[0.2em] text-fog/60" {...line(4)}>
          <span>LAT 59.12 / LON 11.38</span>
          <span className="hidden sm:inline">UPLINK: STABLE</span>
          <span>V.2026.07</span>
        </motion.div>
      </div>

      <div className="relative z-0 flex justify-center md:w-2/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_65%)]" aria-hidden="true" />
        <Hologram />
      </div>
    </section>
  );
}
