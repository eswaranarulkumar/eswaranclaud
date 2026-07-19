"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={reached("nav") ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass-panel border-x-0 border-t-0" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="status-dot" aria-hidden="true" />
          <span className="font-display text-sm font-bold tracking-[0.25em] md:text-base">
            ESWARAN ARULKUMAR
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono-tech text-xs tracking-[0.2em] text-fog uppercase transition-colors hover:text-cyan-sig focus-visible:text-cyan-sig"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-cyan-sig transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-cyan-sig transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-cyan-sig transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel overflow-hidden border-x-0 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-mono-tech text-sm tracking-[0.2em] text-fog uppercase hover:text-cyan-sig"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
