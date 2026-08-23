import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  User,
  GraduationCap,
  Briefcase,
  FolderClosed,
  TerminalSquare,
  Trophy,
  Mail,
  FileText,
} from "lucide-react";
import { AboutApp } from "@/components/apps/AboutApp";
import { EducationApp } from "@/components/apps/EducationApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { ProjectsFinder } from "@/components/apps/ProjectsApp/ProjectsFinder";
import { ProjectDetailWindow } from "@/components/apps/ProjectsApp/ProjectDetailWindow";
import { PROJECT_WINDOW_PREFIX } from "@/components/apps/ProjectsApp/constants";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { CertificationsApp } from "@/components/apps/CertificationsApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { ResumeApp } from "@/components/apps/ResumeApp";
import { projects } from "@/content/resume";

export type AppId =
  | "about"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "certifications"
  | "contact"
  | "resume";

export interface AppDefinition {
  id: string;
  title: string;
  icon: LucideIcon;
  Component: ComponentType;
}

export const APP_ORDER: AppId[] = [
  "about",
  "education",
  "experience",
  "projects",
  "skills",
  "certifications",
  "contact",
  "resume",
];

export const APP_REGISTRY: Record<AppId, AppDefinition> = {
  about: {
    id: "about",
    title: "About Me",
    icon: User,
    Component: AboutApp,
  },
  education: {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    Component: EducationApp,
  },
  experience: {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    Component: ExperienceApp,
  },
  projects: {
    id: "projects",
    title: "Projects",
    icon: FolderClosed,
    Component: ProjectsFinder,
  },
  skills: {
    id: "skills",
    title: "Skills",
    icon: TerminalSquare,
    Component: SkillsApp,
  },
  certifications: {
    id: "certifications",
    title: "Certifications",
    icon: Trophy,
    Component: CertificationsApp,
  },
  contact: {
    id: "contact",
    title: "Contact",
    icon: Mail,
    Component: ContactApp,
  },
  resume: {
    id: "resume",
    title: "Resume",
    icon: FileText,
    Component: ResumeApp,
  },
};

/**
 * Resolves a window id to its renderable definition, covering both the
 * static dock apps and dynamically opened project detail windows
 * (id `${PROJECT_WINDOW_PREFIX}${projectId}`, opened from the Projects app).
 */
export function resolveWindowDefinition(id: string): AppDefinition | undefined {
  if (id in APP_REGISTRY) {
    return APP_REGISTRY[id as AppId];
  }

  if (id.startsWith(PROJECT_WINDOW_PREFIX)) {
    const projectId = id.slice(PROJECT_WINDOW_PREFIX.length);
    const project = projects.find((p) => p.id === projectId);
    if (!project) return undefined;

    return {
      id,
      title: project.name,
      icon: FolderClosed,
      Component: () => <ProjectDetailWindow project={project} />,
    };
  }

  return undefined;
}
