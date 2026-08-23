export interface Profile {
  name: string;
  tagline: string;
  location: string;
  cgpa: string;
  years: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumePdfUrl: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  detail: string;
  years: string;
  highlights: string[];
  image?: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dates: string;
  bullets: string[];
  image?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  award?: string;
  description: string;
  bullets: string[];
  tech: string[];
  repo: string;
  image?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  image?: string;
}
