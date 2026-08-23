import type { ProjectEntry } from "@/content/types";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface ProjectDetailWindowProps {
  project: ProjectEntry;
}

export function ProjectDetailWindow({ project }: ProjectDetailWindowProps) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-6 text-zinc-200">
      <h2 className="text-lg font-semibold">{project.name}</h2>
      {project.award && <p className="text-xs font-medium text-amber-300">{project.award}</p>}
      <p className="text-sm text-zinc-400">{project.description}</p>
      <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
        {project.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15"
      >
        <GithubIcon className="h-3.5 w-3.5" />
        View Repository
      </a>
    </div>
  );
}
