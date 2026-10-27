import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { Scene } from "../scene/Scene";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { PaperButton } from "../ui/PaperButton";

/** First screen: who I am, over the night-desk scene. */
export function About() {
  // The address itself is spelled out in the contact section.
  const links = [
    { href: profile.github, label: "GitHub", caption: "See my code", Icon: GitHubIcon },
    { href: profile.linkedin, label: "LinkedIn", caption: "Let's connect", Icon: LinkedInIcon },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="hero">
      <Scene />
      <div className="hero__content">
        <h1 id="about-heading" className="hero__name">
          {profile.name}
        </h1>
        <p className="hero__lead">{profile.lead}</p>
        <p className="hero__intro">{profile.intro}</p>
        <ul className="hero__links" aria-label="Profiles">
          {links.map(({ href, label, caption, Icon }) => (
            <li key={label}>
              <PaperButton href={href} variant="ghost" external className="social-btn">
                <span className="social-btn__icon">
                  <Icon />
                </span>
                <span className="social-btn__text">
                  <span className="social-btn__name">{label}</span>
                  <span className="social-btn__caption">{caption}</span>
                </span>
                <ArrowUpRight className="social-btn__arrow" size={18} aria-hidden="true" />
              </PaperButton>
            </li>
          ))}
        </ul>
      </div>
      <a href="#experience" className="hero__scroll">
        scroll
      </a>
    </section>
  );
}
