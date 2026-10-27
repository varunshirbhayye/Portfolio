import { projects } from "@/content/projects";
import { SlashList } from "../ui/Lists";
import { Metrics, OutLink } from "../ui/Panel";

/** Projects, as blocks like the internship. */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="page">
      <div className="page__inner">
        <h2 id="projects-heading" className="page__title" data-reveal>
          Selected <em>projects.</em>
        </h2>

        <ol className="page__list">
          {projects.map((p) => (
            <li key={p.title} className="panel" data-reveal>
              <p className="panel__kicker">{[p.category, p.context].filter(Boolean).join(" · ")}</p>
              <h3 className="panel__title">{p.title}</h3>
              {p.tagline ? <p className="panel__sub">{p.tagline}</p> : null}
              <div className="panel__body">
                <p className="panel__text">{p.summary}</p>
                {p.metrics?.length ? <Metrics items={p.metrics} /> : null}
              </div>
              <div className="panel__foot">
                <div>
                  <p className="label">built with</p>
                  <SlashList items={p.stack} label={`${p.title} technologies`} />
                </div>
                {p.links.repo ? (
                  <OutLink href={p.links.repo}>
                    Source code on GitHub<span className="sr-only">: {p.title}</span>
                  </OutLink>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
