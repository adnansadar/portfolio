"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The initial render is the *final* number, so server HTML, no-JS visitors and
 * screen readers all see "10,000" rather than "0" — the zeroing happens in a
 * layout effect, before the browser paints, so there is no flash.
 */
export function CountUp({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !ref.current) return;
    ref.current.textContent = "0";
  }, [reduced]);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !inView) return;

    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = format(v);
      },
      onComplete: () => {
        node.textContent = format(value);
      },
    });

    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
