/**
 * Design System Component Styles
 * Typography and layout utilities for consistent styling
 */

// ============================================
// TYPOGRAPHY STYLES
// ============================================

export const typographyStyles = {
  h1: "text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight",
  h2: "text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight",
  h3: "text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight",
  h4: "text-2xl md:text-3xl font-semibold text-foreground",
  h5: "text-xl md:text-2xl font-semibold text-foreground",
  h6: "text-lg md:text-xl font-semibold text-foreground",
  body: "text-base text-muted-foreground leading-relaxed",
  bodyLarge: "text-lg text-muted-foreground leading-relaxed",
  bodySmall: "text-sm text-muted-foreground leading-relaxed",
  muted: "text-sm text-muted-foreground",
};

// ============================================
// LAYOUT STYLES
// ============================================

export const layoutStyles = {
  section: "py-20 md:py-24 lg:py-32",
  container: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
  gridCols2: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8",
  gridCols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
  gridCols4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8",
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
};
