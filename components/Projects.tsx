"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { useIntro } from "./IntroContext";

export default function Projects() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached("done");

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10 flex items-end justify-between"
      >
        <h2 className="font-display text-3xl font-bold tracking-[0.15em] md:text-4xl">
          SELECTED WORK
        </h2>
        <span className="font-mono-tech hidden text-[10px] tracking-[0.25em] text-fog/60 md:block">
          INDEX / 003 UNITS
        </span>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3" id="about">
        {projects.map((p, i) => (
          <motion.a
            key={p.index}
            href={p.href}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
            className="group glass-panel relative overflow-hidden p-7 transition-all duration-300 hover:border-cyan-sig/60 hover:shadow-[0_0_32px_rgba(34,211,238,0.18)]"
          >
            {/* Abstract visual band that zooms subtly on hover */}
            <div className="relative mb-6 aspect-[16/7] overflow-hidden border border-fog/10">
              <div
                className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(/posters/project_${p.index}.svg)` }}
                aria-hidden="true"
              />
            </div>

            <span className="font-mono-tech text-[10px] tracking-[0.3em] text-amber-sig">
              {p.index}
            </span>
            <h3 className="font-display mt-2 text-2xl font-semibold tracking-[0.1em]">
              {p.title}
            </h3>
            <p className="font-mono-tech mt-1 text-[10px] tracking-[0.2em] text-fog/70">
              {p.tag}
            </p>

            {/* Details + arrow revealed on hover (always visible on touch) */}
            <div className="mt-4 max-h-24 opacity-90 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-visible:max-h-24 md:group-focus-visible:opacity-100">
              <p className="text-sm text-fog">{p.description}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-sig">
                View details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
