"use client";

import { useCallback, useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { useDesktopStore } from "@/lib/window-manager/store";
import { resolveWindowDefinition } from "@/lib/window-manager/app-registry";
import { Window, type TileRect } from "./Window";

const FULL_RECT: TileRect = { left: 0, top: 0, width: 100, height: 100 };

// Master-stack tiling, same shape as dwm/i3's default layout: the first
// opened window is the master pane (full height, width set by masterRatio);
// every window opened after it stacks in the remaining column, each sized by
// the matching stackRatios entry. Dragging either divider only adjusts the
// two panes it sits between, via useDesktopStore.getState()/setState() directly
// (a plain closure over drag-start values would go stale across pointermove
// events, since each event needs the *latest* ratios, not the ones read once
// when the drag began).
export function TilingLayout() {
  const tileOrder = useDesktopStore((s) => s.tileOrder);
  const masterRatio = useDesktopStore((s) => s.masterRatio);
  const stackRatios = useDesktopStore((s) => s.stackRatios);
  const maximizedId = useDesktopStore((s) => s.maximizedId);
  const setMasterRatio = useDesktopStore((s) => s.setMasterRatio);
  const containerRef = useRef<HTMLDivElement>(null);

  const stackIds = tileOrder.slice(1);

  const rects = useMemo(() => {
    const map = new Map<string, TileRect>();
    if (tileOrder.length === 0) return map;
    if (tileOrder.length === 1) {
      map.set(tileOrder[0], FULL_RECT);
      return map;
    }
    const masterWidth = masterRatio * 100;
    map.set(tileOrder[0], { left: 0, top: 0, width: masterWidth, height: 100 });
    let top = 0;
    stackIds.forEach((id, i) => {
      const height = (stackRatios[i] ?? 1 / stackIds.length) * 100;
      map.set(id, { left: masterWidth, top, width: 100 - masterWidth, height });
      top += height;
    });
    return map;
  }, [tileOrder, masterRatio, stackRatios, stackIds]);

  const startMasterDrag = useCallback(
    (event: ReactPointerEvent) => {
      event.preventDefault();
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;

      function handleMove(e: globalThis.PointerEvent) {
        const current = useDesktopStore.getState().masterRatio;
        setMasterRatio(current + e.movementX / bounds!.width);
      }
      function handleUp() {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      }
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    },
    [setMasterRatio],
  );

  const startStackDrag = useCallback(
    (index: number) => (event: ReactPointerEvent) => {
      event.preventDefault();
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;

      function handleMove(e: globalThis.PointerEvent) {
        const deltaFraction = e.movementY / bounds!.height;
        const current = useDesktopStore.getState().stackRatios;
        const a = current[index] + deltaFraction;
        const b = current[index + 1] - deltaFraction;
        if (a < 0.08 || b < 0.08) return;
        const next = [...current];
        next[index] = a;
        next[index + 1] = b;
        useDesktopStore.setState({ stackRatios: next });
      }
      function handleUp() {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      }
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    },
    [],
  );

  const showDividers = maximizedId === null && tileOrder.length >= 2;
  const masterWidthPct = masterRatio * 100;

  return (
    // pointer-events-none on the container itself: it spans most of the
    // desktop (left-4 right-4 top-10 bottom-24) even when few/no tiles are
    // open, and being the last-painted element in that region it would
    // otherwise silently swallow clicks meant for DesktopIcons/WidgetStack
    // underneath. Window (via its own inline pointerEvents) and the dividers
    // (pointer-events-auto below) opt back in explicitly.
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-4 right-4 top-10 bottom-24 z-20"
    >
      <AnimatePresence>
        {tileOrder.map((id) => {
          const appDef = resolveWindowDefinition(id);
          if (!appDef) return null;
          const rect = maximizedId === id ? FULL_RECT : (rects.get(id) ?? FULL_RECT);
          const hidden = maximizedId !== null && maximizedId !== id;
          return <Window key={id} appDef={appDef} rect={rect} hidden={hidden} />;
        })}
      </AnimatePresence>

      {showDividers && (
        <div
          onPointerDown={startMasterDrag}
          className="pointer-events-auto absolute top-0 z-10 h-full w-2.5 -translate-x-1/2 cursor-col-resize"
          style={{ left: `${masterWidthPct}%` }}
        >
          <div className="mx-auto h-full w-px bg-white/10" />
        </div>
      )}

      {showDividers &&
        stackIds.slice(0, -1).map((id, i) => {
          const rect = rects.get(id);
          if (!rect) return null;
          const boundary = rect.top + rect.height;
          return (
            <div
              key={`divider-${id}`}
              onPointerDown={startStackDrag(i)}
              className="pointer-events-auto absolute z-10 h-2.5 -translate-y-1/2 cursor-row-resize"
              style={{
                top: `${boundary}%`,
                left: `${masterWidthPct}%`,
                width: `${100 - masterWidthPct}%`,
              }}
            >
              <div className="my-auto h-px w-full bg-white/10" />
            </div>
          );
        })}
    </div>
  );
}
