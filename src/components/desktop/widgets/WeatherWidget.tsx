"use client";

import { Sun } from "lucide-react";

// Static/mock card — no live weather API for v1. Location reflects the
// user's actual base (Chennai, per resume) to keep it personal rather than
// a placeholder city.
export function WeatherWidget() {
  return (
    <div className="w-44 rounded-2xl border border-red-500/30 bg-black/60 p-4 shadow-xl shadow-red-600/10 backdrop-blur-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">Chennai</p>
          <p className="text-xs text-white/60">Sunny</p>
        </div>
        <Sun className="h-8 w-8 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" strokeWidth={1.5} />
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">31°</p>
      <p className="mt-0.5 text-xs text-white/60">H:33° L:27°</p>
    </div>
  );
}
