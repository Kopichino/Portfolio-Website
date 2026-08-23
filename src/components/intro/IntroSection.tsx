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

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          {...riseIn(0)}
          className={`${robotoCondensed.className} text-xs font-medium uppercase tracking-[0.3em] text-sky-300/80 sm:text-sm`}
        >
          Welcome to my Portfolio
        </motion.p>

        <h1
          className={`${robotoCondensed.className} mt-3 text-6xl font-bold uppercase tracking-wide sm:text-7xl md:text-8xl`}
        >
          {NAME_WORDS.map((word, index) => (
            <motion.span
              key={word}
              {...riseIn(0.15 + index * 0.15)}
              className="mr-4 inline-block last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p {...riseIn(0.55)} className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
          CSE Undergrad &middot; Full-Stack &amp; AI/ML Developer
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={() => onAdvance()}
        {...riseIn(1.1)}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
      >
        <span>Scroll to view my portfolio</span>
        {!prefersReducedMotion && (
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
