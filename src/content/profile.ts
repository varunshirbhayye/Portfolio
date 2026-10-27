import type { NavItem, Profile } from "./types";

export const profile: Profile = {
  name: "Varun Shirbhayye",
  affiliation: "M.Tech, Data Science & AI · IIT Bhilai",
  lead: "I build machine learning systems that are grounded in evidence, private by design and robust beyond the benchmark.",
  intro:
    "Currently pursuing an M.Tech in Data Science & AI at IIT Bhilai, I focus on retrieval-augmented generation, privacy in NLP representations and the robustness of vision models. My path here runs through a B.Tech in Computer Science from IIIT Nagpur, a first-author IEEE publication and an internship at IBM automating data workflows.",
  descriptor: "M.Tech student in Data Science & AI at IIT Bhilai",
  email: "varunshirbhayye@gmail.com",
  github: "https://github.com/varunshirbhayye",
  linkedin: "https://www.linkedin.com/in/varun-shirbhayye-38aa29194",
  resume: {
    href: "/Varun_Shirbhayye_Resume.pdf",
    fileName: "Varun_Shirbhayye_Resume.pdf",
  },
};

export const navItems: NavItem[] = [
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
