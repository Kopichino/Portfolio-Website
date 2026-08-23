"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { education } from "@/content/resume";

export function EducationApp() {
  const [selectedId, setSelectedId] = useState(education[0].id);
  const selected = education.find((entry) => entry.id === selectedId) ?? education[0];

  return (
    <div className="flex h-full text-zinc-200">
      <div className="w-44 shrink-0 overflow-y-auto border-r border-white/10 bg-white/[0.03] py-2">
        {education.map((entry) => (
          <button
            key={entry.id}
            onClick={() => setSelectedId(entry.id)}
            className={cn(
              "block w-full truncate px-3 py-2 text-left text-xs",
              entry.id === selectedId ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5",
            )}
          >
            {entry.institution}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-base font-semibold">{selected.institution}</h2>
        <p className="mt-1 text-sm text-zinc-300">{selected.credential}</p>
        <p className="text-xs text-zinc-500">
          {selected.detail} · {selected.years}
        </p>
        {selected.highlights.length > 0 && (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-300">
            {selected.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
