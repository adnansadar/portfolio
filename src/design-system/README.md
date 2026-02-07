# Design System

A complete, type-safe design system for the Next.js portfolio with a minimalist monochrome aesthetic.

## Philosophy

This design system is built on three core principles:

1. **Monochrome First**: Pure black and white with grayscale tones create a timeless, professional aesthetic
2. **Minimalism**: Every element serves a purpose, no unnecessary decoration
3. **Typography-Focused**: Content and hierarchy matter more than color

## Installation

Import from the design system:

```typescript
import { getButtonClasses, fadeInUp, colors } from "@/design-system";
```

## Design Tokens

### Colors

All colors use HSL format for easy manipulation.

**Light Mode:**

- Backgrounds: White (#FFFFFF), Off-white (#F8F9FA), Light gray (#F1F3F5)
- Text: Near-black (#1A1A1A), Dark gray (#4A4A4A), Medium gray (#737373)
- Accent: Pure black (#000000)

**Dark Mode:**

- Backgrounds: Near-black (#0A0A0A), Dark gray (#1A1A1A), Medium gray (#2A2A2A)
- Text: White (#FFFFFF), Light gray (#E0E0E0), Medium gray (#A0A0A0)
- Accent: Pure white (#FFFFFF)

### Typography

**Font Family:** Inter (weights 300, 400, 500, 600, 700)

**Font Sizes:**

- `xs`: 12px / 16px line height
- `sm`: 14px / 20px
- `base`: 16px / 24px
- `lg`: 18px / 28px
- `xl`: 20px / 28px
- `2xl` - `8xl`: 24px - 96px

### Spacing

Based on 4px unit system:

- `0.5`: 2px
- `1`: 4px
- `2`: 8px
- `4`: 16px
- `8`: 32px
- `16`: 64px
- `24`: 96px

### Shadows

Five levels (sm, base, md, lg, xl, 2xl) with separate light/dark mode definitions.

### Border Radius

- `sharp`: 0px
- `subtle`: 4px
- `rounded`: 8px
- `more`: 12px
- `large`: 16px
- `full`: 9999px

### Transitions

**Durations:** fast (150ms), base (200ms), slow (300ms), slower (500ms)
**Timing:** Cubic bezier easing for smooth animations

## Component Styles

### Buttons

```typescript
import { getButtonClasses } from '@/design-system';

// Primary button (default)
<button className={getButtonClasses('primary', 'md')}>
  Click Me
</button>

// Secondary button
<button className={getButtonClasses('secondary', 'lg')}>
  Secondary Action
</button>

// Ghost button
<button className={getButtonClasses('ghost', 'sm')}>
  Subtle Action
</button>
```

**Variants:** primary, secondary, ghost
**Sizes:** sm, md, lg

### Cards

```typescript
import { getCardClasses } from '@/design-system';

// Default card
<div className={getCardClasses('default')}>
  <p>Card content</p>
</div>

// Interactive card with hover effect
<div className={getCardClasses('interactive')}>
  <p>Clickable card</p>
</div>

// Bordered card
<div className={getCardClasses('bordered')}>
  <p>Subtle border</p>
</div>
```

**Variants:** default, interactive, bordered

### Inputs

```typescript
import { getInputClasses } from '@/design-system';

// Text input
<input
  type="text"
  className={getInputClasses('text')}
  placeholder="Enter text"
/>

// Textarea
<textarea
  className={getInputClasses('textarea')}
  placeholder="Enter message"
/>

// Select
<select className={getInputClasses('select')}>
  <option>Option 1</option>
</select>
```

**Variants:** text, textarea, select

### Badges

```typescript
import { getBadgeClasses } from '@/design-system';

// Default badge
<span className={getBadgeClasses('default')}>React</span>

// Outlined badge
<span className={getBadgeClasses('outlined')}>TypeScript</span>
```

**Variants:** default, outlined

### Typography

```typescript
import { typographyStyles } from '@/design-system';

<h1 className={typographyStyles.h1}>Main Heading</h1>
<h2 className={typographyStyles.h2}>Subheading</h2>
<p className={typographyStyles.body}>Body text</p>
<p className={typographyStyles.muted}>Muted text</p>
```

**Styles:** h1-h6, body, bodyLarge, bodySmall, muted

### Layout

```typescript
import { layoutStyles } from '@/design-system';

<section className={layoutStyles.section}>
  <div className={layoutStyles.container}>
    <div className={layoutStyles.gridCols3}>
      {/* Grid items */}
    </div>
  </div>
</section>
```

**Styles:** section, container, gridCols2, gridCols3, gridCols4, flexCenter, flexBetween

### Links

```typescript
import { getLinkClasses } from '@/design-system';

// Default link
<a href="#" className={getLinkClasses('default')}>Link</a>

// Navigation link
<a href="#" className={getLinkClasses('nav')}>Nav Link</a>

// Accent link
<a href="#" className={getLinkClasses('accent')}>Accent Link</a>
```

**Variants:** default, nav, accent

## Animations

All animations use Framer Motion. Import variants and apply to motion components.

### Fade Animations

```typescript
import { fadeInUp } from '@/design-system';
import { motion } from 'framer-motion';

<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content fades in from below
</motion.div>
```

**Variants:** fadeIn, fadeOut, fadeInUp, fadeInDown, fadeInLeft, fadeInRight

### Slide Animations

```typescript
import { slideInUp } from '@/design-system';

<motion.div
  variants={slideInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  Slides in from below
</motion.div>
```

**Variants:** slideInUp, slideInDown, slideInLeft, slideInRight

### Scale Animations

```typescript
import { scaleIn } from '@/design-system';

<motion.div
  variants={scaleIn}
  initial="hidden"
  animate="visible"
>
  Scales in from center
</motion.div>
```

**Variants:** scaleIn, scaleOut, scaleOnHover

### Stagger Container

```typescript
import { staggerContainer, fadeInUp } from '@/design-system';

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
  <motion.div variants={fadeInUp}>Item 3</motion.div>
</motion.div>
```

**Variants:** staggerContainer (0.1s), staggerContainerFast (0.05s), staggerContainerSlow (0.15s)

### Interaction Animations

```typescript
import { hoverLift } from '@/design-system';

<motion.div
  variants={hoverLift}
  initial="rest"
  whileHover="hover"
>
  Lifts on hover
</motion.div>
```

**Variants:** hoverLift, hoverScale, tapScale

### Page Transitions

```typescript
import { pageTransition } from '@/design-system';

<motion.div
  variants={pageTransition}
  initial="initial"
  animate="enter"
  exit="exit"
>
  Page content
</motion.div>
```

## Utility Functions

### cn (Class Name Combiner)

```typescript
import { cn } from "@/design-system";

const classes = cn(
  "base-class",
  isActive && "active-class",
  isPrimary ? "primary" : "secondary"
);
```

Filters out falsy values and combines class names.

## Complete Examples

### Button with Animation

```typescript
import { getButtonClasses, fadeInUp } from '@/design-system';
import { motion } from 'framer-motion';

<motion.button
  className={getButtonClasses('primary', 'lg')}
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  Get Started
</motion.button>
```

### Interactive Card with Stagger

```typescript
import { getCardClasses, staggerContainer, fadeInUp } from '@/design-system';
import { motion } from 'framer-motion';

<motion.div
  className={layoutStyles.gridCols3}
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      className={getCardClasses('interactive')}
      variants={fadeInUp}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </motion.div>
  ))}
</motion.div>
```

## Best Practices

1. **Use Design System First**: Always check if a component style exists before creating custom classes
2. **Combine with Tailwind**: Design system classes work alongside Tailwind utilities
3. **Type Safety**: Use TypeScript types for variants (ButtonVariant, CardVariant, etc.)
4. **Accessibility**: All components include focus states and keyboard navigation support
5. **Performance**: Use `viewport={{ once: true }}` for scroll animations to prevent re-triggering
6. **Dark Mode**: All colors automatically switch via CSS variables and theme toggle

## Customization

### Extending Colors

Add new colors to `tokens.ts`:

```typescript
export const colors = {
  light: {
    // ... existing colors
    custom: { h: 0, s: 0, l: 50 },
  },
};
```

Then add CSS variable in `globals.css`:

```css
:root {
  --ds-custom: 0 0% 50%;
}
```

### Creating New Component Styles

```typescript
export const getMyComponentClasses = (variant: string): string => {
  const baseClasses = "...";
  const variantClasses = { ... };
  return cn(baseClasses, variantClasses[variant]);
};
```

### Adding New Animations

```typescript
export const myAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
```

## Tailwind Integration

All design tokens are available as Tailwind utilities:

- **Colors**: `bg-ds-bg-primary`, `text-ds-text-secondary`, etc.
- **Border Radius**: `rounded-sharp`, `rounded-subtle`, `rounded-large`
- **Animations**: `animate-fade-in`, `animate-slide-in-up`

Use in className strings:

```typescript
<div className="bg-ds-bg-primary text-ds-text-primary rounded-subtle p-4">
  Content
</div>
```
