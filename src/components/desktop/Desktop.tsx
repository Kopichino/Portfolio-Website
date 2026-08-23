"use client";

import { useEffect } from "react";
import { useDesktopStore } from "@/lib/window-manager/store";
import { cn } from "@/lib/utils";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { FloatingLayout } from "./FloatingLayout";
import { DesktopWallpaper } from "./DesktopWallpaper";
import { DesktopIcons } from "./DesktopIcons";
import { ControlCenter } from "./ControlCenter";
import { SpotlightSearch } from "./SpotlightSearch";
import { WidgetStack } from "./widgets/WidgetStack";

interface DesktopProps {
  active: boolean;
}

export function Desktop({ active }: DesktopProps) {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const focusedId = useDesktopStore((s) => s.focusedId);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const uiOverlay = useDesktopStore((s) => s.uiOverlay);
  const setUiOverlay = useDesktopStore((s) => s.setUiOverlay);

  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow("about");
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!active) return;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setUiOverlay(uiOverlay === "spotlight" ? "none" : "spotlight");
        return;
      }

      if (event.key === "Escape") {
        if (uiOverlay !== "none") {
          setUiOverlay("none");
        } else if (focusedId) {
          closeWindow(focusedId);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, focusedId, closeWindow, uiOverlay, setUiOverlay]);

  return (
    <div
      className={cn(
        "fixed inset-0 h-screen w-screen overflow-hidden bg-black",
        active ? "z-30 pointer-events-auto" : "-z-10 pointer-events-none",
      )}
      aria-hidden={!active}
    >
      <DesktopWallpaper />
      <DesktopIcons />
      <WidgetStack />
      <MenuBar />
      <FloatingLayout />
      <Dock />
      <ControlCenter />
      <SpotlightSearch />
    </div>
  );
}
