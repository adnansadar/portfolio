/**
 * Design System
 * Single import point for the entire design system
 */

// ============================================
// TOKENS
// ============================================

export { colors, typography, borderRadius } from "./tokens";

// ============================================
// ANIMATIONS
// ============================================

export {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  slideInUp,
  slideInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  scaleOut,
  scaleOnHover,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  hoverLift,
  hoverScale,
  tapScale,
  pageTransition,
  animations,
} from "./animations";

// ============================================
// COMPONENT STYLES
// ============================================

// Re-export cn from lib/utils (shadcn/ui standard location)
export { cn } from "@/lib/utils";

// Export custom typography and layout utilities
export { typographyStyles, layoutStyles } from "./component-styles";
