import type { Transition, Variants } from "motion/react";

/**
 * The single easing curve the mockup uses everywhere. Keeping one curve is what
 * makes the page feel like one system rather than a pile of animations.
 */
export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const revealTransition = (duration: number, delay: number): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/**
 * Ports of the mockup's CSS keyframes. It drove these with
 * `animation-timeline: view()`, which only Chromium ships — running them
 * through Motion instead gets Safari and Firefox the same reveals.
 *
 * clipPath keyframes are written in matching `inset(a b c d)` form on both
 * ends; Motion cannot interpolate between mismatched shorthand forms and will
 * hard-cut if you write `inset(0)` against `inset(24% 0 0 0)`.
 */
export const revealVariants = {
  /** rvl — the workhorse fade-and-rise. */
  rvl: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  /** rvlL — slides in from the left, used on the article rows. */
  rvlL: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  /** wipeUp — uncovers a section from the bottom. */
  wipeUp: {
    hidden: { opacity: 0.3, clipPath: "inset(24% 0% 0% 0%)" },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  },
  /** splitIn — opens from the centre outwards. */
  splitIn: {
    hidden: { opacity: 0.35, clipPath: "inset(0% 16% 0% 16%)" },
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  },
  /** tiltIn — a slight 3D lean; needs perspective on the parent. */
  tiltIn: {
    hidden: { opacity: 0.3, rotateX: 7, y: 34 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  /** lineDraw — the hairline rules beside a section marker. */
  lineDraw: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  },
  /** markIn — the mono section marker letter-spacing in. */
  markIn: {
    hidden: { opacity: 0, letterSpacing: "0.5em" },
    visible: { opacity: 1, letterSpacing: "0.09em" },
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof revealVariants;

/** Default durations per variant, matching the mockup's timings. */
export const revealDurations: Record<RevealVariant, number> = {
  rvl: 0.8,
  rvlL: 0.7,
  wipeUp: 1.1,
  splitIn: 1.1,
  tiltIn: 1.1,
  lineDraw: 1,
  markIn: 1,
};

export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Looser threshold for full-height sections that never hit 20% at once. */
export const VIEWPORT_LOOSE = { once: true, amount: 0.05 } as const;

export const STAGGER_STEP = 0.08;
