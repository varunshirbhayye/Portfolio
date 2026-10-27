// Copy for the scroll-driven intro ("the night shift"). Wrap a phrase in
// *asterisks* to set it in the amber accent. Every figure here comes from the
// project data in projects.ts.

export const film = {
  hero: {
    question: "Think a model works?",
    answer: "Measure it.",
    sub: "I'm Varun Shirbhayye. I build AI systems, then find out where they break.",
    cta: { label: "See the work", href: "#projects" },
    facts: ["M.Tech, Data Science & AI · IIT Bhilai", "Retrieval · NLP · Vision robustness", "First-author IEEE paper"],
  },
  mission: {
    lead: "Most of my recent work falls into two problems: grounding and leakage.",
    line: "Answers that *cite their sources.* Representations that *forget who spoke.*",
  },
  numbers: {
    first: "98.4% AUC in the lab.",
    second: "3.6% under attack.",
    note: "I reproduced a 2025 deepfake detector, then broke it. Both numbers go in the report.",
  },
  now: {
    line: "Right now: *my M.Tech thesis.*",
    sub: "PGARC, persona-gated adversarial representation learning. In progress at IIT Bhilai.",
  },
  ledger: {
    label: "What I report *beyond the headline.*",
    struckHead: "the headline",
    struck: ["one in-domain score", "one random seed", "the attacker it trained against"],
    keptHead: "the evaluation",
    kept: [
      "45.39% AUC on an unseen benchmark",
      "five attackers trained after the fact",
      "every configuration over several seeds",
    ],
    punch: "Failure modes are results too.",
  },
  habits: {
    kicker: "Four habits. *Every project.*",
    steps: [
      "Read the paper, then reproduce it",
      "Build the whole pipeline, end to end",
      "Measure against strong baselines",
      "Break it, and write down what broke",
    ],
  },
  statement: "Good results survive *a second look.*",
  dawn: {
    statement: "Morning. Here's the work.",
    sub: "Selected projects, a first-author paper and the thesis I'm writing now. Keep scrolling.",
  },
  // Shown on the monitor in the close-up shot. Numbers are real results.
  terminal: [
    "~/realid $ python evaluate.py --data ff++ --attacks fgsm,pgd",
    "loading checkpoint · efficientnet-b0 · 4.0M params",
    "[ff++]   Deepfakes          auc 98.45   acc 98.20",
    "[ff++]   Face2Face          auc 98.45   acc 98.11",
    "[ff++]   FaceShifter        auc 98.54   acc 98.08",
    "[ff++]   FaceSwap           auc 98.58   acc 98.31",
    "[ff++]   NeuralTextures     auc 98.12   acc 96.27",
    "[ff++]   mean               auc 98.43   acc 97.79",
    "[140k]   cross-domain       auc 45.39   acc 47.38",
    "[pgd]    eps 4/255 · 40     auc  3.55   acc  9.65",
    "",
    "~/copilot $ python eval_retrieval.py --k 5",
    "dense + bm25 → rrf → cross-encoder     hit@5 0.9275   mrr 0.8533",
    "",
    "~/pgarc $ python train.py --backbone bart",
  ],
};

// Paper props that rest on the sections, like notes left on the desk.
export const deskProps = {
  note: {
    title: "todo",
    done: ["reproduce RealID", "cross-domain eval", "PGD sweep"],
    open: ["adversarial training"],
  },
  card: {
    title: "PGARC · notes",
    lines: ["keep: what was said", "drop: who said it", "test: 5 attackers, trained after"],
  },
};
