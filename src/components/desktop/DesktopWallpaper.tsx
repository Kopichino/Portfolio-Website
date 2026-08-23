"use client";

import { Roboto_Condensed } from "next/font/google";
import { StarfieldBackground } from "@/components/backgrounds/StarfieldBackground";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["500", "700", "900"] });

// Cursor-reactive starfield (same component the intro uses) instead of a
// wallpaper photo — the earlier real macOS Big Sur photo was flagged as
// Apple's actual copyrighted wallpaper art (see PROGRESS.md Milestone 5
// round 6), and separately read as too bright behind window chrome. This
// sidesteps both. Name/description sits centered, low-opacity, baked into
// the wallpaper layer itself (pointer-events-none, first thing painted, so
// icons/windows naturally sit on top of it like a real desktop background).
export function DesktopWallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05070d]">
      <StarfieldBackground />

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p
          className={`${robotoCondensed.className} text-4xl font-bold uppercase tracking-wide text-white/[0.14] sm:text-6xl md:text-7xl`}
        >
          Koppesh P
        </p>
        <p className="mt-3 text-sm text-white/[0.12] sm:text-base">
          CSE Undergrad &middot; Full-Stack &amp; AI/ML Developer
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
}
