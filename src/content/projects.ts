import type { Project } from "./types";

// Text carried over unchanged from archive/content/projects.ts; the entity
// resolution entry and its numbers come from its repo's README.
// CoPilot deliberately has no code link. PGARC is under research.ts.

export const projects: Project[] = [
  {
    title: "Business Entity Resolution",
    tagline: "Finding every record of the same real-world business across three data sources.",
    category: "Entity resolution · Retrieval",
    context: "Amazon ML Challenge 2026",
    summary:
      "A ten-step pipeline over 24.2M business records. A fine-tuned multilingual bi-encoder with FAISS HNSW blocking narrows each business to about six candidates; cross-encoder scores and 59 hand-made pair features then feed a LightGBM matcher, a cluster-aware re-scorer and a decision rule that maximises expected F0.5. Every stacked model is cross-fitted, so all validation is out-of-fold.",
    metrics: [
      { value: "0.9856", label: "macro F0.5, leaderboard" },
      { value: "98.92%", label: "true pairs kept by blocking" },
      { value: "5.98", label: "candidates per business" },
    ],
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "FAISS", "LightGBM", "Polars"],
    links: { repo: "https://github.com/varunshirbhayye/Amazon-ML-Challenge-2026" },
  },
  {
    title: "IIT Bhilai CoPilot",
    tagline: "A multilingual RAG assistant that answers only from official institute sources.",
    category: "Retrieval & LLM systems",
    summary:
      "Hybrid retrieval over official public IIT Bhilai sources, combining dense search, BM25, Reciprocal Rank Fusion and cross-encoder reranking. LangGraph handles tool routing, and the assistant verifies its citations and guards against prompt injection.",
    metrics: [
      { value: "92.75%", label: "Hit@5" },
      { value: "0.8533", label: "MRR" },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Qdrant", "SQLite", "Docker"],
    links: {},
  },
  {
    title: "RealID Deepfake Detection",
    tagline: "Reproducing a recent deepfake detector, then testing where it breaks.",
    category: "Computer vision · Robustness",
    context: "Academic project, IIT Bhilai",
    summary:
      "Implemented and trained RealID (Liu et al., IJCAI 2025) on FaceForensics++, reaching 98.43% mean AUC. Then showed that it falls to 45.39% AUC on an unseen benchmark and collapses under small adversarial perturbations.",
    metrics: [
      { value: "98.43%", label: "mean AUC, FF++" },
      { value: "45.39%", label: "AUC, cross-domain" },
      { value: "3.55%", label: "AUC under PGD-40" },
    ],
    stack: ["Python", "PyTorch", "EfficientNet-B0", "OpenCV", "dlib", "scikit-learn"],
    links: { repo: "https://github.com/varunshirbhayye/Realid-Deepfake-Detection" },
  },
  {
    title: "Video Object Detection",
    category: "Computer vision",
    summary:
      "Flask web app: upload a video, name the object classes to look for, and get back an annotated video plus merged time intervals showing when each object appears. Detection runs on Ultralytics YOLO, with OpenCV for frame I/O.",
    stack: ["Python", "Flask", "Ultralytics YOLO", "OpenCV", "JavaScript"],
    links: { repo: "https://github.com/varunshirbhayye/Video_Object_Detection" },
  },
];
