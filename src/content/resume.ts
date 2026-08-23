import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  Profile,
  ProjectEntry,
  SkillCategory,
} from "./types";

export const profile: Profile = {
  name: "Koppesh P",
  tagline: "B.Tech CSE (AI & ML), VIT Chennai",
  location: "Chennai, India",
  cgpa: "9.04",
  years: "2023 – 2027",
  bio: "Computer Science undergraduate with hands-on experience designing and building backend services, REST APIs, and full-stack applications across internships and hackathons. Comfortable across Python, Java, and C++, with production experience in FastAPI/Django backends, MongoDB, and AWS-hosted deployments. Additional depth in applied AI/ML — RAG systems and vector search — used to extend traditional software with intelligent features.",
  email: "koppeshp@gmail.com",
  phone: "+91 94440 40398",
  linkedin: "https://linkedin.com/in/koppesh",
  github: "https://github.com/Kopichino",
  resumePdfUrl: "/resume.pdf",
};

export const education: EducationEntry[] = [
  {
    id: "vit-chennai",
    institution: "Vellore Institute of Technology, Chennai",
    credential: "B.Tech in Computer Science and Engineering (AI & ML)",
    detail: "CGPA: 9.04",
    years: "2023 – 2027",
    highlights: [
      "Relevant coursework: Data Structures & Algorithms, Operating Systems, Computer Networks",
    ],
  },
  {
    id: "vels-vidyashram",
    institution: "VELS Vidyashram, Chennai",
    credential: "CBSE Class XII",
    detail: "98.2% — School Topper",
    years: "2022 – 2023",
    highlights: [],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "mhcognition",
    role: "AI & ML Intern",
    company: "MHCognition",
    dates: "Dec 2025 – Jan 2026",
    bullets: [
      "HRM Platform Backend Service: engineered and deployed a Django-based information-retrieval backend (TF-IDF search) and integrated it into an enterprise HRM platform, cutting repetitive HR support queries by ~20% and improving employee self-service access to documentation.",
      "MH Cockpit Backend System: designed and built a production backend (FastAPI, MongoDB, Pinecone) exposing REST APIs for semantic document retrieval and LLM-based response generation (Gemini 2.5 Flash); deployed to AWS EC2/S3 and built an internal admin dashboard for lead tracking and usage analytics.",
    ],
  },
  {
    id: "lambdadigital",
    role: "System Analyst Intern",
    company: "LambdaDigital Pvt Ltd",
    dates: "Jun 2024",
    bullets: [
      "Performed requirement analysis and technology-stack evaluation for tagminds.ai, an Enterprise Asset Management SaaS platform, contributing to on-time Phase-1 delivery.",
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: "roamiq",
    name: "RoamIQ",
    award: "VoyageTech Track Winner — NXTGEN Hackathon, SRM (800+ applicants, 70+ teams)",
    description: "Full-stack AI travel planner built in a 24-hour hackathon sprint.",
    bullets: [
      "Designed and built a full-stack web application (React.js frontend, Python backend, REST APIs) shipping real-time weather adaptation, crowd analytics, accessibility scoring, and an emergency SOS feature.",
    ],
    tech: ["Python", "React.js", "REST APIs", "LLM APIs", "Prompt Engineering"],
    repo: "https://github.com/Kopichino/roamiq",
  },
  {
    id: "upacs",
    name: "UPACS",
    award: "5th Place — VMedithon Hackathon (150+ teams)",
    description: "Unconscious Patient Autonomous Care System — real-time clinical monitoring.",
    bullets: [
      "Built an end-to-end monitoring application (Streamlit) integrating three ML models into a single real-time inference pipeline for mental-state detection, unconsciousness-level classification, and pain-score estimation.",
      "Implemented an ECG signal-processing and HRV feature-extraction pipeline with XGBoost-based inference, providing a low-cost alternative to EEG-based clinical monitoring.",
    ],
    tech: ["Python", "TensorFlow", "Scikit-learn", "ECG Signal Processing", "NumPy"],
    repo: "https://github.com/Kopichino/upacs",
  },
  {
    id: "voxcoder",
    name: "VoxCoder",
    description: "Full-stack voice-driven web IDE that converts speech to code.",
    bullets: [
      "Built a full-stack voice-driven web IDE (Next.js/React, Flask, 15+ REST endpoints) with JWT auth, converting speech to code via OpenAI Whisper and Groq LLM.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Flask",
      "REST APIs",
      "SQLite",
      "JWT Auth",
      "OpenAI Whisper",
      "Groq LLM",
    ],
    repo: "https://github.com/Kopichino/VoxCoder",
  },
];

export const skills: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    items: ["Python", "Java", "C", "C++", "SQL"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: ["FastAPI", "Django", "Flask", "REST API Design"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React.js"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: ["AWS (EC2, S3)", "Git", "GitHub"],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MongoDB", "Pinecone (Vector Database)"],
  },
  {
    id: "ai-ml",
    label: "AI/ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "XGBoost",
      "LangChain",
      "RAG",
      "NLP",
      "Prompt Engineering",
      "Vector Search",
    ],
  },
  {
    id: "tools",
    label: "Developer Tools",
    items: ["Streamlit", "NumPy", "Pandas"],
  },
];

export const certifications: CertificationEntry[] = [
  {
    id: "nxtgen",
    title: "VoyageTech Track Winner",
    issuer: "NXTGEN Hackathon, SRM Institute of Science and Technology (800+ applicants, 70+ teams)",
  },
  {
    id: "vmedithon",
    title: "5th Place",
    issuer: "VMedithon Hackathon — AI-based critical care system (150+ teams)",
  },
  {
    id: "nptel-1",
    title: "Data Science for Engineers",
    issuer: "NPTEL — Top 5% nationally",
  },
  {
    id: "nptel-2",
    title: "Python for Data Science",
    issuer: "NPTEL — Top 5% nationally",
  },
  {
    id: "nptel-3",
    title: "Entrepreneurship",
    issuer: "NPTEL — Top 5% nationally",
  },
  {
    id: "freecodecamp",
    title: "Responsive Web Design Certification",
    issuer: "FreeCodeCamp",
  },
];
