import { experience } from "@/content/resume";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function ExperienceApp() {
  return (
    <div className="h-full overflow-y-auto p-6 text-zinc-200">
      <ol className="relative space-y-10 border-l border-white/15 pl-6">
        {experience.map((entry) => (
          <li key={entry.id} className="relative space-y-3">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-4 ring-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-base font-bold text-white">{entry.role}</h3>
                <span className="text-xs text-zinc-500 font-medium">{entry.dates}</span>
              </div>
              <p className="text-xs font-medium text-red-300">{entry.company}</p>
            </div>

            {/* Company / Internship Photo Placeholder */}
            <ImagePlaceholder
              src={entry.image}
              alt={`${entry.company} Experience`}
              label={`${entry.company} Workspace Photo`}
              className="w-full h-36 sm:h-44"
            />

            <ul className="list-disc space-y-1.5 pl-5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
