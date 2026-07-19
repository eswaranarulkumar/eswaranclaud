"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Intro timeline phases (desktop timings, per the storyboard):
 *  boot      0.0–0.3s  black screen + faint static
 *  logo      0.3–0.7s  cyan line draws, name fades in
 *  nav       0.7–1.3s  header + hero text slide in
 *  holo      1.3–2.0s  hologram builds up
 *  frame     2.0–2.6s  video frame draws, INITIALIZING TRANSMISSION
 *  signal    2.6–3.2s  SIGNAL ACQUIRED, channel counts up
 *  done      3.2s+     rest of page staggers in
 */
export type IntroPhase =
  | "boot"
  | "logo"
  | "nav"
  | "holo"
  | "frame"
  | "signal"
  | "done";

const ORDER: IntroPhase[] = ["boot", "logo", "nav", "holo", "frame", "signal", "done"];

const DESKTOP_TIMINGS: Record<IntroPhase, number> = {
  boot: 0,
  logo: 300,
  nav: 700,
  holo: 1300,
  frame: 2000,
  signal: 2600,
  done: 3200,
};

const MOBILE_TIMINGS: Record<IntroPhase, number> = {
  boot: 0,
  logo: 120,
  nav: 300,
  holo: 500,
  frame: 750,
  signal: 1000,
  done: 1300,
};

const IntroCtx = createContext<{ phase: IntroPhase; reached: (p: IntroPhase) => boolean }>({
  phase: "done",
  reached: () => true,
});

export function useIntro() {
  return useContext(IntroCtx);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }
    const mobile = window.innerWidth < 768;
    const timings = mobile ? MOBILE_TIMINGS : DESKTOP_TIMINGS;
    const timers = ORDER.filter((p) => p !== "boot").map((p) =>
      window.setTimeout(() => setPhase(p), timings[p])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const reached = (p: IntroPhase) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

  return <IntroCtx.Provider value={{ phase, reached }}>{children}</IntroCtx.Provider>;
}
