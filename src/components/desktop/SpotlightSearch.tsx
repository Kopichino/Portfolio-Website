"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { APP_ORDER, APP_REGISTRY } from "@/lib/window-manager/app-registry";
import { useDesktopStore } from "@/lib/window-manager/store";
import { cn } from "@/lib/utils";

export function SpotlightSearch() {
  const uiOverlay = useDesktopStore((s) => s.uiOverlay);
  const setUiOverlay = useDesktopStore((s) => s.setUiOverlay);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const open = uiOverlay === "spotlight";

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset the search field whenever the overlay transitions to open — a
  // render-time state adjustment (not an effect) per React's guidance for
  // resetting state when a value changes, avoids a cascading-render lint trip.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open && query !== "") setQuery("");
    if (open && activeIndex !== 0) setActiveIndex(0);
  }

  const results = useMemo(() => {
    const apps = APP_ORDER.map((id) => APP_REGISTRY[id]);
    if (!query.trim()) return apps;
    const q = query.trim().toLowerCase();
    return apps.filter((app) => app.title.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  function launch(appId: (typeof APP_ORDER)[number]) {
    openWindow(appId);
    setUiOverlay("none");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      launch(results[activeIndex].id as (typeof APP_ORDER)[number]);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/40 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setUiOverlay("none");
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-5 w-5 text-white/60" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search apps…"
                className="w-full bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            {results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1.5">
                {results.map((app, index) => {
                  const Icon = app.icon;
                  return (
                    <li key={app.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => launch(app.id as (typeof APP_ORDER)[number])}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-white/90",
                          index === activeIndex ? "bg-red-500/30 text-white" : "",
                        )}
                      >
                        <Icon className="h-4 w-4 text-white/70" />
                        {app.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-4 py-6 text-center text-sm text-white/50">No matching apps</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
