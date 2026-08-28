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
    image: "/education/vit.jpg",
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
    image: "/education/vels.jpg",
    highlights: [],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "mhcognition",
    role: "AI & ML Intern",
    company: "MHCognition",
    dates: "Dec 2025 – Jan 2026",
    image: "/experience/mhcognition.webp",
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
    image: "/experience/lambda.webp",
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
    image: "/projects/roamiq.png",
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
    image: "/projects/upacs.jpg",
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
    image: "/projects/voxcoder.png",
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
  {
    id: "auradrive",
    name: "AuraDrive",
    description: "Trust-aware explainable autonomous driving system with multi-modal reasoning.",
    image: "/projects/auradrive.jpg",
    bullets: [
      "Combined Grad-CAM visual heatmaps, SHAP quantitative feature importance, and natural language explanations into a multi-modal explainability framework.",
      "Implemented a counterfactual reasoning engine for what-if scenario simulations and minimal change decision flip analysis.",
      "Formulated a composite trust scoring engine evaluating model confidence, explanation consistency under perturbations, and distribution similarity.",
    ],
    tech: ["Python", "PyTorch", "YOLOv5", "ResNet-18", "SHAP", "Grad-CAM", "Streamlit"],
    repo: "https://github.com/Kopichino/AuraDrive",
  },
  {
    id: "aviation-chatbot",
    name: "MH Cockpit — AI Flight Assistant",
    description: "Intelligent conversational assistant for pilot training and aviation documentation.",
    image: "/projects/aviation.png",
    bullets: [
      "Built a RAG-powered aviation AI chatbot leveraging Gemini 1.5 Flash, FastAPI, MongoDB, and Pinecone vector search for semantic document retrieval.",
      "Developed a real-time admin panel for lead tracking and full user chat history inspection.",
    ],
    tech: ["FastAPI", "Python", "MongoDB", "Pinecone", "Gemini 1.5 Flash", "React"],
    repo: "https://github.com/Kopichino/Aviation-chatbot",
  },
  {
    id: "repairjust",
    name: "RepairJust — AI Vehicle Damage Estimator",
    description: "InsurTech computer vision solution for automated vehicle damage detection and repair cost estimation.",
    image: "/projects/repairjust.png",
    bullets: [
      "Fine-tuned a custom YOLOv8 model on the CarDD dataset to detect dents, scratches, shattered glass, and broken lamps.",
      "Designed a FastAPI backend with a localized pricing engine calculating instant repair quotes based on car model, part costs, and damage severity.",
    ],
    tech: ["Python", "YOLOv8", "PyTorch", "FastAPI", "Streamlit", "Computer Vision"],
    repo: "https://github.com/Kopichino/Car-Damage-Detection",
  },
  {
    id: "aerotwin",
    name: "AeroTwin",
    description: "Agentic digital twin platform for aircraft engine predictive maintenance.",
    image: "/projects/aerotwin.webp",
    bullets: [
      "Architected a fleet-scale digital twin control plane for turbofan engines using NASA C-MAPSS telemetry streams and deep Remaining Useful Life (RUL) prediction.",
      "Formulated 7 LangGraph reasoning agents interacting via MCP tools and a Chroma vector store RAG corpus.",
      "Engineered real-time 3D turbofan module health visualization using React Three Fiber.",
    ],
    tech: ["Python", "React", "React Three Fiber", "LangGraph", "MCP", "ChromaDB", "TimescaleDB"],
    repo: "https://github.com/Kopichino/AeroTwin",
  },
  {
    id: "pinn-navier-stokes",
    name: "Navier-Stokes PINN",
    description: "Physics-Informed Neural Network solving 2D incompressible Navier–Stokes equations.",
    image: "/projects/pinn.webp",
    bullets: [
      "Implemented a PyTorch Physics-Informed Neural Network with Fourier feature embeddings to benchmark the Taylor–Green vortex problem.",
      "Applied adaptive collocation point resampling on high-residual PDE regions to compute velocity, pressure, and vorticity fields.",
    ],
    tech: ["Python", "PyTorch", "PINNs", "NumPy", "Matplotlib"],
    repo: "https://github.com/Kopichino/Non-Linear-PDE-Solver-PINN",
  },
  {
    id: "video-engagement",
    name: "Video Engagement Recognition Framework",
    description: "Cross-dataset PyTorch framework evaluating classroom video engagement recognition.",
    image: "/projects/videoengagement.png",
    bullets: [
      "Designed a 4-tier PyTorch computer vision pipeline evaluating cross-domain generalization across OUC-CGE and COLER classroom datasets.",
      "Achieved 99.25% 5-fold mean accuracy on OUC-CGE using space-optimized keyframe extraction (99% disk compression) and AMP training.",
    ],
    tech: ["Python", "PyTorch", "ResNet-50", "OpenCV", "TensorBoard", "Deep Learning"],
    repo: "https://github.com/Kopichino/Video-Engagement",
  },
  {
    id: "volume-hand-control",
    name: "Volume Hand Control",
    description: "Real-time computer vision application for gesture-based system volume control.",
    image: "/projects/volumehand.png",
    bullets: [
      "Developed a real-time computer vision system using OpenCV and MediaPipe to adjust system volume based on thumb-index finger distance.",
      "Built a modular HandTrackingModule for fast landmark detection and smooth volume mapping.",
    ],
    tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    repo: "https://github.com/Kopichino/Volume-Hand-Control",
  },
  {
    id: "philosite",
    name: "Philosite — Philosophy Website",
    description: "Visually immersive philosophy website with smooth motion and storytelling.",
    image: "/projects/philosite.png",
    bullets: [
      "Designed an interactive multi-page web app using GSAP animations and Blender 3D pre-rendered visuals for scroll-driven storytelling.",
      "Built a custom JavaScript image slider and styled blog layouts.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Blender"],
    repo: "https://github.com/Kopichino/Philosite",
  },
  {
    id: "student-risk-xai",
    name: "Student Academic Risk Dashboard (XAI)",
    description: "Explainable AI dashboard predicting student academic risk with SHAP explanations and What-If analysis.",
    image: "/projects/studentshap.png",
    bullets: [
      "Trained SMOTE-balanced XGBoost model to predict student failure risk, coupled with SHAP (TreeExplainer) for feature attribution.",
      "Built a Next.js/Tailwind CSS dashboard with FastAPI backend enabling real-time What-If scenario simulations for educators.",
    ],
    tech: ["Python", "XGBoost", "SHAP", "FastAPI", "Next.js", "React", "Tailwind CSS"],
    repo: "https://github.com/Kopichino/XAI-Student-Performance-SHAP",
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
