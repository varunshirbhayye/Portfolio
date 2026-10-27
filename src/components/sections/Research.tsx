import { research } from "@/content/research";
import { PlusList, SlashList } from "../ui/Lists";
import { Metrics, OutLink } from "../ui/Panel";

/** Research: the thesis under review and the published paper, as blocks. */
export function Research() {
  return (
    <section id="research" aria-labelledby="research-heading" className="page">
      <div className="page__inner">
        <h2 id="research-heading" className="page__title" data-reveal>
          Research <em>work.</em>
        </h2>

        <ol className="page__list">
          {research.map((r) => (
            <li key={r.title} className="panel" data-reveal>
              <p className="panel__kicker">{r.kind}</p>
              <h3 className="panel__title panel__title--long">{r.title}</h3>
              {r.tagline ? <p className="panel__sub">{r.tagline}</p> : null}
              {r.authors ? (
                <p className="panel__authors">
                  {r.authors.map((a, i) => (
                    <span key={a}>
                      {a === r.self ? <strong>{a}</strong> : a}
                      {i < r.authors!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
              <p className="panel__venue">{r.venue}</p>
              <div className="panel__body">
                <div>
                  <p className="panel__text">{r.summary}</p>
                  {r.points?.length ? <PlusList items={r.points} className="plus-list--rows panel__points" /> : null}
                </div>
                {r.metrics?.length ? <Metrics items={r.metrics} /> : null}
              </div>
              <div className="panel__foot">
                {r.stack?.length ? (
                  <div>
                    <p className="label">built with</p>
                    <SlashList items={r.stack} label={`${r.title}: technologies`} />
                  </div>
                ) : null}
                {r.doi ? (
                  <div className="panel__doi">
                    <OutLink href={`https://doi.org/${r.doi}`}>Read on IEEE Xplore</OutLink>
                    <p className="panel__doi-id">doi:{r.doi}</p>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
