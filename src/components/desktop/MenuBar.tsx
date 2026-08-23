"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Battery, Lock, RotateCcw, Search, SlidersHorizontal, Wifi } from "lucide-react";
import { useDesktopStore } from "@/lib/window-manager/store";
import { resolveWindowDefinition } from "@/lib/window-manager/app-registry";
import { cn } from "@/lib/utils";

const APPLE_MENU_ITEMS = [
  { label: "About This Portfolio", appId: "about" as const },
  { label: "My Resume", appId: "resume" as const },
  { label: "Contact Me", appId: "contact" as const },
];

export function MenuBar() {
  const focusedId = useDesktopStore((s) => s.focusedId);
  const uiOverlay = useDesktopStore((s) => s.uiOverlay);
  const setUiOverlay = useDesktopStore((s) => s.setUiOverlay);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const requestLock = useDesktopStore((s) => s.requestLock);
  const [time, setTime] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        uiOverlay === "appleMenu" &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setUiOverlay("none");
      }
    }
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [uiOverlay, setUiOverlay]);

  const activeTitle = focusedId ? resolveWindowDefinition(focusedId)?.title : null;
  const appleMenuOpen = uiOverlay === "appleMenu";

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] flex h-8 items-center justify-between bg-black/40 px-4 text-sm text-white backdrop-blur-xl">
      <div className="flex items-center gap-4 font-medium">
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setUiOverlay(appleMenuOpen ? "none" : "appleMenu")}
            className={cn(
              "rounded px-1.5 py-0.5 font-semibold transition-colors",
              appleMenuOpen ? "bg-white/20" : "hover:bg-white/10",
            )}
          >
            KP
          </button>
          <AnimatePresence>
            {appleMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70 py-1.5 text-sm shadow-2xl backdrop-blur-2xl"
              >
                {APPLE_MENU_ITEMS.map((item) => (
                  <button
                    key={item.appId}
                    type="button"
                    onClick={() => {
                      openWindow(item.appId);
                      setUiOverlay("none");
                    }}
                    className="block w-full px-3 py-1.5 text-left text-white/90 hover:bg-sky-500/30"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="my-1 h-px bg-white/10" />
                <button
                  type="button"
                  onClick={() => {
                    requestLock();
                    setUiOverlay("none");
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-white/90 hover:bg-sky-500/30"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Lock Screen
                </button>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-white/90 hover:bg-sky-500/30"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Restart Portfolio
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {activeTitle && <span className="text-white/80">{activeTitle}</span>}
      </div>

      <div className="flex items-center gap-4 text-white/85">
        <Wifi className="h-3.5 w-3.5" aria-hidden />
        <Battery className="h-4 w-4" aria-hidden />
        <button
          type="button"
          aria-label="Toggle Control Center"
          onClick={() => setUiOverlay(uiOverlay === "controlCenter" ? "none" : "controlCenter")}
          className={cn(
            "rounded p-1 transition-colors",
            uiOverlay === "controlCenter" ? "bg-white/20" : "hover:bg-white/10",
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Open Spotlight search"
          onClick={() => setUiOverlay(uiOverlay === "spotlight" ? "none" : "spotlight")}
          className={cn(
            "rounded p-1 transition-colors",
            uiOverlay === "spotlight" ? "bg-white/20" : "hover:bg-white/10",
          )}
        >
          <Search className="h-3.5 w-3.5" />
        </button>
        <span className="tabular-nums">{time ?? ""}</span>
      </div>
    </header>
  );
}
