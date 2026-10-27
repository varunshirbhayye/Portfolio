// Shared shapes for everything under src/content. Components only read these
// types, so updating the site means editing data files, not UI code.

export interface Profile {
  name: string;
  initials: string;
  /** Short affiliation line shown above the name. */
  affiliation: string;
  /** One-sentence positioning statement under the name. */
  lead: string;
  intro: string;
  /** Plain-text descriptor reused in the footer, metadata and OG image. */
  descriptor: string;
  email: string;
  github: string;
  linkedin: string;
  resume: {
    href: string;
    fileName: string;
  };
  now: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface EducationEntry {
  institution: string;
  shortName: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  expected?: boolean;
  grade?: string;
  notes?: { label: string; text: string; href?: string }[];
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
  stack: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface PipelineStep {
  title: string;
  detail?: string;
}

/** A sequential stage, or several stages that run side by side. */
export type PipelineStage = PipelineStep | { parallel: PipelineStep[] };

export interface BarDatum {
  label: string;
  value: number;
}

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "pipeline"; caption: string; stages: PipelineStage[] }
  | {
      type: "bars";
      caption: string;
      unit: string;
      max: number;
      reference?: { value: number; label: string };
      data: BarDatum[];
      note?: string;
    }
  | {
      type: "table";
      caption: string;
      columns: string[];
      rows: string[][];
      /** Index of a row to emphasise, e.g. a mean or baseline. */
      emphasisRow?: number;
      note?: string;
    }
  | { type: "definitions"; items: { term: string; description: string }[] }
  | { type: "callout"; title: string; text: string }
  | { type: "references"; items: { text: string; href?: string }[] };

export interface DetailSection {
  id: string;
  heading: string;
  blocks: Block[];
}

export interface Project {
  slug: string;
  title: string;
  /** Expanded name when the title is an acronym. */
  fullTitle?: string;
  tagline: string;
  category: string;
  context?: string;
  status?: "ongoing";
  summary: string;
  metrics?: Metric[];
  stack: string[];
  links: { repo?: string; paper?: string };
  /** Projects with a detail page get a case-study route under /projects. */
  detail?: DetailSection[];
}

export interface RepoSummary {
  name: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
}

export interface ResearchThread {
  title: string;
  description: string;
  project: { label: string; href: string };
}

export interface Publication {
  title: string;
  authors: string[];
  /** Must match an entry in `authors`; rendered in bold. */
  self: string;
  venue: string;
  location: string;
  year: string;
  pages: string;
  doi: string;
  publisher: string;
  summary: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  headline: string;
  event: string;
  detail?: string;
  href?: string;
}
