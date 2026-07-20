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
  const [activeHash, setActiveHash] = useState("#home");

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
        scrolled ? "glass-panel border-x-0 border-t-0" : "border-b border-fog/10 bg-void/60"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        {/* Left: name + studio tag */}
        <a href="#home" className="flex min-w-0 items-center gap-4">
          <span className="font-display text-sm font-bold tracking-[0.3em] whitespace-nowrap md:text-base">
            ESWARAN ARULKUMAR
          </span>
          <span className="hidden items-center gap-2 lg:flex">
            <span className="status-dot shrink-0" aria-hidden="true" />
            <span className="font-mono-tech text-[10px] tracking-[0.25em] text-fog/70 uppercase whitespace-nowrap">
              Digital Systems Studio
            </span>
          </span>
        </a>

        {/* Center: desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = activeHash === l.href;
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setActiveHash(l.href)}
                className={`font-mono-tech relative pb-1 text-xs tracking-[0.2em] uppercase transition-colors ${
                  active ? "text-cyan-sig" : "text-fog hover:text-cyan-sig"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-cyan-sig" aria-hidden="true" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: system status (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <span className="h-2 w-2 rounded-full bg-amber-sig shadow-[0_0_8px_rgba(249,115,22,0.9)]" aria-hidden="true" />
          <span className="font-mono-tech text-[10px] tracking-[0.25em] text-fog/70 uppercase">
            System Status
          </span>
          <span className="flex items-end gap-0.5" aria-hidden="true">
            <span className="h-2 w-0.5 bg-fog/50" />
            <span className="h-3 w-0.5 bg-fog/50" />
            <span className="h-2.5 w-0.5 bg-fog/50" />
            <span className="h-3.5 w-0.5 bg-fog/50" />
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-panel overflow-hidden border-x-0 md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono-tech border-b border-fog/10 py-3.5 text-sm tracking-[0.2em] text-fog uppercase last:border-0 hover:text-cyan-sig"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
