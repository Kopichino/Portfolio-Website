"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Roboto_Condensed } from "next/font/google";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { StarfieldBackground } from "@/components/backgrounds/StarfieldBackground";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["500", "700", "900"] });

const NAME_WORDS = ["Koppesh", "P"];
const ADVANCE_WHEEL_THRESHOLD = 24;

interface IntroSectionProps {
  onAdvance: () => void;
}

// Fixed full-viewport landing screen — not part of normal document scroll.
// "Scrolling" here means any of wheel-down / swipe-up / ArrowDown / PageDown
// / Space / clicking the cue, all of which just call onAdvance() once. This
// deliberately avoids reintroducing real document-scroll-position-driven
// transitions (see PROGRESS.md Milestone 5 rounds 2/4 for how fragile that
// got with the old hero video) — there's no scroll position to track or get
// out of sync here, just a single one-shot "the visitor wants to continue"
// signal from whichever input method they used.
export function IntroSection({ onAdvance }: IntroSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const touchStartYRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    function advance() {
      if (firedRef.current) return;
      firedRef.current = true;
      onAdvance();
    }

    function handleWheel(e: WheelEvent) {
      if (e.deltaY > ADVANCE_WHEEL_THRESHOLD) advance();
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        advance();
      }
    }
    function handleTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    }
    function handleTouchEnd(e: TouchEvent) {
      const startY = touchStartYRef.current;
      const endY = e.changedTouches[0]?.clientY;
      if (startY != null && endY != null && startY - endY > 40) advance();
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onAdvance]);

  const riseIn = (delay: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <StarfieldBackground />

      {/* Cybernetic ambient red aura */}
      <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-gradient-to-tr from-red-600/20 via-rose-600/20 to-amber-600/20 blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          {...riseIn(0)}
          className="mb-3 flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-red-300 backdrop-blur-md shadow-md shadow-red-500/20"
        >
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
          <span>Interactive PC Portfolio &middot; VIT Chennai</span>
        </motion.div>

        <h1
          className={`${robotoCondensed.className} mt-2 text-6xl font-black uppercase tracking-wider sm:text-8xl md:text-9xl drop-shadow-[0_0_45px_rgba(239,68,68,0.85)]`}
        >
          {NAME_WORDS.map((word, index) => (
            <motion.span
              key={word}
              {...riseIn(0.15 + index * 0.15)}
              className="mr-5 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-amber-200 last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          {...riseIn(0.55)}
          className="mt-4 max-w-2xl text-lg font-medium text-zinc-200 sm:text-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          Full-Stack Software Engineer &amp; Applied AI/ML Developer
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={() => onAdvance()}
        {...riseIn(1.1)}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 rounded-full border border-red-500/40 bg-black/80 px-6 py-2.5 text-xs font-medium tracking-wide text-red-200 backdrop-blur-md transition-all duration-300 hover:border-red-400 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95"
      >
        <span className="text-sm font-semibold text-white">Click or Scroll to Enter PC Desktop</span>
        {!prefersReducedMotion && (
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-red-400"
          >
            ↓
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
