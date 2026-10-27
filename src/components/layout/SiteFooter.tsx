import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";
import { CurrentYear } from "./CurrentYear";

// Profile links live in the contact block just above, so the footer only
// signs off and offers a way back up.
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__meta">
          © <CurrentYear fallback={new Date().getFullYear()} /> {profile.name} · {profile.descriptor}
        </p>
        <a href="#main" className="footer__meta footer__link footer__top">
          Back to top
          <ArrowUp className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
