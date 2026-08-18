import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect in the browser, useEffect on the server — the usual dodge
 * around React's SSR warning.
 *
 * Used where a component renders its *finished* state for the server HTML and
 * then rewinds to the animation's start position. Doing that before paint is
 * what stops the finished state flashing on screen for a frame.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
