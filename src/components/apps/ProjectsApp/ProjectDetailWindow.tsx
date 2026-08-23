import type { ProjectEntry } from "@/content/types";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface ProjectDetailWindowProps {
  project: ProjectEntry;
}

export function ProjectDetailWindow({ project }: ProjectDetailWindowProps) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-6 text-zinc-200">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">{project.name}</h2>
          {project.award && <p className="text-xs font-semibold text-amber-300 mt-0.5">{project.award}</p>}
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-500 shadow-md shadow-red-600/30 transition-colors"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          View Repository
        </a>
      </div>

      {/* Project Image Placeholder */}
      <ImagePlaceholder
        src={project.image}
        alt={`${project.name} Screenshot`}
        label={`${project.name} Demo`}
        className="w-full h-44 sm:h-52 shrink-0"
      />

      <p className="text-sm text-zinc-300 leading-relaxed">{project.description}</p>

      <ul className="list-disc space-y-2 pl-5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {project.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full border border-red-500/30 bg-red-950/40 px-2.5 py-0.5 text-[11px] font-medium text-red-200 shadow-sm shadow-red-500/10">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
