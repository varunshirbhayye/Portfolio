import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Metric } from "@/content/types";

/** Key numbers, set large on the right of a block. */
export function Metrics({ items }: { items: Metric[] }) {
  return (
    <dl className="panel__metrics">
      {items.map((m) => (
        <div key={m.label}>
          <dt>{m.label}</dt>
          <dd>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Underlined external link with an arrow; opens in a new tab. */
export function OutLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="panel__link">
      {children}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  );
}
