/**
 * An in-body screenshot. Mirrors `Shot` in case-studies.ts — the intrinsic size
 * drives the frame's aspect ratio so nothing is ever cropped — but the caption
 * is optional and there is no browser chrome; that treatment is reserved for
 * shipped-product shots on the case studies.
 */
export type Figure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

/**
 * A run of body text.
 *
 * Runs rather than a markup string: the writing is about CSS class names, so
 * backticks and asterisks appear in the prose itself and any inline syntax
 * would need escaping. These three are the only treatments the posts use.
 */
export type Inline =
  | string
  | { code: string }
  | { strong: string }
  | { em: string };

/** Body text — a plain string, or runs when it carries inline treatment. */
export type Rich = string | Inline[];

/** One item of post body copy. Rendered by the switch in article-body.tsx. */
export type ArticleBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: Rich }
  | { kind: "list"; items: Rich[] }
  | { kind: "code"; code: string }
  | { kind: "rule" }
  | { kind: "figure"; figure: Figure };

export type Article = {
  /**
   * URL segment under /blog. A row with neither `slug` nor `href` is unwritten
   * and renders as a static "Coming soon" line rather than a dead link.
   */
  slug?: string;
  /** Display date. Fixed two-part shape so the rows' 92px column stays aligned. */
  date: string;
  /** ISO, for <time datetime> and og:article:published_time. */
  published: string;
  title: string;
  /** The row's trailing meta line. */
  tags: string;
  keywords: string[];
  /** Meta description, and the dek under the h1. */
  blurb: string;
  /** An external destination for a piece not mirrored here. Beats `slug`. */
  href?: string;
  cover: Figure;
  body: ArticleBlock[];
  /** Where the piece first ran, credited in the post header. */
  origin?: { label: string; href: string };
};

