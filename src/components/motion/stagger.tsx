"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { STAGGER_STEP, VIEWPORT } from "@/lib/motion";
import { StaggerContext } from "@/components/motion/stagger-context";
import type { RevealTag } from "@/components/motion/reveal";

const TAGS = {
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
} as const;

type StaggerProps = Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "whileInView"
> & {
  as?: Extract<RevealTag, "div" | "section" | "ul">;
  step?: number;
  delay?: number;
  amount?: number;
};

/**
 * Drives a group of <Reveal> children one after another. Replaces the mockup's
 * hand-tuned `.08s / .16s / .24s` animation-delay chains.
 */
export function Stagger({
  as = "div",
  step = STAGGER_STEP,
  delay = 0,
  amount,
  children,
  ...props
}: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as as React.ElementType;
    return (
      <Plain {...(props as React.ComponentProps<"div">)}>{children}</Plain>
    );
  }

  const Comp = TAGS[as] as typeof motion.div;

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? VIEWPORT : { ...VIEWPORT, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...props}
    >
      <StaggerContext value>{children as React.ReactNode}</StaggerContext>
    </Comp>
  );
}
