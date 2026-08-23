"use client";

import { FileCode2 } from "lucide-react";
import { useDesktopStore } from "@/lib/window-manager/store";
import { projects } from "@/content/resume";
import { PROJECT_WINDOW_PREFIX } from "./constants";

export function ProjectsFinder() {
  const openWindow = useDesktopStore((s) => s.openWindow);

  return (
    <div className="grid h-full grid-cols-3 content-start gap-4 overflow-y-auto p-6">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => openWindow(`${PROJECT_WINDOW_PREFIX}${project.id}`)}
          className="flex flex-col items-center gap-2 rounded-lg p-3 text-center hover:bg-white/5"
        >
          <FileCode2 className="h-10 w-10 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-transform duration-200 group-hover:scale-110" />
          <span className="text-xs text-zinc-200">{project.name}</span>
        </button>
      ))}
    </div>
  );
}
