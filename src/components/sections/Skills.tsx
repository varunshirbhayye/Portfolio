import Image from "next/image";
import type { CSSProperties } from "react";
import { skillRows } from "@/content/skills";
import { asset } from "@/lib/site";
import { FlipDeck } from "../ui/FlipDeck";

/** Most cards in a row on phones; longer rows split. */
const PHONE_WIDEST = 4;

/** Splits a row of `n` cards into near-equal rows of at most `max`, shorter first. */
function splitRow(n: number, max: number) {
  const parts = Math.ceil(n / max);
  return Array.from({ length: parts }, (_, j) => Math.floor(n / parts) + (j >= parts - (n % parts) ? 1 : 0));
}

/**
 * Grid cell of each card, from the row lengths. The grid has two columns per
 * card of the widest row, so a shorter row starts half a card in and sits centred.
 */
function placeCards(rows: number[]) {
  const widest = Math.max(...rows);
  const cells = rows.flatMap((size, row) =>
    Array.from({ length: size }, (_, i) => ({ row: row + 1, col: widest - size + 2 * i + 1 })),
  );
  return { widest, cells };
}

/** Skills as a pyramid of flip cards: the logo on the front, the name behind. */
export function Skills() {
  const skills = skillRows.flat();
  const wide = placeCards(skillRows.map((r) => r.length));
  const phone = placeCards(skillRows.flatMap((r) => splitRow(r.length, PHONE_WIDEST)));

  return (
    <section id="skills" aria-labelledby="skills-heading" className="page">
      <div className="page__inner">
        <h2 id="skills-heading" className="page__title" data-reveal>
          Technical <em>skills.</em>
        </h2>
        <p className="skills__hint">
          <span className="skills__hint--hover">Hover over a logo to see its name.</span>
          <span className="skills__hint--touch">Tap a logo to see its name.</span>
        </p>

        <FlipDeck
          className="pyramid"
          labelledBy="skills-heading"
          style={{ "--cols": wide.widest * 2, "--cols-sm": phone.widest * 2 } as CSSProperties}
        >
          {skills.map((s, i) => (
            <li
              key={s.name}
              className="skill"
              style={
                {
                  "--i": i,
                  "--row": wide.cells[i].row,
                  "--col": wide.cells[i].col,
                  "--row-sm": phone.cells[i].row,
                  "--col-sm": phone.cells[i].col,
                } as CSSProperties
              }
            >
              <div className="skill__card">
                <span className="skill__face skill__front">
                  <Image src={asset(s.logo)} alt="" width={64} height={64} />
                </span>
                <span className="skill__face skill__back">{s.name}</span>
              </div>
            </li>
          ))}
        </FlipDeck>
      </div>
    </section>
  );
}
