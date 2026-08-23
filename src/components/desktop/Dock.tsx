"use client";

import { useMotionValue } from "framer-motion";
import { APP_ORDER, APP_REGISTRY } from "@/lib/window-manager/app-registry";
import { useDesktopStore } from "@/lib/window-manager/store";
import { DockIcon } from "./DockIcon";

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  const windows = useDesktopStore((s) => s.windows);
  const openWindow = useDesktopStore((s) => s.openWindow);

  return (
    <nav
      aria-label="Dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed inset-x-0 bottom-3 z-[9999] mx-auto flex w-fit items-end gap-3 rounded-2xl border border-red-500/40 bg-black/70 px-3 pb-2 pt-2 backdrop-blur-2xl shadow-xl shadow-red-600/20"
    >
      {APP_ORDER.map((id) => {
        const app = APP_REGISTRY[id];
        const win = windows[id];
        return (
          <DockIcon
            key={id}
            app={app}
            isRunning={Boolean(win)}
            mouseX={mouseX}
            onActivate={() => openWindow(id)}
          />
        );
      })}
    </nav>
  );
}
