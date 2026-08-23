"use client";

import { motion } from "framer-motion";
import { useDesktopStore } from "@/lib/window-manager/store";
import { cn } from "@/lib/utils";
import type { AppDefinition } from "@/lib/window-manager/app-registry";
import { WindowTitleBar } from "./WindowTitleBar";

const GAP = 5;

export interface TileRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface WindowProps {
  appDef: AppDefinition;
  rect: TileRect;
  hidden: boolean;
}

export function Window({ appDef, rect, hidden }: WindowProps) {
  const focusedId = useDesktopStore((s) => s.focusedId);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const toggleMaximize = useDesktopStore((s) => s.toggleMaximize);

  const isFocused = focusedId === appDef.id;

  return (
    <motion.div
      layout
      role="dialog"
      aria-label={appDef.title}
      aria-hidden={hidden}
      onPointerDown={() => focusWindow(appDef.id)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: hidden ? 0 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.9 }}
      style={{
        position: "absolute",
        left: `calc(${rect.left}% + ${GAP}px)`,
        top: `calc(${rect.top}% + ${GAP}px)`,
        width: `calc(${rect.width}% - ${GAP * 2}px)`,
        height: `calc(${rect.height}% - ${GAP * 2}px)`,
        pointerEvents: hidden ? "none" : "auto",
      }}
      className={cn(
        // bg opacity is deliberately high (not the usual glass 30-40%) — a
        // brighter wallpaper region behind a lighter tint was washing out
        // title/content text; this keeps text legible regardless of what's
        // behind the window.
        "flex flex-col overflow-hidden rounded-xl border bg-zinc-900/75 shadow-2xl shadow-black/60 backdrop-blur-2xl backdrop-saturate-150",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        isFocused
          ? "border-white/20 ring-1 ring-sky-400/20 shadow-[0_0_50px_-15px_rgba(56,189,248,0.35)]"
          : "border-white/10 opacity-[0.94]",
      )}
    >
      <WindowTitleBar
        title={appDef.title}
        onClose={() => closeWindow(appDef.id)}
        onMinimize={() => minimizeWindow(appDef.id)}
        onMaximize={() => toggleMaximize(appDef.id)}
        onFocus={() => focusWindow(appDef.id)}
      />
      <div className="flex-1 overflow-auto overscroll-contain">
        <appDef.Component />
      </div>
    </motion.div>
  );
}
