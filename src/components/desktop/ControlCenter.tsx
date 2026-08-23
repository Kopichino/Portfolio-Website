"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bluetooth, Moon, Sun, Volume2, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useDesktopStore } from "@/lib/window-manager/store";
import { cn } from "@/lib/utils";

interface ToggleDef {
  id: "wifi" | "bluetooth" | "dnd";
  label: string;
  icon: LucideIcon;
}

const TOGGLES: ToggleDef[] = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "bluetooth", label: "Bluetooth", icon: Bluetooth },
  { id: "dnd", label: "Focus", icon: Moon },
];

// Purely decorative — mirrors macOS's Control Center for visual authenticity,
// no toggle here is wired to anything real.
export function ControlCenter() {
  const uiOverlay = useDesktopStore((s) => s.uiOverlay);
  const setUiOverlay = useDesktopStore((s) => s.setUiOverlay);
  const open = uiOverlay === "controlCenter";

  const [toggles, setToggles] = useState<Record<ToggleDef["id"], boolean>>({
    wifi: true,
    bluetooth: true,
    dnd: false,
  });
  const [brightness, setBrightness] = useState(78);
  const [volume, setVolume] = useState(62);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (open && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setUiOverlay("none");
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [open, setUiOverlay]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="fixed right-4 top-10 z-[10000] w-72 rounded-2xl border border-white/10 bg-zinc-900/60 p-3 shadow-2xl backdrop-blur-2xl"
        >
          <div className="grid grid-cols-3 gap-2">
            {TOGGLES.map((toggle) => {
              const Icon = toggle.icon;
              const active = toggles[toggle.id];
              return (
                <button
                  key={toggle.id}
                  type="button"
                  onClick={() => setToggles((prev) => ({ ...prev, [toggle.id]: !prev[toggle.id] }))}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs transition-colors",
                    active
                      ? "border-sky-400/30 bg-sky-500/80 text-white"
                      : "border-white/10 bg-white/10 text-white/70 hover:bg-white/15",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {toggle.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 space-y-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <Sun className="h-4 w-4 shrink-0 text-white/70" />
              <input
                type="range"
                min={0}
                max={100}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
                aria-label="Brightness"
              />
            </div>
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 shrink-0 text-white/70" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white"
                aria-label="Volume"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
