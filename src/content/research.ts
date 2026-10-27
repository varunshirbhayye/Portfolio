import type { ResearchWork } from "./types";

// PGARC text as supplied by Varun (2026-10-26), split into a lead and points
// with the sentences unchanged; the MPG paper from archive/content/research.ts.
// PGARC is the M.Tech thesis, under review: no DOI until it is published.

export const research: ResearchWork[] = [
  {
    kind: "M.Tech thesis · under review",
    title: "PGARC: Auditing Persona Recoverability in Dialogue Representations",
    tagline: "Removing speaker persona from dialogue representations without losing what was said.",
    venue: "Under review at IEEE Transactions on Computational Social Systems",
    summary:
      "Dialogue representations carry more about the speaker than the task needs, and methods that suppress this report lower persona recoverability. But that number is produced jointly by the mechanism and by the protocol used to measure it, and published work rarely separates the two.",
    points: [
      "This thesis audits PGARC, a staged persona-gated adversarial pipeline, to find out which of its parts earn the reduction — using matched controls that hold the entire training chain fixed and swap one component at a time.",
      "Every figure comes from attackers trained only after the representation is frozen, never from the training-time critic. Experiments span DistilBERT, GPT-2, and BART, compared against GRL, HSIC, INLP, and LEACE across multiple seeds.",
      "Two findings shape the conclusion: a content-supervised bottleneck with no persona-specific machinery reaches a comparable operating point, and the sigmoid-gated attenuation map proves invertible at any finite gate logit, so the gate cannot erase information, only attenuate it.",
      "PGARC reduces empirical recoverability under the protocol tested — which is not a privacy guarantee.",
    ],
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "DistilBERT", "GPT-2", "BART"],
  },
  {
    kind: "First-author paper · IEEE · 2020",
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
    venue:
      "2020 International Conference on Computer Communication and Informatics (ICCCI), Coimbatore, India. IEEE, pp. 1–5.",
    year: "2020",
    summary:
      "Predicts vehicle fuel efficiency from the UCI Auto-MPG dataset with linear regression, using feature engineering, cross-validation and residual analysis to identify the attributes that drive MPG.",
    metrics: [{ value: "0.82", label: "R² score" }],
    stack: ["Python", "scikit-learn", "Pandas"],
    doi: "10.1109/ICCCI48352.2020.9104138",
  },
];
