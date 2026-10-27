import type { NavItem, Profile } from "./types";

export const profile: Profile = {
  name: "Varun Shirbhayye",
  initials: "VS",
  affiliation: "M.Tech, Data Science & AI · IIT Bhilai",
  lead: "I build retrieval systems that cite their sources, and study whether neural representations reveal more than they should.",
  intro:
    "My work spans retrieval-augmented generation, representation learning for NLP, and robustness in computer vision. Before IIT Bhilai, I studied Computer Science at IIIT Nagpur and worked on data automation at IBM.",
  descriptor: "M.Tech student in Data Science & AI at IIT Bhilai",
  email: "varunshirbhayye@gmail.com",
  github: "https://github.com/varunshirbhayye",
  linkedin: "https://www.linkedin.com/in/varun-shirbhayye-38aa29194",
  resume: {
    href: "/Varun_Shirbhayye_Resume.pdf",
    fileName: "Varun_Shirbhayye_Resume.pdf",
  },
  now: "Working on my M.Tech thesis, PGARC: persona-gated adversarial representation learning.",
};

// Shown in the top bar; every section is still reachable by scrolling.
export const navItems: NavItem[] = [
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm an M.Tech student in Data Science and Artificial Intelligence at IIT Bhilai. Before that I completed a B.Tech in Computer Science and Engineering at IIIT Nagpur, published my first paper as an undergraduate, and spent six months at IBM building Python automation, data-validation pipelines and Tableau reporting for an analytics team.",
    "Most of my recent work falls into two problems. The first is grounding: IIT Bhilai CoPilot is a multilingual assistant that retrieves from official institute sources, tracks how fresh its facts are, and verifies its citations before answering. The second is leakage: in my thesis, PGARC, I study how to remove speaker persona from dialogue representations while keeping their semantic content, and how to check that the removal holds up against attackers trained after the fact.",
    "I care about evaluation as much as modelling. When I reproduced the RealID deepfake detector, it reached a mean AUC of 98.4% on FaceForensics++, then fell to 45.4% on an unseen benchmark and to 3.6% under a 40-step PGD attack. Results like those deserve to be reported as clearly as the good ones, and I try to build systems that make their own failure modes visible.",
  ],
  facts: [
    { label: "Studying", value: "M.Tech, Data Science & AI, IIT Bhilai (2025–2027)" },
    { label: "Thesis", value: "PGARC: persona-gated adversarial representation learning (ongoing)" },
    { label: "Previously", value: "Project Trainee, IBM India, Bengaluru (2022)" },
    { label: "Published", value: "First-author paper, IEEE ICCCI 2020" },
    { label: "Interests", value: "Machine learning, deep learning, computer vision, NLP" },
  ],
  // Headline numbers, each taken from projects.ts or research.ts.
  figures: [
    { value: "92.75%", label: "Hit@5 for CoPilot's hybrid retrieval" },
    { value: "98.43%", label: "mean AUC on FF++, RealID reproduction" },
    { value: "Top 4", label: "globally, HackerEarth ML challenge" },
  ],
};
