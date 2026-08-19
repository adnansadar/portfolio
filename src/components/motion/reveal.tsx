"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import {
  revealDurations,
  revealTransition,
  revealVariants,
  VIEWPORT,
  type RevealVariant,
} from "@/lib/motion";
import { useInStagger } from "@/components/motion/stagger-context";

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  span: motion.span,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export type RevealTag = keyof typeof TAGS;

/**
 * Based on motion's own prop type rather than React.ComponentProps<"div">:
 * motion redefines onDrag/onAnimationStart/style, and mixing the two produces
 * an unassignable union.
 */
type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "whileInView" | "transition"
> & {
  as?: RevealTag;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
};

/**
 * One component covering every reveal in the design. The mockup expressed
 * these as CSS keyframes on a `view()` scroll timeline; here they are Motion
 * variants so every browser gets them.
 */
export function Reveal({
  as = "div",
  variant = "rvl",
  delay = 0,
  duration,
  amount,
  children,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();
  const inStagger = useInStagger();

  const Comp = TAGS[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as React.ElementType;
    return (
      <Plain {...(props as React.ComponentProps<"div">)}>{children}</Plain>
    );
  }

  const transition = revealTransition(
    duration ?? revealDurations[variant],
    inStagger ? 0 : delay
  );

  // Inside a <Stagger>, the parent drives hidden -> visible and the delay comes
  // from staggerChildren, so this must not declare its own viewport trigger.
  const trigger = inStagger
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: amount === undefined ? VIEWPORT : { ...VIEWPORT, amount },
      };

  return (
    <Comp
      // Motion serialises the `hidden` styles into the server HTML, which would
      // leave the page invisible if JS never runs. layout.tsx carries a
      // <noscript> rule keyed on this attribute that resets them.
      data-reveal={variant}
      {...trigger}
      variants={revealVariants[variant]}
      transition={transition}
      {...props}
    >
      {children}
    </Comp>
  );
}
