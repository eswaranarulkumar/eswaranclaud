"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";
import Hologram from "./Hologram";

const STATS = [
  { label: "NODES", value: "12" },
  { label: "LINKS", value: "84" },
  { label: "UPTIME", value: "99.8%" },
];

const EQ = [8, 14, 10, 20, 12, 24, 16, 10, 22, 14, 18, 8, 16, 24, 12, 20, 10, 14];

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
    <section id="home" className="relative mx-auto max-w-[1500px] px-4 pt-24 md:px-6 md:pt-28">
      <motion.div
        className="panel-line relative overflow-hidden"
        initial={reduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* corner ticks */}
        <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-cyan-sig/60" aria-hidden="true" />
        <span className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-cyan-sig/60" aria-hidden="true" />

        <div className="flex">
          {/* Left ruler (desktop only) */}
          <div className="ruler hidden w-14 shrink-0 flex-col items-start justify-between py-6 pl-3 lg:flex" aria-hidden="true">
            <span className="font-mono-tech text-[9px] tracking-[0.2em] text-fog/50">DS_24</span>
            {["00", "20", "40", "60"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <i />
                <span className="font-mono-tech text-[9px] text-fog/40">{t}</span>
              </span>
            ))}
          </div>

          <div className="grid flex-1 gap-10 px-5 py-10 md:grid-cols-[1.05fr_1fr] md:items-center md:px-10 md:py-14">
            {/* Left: mission + headline */}
            <div className="relative z-10">
              <motion.div className="mb-6 flex items-center gap-4" {...line(0)}>
                <span className="font-mono-tech text-[10px] tracking-[0.3em] text-cyan-sig uppercase">
                  Core Mission
                </span>
                <span className="h-px w-16 bg-cyan-sig/60" aria-hidden="true" />
              </motion.div>

              <h1 className="font-display text-[2.6rem] leading-[1.08] font-bold tracking-[0.08em] md:text-6xl lg:text-7xl">
                <motion.span className="block" {...line(1)}>
                  DIGITAL SYSTEMS /
                </motion.span>
                <motion.span className="block" {...line(2)}>
                  BUILT FOR GROWTH
                </motion.span>
              </h1>

              <motion.p className="mt-6 max-w-md text-sm text-fog md:text-base" {...line(3)}>
                We design and build intelligent digital systems
                <br className="hidden md:block" /> that scale with purpose and perform under pressure.
              </motion.p>

              <motion.div className="mt-8 flex flex-wrap items-center gap-7" {...line(4)}>
                <a
                  href="#work"
                  className="font-mono-tech group inline-flex items-center gap-3 text-xs tracking-[0.3em] text-cyan-sig uppercase transition-colors hover:text-white"
                >
                  Explore my work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="font-mono-tech inline-flex items-center gap-3 text-xs tracking-[0.3em] text-fog uppercase transition-colors hover:text-amber-sig"
                >
                  Enter the lab
                </a>
              </motion.div>
            </div>

            {/* Right: hologram + data readouts */}
            <div className="relative flex items-center justify-center gap-6 md:justify-end">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_60%_45%,rgba(34,211,238,0.14),transparent_65%)]" aria-hidden="true" />

              {/* DATA CORE label */}
              <motion.div
                className="font-mono-tech absolute -top-2 left-2 text-[9px] tracking-[0.25em] text-fog/60 md:top-0"
                initial={reduced ? false : { opacity: 0 }}
                animate={reached("holo") ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              >
                <span className="block">DATA CORE</span>
                <span className="mt-1 block text-cyan-sig/80">ONLINE</span>
                <span className="mt-1 block h-px w-10 bg-fog/30" />
              </motion.div>

              <Hologram />

              {/* Stats column (desktop) */}
              <motion.div
                className="hidden shrink-0 flex-col gap-5 lg:flex"
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={reached("holo") ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {STATS.map((s) => (
                  <div key={s.label} className="flex items-center gap-4">
                    <span className="h-px w-8 bg-cyan-sig/50" aria-hidden="true" />
                    <span className="font-mono-tech w-14 text-[10px] tracking-[0.2em] text-fog/70">{s.label}</span>
                    <span className="font-mono-tech text-xs text-white">{s.value}</span>
                  </div>
                ))}
                <div className="eq-bars mt-2" aria-hidden="true">
                  {EQ.map((h, i) => (
                    <span key={i} style={{ height: `${h}px` }} />
                  ))}
                </div>
                <div className="dot-matrix h-8 w-36 opacity-50" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
