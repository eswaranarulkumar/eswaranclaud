"use client";

import { useEffect, useState } from "react";
import { useIntro } from "./IntroContext";

/**
 * Near-black boot screen with faint static, shown for the first ~0.3s.
 * Uses plain CSS transitions (no animation library) so it can never get
 * stuck covering the page, and unmounts itself shortly after fading out.
 */
export default function BootOverlay() {
  const { reached } = useIntro();
  const [gone, setGone] = useState(false);
  const faded = reached("logo");

  // Unmount after the fade — and as a hard fail-safe, always within 4s.
  useEffect(() => {
    const t = window.setTimeout(() => setGone(true), faded ? 500 : 4000);
    return () => window.clearTimeout(t);
  }, [faded]);

  if (gone) return null;

  return (
    <div
      id="boot-overlay"
      className="fixed inset-0 z-[100] bg-void transition-opacity duration-500"
      style={{ opacity: faded ? 0 : 1, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <div className="tv-static absolute inset-0 opacity-[0.06]" />
    </div>
  );
}
