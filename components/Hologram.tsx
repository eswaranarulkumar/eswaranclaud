"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "./IntroContext";

/** Abstract circular data-core hologram: rings, orbit lines, data points, glowing centre. */
export default function Hologram() {
  const { reached } = useIntro();
  const reduced = useReducedMotion();
  const show = reached("holo");

  const ring = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: show ? { pathLength: 1, opacity: 1 } : {},
          transition: { duration: 0.7, delay, ease: "easeInOut" as const },
        };

  return (
    <motion.svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Abstract holographic data core"
      className="h-auto w-full max-w-[280px] md:max-w-[420px]"
      initial={reduced ? false : { opacity: 0 }}
      animate={show ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer faint ring */}
      <motion.circle cx="200" cy="200" r="180" fill="none" stroke="#22d3ee" strokeOpacity="0.15" strokeWidth="1" {...ring(0)} />

      {/* Orbit ring with data points (slow) */}
      <g className="orbit-slow">
        <motion.circle cx="200" cy="200" r="150" fill="none" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="4 10" {...ring(0.1)} />
        <circle cx="200" cy="50" r="3" fill="#22d3ee" />
        <circle cx="330" cy="275" r="2.5" fill="#3b82f6" />
      </g>

      {/* Middle ring (reverse) with an orange marker */}
      <g className="orbit-med">
        <motion.circle cx="200" cy="200" r="112" fill="none" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1.2" {...ring(0.25)} />
        <circle cx="200" cy="88" r="3" fill="#f97316" opacity="0.85" />
      </g>

      {/* Inner arc segments (fast) */}
      <g className="orbit-fast">
        <motion.path d="M 200 125 A 75 75 0 0 1 275 200" fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" {...ring(0.4)} />
        <motion.path d="M 200 275 A 75 75 0 0 1 125 200" fill="none" stroke="#67e8f9" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" {...ring(0.45)} />
      </g>

      {/* Cross-hair ticks */}
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="200" y1="14" x2="200" y2="26"
          stroke="#8b9bb4" strokeOpacity="0.5" strokeWidth="1"
          transform={`rotate(${deg} 200 200)`}
        />
      ))}

      {/* Core */}
      <motion.circle
        className="holo-core"
        cx="200" cy="200" r="52"
        fill="url(#coreGlow)"
        initial={reduced ? false : { scale: 0.6, opacity: 0 }}
        animate={show ? { scale: [0.6, 1.12, 1], opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      />
      <circle cx="200" cy="200" r="10" fill="#eaffff" opacity="0.9" />

      {/* Data readouts */}
      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="font-mono-tech"
        fill="#8b9bb4"
        fontSize="9"
        letterSpacing="2"
      >
        <text x="30" y="40">SYS.CORE / ONLINE</text>
        <text x="272" y="372">ORBIT.SYNC 99.2%</text>
      </motion.g>
    </motion.svg>
  );
}
