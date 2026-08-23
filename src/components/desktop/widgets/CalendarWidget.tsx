"use client";

import { useEffect, useState } from "react";

export function CalendarWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const month = now
    ? new Intl.DateTimeFormat("en-US", { month: "long" }).format(now).toUpperCase()
    : "";
  const day = now ? now.getDate() : "";
  const weekday = now ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now) : "";

  return (
    <div className="w-44 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-2xl">
      <div className="bg-rose-500/80 px-4 py-1.5 text-center text-[11px] font-semibold tracking-wide text-white">
        {month || " "}
      </div>
      <div className="flex flex-col items-center px-4 py-3">
        <p className="text-4xl font-semibold tabular-nums text-white">{day}</p>
        <p className="mt-1 text-sm text-white/70">{weekday}</p>
      </div>
    </div>
  );
}
