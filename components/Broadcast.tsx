"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { channels } from "@/data/channels";
import { useIntro } from "./IntroContext";

type SwitchState = "idle" | "static";

export default function Broadcast() {
  const { reached, phase } = useIntro();
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [switching, setSwitching] = useState<SwitchState>("idle");
  const [glitchKey, setGlitchKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoOk, setVideoOk] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const channel = channels[active];

  // Autoplay (muted) once the intro reaches "signal"
  useEffect(() => {
    if (reached("signal") && videoRef.current && videoOk) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, videoOk]);

  const switchChannel = useCallback(
    (next: number) => {
      if (next === active || switching === "static") return;
      if (reduced) {
        setActive(next);
        setVideoOk(true);
        setProgress(0);
        return;
      }
      setSwitching("static");
      setGlitchKey((k) => k + 1);
      window.setTimeout(() => {
        setActive(next);
        setVideoOk(true);
        setProgress(0);
        setSwitching("idle");
        window.setTimeout(() => {
          videoRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        }, 60);
      }, 320);
    },
    [active, switching, reduced]
  );

  const prevCh = () => switchChannel((active - 1 + channels.length) % channels.length);
  const nextCh = () => switchChannel((active + 1) % channels.length);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    const pct = Number(e.target.value);
    setProgress(pct);
    if (v && v.duration) v.currentTime = (pct / 100) * v.duration;
  };

  const fullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const frameVisible = reached("frame");
  const signalVisible = reached("signal");

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      {/* Section header */}
      <motion.div
        className="mb-6 flex flex-wrap items-center justify-between gap-4"
        initial={reduced ? false : { opacity: 0 }}
        animate={frameVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <h2 className="font-display text-3xl font-bold tracking-[0.15em] md:text-4xl">
            {signalVisible ? "SIGNAL ACQUIRED" : "INITIALIZING TRANSMISSION"}
          </h2>
        </div>
        <div className="font-mono-tech flex items-center gap-5 text-xs tracking-[0.2em]">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={channel.number}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-cyan-sig"
            >
              {signalVisible ? channel.number : "CH_---"}
            </motion.span>
          </AnimatePresence>
          <span className="flex items-center gap-2 text-red-sig">
            <span className="live-dot" aria-hidden="true" />
            LIVE
          </span>
        </div>
      </motion.div>

      {/* Video frame */}
      <motion.div
        ref={wrapRef}
        className="tech-frame scanlines relative aspect-video w-full overflow-hidden bg-abyss"
        initial={reduced ? false : { opacity: 0, scaleX: 0.6 }}
        animate={frameVisible ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Poster fallback / video */}
        <video
          key={channel.id}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={channel.poster}
          muted={muted}
          loop
          playsInline
          preload="none"
          onTimeUpdate={onTime}
          onError={() => setVideoOk(false)}
          aria-label={channel.title}
        >
          {videoOk && <source src={channel.video} type="video/mp4" />}
        </video>

        {/* Channel-switch static */}
        <AnimatePresence>
          {switching === "static" && (
            <motion.div
              className="tv-static absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
            >
              <span className="font-mono-tech absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-void/70 px-4 py-2 text-xs tracking-[0.3em] text-cyan-sig">
                NO SIGNAL
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glitch line on switch + on intro */}
        {!reduced && glitchKey > 0 && <span key={glitchKey} className="glitch-line z-30" aria-hidden="true" />}

        {/* Title overlay */}
        <div className="absolute right-0 bottom-14 left-0 z-10 bg-gradient-to-t from-void/95 via-void/60 to-transparent px-5 pt-16 pb-4 md:px-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={channel.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-display text-lg font-semibold tracking-[0.12em] md:text-2xl">
                {channel.title}
              </p>
              <p className="mt-1 hidden text-sm text-fog md:block">{channel.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="absolute right-0 bottom-0 left-0 z-10 flex items-center gap-3 bg-void/80 px-4 py-3 backdrop-blur-sm md:gap-4 md:px-6">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="text-cyan-sig transition-transform hover:scale-110"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="text-fog transition-colors hover:text-cyan-sig"
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l6 5V4L8 9H4z" opacity=".5"/><line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2"/><line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="2"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l6 5V4L8 9H4z"/><path d="M17 8a5 5 0 010 8" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            )}
          </button>
          <input
            type="range"
            className="progress w-full"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={seek}
            style={{ ["--progress" as string]: `${progress}%` }}
            aria-label="Video progress"
          />
          <button
            type="button"
            onClick={fullscreen}
            aria-label="Fullscreen"
            className="text-fog transition-colors hover:text-cyan-sig"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
          </button>
        </div>
      </motion.div>

      {/* Channel selector */}
      <motion.div
        className="mt-6"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={reached("done") ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {channels.map((ch, i) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => switchChannel(i)}
              aria-pressed={i === active}
              className={`group relative w-52 shrink-0 snap-start overflow-hidden border text-left transition-all md:w-auto ${
                i === active
                  ? "border-cyan-sig shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                  : "border-fog/20 hover:border-fog/50"
              }`}
            >
              <span
                className="block aspect-video w-full bg-cover bg-center opacity-80 transition-opacity group-hover:opacity-100"
                style={{ backgroundImage: `url(${ch.poster})` }}
                aria-hidden="true"
              />
              <span className="font-mono-tech flex items-center justify-between px-3 py-2 text-[10px] tracking-[0.2em]">
                <span className={i === active ? "text-cyan-sig" : "text-fog"}>
                  {ch.number} — {ch.label}
                </span>
                {i === active && <span className="status-dot" aria-hidden="true" />}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          <button
            type="button"
            onClick={prevCh}
            className="font-mono-tech min-h-12 flex-1 border border-fog/25 px-6 text-xs tracking-[0.25em] text-fog uppercase transition-all hover:border-cyan-sig hover:text-cyan-sig md:flex-none"
          >
            ← Prev CH
          </button>
          <button
            type="button"
            onClick={nextCh}
            className="font-mono-tech min-h-12 flex-1 border border-fog/25 px-6 text-xs tracking-[0.25em] text-fog uppercase transition-all hover:border-cyan-sig hover:text-cyan-sig md:flex-none"
          >
            Next CH →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
