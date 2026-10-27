import type { EducationEntry, ExperienceEntry } from "./types";

export const education: EducationEntry[] = [
  {
    level: "Post Graduation",
    institution: "Indian Institute of Technology Bhilai",
    degree: "Master of Technology (M.Tech)",
    field: "Data Science and Artificial Intelligence",
    start: "Jul 2025",
    end: "Jul 2027",
    grade: "CGPA 7.88 / 10.00",
    logo: { src: "/education/iit-bhilai.webp", alt: "IIT Bhilai logo", width: 344, height: 350 },
  },
  {
    level: "Graduation",
    institution: "Indian Institute of Information Technology Nagpur",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    start: "Jul 2018",
    end: "Jul 2022",
    grade: "CGPA 8.33 / 10.00",
    logo: { src: "/education/iiit-nagpur.webp", alt: "IIIT Nagpur logo", width: 418, height: 436 },
  },
];

export const experience: ExperienceEntry[] = [
  {
    organization: "IBM India Pvt. Ltd.",
    role: "Project Trainee (Intern)",
    location: "Bengaluru, India",
    start: "Jan 2022",
    end: "Jun 2022",
    highlights: [
      "Automated recurring operational data workflows in Python, replacing manual processing for the analytics team and making every run reproducible across reports.",
      "Built preprocessing and validation pipelines with Pandas and NumPy, and tuned IBM Db2 schemas and SQL queries, so business-process automation ran on clean, reliable data.",
      "Designed Tableau dashboards that put key business KPIs in front of cross-functional stakeholders.",
    ],
    stack: ["Python", "Pandas", "NumPy", "IBM Db2", "SQL", "Tableau"],
    logo: { src: "/experience/ibm.svg", alt: "IBM", width: 1075, height: 401 },
  },
];
