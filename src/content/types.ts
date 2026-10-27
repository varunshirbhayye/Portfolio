// Shared shapes for everything under src/content. Components only read these
// types, so updating the site means editing data files, not UI code.

export interface Profile {
  name: string;
  /** Short affiliation line shown above the name on the link-preview image. */
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
}

export interface NavItem {
  id: string;
  label: string;
}

export interface EducationEntry {
  /** Stage of study, e.g. "Post Graduation"; tagged on the photo. */
  level: string;
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  grade?: string;
  /** College logo, a path under public/. Until the file exists a placeholder is shown. */
  logo?: { src: string; alt: string; width: number; height: number };
}

export interface ExperienceEntry {
  organization: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
  stack: string[];
  /** Company logo, a path under public/. */
  logo?: { src: string; alt: string; width: number; height: number };
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  title: string;
  category: string;
  context?: string;
  tagline?: string;
  summary: string;
  metrics?: Metric[];
  stack: string[];
  links: { repo?: string };
}

/** A contest result, shown as a card. */
export interface Achievement {
  /** Line above the result, e.g. "Machine learning". */
  kind: string;
  /** The result itself, set large: "Top 4 globally". */
  result: string;
  event: string;
  detail?: string;
}

/** A card in the skills pyramid: the logo on the front, the name on the back. */
export interface Skill {
  name: string;
  /** Logo, a path under public/. */
  logo: string;
}

/** A research block: a published paper, or the thesis while it is under review. */
export interface ResearchWork {
  /** Line above the title, e.g. "First-author paper · IEEE · 2020". */
  kind: string;
  title: string;
  tagline?: string;
  /** Rendered with `self` in bold. Omitted for the thesis. */
  authors?: string[];
  self?: string;
  /** Citation line, or where the thesis is under review. */
  venue: string;
  year?: string;
  summary: string;
  points?: string[];
  metrics?: Metric[];
  stack?: string[];
  doi?: string;
}
