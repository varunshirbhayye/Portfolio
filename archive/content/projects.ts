import type { Project, RepoSummary } from "./types";

// Sources: resume (Sep 2026) for CoPilot, PGARC and the MPG paper; the public
// Realid-Deepfake-Detection repository's README and result reports for RealID.

export const projects: Project[] = [
  {
    slug: "iit-bhilai-copilot",
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
    detail: [
      {
        id: "problem",
        heading: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Information about the institute is spread across many official public pages and documents, and some of it changes over time. A general-purpose chatbot answers questions about it fluently, often from stale or invented facts. The goal was an assistant that answers only from verified official sources, shows where each answer came from, and works for people asking in more than one language.",
          },
        ],
      },
      {
        id: "retrieval",
        heading: "Retrieval pipeline",
        blocks: [
          {
            type: "pipeline",
            caption: "Two complementary retrievers, fused by rank, then reranked.",
            stages: [
              { title: "User query", detail: "Multilingual input" },
              {
                parallel: [
                  { title: "Dense retrieval", detail: "Semantic similarity" },
                  { title: "BM25", detail: "Exact keyword match" },
                ],
              },
              { title: "Reciprocal Rank Fusion", detail: "Merges the two ranked lists" },
              { title: "Cross-encoder reranking", detail: "Scores each query–passage pair jointly" },
              { title: "Grounded answer", detail: "Generated from top passages, with citations" },
            ],
          },
          {
            type: "paragraph",
            text: "Each stage covers a weakness of the one before it. Dense retrieval handles paraphrase, while BM25 catches exact names and terms that embeddings tend to blur. Reciprocal Rank Fusion combines the two lists by rank, so their raw scores never need to be comparable. A cross-encoder then rereads each query–passage pair together, which is too slow to run over the whole corpus but accurate on a short candidate list.",
          },
        ],
      },
      {
        id: "safeguards",
        heading: "Orchestration and safeguards",
        blocks: [
          {
            type: "definitions",
            items: [
              {
                term: "Tool routing",
                description:
                  "A LangGraph graph routes each request to the right tool instead of pushing every question through a single retrieval path.",
              },
              {
                term: "Fact freshness and conflict resolution",
                description:
                  "Structured facts carry freshness information, so when sources disagree the assistant can resolve the conflict instead of choosing arbitrarily.",
              },
              {
                term: "Citation verification",
                description: "Citations are verified before an answer is returned.",
              },
              {
                term: "Prompt-injection protection",
                description:
                  "Guards against instructions smuggled in through user input or retrieved text.",
              },
              {
                term: "Privacy-preserving memory",
                description:
                  "Conversation memory keeps context useful without retaining more personal information than it needs.",
              },
            ],
          },
        ],
      },
      {
        id: "results",
        heading: "Results",
        blocks: [
          {
            type: "paragraph",
            text: "On retrieval evaluation, the full hybrid pipeline reached 92.75% Hit@5 (a relevant source appears among the top five results) and a mean reciprocal rank of 0.8533.",
          },
        ],
      },
    ],
  },
  {
    slug: "pgarc",
    title: "PGARC",
    fullTitle: "Persona-Gated Adversarial Representation Learning",
    tagline: "Removing speaker persona from dialogue representations without losing what was said.",
    category: "NLP · Representation learning",
    context: "M.Tech thesis",
    status: "ongoing",
    summary:
      "My M.Tech thesis. A learned persona subspace with adaptive gating, trained adversarially to make persona hard to recover while preserving semantic content. Evaluated on DistilBERT, GPT-2 and BART against five post-hoc attackers and established erasure baselines.",
    metrics: [
      { value: "3", label: "backbones" },
      { value: "5", label: "post-hoc attackers" },
    ],
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "DistilBERT", "GPT-2", "BART"],
    links: {},
    detail: [
      {
        id: "status",
        heading: "Status",
        blocks: [
          {
            type: "callout",
            title: "Ongoing M.Tech thesis",
            text: "The method and evaluation protocol are described below. Results will be added here once the thesis is finalised.",
          },
        ],
      },
      {
        id: "problem",
        heading: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Dialogue encoders capture more than meaning. Their representations also encode who is speaking: persona attributes such as speaking style, traits and background, which a classifier trained on top can often recover. That becomes a privacy problem whenever representations are stored, shared or reused downstream.",
          },
          {
            type: "paragraph",
            text: "PGARC asks how to make persona hard to recover from a dialogue representation while keeping the semantic content that downstream tasks need.",
          },
        ],
      },
      {
        id: "why-hard",
        heading: "Why it is hard",
        blocks: [
          {
            type: "paragraph",
            text: "Removal is only as convincing as the strongest attacker it is tested against. Linear erasure can guarantee protection against linear probes yet leave information that a non-linear probe still finds. Adversarial training can look successful against its own discriminator while a fresh probe, trained afterwards, still recovers the attribute. Erasing everything is trivial, so recoverability has to be measured together with how much content survives.",
          },
        ],
      },
      {
        id: "approach",
        heading: "Approach",
        blocks: [
          {
            type: "pipeline",
            caption: "Training-time view, simplified. Exact objectives are part of the ongoing thesis.",
            stages: [
              { title: "Dialogue utterance" },
              { title: "Encoder", detail: "DistilBERT · GPT-2 · BART" },
              { title: "Learned persona subspace", detail: "With an adaptive gate" },
              {
                parallel: [
                  { title: "Preserve", detail: "Semantic content" },
                  { title: "Suppress", detail: "Persona recoverability (adversarial)" },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Instead of erasing one fixed direction, PGARC learns a persona subspace together with an adaptive gate that controls how much of it passes through, and trains this component adversarially. The design is evaluated on an encoder (DistilBERT), a decoder (GPT-2) and an encoder–decoder (BART) to check that it isn't tied to one architecture.",
          },
        ],
      },
      {
        id: "evaluation",
        heading: "Evaluation protocol",
        blocks: [
          {
            type: "list",
            items: [
              "Five post-hoc attackers are trained on the representations after training, so protection is measured against probes the model never saw.",
              "Controlled baselines (GRL, HSIC, INLP, LEACE and projection-based methods) run under the same setup.",
              "Every configuration is repeated across multiple random seeds.",
            ],
          },
        ],
      },
      {
        id: "baselines",
        heading: "Baselines",
        blocks: [
          {
            type: "definitions",
            items: [
              {
                term: "GRL",
                description:
                  "Adversarial training through a gradient-reversal layer (Ganin & Lempitsky, 2015).",
              },
              {
                term: "HSIC",
                description:
                  "Penalises statistical dependence between the representation and the attribute using the Hilbert–Schmidt Independence Criterion.",
              },
              {
                term: "INLP",
                description:
                  "Iterative Nullspace Projection: repeatedly trains linear probes and projects onto their nullspace (Ravfogel et al., 2020).",
              },
              {
                term: "LEACE",
                description:
                  "Least-squares concept erasure: a closed-form linear method that prevents any linear classifier from recovering the concept (Belrose et al., 2023).",
              },
              {
                term: "Projection-based",
                description:
                  "Removes an estimated attribute direction or subspace by orthogonal projection.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "realid-deepfake-detection",
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
    detail: [
      {
        id: "overview",
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "RealID (Liu et al., IJCAI 2025) detects face forgeries by learning what real faces look like, rather than memorising the artefacts of particular manipulation methods. I implemented the architecture on an EfficientNet-B0 backbone, trained it on FaceForensics++, and evaluated it in three settings: within-domain, cross-domain, and under gradient-based adversarial attack.",
          },
        ],
      },
      {
        id: "architecture",
        heading: "Architecture",
        blocks: [
          {
            type: "pipeline",
            caption: "Components follow the RealID paper; simplified.",
            stages: [
              { title: "Face extraction", detail: "dlib detector, 256 × 256 crops from video frames" },
              { title: "EfficientNet-B0 encoder", detail: "4.0M parameters in total" },
              { title: "Real Concept Capture (RealC²)", detail: "Multi-Real Memory prototype banks" },
              { title: "Independent Dual-Decision classifier", detail: "Reduces reliance on forgery-specific artefacts" },
              { title: "Real / fake score" },
            ],
          },
        ],
      },
      {
        id: "results",
        heading: "Results at a glance",
        blocks: [
          {
            type: "bars",
            caption: "AUC (%) in each evaluation setting",
            unit: "%",
            max: 100,
            reference: { value: 50, label: "chance" },
            data: [
              { label: "FF++, in-domain (mean)", value: 98.43 },
              { label: "140k benchmark, cross-domain", value: 45.39 },
              { label: "FGSM, ε = 2/255", value: 9.74 },
              { label: "PGD-40, ε = 4/255", value: 3.55 },
              { label: "PGD-40, ε = 16/255", value: 0.33 },
            ],
            note: "In-domain AUC is the mean over five FF++ manipulation types. Cross-domain uses 20,000 test images. Attacks use 2,000 FF++ Deepfakes test images (1,000 per class), where clean AUC is 98.99%.",
          },
        ],
      },
      {
        id: "in-domain",
        heading: "Within-domain: FaceForensics++",
        blocks: [
          {
            type: "table",
            caption: "Per-manipulation results on the FF++ test split",
            columns: ["Manipulation", "AUC (%)", "Accuracy (%)"],
            rows: [
              ["Deepfakes", "98.45", "98.20"],
              ["Face2Face", "98.45", "98.11"],
              ["FaceShifter", "98.54", "98.08"],
              ["FaceSwap", "98.58", "98.31"],
              ["NeuralTextures", "98.12", "96.27"],
              ["Mean", "98.43", "97.79"],
            ],
            emphasisRow: 5,
          },
        ],
      },
      {
        id: "cross-domain",
        heading: "Cross-domain: 140k Real vs Fake",
        blocks: [
          {
            type: "paragraph",
            text: "Trained on FaceForensics++ and tested on 20,000 images from the 140k Real vs Fake faces dataset, the model labels most fakes as real. The 140k fakes are whole faces generated by a GAN, while FF++ contains manipulated video frames, so the artefacts the detector learned do not carry over.",
          },
          {
            type: "table",
            caption: "Cross-domain metrics (FF++ → 140k test split, n = 20,000)",
            columns: ["Metric", "Value (%)"],
            rows: [
              ["AUC", "45.39"],
              ["Accuracy", "47.38"],
              ["Recall, fake", "13.82"],
              ["Recall, real", "80.93"],
            ],
          },
        ],
      },
      {
        id: "robustness",
        heading: "Adversarial robustness",
        blocks: [
          {
            type: "paragraph",
            text: "Both attacks push AUC far below 50%: perturbed images are not merely made uncertain but ranked the wrong way round. FGSM is non-monotonic in ε, with AUC partly recovering at larger budgets, which is typical of single-step attacks overshooting. Iterative PGD keeps AUC below 6% at every budget tested.",
          },
          {
            type: "table",
            caption: "FF++ Deepfakes test subset, 1,000 real and 1,000 fake images",
            columns: ["Attack", "ε", "Steps", "AUC (%)", "Accuracy (%)"],
            rows: [
              ["Clean", "—", "—", "98.99", "98.55"],
              ["FGSM", "2/255", "1", "9.74", "53.65"],
              ["FGSM", "4/255", "1", "20.43", "55.10"],
              ["FGSM", "8/255", "1", "55.89", "59.80"],
              ["FGSM", "16/255", "1", "63.12", "62.85"],
              ["FGSM", "32/255", "1", "47.83", "48.75"],
              ["PGD", "4/255", "10", "3.74", "23.95"],
              ["PGD", "4/255", "40", "3.55", "9.65"],
              ["PGD", "8/255", "10", "5.42", "16.55"],
              ["PGD", "8/255", "40", "2.90", "8.60"],
              ["PGD", "16/255", "10", "1.60", "9.65"],
              ["PGD", "16/255", "40", "0.33", "5.25"],
            ],
            emphasisRow: 0,
            note: "PGD step size 2/255. Full results, including 20-step runs, are in the repository.",
          },
          {
            type: "paragraph",
            text: "The natural next step these results point to is adversarial training.",
          },
        ],
      },
      {
        id: "setup",
        heading: "Training setup",
        blocks: [
          {
            type: "definitions",
            items: [
              { term: "Backbone", description: "EfficientNet-B0, 256 × 256 input" },
              { term: "Optimiser", description: "Adam, learning rate 1 × 10⁻⁴, weight decay 1 × 10⁻⁵" },
              { term: "Schedule", description: "Cosine annealing to 1 × 10⁻⁶ over 50 epochs, mixed precision" },
              { term: "Batches", description: "16 images (8 real + 8 fake), K = 10 prototypes" },
              { term: "Hardware", description: "Single NVIDIA RTX 3060" },
            ],
          },
        ],
      },
      {
        id: "references",
        heading: "References",
        blocks: [
          {
            type: "references",
            items: [
              { text: "Liu et al. Learning Real Facial Concepts for Independent Deepfake Detection. IJCAI 2025." },
              { text: "Rössler et al. FaceForensics++: Learning to Detect Manipulated Facial Images. ICCV 2019." },
              { text: "Tan & Le. EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks. ICML 2019." },
              { text: "Goodfellow et al. Explaining and Harnessing Adversarial Examples. ICLR 2015." },
              { text: "Madry et al. Towards Deep Learning Models Resistant to Adversarial Attacks. ICLR 2018." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "mpg-prediction",
    title: "Vehicle Fuel-Efficiency Prediction",
    tagline: "My first-author IEEE paper: predicting miles per gallon with linear regression.",
    category: "Classical ML · Publication",
    context: "IEEE ICCCI 2020",
    summary:
      "A linear-regression model on the UCI Auto-MPG dataset, built with feature engineering, cross-validation and residual analysis to identify the factors that drive fuel efficiency. It reached an R² of 0.82.",
    metrics: [{ value: "0.82", label: "R² score" }],
    stack: ["Python", "scikit-learn", "Pandas"],
    links: { paper: "https://doi.org/10.1109/ICCCI48352.2020.9104138" },
  },
];

export const moreRepos: RepoSummary[] = [
  {
    name: "Video_Object_Detection",
    title: "Video Object Detection",
    description:
      "Flask web app: upload a video, name the object classes to look for, and get back an annotated video plus merged time intervals showing when each object appears. Detection runs on Ultralytics YOLO, with OpenCV for frame I/O.",
    stack: ["Python", "Flask", "Ultralytics YOLO", "OpenCV", "JavaScript"],
    href: "https://github.com/varunshirbhayye/Video_Object_Detection",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectsWithDetail = projects.filter((p) => p.detail);
