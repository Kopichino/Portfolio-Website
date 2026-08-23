"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import { useDesktopStore } from "@/lib/window-manager/store";
import { cn } from "@/lib/utils";
import type { AppDefinition } from "@/lib/window-manager/app-registry";
import { WindowTitleBar } from "./WindowTitleBar";

export interface FloatingRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type TileRect = FloatingRect;

interface WindowProps {
  appDef: AppDefinition;
  containerRef: RefObject<HTMLDivElement | null>;
  defaultRect: FloatingRect;
  isMaximized: boolean;
  hidden: boolean;
}

export function Window({
  appDef,
  containerRef,
  defaultRect,
  isMaximized,
  hidden,
}: WindowProps) {
  const focusedId = useDesktopStore((s) => s.focusedId);
  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);
  const toggleMaximize = useDesktopStore((s) => s.toggleMaximize);

  const isFocused = focusedId === appDef.id;

  return (
    <motion.div
      drag={!isMaximized}
      dragConstraints={containerRef}
      dragMomentum={false}
      dragElastic={0.05}
      role="dialog"
      aria-label={appDef.title}
      aria-hidden={hidden}
      onPointerDown={() => focusWindow(appDef.id)}
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{ opacity: hidden ? 0 : 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
      style={{
        position: "absolute",
        ...(isMaximized
          ? {
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }
          : {
              left: `${defaultRect.left}px`,
              top: `${defaultRect.top}px`,
              width: `min(${defaultRect.width}px, calc(100vw - 32px))`,
              height: `min(${defaultRect.height}px, calc(100vh - 140px))`,
            }),
        pointerEvents: hidden ? "none" : "auto",
        zIndex: isFocused ? 40 : 20,
      }}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border bg-zinc-950/92 shadow-2xl shadow-black/90 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-200 cursor-default",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        isFocused
          ? "border-red-500/40 ring-1 ring-red-500/30 shadow-[0_0_50px_-10px_rgba(239,68,68,0.45)]"
          : "border-white/10 opacity-[0.96]",
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
