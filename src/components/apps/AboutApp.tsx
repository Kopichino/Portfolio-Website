import { Mail } from "lucide-react";
import { profile } from "@/content/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function AboutApp() {
  return (
    <div className="flex h-full flex-col items-center gap-4 overflow-y-auto p-8 text-center text-zinc-200">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-2xl font-semibold text-white shadow-lg shadow-red-600/30">
        {profile.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>
      <div>
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-sm text-zinc-400">{profile.tagline}</p>
        <p className="text-xs text-zinc-500">{profile.location}</p>
      </div>
      <div className="flex gap-4 text-xs text-zinc-400">
        <span>
          CGPA <span className="font-medium text-zinc-200">{profile.cgpa}</span>
        </span>
        <span>{profile.years}</span>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-zinc-300">{profile.bio}</p>
      <div className="mt-auto flex gap-3 pt-4">
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/15"
        >
          <Mail className="h-4 w-4" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/15"
        >
          <LinkedinIcon className="h-4 w-4" />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/15"
        >
          <GithubIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
