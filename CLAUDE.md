# Claude Code Guidelines for Portfolio Project

## Development Workflow

### Code Formatting

After making any code changes, always run the following commands in sequence:

1. **Build the project** to verify no errors:

   ```bash
   npm run build
   ```

2. **Format the codebase** with Prettier:
   ```bash
   npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,md}"
   ```

This ensures:

- All code changes are validated before formatting
- Consistent code style across the entire codebase
- No formatting issues in committed code

## Project Standards

### Tech Stack

- **Framework**: Next.js 16.1.2 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion

### Code Style

- Follow the Prettier configuration in `.prettierrc`
- Use the shadcn/ui design system for components
- Leverage design tokens from `src/design-system`
- Use TypeScript for all components (no `.jsx` files)

### Component Patterns

- All components should be TypeScript React components
- Use the `cn()` utility from `@/lib/utils` for conditional class names
- Import design system utilities from `@/design-system`
- Use shadcn/ui components instead of custom implementations

### Formatting Configuration

- **Semi-colons**: Required
- **Quotes**: Double quotes
- **Tab Width**: 2 spaces
- **Print Width**: 80 characters
- **Trailing Commas**: ES5 style
- **Plugins**: prettier-plugin-tailwindcss (for class sorting)
