"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktopStore } from "@/lib/window-manager/store";
import { APP_ORDER, APP_REGISTRY, type AppId } from "@/lib/window-manager/app-registry";
import { cn } from "@/lib/utils";

// Real desktop-file-style label where it reads better than the app title.
const LABEL_OVERRIDES: Partial<Record<AppId, string>> = {
  resume: "Resume.pdf",
};

// Mirrors every dock app as a macOS-style desktop icon (top-left grid,
// wrapping into new columns like Finder's auto-arrange) — a second, equally
// real entry point into the same window-manager state as the dock, not a
// cut-down subset of it.
export function DesktopIcons() {
  const [selected, setSelected] = useState<AppId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const openWindow = useDesktopStore((s) => s.openWindow);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelected(null);
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-6 top-14 z-0 grid grid-flow-col grid-rows-4 gap-x-1 gap-y-3"
    >
      {APP_ORDER.map((appId) => {
        const app = APP_REGISTRY[appId];
        const Icon = app.icon;
        const label = LABEL_OVERRIDES[appId] ?? app.title;
        const isSelected = selected === appId;
        return (
          <button
            key={appId}
            type="button"
            onClick={() => setSelected(appId)}
            onDoubleClick={() => openWindow(appId)}
            className="group flex w-20 flex-col items-center gap-1.5 rounded-lg px-2 py-1.5 outline-none transition-all duration-200 hover:scale-105"
          >
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-all duration-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] bg-white/10 border border-white/15 backdrop-blur-md group-hover:border-sky-400/60 group-hover:bg-sky-500/25 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]",
                isSelected ? "bg-sky-500/35 ring-2 ring-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.7)]" : "",
              )}
            >
              <Icon className="h-6 w-6 text-sky-200 transition-colors group-hover:text-white" strokeWidth={1.8} />
            </span>
            <span
              className={cn(
                "rounded px-2 py-0.5 text-center text-xs font-semibold text-white backdrop-blur-md transition-all duration-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]",
                isSelected ? "bg-sky-500/80 shadow-md shadow-sky-500/50" : "bg-black/40 group-hover:bg-black/70",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
