import type { Achievement, Publication, ResearchThread, SkillGroup } from "./types";

export const researchIntro =
  "My research interests are machine learning, deep learning, computer vision and natural language processing. Across projects I keep returning to measurement: whether a retriever actually surfaces the right source, whether a representation really forgets an attribute, and whether a detector survives a shift in distribution.";

export const thesis = {
  title: "PGARC: Persona-Gated Adversarial Representation Learning",
  status: "In progress",
  programme: "M.Tech thesis, IIT Bhilai · expected 2027",
  summary:
    "Dialogue representations leak who is speaking. PGARC learns a persona subspace with an adaptive gate and trains it adversarially, aiming to make persona hard to recover while preserving semantic content.",
  points: [
    "Evaluated on DistilBERT, GPT-2 and BART",
    "Protection measured with five post-hoc attackers",
    "Compared against GRL, HSIC, INLP, LEACE and projection baselines across multiple seeds",
  ],
  href: "/projects/pgarc/",
};

export const researchThreads: ResearchThread[] = [
  {
    title: "Grounded retrieval and generation",
    description:
      "Hybrid retrieval, reranking and citation verification for assistants that must stay faithful to their sources.",
    project: { label: "IIT Bhilai CoPilot", href: "/projects/iit-bhilai-copilot/" },
  },
  {
    title: "Representation learning and privacy",
    description:
      "Dialogue representations that keep their content while resisting attribute recovery.",
    project: { label: "PGARC (thesis)", href: "/projects/pgarc/" },
  },
  {
    title: "Robustness in computer vision",
    description:
      "Stress-testing detectors under distribution shift and gradient-based adversarial attacks.",
    project: { label: "RealID evaluation", href: "/projects/realid-deepfake-detection/" },
  },
];

export const publications: Publication[] = [
  {
    title:
      "An Accurate Prediction of MPG (Miles Per Gallon) using Linear Regression Model of Machine Learning",
    authors: [
      "Varun Shirbhayye",
      "Deepesh Kurmi",
      "Siddharth Dyavanapalli",
      "Agraharam Sai Hari Prasad",
      "Nidhi Lal",
    ],
    self: "Varun Shirbhayye",
    venue: "2020 International Conference on Computer Communication and Informatics (ICCCI)",
    location: "Coimbatore, India",
    year: "2020",
    pages: "1–5",
    doi: "10.1109/ICCCI48352.2020.9104138",
    publisher: "IEEE",
    summary:
      "Predicts vehicle fuel efficiency from the UCI Auto-MPG dataset with linear regression, using feature engineering, cross-validation and residual analysis to identify the attributes that drive MPG.",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "C++", "C", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Machine learning",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face Transformers"],
  },
  {
    category: "NLP and LLM systems",
    items: [
      "Retrieval-augmented generation",
      "LangGraph",
      "Hybrid search (dense + BM25)",
      "Cross-encoder reranking",
      "Adversarial representation learning",
    ],
  },
  {
    category: "Computer vision",
    items: ["OpenCV", "EfficientNet", "Ultralytics YOLO", "dlib", "Adversarial evaluation (FGSM, PGD)"],
  },
  {
    category: "Data and analytics",
    items: ["Pandas", "NumPy", "Tableau"],
  },
  {
    category: "Databases",
    items: ["SQL", "SQLite", "IBM Db2", "Qdrant", "NoSQL"],
  },
  {
    category: "Backend and tooling",
    items: ["FastAPI", "Flask", "Docker", "Git", "Linux", "Google Colab", "VS Code"],
  },
];

export const achievements: Achievement[] = [
  {
    headline: "Top 4 globally",
    event: "HackerEarth Machine Learning Challenge: Exhibit A(rt)",
    detail: "Competitive machine learning, global leaderboard",
  },
  {
    headline: "First-author paper",
    event: "IEEE ICCCI 2020",
    detail: "Published as an undergraduate",
    href: "/#publications",
  },
  {
    headline: "Qualified",
    event: "Google Code Jam 2021, Qualification Round",
    detail: "Global competitive programming contest",
  },
  {
    headline: "Rank 1,382",
    event: "Google Kick Start 2019, Round F",
  },
  {
    headline: "Rank 1,141 of 8,051",
    event: "HackerRank HackFest 2020",
  },
];
