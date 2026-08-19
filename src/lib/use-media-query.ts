"use client";

import * as React from "react";

/**
 * Subscribes to a media query and re-renders when it flips.
 *
 * Always returns `false` on the server and on the first client render, so the
 * markup React hydrates against is identical either way; the real value lands
 * in the effect on the tick after. Phrase the query so that `false` is the safe
 * fallback — `(prefers-reduced-motion: no-preference)` rather than its inverse,
 * so a no-JS visitor gets the still version rather than an animation that never
 * gets the chance to opt out.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
