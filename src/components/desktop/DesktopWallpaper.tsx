"use client";

import { Roboto_Condensed } from "next/font/google";
import { StarfieldBackground } from "@/components/backgrounds/StarfieldBackground";
import { InteractivePortrait } from "./InteractivePortrait";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["500", "700", "900"] });

export function DesktopWallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center">
      <StarfieldBackground />

      {/* Main Desktop Wallpaper Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 px-6 max-w-6xl w-full">
        {/* Left Side: Name and Tagline */}
        <div className="pointer-events-none flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
          {/* Ambient Red Glow */}
          <div className="absolute -z-10 h-72 w-96 rounded-full bg-red-600/20 blur-3xl" />

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-black/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-red-300 backdrop-blur-md shadow-md shadow-red-500/20">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Available for Roles &amp; Projects</span>
          </div>

          <h1
            className={`${robotoCondensed.className} text-5xl font-black uppercase tracking-wider sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-300 to-amber-200 drop-shadow-[0_0_35px_rgba(239,68,68,0.85)]`}
          >
            Koppesh P
          </h1>

          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-red-200 sm:text-base drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            B.Tech CSE (AI &amp; ML) &middot; Full-Stack &amp; AI/ML Developer
          </p>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            VIT Chennai &middot; Specialized in high-performance backends, applied AI/ML pipelines, and interactive web platforms.
          </p>
        </div>

        {/* Right Side: Interactive Face Reveal Portrait */}
        <div className="pointer-events-auto flex-shrink-0">
          <InteractivePortrait
            frontImage="/kopi_mask.png"
            bgImage="/kopi_nomask.png"
            alt="Koppesh P Face Reveal Portrait"
            className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] shadow-2xl shadow-red-600/30"
            maskRadius={170}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}


