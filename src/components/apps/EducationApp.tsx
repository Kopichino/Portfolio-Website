"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { education } from "@/content/resume";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function EducationApp() {
  const [selectedId, setSelectedId] = useState(education[0].id);
  const selected = education.find((entry) => entry.id === selectedId) ?? education[0];

  return (
    <div className="flex h-full text-zinc-200">
      <div className="w-48 shrink-0 overflow-y-auto border-r border-white/10 bg-white/[0.03] py-2">
        {education.map((entry) => (
          <button
            key={entry.id}
            onClick={() => setSelectedId(entry.id)}
            className={cn(
              "block w-full truncate px-3 py-2 text-left text-xs transition-colors",
              entry.id === selectedId
                ? "bg-red-500/30 text-white font-semibold border-l-2 border-red-500"
                : "text-zinc-400 hover:bg-white/5",
            )}
          >
            {entry.institution}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white">{selected.institution}</h2>
          <p className="mt-0.5 text-sm font-medium text-red-300">{selected.credential}</p>
          <p className="text-xs text-zinc-400 mt-1">
            {selected.detail} &middot; {selected.years}
          </p>
        </div>

        {/* Institution Campus / School Photo Placeholder */}
        <ImagePlaceholder
          src={selected.image}
          alt={`${selected.institution} Campus`}
          label={`${selected.institution} Photo`}
          className="w-full h-40 sm:h-48 shrink-0"
        />

        {selected.highlights.length > 0 && (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
            {selected.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
