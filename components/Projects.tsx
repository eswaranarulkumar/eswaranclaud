"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { useIntro } from "./IntroContext";

export default function Projects() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached("done");

  return (
    <section id="services" className="mx-auto max-w-[1500px] px-4 pb-10 md:px-6 md:pb-14">
      <div className="flex gap-4 md:gap-6" id="about">
        {/* Vertical label (desktop) */}
        <motion.div
          className="panel-line hidden w-12 shrink-0 items-center justify-center rounded-xl bg-void/30 lg:flex"
          initial={reduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <span className="v-text font-mono-tech rotate-180 text-[9px] tracking-[0.35em] text-cyan-sig/70 uppercase">
            Featured Work
          </span>
        </motion.div>

        <div className="grid flex-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.index}
              href={p.href}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="group panel-line relative overflow-hidden rounded-xl bg-void/30 transition-all duration-300 hover:border-cyan-sig/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className="absolute inset-0 scale-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url(/posters/project_${p.index}.svg)` }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-end justify-between gap-3 px-5 py-4">
                <div>
                  <span className="font-mono-tech text-[10px] tracking-[0.3em] text-cyan-sig">{p.index}</span>
                  <h3 className="font-display mt-1 text-lg font-semibold tracking-[0.1em] md:text-xl">{p.title}</h3>
                  <p className="mt-0.5 text-xs text-fog">{p.tag}</p>
                </div>
                <span className="mb-1 text-xl leading-none text-fog transition-colors group-hover:text-cyan-sig" aria-hidden="true">+</span>
              </div>
              <div className="max-h-0 overflow-hidden px-5 opacity-0 transition-all duration-300 group-hover:max-h-28 group-hover:pb-4 group-hover:opacity-100 group-focus-visible:max-h-28 group-focus-visible:pb-4 group-focus-visible:opacity-100">
                <p className="text-xs text-fog">{p.description}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-xs text-cyan-sig">
                  View details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </motion.a>
          ))}

          {/* Contact card */}
          <motion.div
            id="contact"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.46 }}
            className="tech-frame relative flex flex-col justify-between rounded-sm bg-void/40 p-6 md:col-span-2 xl:col-span-1"
          >
            <div>
              <h3 className="font-display text-lg font-bold tracking-[0.15em] text-cyan-sig md:text-xl">
                LET&apos;S BUILD THE FUTURE
              </h3>
              <p className="mt-3 text-sm text-fog" id="insights">
                Ready to start your next project?
              </p>
              <a
                href="mailto:mail@eswaran.no"
                className="font-mono-tech mt-4 inline-block text-sm tracking-[0.08em] text-white underline-offset-4 transition-colors hover:text-cyan-sig hover:underline"
              >
                mail@eswaran.no
              </a>
            </div>
            <a
              href="mailto:mail@eswaran.no"
              aria-label="Send email"
              className="mt-6 inline-flex h-11 w-11 items-center justify-center self-end border border-cyan-sig/50 text-cyan-sig transition-all hover:bg-cyan-sig hover:text-void hover:shadow-[0_0_24px_rgba(34,211,238,0.5)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
