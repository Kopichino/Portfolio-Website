"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Desktop } from "@/components/desktop/Desktop";
import { LockScreen } from "@/components/lockscreen/LockScreen";
import { IntroSection } from "@/components/intro/IntroSection";
import { useDesktopStore } from "@/lib/window-manager/store";

const COVER_DURATION_MS = 300;
const REVEAL_DURATION_MS = 400;

type Phase = "intro" | "locked" | "desktop";

// Same cover/reveal dip-to-black pattern the old scroll-scrubbed hero used
// (see PROGRESS.md Milestone 5) — driven by a plain setTimeout matched to
// the animation durations, not Framer Motion's onAnimationComplete, which
// fired more than once for a single completion during testing there. Now
// drives three phases instead of two: intro -> locked -> desktop, plus
// desktop -> locked via the menu bar's "Lock Screen" action. There's no way
// back into "intro" once left — it's a one-time landing moment, not a state
// to toggle back into (avoids reintroducing the old reverse-scroll bug
// class entirely, see PROGRESS.md).
type TransitionPhase = "idle" | "covering" | "revealing";

export function PortfolioExperience() {
  const lockToken = useDesktopStore((s) => s.lockToken);
  const isFirstLockToken = useRef(true);

  const [phase, setPhase] = useState<Phase>("intro");
  const [pendingPhase, setPendingPhase] = useState<Phase | null>(null);
  const [desktopMounted, setDesktopMounted] = useState(false);
  const [transition, setTransition] = useState<TransitionPhase>("idle");

  const goTo = useCallback((next: Phase) => {
    setTransition((current) => {
      if (current !== "idle") return current;
      setPendingPhase(next);
      return "covering";
    });
  }, []);

  useEffect(() => {
    if (isFirstLockToken.current) {
      isFirstLockToken.current = false;
      return;
    }
    goTo("locked");
  }, [lockToken, goTo]);

  useEffect(() => {
    if (transition === "covering") {
      const timer = setTimeout(() => {
        setPhase((current) => {
          const next = pendingPhase ?? current;
          if (next === "desktop") setDesktopMounted(true);
          return next;
        });
        setTransition("revealing");
      }, COVER_DURATION_MS);
      return () => clearTimeout(timer);
    }
    if (transition === "revealing") {
      const timer = setTimeout(() => setTransition("idle"), REVEAL_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [transition, pendingPhase]);

  const showOverlay = transition !== "idle";

  return (
    <>
      {phase === "intro" && <IntroSection onAdvance={() => goTo("locked")} />}
      {phase === "locked" && <LockScreen onUnlocked={() => goTo("desktop")} />}
      {desktopMounted && <Desktop active={phase === "desktop"} />}
      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: transition === "covering" ? 1 : 0 }}
          transition={{
            duration: (transition === "covering" ? COVER_DURATION_MS : REVEAL_DURATION_MS) / 1000,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: transition === "covering" ? 1 : 0 }}
            transition={{
              duration: transition === "covering" ? 0.3 : 0.15,
              delay: transition === "covering" ? 0.2 : 0,
            }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-lg font-bold text-white shadow-lg shadow-sky-500/30">
              KP
            </span>
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
