"use client";

import { useEffect, useState } from "react";

export function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(now)
    : "";
  const day = now
    ? new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now)
    : "";
  const date = now
    ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" }).format(now)
    : "";

  return (
    <div className="w-44 rounded-2xl border border-red-500/30 bg-black/60 p-4 shadow-xl shadow-red-600/10 backdrop-blur-2xl">
      <p className="text-4xl font-semibold tabular-nums text-white">{time || " "}</p>
      <p className="mt-1 text-sm text-white/70">
        {day}
        {day && date ? ", " : ""}
        {date}
      </p>
    </div>
  );
}
