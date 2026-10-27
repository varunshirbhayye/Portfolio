import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Background } from "@/components/sections/Background";
import { Contact } from "@/components/sections/Contact";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { achievements } from "@/content/achievements";
import { education } from "@/content/background";
import { profile } from "@/content/profile";
import { research } from "@/content/research";
import { skillRows } from "@/content/skills";
import { absoluteUrl } from "@/lib/site";

// Schema.org Person data, limited to facts shown on the page.
function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    ...(absoluteUrl() ? { url: absoluteUrl() } : {}),
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin],
    affiliation: { "@type": "CollegeOrUniversity", name: education[0].institution },
    alumniOf: { "@type": "CollegeOrUniversity", name: education[1].institution },
    knowsAbout: skillRows.flat().map((s) => s.name),
    award: achievements.map((a) => `${a.result}, ${a.event}`),
    // Published work only; the thesis is still under review.
    subjectOf: research
      .filter((r) => r.doi)
      .map((r) => ({
        "@type": "ScholarlyArticle",
        headline: r.title,
        datePublished: r.year,
        url: `https://doi.org/${r.doi}`,
      })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <About />
      <Background />
      <Research />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </>
  );
}
