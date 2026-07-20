"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { channels } from "@/data/channels";
import { useIntro } from "./IntroContext";

type SwitchState = "idle" | "static";

function fmt(t: number) {
  if (!isFinite(t) || t <= 0) return "00:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Broadcast() {
  const { reached, phase } = useIntro();
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [switching, setSwitching] = useState<SwitchState>("idle");
  const [glitchKey, setGlitchKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("00:00 / 00:00");
  const [videoOk, setVideoOk] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const channel = channels[active];

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
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
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
    setTime(`${fmt(v.currentTime)} / ${fmt(v.duration)}`);
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
  const done = reached("done");

  return (
    <section id="work" className="relative mx-auto max-w-[1500px] px-4 py-10 md:px-6 md:py-14">
      {/* Console bezel */}
      <motion.div
        className="bezel relative p-2.5 md:p-4"
        initial={reduced ? false : { opacity: 0, scaleX: 0.7 }}
        animate={frameVisible ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex gap-2.5 md:gap-4">
          {/* Left rail (desktop) */}
          <div className="panel-line hidden w-12 shrink-0 flex-col items-center justify-between rounded-xl bg-void/40 py-5 lg:flex" aria-hidden="true">
            <div className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 bg-amber-sig/80" />
              <span className="h-0.5 w-5 bg-amber-sig/50" />
              <span className="h-0.5 w-5 bg-amber-sig/30" />
            </div>
            <span className="v-text font-mono-tech text-[9px] tracking-[0.35em] text-fog/45 uppercase">
              Broadcast Interface
            </span>
            <div className="flex flex-col items-center gap-3">
              <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-amber-sig/70" />
                <span className="h-1 w-1 rounded-full bg-amber-sig/40" />
                <span className="h-1 w-1 rounded-full bg-amber-sig/25" />
              </span>
              <span className="h-7 w-7 rounded-full border border-fog/30 bg-gradient-to-b from-panel to-void shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
            </div>
          </div>

          {/* Screen */}
          <div
            ref={wrapRef}
            className="scanlines relative aspect-video min-w-0 flex-1 overflow-hidden rounded-lg border border-cyan-sig/20 bg-abyss md:aspect-[21/10] lg:aspect-[21/9]"
          >
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

            {/* Top-left: signal + channel + live */}
            <div className="absolute top-4 left-4 z-10 md:top-6 md:left-7">
              <p className="font-mono-tech flex items-center gap-3 text-[10px] tracking-[0.3em] text-cyan-sig uppercase">
                {signalVisible ? "Signal acquired" : "Initializing transmission"}
                <span className="h-px w-10 bg-cyan-sig/50" aria-hidden="true" />
              </p>
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={signalVisible ? channel.number : "boot"}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-display mt-1 text-4xl font-bold tracking-[0.12em] md:text-6xl"
                >
                  {signalVisible ? channel.number : "CH_---"}
                </motion.p>
              </AnimatePresence>
              <p className="font-mono-tech mt-2 flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/90 uppercase">
                <span className="live-dot" aria-hidden="true" />
                Live
              </p>
            </div>

            {/* Switch static */}
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
            {!reduced && glitchKey > 0 && <span key={glitchKey} className="glitch-line z-30" aria-hidden="true" />}

            {/* Bottom: title + controls */}
            <div className="absolute right-0 bottom-0 left-0 z-10 bg-gradient-to-t from-void/95 via-void/70 to-transparent px-4 pt-14 pb-3 md:px-7 md:pb-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={channel.id}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display mb-3 text-base font-semibold tracking-[0.1em] md:mb-4 md:text-2xl"
                >
                  {channel.title}
                </motion.p>
              </AnimatePresence>

              <div className="flex items-center gap-3 md:gap-4">
                <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-cyan-sig transition-transform hover:scale-110">
                  {playing ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" /><rect x="14" y="4" width="5" height="16" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z" /></svg>
                  )}
                </button>
                <span className="font-mono-tech hidden text-[10px] tracking-[0.15em] text-fog sm:block">{time}</span>
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
                <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-fog transition-colors hover:text-cyan-sig">
                  {muted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l6 5V4L8 9H4z" opacity=".5"/><line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2"/><line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="2"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l6 5V4L8 9H4z"/><path d="M17 8a5 5 0 010 8" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                  )}
                </button>
                <button type="button" onClick={fullscreen} aria-label="Fullscreen" className="text-fog transition-colors hover:text-cyan-sig">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Channel select panel (desktop) */}
          <motion.aside
            className="panel-line hidden w-56 shrink-0 flex-col rounded-xl bg-void/40 p-3 xl:flex"
            initial={reduced ? false : { opacity: 0, x: 20 }}
            animate={done ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono-tech mb-3 flex items-center justify-between px-1 text-[9px] tracking-[0.3em] text-fog/60 uppercase">
              Channel select <span aria-hidden="true">····</span>
            </p>
            <div className="flex flex-1 flex-col gap-3">
              {channels.map((ch, i) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => switchChannel(i)}
                  aria-pressed={i === active}
                  className={`group relative overflow-hidden rounded-md border text-left transition-all ${
                    i === active
                      ? "border-cyan-sig shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                      : "border-fog/15 hover:border-fog/45"
                  }`}
                >
                  <span
                    className="block aspect-[16/8] w-full bg-cover bg-center opacity-85 transition-opacity group-hover:opacity-100"
                    style={{ backgroundImage: `url(${ch.poster})` }}
                    aria-hidden="true"
                  />
                  {i === active && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center border border-cyan-sig bg-void/70" aria-hidden="true">
                      <span className="h-1.5 w-1.5 bg-cyan-sig" />
                    </span>
                  )}
                  <span className={`font-mono-tech block px-2.5 py-1.5 text-[10px] tracking-[0.2em] ${i === active ? "text-cyan-sig" : "text-fog"}`}>
                    {ch.number}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between px-1" aria-hidden="true">
              <span className="font-mono-tech text-[10px] text-fog/50">‹ ›</span>
              <span className="dot-matrix h-3 w-24 opacity-60" />
            </div>
          </motion.aside>
        </div>

        {/* Bottom control bar */}
        <motion.div
          className="mt-2.5 flex items-center justify-between gap-3 px-1 md:mt-4 md:px-2"
          initial={reduced ? false : { opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            type="button"
            onClick={prevCh}
            className="font-mono-tech flex min-h-12 items-center gap-2 px-2 text-[11px] tracking-[0.25em] text-fog uppercase transition-colors hover:text-cyan-sig md:px-4"
          >
            <span aria-hidden="true">‹</span> Prev CH
          </button>
          <div className="font-mono-tech hidden flex-1 items-center justify-center gap-3 text-[10px] tracking-[0.3em] text-fog/60 uppercase md:flex">
            <span className="h-px max-w-24 flex-1 bg-fog/15" aria-hidden="true" />
            <span className="flex h-4 w-4 items-center justify-center border border-fog/40" aria-hidden="true">
              <span className="h-1.5 w-1.5 bg-fog/60" />
            </span>
            Transmission Archive
            <span className="h-px max-w-24 flex-1 bg-fog/15" aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={nextCh}
            className="font-mono-tech flex min-h-12 items-center gap-2 px-2 text-[11px] tracking-[0.25em] text-fog uppercase transition-colors hover:text-cyan-sig md:px-4"
          >
            Next CH <span aria-hidden="true">›</span>
          </button>
        </motion.div>

        {/* orange indicator */}
        <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-amber-sig/80" aria-hidden="true" />
      </motion.div>

      {/* Mobile channel thumbnails (swipeable) */}
      <motion.div
        className="mt-4 xl:hidden"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={done ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {channels.map((ch, i) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => switchChannel(i)}
              aria-pressed={i === active}
              className={`group relative w-48 shrink-0 snap-start overflow-hidden rounded-md border text-left transition-all md:w-auto ${
                i === active
                  ? "border-cyan-sig shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                  : "border-fog/20 hover:border-fog/50"
              }`}
            >
              <span
                className="block aspect-video w-full bg-cover bg-center opacity-85 transition-opacity group-hover:opacity-100"
                style={{ backgroundImage: `url(${ch.poster})` }}
                aria-hidden="true"
              />
              <span className={`font-mono-tech flex items-center justify-between px-3 py-2 text-[10px] tracking-[0.2em] ${i === active ? "text-cyan-sig" : "text-fog"}`}>
                {ch.number} — {ch.label}
                {i === active && <span className="status-dot" aria-hidden="true" />}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
