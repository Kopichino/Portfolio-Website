import { create } from "zustand";
import type { WindowId, WindowState } from "./types";

export type UiOverlay = "none" | "appleMenu" | "spotlight" | "controlCenter";

function evenRatios(count: number): number[] {
  if (count <= 0) return [];
  return Array(count).fill(1 / count);
}

interface DesktopStore {
  windows: Record<WindowId, WindowState>;
  focusedId: WindowId | null;
  uiOverlay: UiOverlay;

  // Tiling layout: `tileOrder[0]` is the master pane (full height, width
  // driven by `masterRatio`); the rest stack in the remaining column, each
  // sized by the matching entry in `stackRatios` (always same length as
  // `tileOrder.length - 1`, sums to 1).
  tileOrder: WindowId[];
  masterRatio: number;
  stackRatios: number[];
  maximizedId: WindowId | null;

  // Incremented by the menu bar's "Lock Screen" action; PortfolioExperience
  // watches this to trigger the same cover/reveal transition that unlocking
  // uses, just in reverse — see PortfolioExperience.tsx.
  lockToken: number;
  requestLock: () => void;

  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  setMasterRatio: (ratio: number) => void;
  setStackRatios: (ratios: number[]) => void;
  setUiOverlay: (overlay: UiOverlay) => void;
}

export const useDesktopStore = create<DesktopStore>((set) => ({
  windows: {},
  focusedId: null,
  uiOverlay: "none",
  tileOrder: [],
  masterRatio: 0.55,
  stackRatios: [],
  maximizedId: null,
  lockToken: 0,
  requestLock: () => set((state) => ({ lockToken: state.lockToken + 1 })),

  openWindow: (id) =>
    set((state) => {
      const existing = state.windows[id];
      if (existing?.isOpen && !existing.isMinimized) {
        return { focusedId: id };
      }

      const nextTileOrder = [...state.tileOrder, id];
      return {
        windows: { ...state.windows, [id]: { id, isOpen: true, isMinimized: false } },
        tileOrder: nextTileOrder,
        stackRatios: evenRatios(nextTileOrder.length - 1),
        focusedId: id,
        maximizedId: null,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const rest = { ...state.windows };
      delete rest[id];
      const nextTileOrder = state.tileOrder.filter((tid) => tid !== id);
      return {
        windows: rest,
        tileOrder: nextTileOrder,
        stackRatios: evenRatios(nextTileOrder.length - 1),
        focusedId: state.focusedId === id ? null : state.focusedId,
        maximizedId: state.maximizedId === id ? null : state.maximizedId,
      };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const win = state.windows[id];
      if (!win) return state;
      const nextTileOrder = state.tileOrder.filter((tid) => tid !== id);
      return {
        windows: { ...state.windows, [id]: { ...win, isMinimized: true } },
        tileOrder: nextTileOrder,
        stackRatios: evenRatios(nextTileOrder.length - 1),
        focusedId: state.focusedId === id ? null : state.focusedId,
        maximizedId: state.maximizedId === id ? null : state.maximizedId,
      };
    }),

  toggleMaximize: (id) =>
    set((state) => ({ maximizedId: state.maximizedId === id ? null : id })),

  focusWindow: (id) =>
    set((state) => {
      const win = state.windows[id];
      if (!win || win.isMinimized) return state;
      return { focusedId: id };
    }),

  setMasterRatio: (ratio) => set({ masterRatio: Math.min(0.75, Math.max(0.25, ratio)) }),

  setStackRatios: (ratios) => set({ stackRatios: ratios }),

  setUiOverlay: (overlay) => set({ uiOverlay: overlay }),
}));
