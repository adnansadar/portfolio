/**
 * Design System Animations
 * Centralized Framer Motion animation variants
 */

import { Variants } from "framer-motion";

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInUp: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const slideInDown: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const scaleOut: Variants = {
  visible: { scale: 1, opacity: 1 },
  hidden: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export const scaleOnHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// ============================================
// CONTAINER ANIMATIONS (for stagger effects)
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// INTERACTION ANIMATIONS
// ============================================

export const hoverLift: Variants = {
  rest: { y: 0 },
  hover: {
    y: -3,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const tapScale: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

// ============================================
// PAGE TRANSITION ANIMATIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ============================================
// GROUPED EXPORTS
// ============================================

export const animations = {
  fade: {
    in: fadeIn,
    out: fadeOut,
    inUp: fadeInUp,
    inDown: fadeInDown,
    inLeft: fadeInLeft,
    inRight: fadeInRight,
  },
  slide: {
    inUp: slideInUp,
    inDown: slideInDown,
    inLeft: slideInLeft,
    inRight: slideInRight,
  },
  scale: {
    in: scaleIn,
    out: scaleOut,
    onHover: scaleOnHover,
  },
  container: {
    stagger: staggerContainer,
    staggerFast: staggerContainerFast,
    staggerSlow: staggerContainerSlow,
  },
  interaction: {
    hoverLift,
    hoverScale,
    tapScale,
  },
  page: pageTransition,
};
