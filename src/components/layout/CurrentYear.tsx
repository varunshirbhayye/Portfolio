"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Shows the visitor's current year; `fallback` is the build-time year used in static HTML. */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => fallback);
  return <>{year}</>;
}
