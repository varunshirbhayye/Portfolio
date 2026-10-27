import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { education, experience } from "@/content/background";
import { asset } from "@/lib/site";
import { PlusList, SlashList } from "../ui/Lists";

// Checked at build time (and on each request in dev), so a logo appears as
// soon as its file is added to public/.
const hasPublicFile = (src: string) => existsSync(join(process.cwd(), "public", src));

/** The internship, then a card per school. */
export function Background() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="page">
      <div className="page__inner">
        <h2 id="experience-heading" className="page__title" data-reveal>
          Experience &amp; <em>education.</em>
        </h2>

        <div className="page__block">
          <h3 className="sub-label">Internship</h3>
          <ol className="space-y-6">
            {experience.map((job) => (
              <li key={job.organization} className="panel" data-reveal>
                <p className="panel__kicker">
                  {job.start} – {job.end} · {job.location}
                </p>
                <h4 className="panel__title">{job.role}</h4>
                <p className="panel__sub">{job.organization}</p>
                <div className="panel__body panel__body--list">
                  <PlusList items={job.highlights} className="plus-list--rows" />
                  {job.logo ? (
                    <div className="job__logo">
                      <Image src={asset(job.logo.src)} alt={job.logo.alt} width={job.logo.width} height={job.logo.height} />
                    </div>
                  ) : null}
                </div>
                <div className="panel__foot">
                  <div>
                    <p className="label">built with</p>
                    <SlashList items={job.stack} label={`Technologies used at ${job.organization}`} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="page__block">
          <h3 className="sub-label">Education</h3>
          <ol className="schools">
            {education.map((ed) => (
              <li key={ed.institution} className="school" data-reveal>
                <p className="school__level">{ed.level}</p>
                <div className="school__logo">
                  {ed.logo && hasPublicFile(ed.logo.src) ? (
                    <Image src={asset(ed.logo.src)} alt={ed.logo.alt} width={ed.logo.width} height={ed.logo.height} />
                  ) : (
                    <span className="school__placeholder" aria-hidden="true">
                      Logo
                    </span>
                  )}
                </div>
                <div className="school__text">
                  <p className="panel__kicker">
                    {ed.start} – {ed.end}
                  </p>
                  <h4 className="school__name">{ed.institution}</h4>
                  <p className="school__degree">{ed.degree}</p>
                  <p className="school__field">{ed.field}</p>
                  {ed.grade ? <p className="school__grade">{ed.grade}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
