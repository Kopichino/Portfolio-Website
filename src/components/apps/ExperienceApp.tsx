import { experience } from "@/content/resume";

export function ExperienceApp() {
  return (
    <div className="h-full overflow-y-auto p-6 text-zinc-200">
      <ol className="relative space-y-8 border-l border-white/15 pl-6">
        {experience.map((entry) => (
          <li key={entry.id} className="relative">
            <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-sky-400 ring-4 ring-sky-400/20" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-sm font-semibold text-white">{entry.role}</h3>
              <span className="text-xs text-zinc-500">{entry.dates}</span>
            </div>
            <p className="text-xs text-zinc-400">{entry.company}</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
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
