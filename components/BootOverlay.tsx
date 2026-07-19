"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";

/** Near-black boot screen with faint static, shown for the first ~0.3s. */
export default function BootOverlay() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <AnimatePresence>
      {!reached("logo") && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <div className="tv-static absolute inset-0 opacity-[0.06]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
