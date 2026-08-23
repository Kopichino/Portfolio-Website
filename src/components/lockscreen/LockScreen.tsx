"use client";

import { useEffect, useState } from "react";
import { Roboto_Condensed } from "next/font/google";
import { Loader2, User } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["500", "700", "900"] });

const PASSWORD = "koppeshiscool";
const START_DELAY_MS = 500;
const TYPE_SPEED_MS = 75;
const SUBMIT_PAUSE_MS = 350;
const UNLOCKING_DURATION_MS = 1200;

interface LockScreenProps {
  onUnlocked: () => void;
}

// Auto-plays the whole login sequence — no visitor interaction. Typing the
// password manually was tried first (see PROGRESS.md Milestone 5 round 6),
// but the user changed their mind: a scripted "watch it type itself and
// unlock" reads as more cinematic and can't strand a visitor who doesn't
// know the password.
export function LockScreen({ onUnlocked }: LockScreenProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedLength, setTypedLength] = useState(0);
  const [status, setStatus] = useState<"typing" | "unlocking">("typing");
  const [clock, setClock] = useState<{ time: string; date: string } | null>(null);

  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const tick = () => {
      const now = new Date();
      setClock({ time: timeFormatter.format(now), date: dateFormatter.format(now) });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setTypedLength(PASSWORD.length);
        setStatus("unlocking");
      }, START_DELAY_MS);
      return () => clearTimeout(timer);
    }

    const startTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        setTypedLength((current) => {
          if (current >= PASSWORD.length) {
            clearInterval(typeInterval);
            return current;
          }
          return current + 1;
        });
      }, TYPE_SPEED_MS);
    }, START_DELAY_MS);

    return () => clearTimeout(startTimer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typedLength < PASSWORD.length || status !== "typing") return;
    const timer = setTimeout(() => setStatus("unlocking"), SUBMIT_PAUSE_MS);
    return () => clearTimeout(timer);
  }, [typedLength, status]);

  useEffect(() => {
    if (status !== "unlocking") return;
    const timer = setTimeout(onUnlocked, UNLOCKING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [status, onUnlocked]);

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-[position:32%_center]"
        style={{ backgroundImage: "url(/lockscreen/background.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

      <div className="relative z-10 flex h-full w-full flex-col items-center px-6">
        <div className="mt-[8vh] flex flex-col items-center text-center">
          <p className="text-2xl font-light tabular-nums sm:text-3xl">{clock?.time ?? ""}</p>
          <p className="mt-1 text-sm text-white/70">{clock?.date ?? ""}</p>
        </div>

        <div className="mt-[8vh] flex flex-col items-center sm:mt-[10vh]">
          {/* Placeholder avatar — swap for the user's real photo once
              provided (see PROGRESS.md); a generic silhouette on the site's
              existing sky/indigo gradient reads as intentional, not broken. */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 ring-2 ring-red-400/30 shadow-2xl shadow-red-600/30 sm:h-28 sm:w-28">
            <User className="h-12 w-12 text-white/90 sm:h-14 sm:w-14" strokeWidth={1.5} />
          </div>
          <p className={`${robotoCondensed.className} mt-3 text-lg font-bold tracking-wide sm:text-xl`}>
            Koppesh P
          </p>

          <div className="mt-4 flex h-10 w-56 items-center rounded-full border border-white/20 bg-white/10 px-4 backdrop-blur-md">
            <div className="flex items-center gap-1.5" aria-hidden>
              {Array.from({ length: typedLength }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-white" />
              ))}
              {status === "typing" && (
                <span className="ml-0.5 h-3.5 w-px animate-pulse bg-white/80" />
              )}
            </div>
            <span className="sr-only">Password entered automatically</span>
            {status === "unlocking" && (
              <Loader2 className="ml-auto h-4 w-4 animate-spin text-white/80" />
            )}
          </div>

          <p className="mt-3 text-xs text-white/60">
            {status === "unlocking" ? "Unlocking…" : "Signing in…"}
          </p>
        </div>
      </div>
    </div>
  );
}