/* Newest first — the rows render in array order. */
export const articles: Article[] = [
  {
    slug: "how-i-built-a-claude-code-agent-to-fix-css-architecture-nigh",
    date: "2025 · 07",
    published: "2025-07-27",
    title:
      "How I Built a Claude Code Sub Agent to Fix CSS Architecture Nightmares",
    tags: "Claude Code · CSS architecture",
    keywords: [
      "Claude Code",
      "Agents",
      "Artificial Intelligence (AI)",
      "Css",
      "Bootstrap",
      "NextJS",
    ],
    blurb: "Turning a weekend debugging session into an automated solution",
    origin: {
      label: "Peerlist",
      href: "https://peerlist.io/adnansadar/articles/how-i-built-a-claude-code-agent-to-fix-css-architecture-nigh",
    },
    cover: {
      src: "/post-css-agent-cover.webp",
      width: 931,
      height: 489,
      alt: "A terminal listing four /css-architecture-fixer commands — analyze, fix, migrate-to-modules and namespace — each under a comment describing what it does.",
    },
    body: [
      { kind: "h2", text: "The Problem: CSS That Works... Until It Doesn't" },
      {
        kind: "p",
        text: "Last week, I was stressed out over a bug that made no sense. My Next.js app's styling worked perfectly on first load. But navigate to another page and come back? Total chaos.",
      },
      {
        kind: "list",
        items: [
          "Table widths would break unexpectedly",
          "Modal headers and content styling disappeared",
          "Button colors changed between page visits",
          "Everything magically fixed itself on refresh",
        ],
      },
      {
        kind: "p",
        text: "If you've worked with large codebases, you know this feeling. The CSS works, then it doesn't, then it does again. It's like playing whack-a-mole with stylesheets.",
      },

      { kind: "h2", text: "Discovering the Root Cause" },
      {
        kind: "p",
        text: [
          "After hours of debugging, I finally found the culprit: ",
          { strong: "global CSS conflicts" },
          ". Even with Claude Code and Cursor, I was going around in circles until i had to manually look for files where these conflicts were occurring and then pointing it out.",
        ],
      },
      { kind: "p", text: "The numbers were staggering:" },
      {
        kind: "list",
        items: [
          [
            { code: ".modal-content" },
            " appeared in 8+ different component files",
          ],
          [{ code: ".btn" }, " was defined in 12+ places"],
          "Same story for dozens of other common class names",
        ],
      },
      {
        kind: "p",
        text: "In a global CSS world, the last imported file wins. So depending on your navigation path and Next.js's code splitting, you'd get different styles. No wonder it felt random.",
      },

      { kind: "rule" },

      { kind: "h2", text: "Building the Solution" },
      {
        kind: "p",
        text: "Instead of manually refactoring thousands of lines of CSS over several days, I decided to spend my weekend building a Claude Code subagent to automate the entire process.",
      },
      {
        kind: "figure",
        figure: {
          src: "/post-css-agent-01.png",
          width: 997,
          height: 1325,
          alt: "The agent's markdown definition, listing its purpose against global class name collisions and Bootstrap overrides, then four numbered capabilities: CSS conflict audit, namespace generation, CSS Modules migration, and validation and reporting.",
          caption:
            "The agent definition — purpose, then one section per phase of the job.",
        },
      },
      {
        kind: "figure",
        figure: {
          src: "/post-css-agent-02.png",
          width: 1143,
          height: 1200,
          alt: "The file .claude/agents/css-architecture-fixer.js open in an editor, showing a CSSArchitectureFixer class with auditCSSConflicts, generateNamespaces, migrateToModules and validateMigration methods, each commented with its phase number.",
          caption:
            "The implementation behind it: one method per phase, collapsed to their signatures.",
        },
      },
      {
        kind: "p",
        text: "The CSS Architecture Fixer Agent works in four phases:",
      },

      { kind: "h3", text: "Phase 1: Audit & Detection" },
      {
        kind: "list",
        items: [
          "Scans the entire codebase for duplicate class names",
          "Identifies Bootstrap class overrides",
          "Maps component-to-CSS relationships",
          "Generates a conflict severity report",
        ],
      },

      { kind: "h3", text: "Phase 2: Smart Namespacing" },
      {
        kind: "list",
        items: [
          "Creates unique namespaces using three strategies:",
          ["Feature-based: ", { code: ".auth-login-button" }],
          ["Component-based: ", { code: ".login-form-button" }],
          ["BEM-like: ", { code: ".login__form--button" }],
          "Preserves Bootstrap utility classes (this was tricky!)",
          "Updates both CSS and JSX files automatically",
        ],
      },

      { kind: "h3", text: "Phase 3: CSS Modules Migration" },
      {
        kind: "list",
        items: [
          "Converts traditional CSS imports to CSS Modules",
          [
            "Transforms ",
            { code: ".btn" },
            " → ",
            { code: "styles.btn" },
            " in components",
          ],
          "Handles SCSS features like variables, mixins, and nesting",
          "Updates all import statements",
        ],
      },

      { kind: "h3", text: "Phase 4: Validation" },
      {
        kind: "list",
        items: [
          "Verifies all classes are properly scoped",
          "Ensures no visual regressions",
          "Checks that Bootstrap utilities still work",
          "Generates a migration report",
        ],
      },

      { kind: "h2", text: "Using the Agent" },
      { kind: "p", text: "The best part? It's incredibly simple to use:" },
      {
        kind: "code",
        code: `# Find all CSS conflicts in your codebase

/css-architecture-fixer analyze

# Fix conflicts for a specific component

/css-architecture-fixer fix --component components/auth/Login.jsx

# Migrate an entire feature to CSS Modules

/css-architecture-fixer migrate-to-modules --feature auth

# Apply smart namespacing across all CSS files

/css-architecture-fixer namespace --pattern feature-component`,
      },

      { kind: "rule" },

      {
        kind: "h2",
        text: "I'm still improving the agent. Some ideas I'm exploring:",
      },
      {
        kind: "list",
        items: [
          "Visual regression testing with screenshots",
          "Integration with design systems",
        ],
      },
      {
        kind: "p",
        text: [
          {
            em: "If you're interested in the implementation details or want to build something similar, feel free to reach out. Always happy to share learnings with fellow developers.",
          },
        ],
      },
    ],
  },
  {
    slug: "first-impressions-with-comet-browser-for-real-world-workflow",
    date: "2025 · 07",
    published: "2025-07-20",
    title:
      "First impressions: Testing Perplexity's Comet Browser for real workflows",
    tags: "AI agents · Browser tooling",
    keywords: [
      "Artificial Intelligence (AI)",
      "Agents",
      "Comet browser",
      "Perplexity",
    ],
    blurb:
      "I asked Perplexity's Comet assistant to turn a page of rough course notes into a structured Google Doc. It navigated the UI and did it in three minutes — then hit a wall at the file picker.",
    origin: {
      label: "Peerlist",
      href: "https://peerlist.io/adnansadar/articles/first-impressions-with-comet-browser-for-real-world-workflow",
    },
    cover: {
      src: "/post-comet-cover.webp",
      width: 1920,
      height: 1008,
      alt: "Comet's new-tab page: an 'Ask anything or @mention a tab' prompt above widget tiles for a clock, unanswered email, an NVDA price chart and news.",
    },
    body: [
      {
        kind: "p",
        text: "As a frontend engineer diving into UX/UI fundamentals, I'm always looking for tools that can streamline my learning workflow. Yesterday, I decided to put Perplexity's Comet browser assistant to the test with a practical scenario.",
      },
      { kind: "h2", text: "The Setup" },
      {
        kind: "p",
        text: 'I was going through Meta\'s "Principles of UX/UI Design" course on Coursera, specifically reading about empathy tools and artifacts in the UX process. Instead of juggling between tabs or taking scattered notes, I thought: why not try Comet\'s assistant sidebar to capture and organize my thoughts in real-time?',
      },
      {
        kind: "figure",
        figure: {
          src: "/post-comet-01.png",
          width: 2526,
          height: 1335,
          alt: "The Coursera reading 'Empathy tools: Artifacts in the UX process' on the left, with Comet's assistant sidebar on the right holding rough notes and the request to format them into a new Google Doc.",
          caption:
            "Rough notes and three screenshots dropped straight into the assistant sidebar, next to the page they came from.",
        },
      },
      { kind: "h2", text: "The Experience" },
      {
        kind: "p",
        text: "I started dropping rough notes and screenshots directly into the assistant sidebar as I read. Then came the interesting part - I asked Comet to transfer everything into a structured Google Doc.",
      },
      {
        kind: "p",
        text: "Initially, it tried to be helpful by emailing me manual instructions (not quite what I wanted). But when I explicitly asked it to do the work for me, things got impressive. Comet opened a new tab, navigated to Google Docs, created a new document with an appropriate title, and copied over my notes in a clean, structured format. The whole process took about 3 minutes.",
      },
      {
        kind: "figure",
        figure: {
          src: "/post-comet-02.png",
          width: 2514,
          height: 1225,
          alt: "A Google Doc titled 'Artifacts in the UX Process: Systematic Overview' holding the notes as a numbered outline, with bracketed [IMAGE: ...] placeholders where the screenshots should sit.",
          caption:
            "The document Comet created and filled in — with [IMAGE: Tilly Persona - image.jpg] standing in for the screenshots it could not attach.",
        },
      },
      { kind: "h2", text: "The Limitation" },
      {
        kind: "p",
        text: 'Here\'s where it hit a wall: screenshots. When I asked it to include the images I\'d attached in the sidebar, Comet tried to upload them by triggering the file picker dialog. But once that OS-level window opened, it couldn\'t see or interact with any elements - makes perfect sense since Comet operates within the browser, not the operating system. You can see in the Google Doc that it cleverly added placeholders like "[IMAGE: Tilly Persona - image.jpg]" and organized spots for each screenshot, but couldn\'t actually attach them.',
      },
      { kind: "h2", text: "My Take" },
      {
        kind: "p",
        text: "Despite the screenshot hiccup, this felt like a genuine productivity win. As someone who's worked with Claude Code agents and Cursor's background agents for development workflows, this browser-based automation was refreshingly different. Instead of manipulating code, it was navigating actual UI - pretty cool to see in action.",
      },
      {
        kind: "p",
        text: "I've used Comet before for creating calendar events from chat and summarizing YouTube videos, both of which worked flawlessly. This Google Docs experience reinforced that browser agents are getting seriously capable for everyday workflows.",
      },
      { kind: "h2", text: "The Bigger Picture" },
      {
        kind: "p",
        text: "This small experiment saved me from the usual dance of switching tabs, copying content to ChatGPT or Claude for organization, then pasting back. For someone learning UX/UI while maintaining engineering work, these micro-efficiencies add up.",
      },
      {
        kind: "p",
        text: "Browser-based agents feel like they're hitting a sweet spot - not replacing our tools, but making the connections between them smoother.",
      },
    ],
  },
];

/** The single source for a row's destination — an external href wins over a slug. */
export function articleHref(
  article: Pick<Article, "slug" | "href">
): string | undefined {
  return article.href ?? (article.slug ? `/blog/${article.slug}` : undefined);
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * What the row list needs — deliberately not `body`.
 *
 * Both `ArticleRows` and the `Writing` section are client components that import
 * this module, so every field reachable from what they render gets serialized
 * into their bundle. Handing them the full `Article` would ship each post's
 * entire text to two pages that display nothing but its title.
 */
export type ArticleRow = Pick<
  Article,
  "date" | "title" | "tags" | "slug" | "href"
>;

export const articleRows: ArticleRow[] = articles.map(
  ({ date, title, tags, slug, href }) => ({ date, title, tags, slug, href })
);

export const writing = {
  eyebrow: "/ BLOG",
  rule: "02 — WRITTEN WORK",
  title: "Latest writing",
  blurb:
    "Notes on frontend architecture, AI-assisted workflows, and the tools I put through real work.",
} as const;
