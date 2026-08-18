"use client";

import * as React from "react";

const PULL_X = 0.22;
const PULL_Y = 0.32;

/**
 * Nudges an element toward the cursor while the pointer is over it, then lets
 * it snap back. Mutates `style.transform` directly rather than going through
 * state — this fires on every mousemove.
 *
 * A no-op on touch devices and under prefers-reduced-motion; the returned
 * handlers are still safe to spread in either case.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const evaluate = () => setEnabled(!reduced.matches && finePointer.matches);
    evaluate();

    reduced.addEventListener("change", evaluate);
    finePointer.addEventListener("change", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      finePointer.removeEventListener("change", evaluate);
    };
  }, []);

  const onMouseMove = React.useCallback(
    (event: React.MouseEvent<T>) => {
      if (!enabled) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) * PULL_X;
      const dy = (event.clientY - rect.top - rect.height / 2) * PULL_Y;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [enabled]
  );

  const onMouseLeave = React.useCallback((event: React.MouseEvent<T>) => {
    event.currentTarget.style.transform = "translate(0, 0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
