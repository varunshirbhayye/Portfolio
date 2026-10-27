import { achievements } from "@/content/achievements";

/** Contest results, as a row of small cards. */
export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="page">
      <div className="page__inner">
        <h2 id="achievements-heading" className="page__title" data-reveal>
          Notable <em>achievements.</em>
        </h2>

        <ul className="awards">
          {achievements.map((a) => (
            <li key={a.event} className="award" data-reveal>
              <p className="panel__kicker">{a.kind}</p>
              <p className="award__result">{a.result}</p>
              <p className="award__event">{a.event}</p>
              {a.detail ? <p className="award__detail">{a.detail}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
