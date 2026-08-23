"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/lib/window-manager/store";
import { resolveWindowDefinition } from "@/lib/window-manager/app-registry";
import { Window } from "./Window";

// Default floating window dimensions & staggering offset
const DEFAULT_WIDTH = 760;
const DEFAULT_HEIGHT = 520;
const CASCADE_OFFSET = 28;

export function FloatingLayout() {
  const windows = useDesktopStore((s) => s.windows);
  const tileOrder = useDesktopStore((s) => s.tileOrder);
  const maximizedId = useDesktopStore((s) => s.maximizedId);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active open windows (excluding minimized ones)
  const activeWindowIds = useMemo(() => {
    return tileOrder.filter((id) => {
      const win = windows[id];
      return win && win.isOpen && !win.isMinimized;
    });
  }, [tileOrder, windows]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-4 top-10 bottom-20 z-20 overflow-hidden"
    >
      <AnimatePresence>
        {activeWindowIds.map((id, index) => {
          const appDef = resolveWindowDefinition(id);
          if (!appDef) return null;

          const isMaximized = maximizedId === id;
          const isHidden = maximizedId !== null && !isMaximized;

          // Compute cascaded initial position for each opened window
          const cascadeX = 40 + (index % 6) * CASCADE_OFFSET;
          const cascadeY = 30 + (index % 6) * CASCADE_OFFSET;

          return (
            <Window
              key={id}
              appDef={appDef}
              containerRef={containerRef}
              defaultRect={{
                left: cascadeX,
                top: cascadeY,
                width: DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT,
              }}
              isMaximized={isMaximized}
              hidden={isHidden}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
