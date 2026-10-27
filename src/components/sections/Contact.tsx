import { profile } from "@/content/profile";
import { asset } from "@/lib/site";
import { PaperButton } from "../ui/PaperButton";

/** Closing block: the email address, the resume and profile links. */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="page">
      <div className="page__inner contact" data-reveal>
        <h2 id="contact-heading" className="page__title">
          Let&apos;s <em>talk.</em>
        </h2>
        <p className="contact__lead">
          Questions about my work, or an opportunity to discuss? Email is the quickest way to reach me.
        </p>
        {/* On narrow screens the address breaks after the @, not mid-word. */}
        <a href={`mailto:${profile.email}`} className="contact__email">
          {profile.email.split("@")[0]}@<wbr />
          {profile.email.split("@")[1]}
        </a>
        <div className="contact__actions">
          <PaperButton href={asset(profile.resume.href)} download={profile.resume.fileName}>
            Download resume
          </PaperButton>
          <PaperButton href={profile.github} variant="ghost" external>
            GitHub
          </PaperButton>
          <PaperButton href={profile.linkedin} variant="ghost" external>
            LinkedIn
          </PaperButton>
        </div>
      </div>
    </section>
  );
}
