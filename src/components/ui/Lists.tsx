export function PlusList({ items, label, className = "" }: { items: string[]; label?: string; className?: string }) {
  return (
    <ul aria-label={label} className={`plus-list ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Inline list separated by amber slashes, the page's eyebrow motif. */
export function SlashList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="slash-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
