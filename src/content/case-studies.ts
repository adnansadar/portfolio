/** A box in the little stacked architecture diagram on each case study. */
export type ArchNode = {
  label: string;
  /** `strong` is the highlighted layer, `dim` the supporting infrastructure. */
  tone?: "strong" | "default" | "dim";
};

/** One horizontal band of the diagram; multiple nodes sit side by side. */
export type ArchRow = ArchNode[];

export type Metric = {
  /** Static text before the counted number, e.g. "Team of ". */
  before?: string;
  /** Rendered immediately before the number, e.g. the minus in "−30%". */
  prefix?: string;
  /** Counts up when scrolled into view. Omit for a text-only metric. */
  value?: number;
  suffix?: string;
  /** Use instead of `value` for a metric with no number, e.g. "Sheets API". */
  text?: string;
  label: string;
  /** The brighter, outlined treatment given to the headline metric. */
  featured?: boolean;
};

export type CaseStudyBlock =
  | { kind: "widget"; widget: "watchlist" | "code" }
  | { kind: "prose"; eyebrow: string; body: string }
  | { kind: "list"; eyebrow: string; items: string[] }
  | { kind: "metrics"; items: Metric[] }
  | { kind: "cta"; label: string; href: string };

export type CaseStudy = {
  index: string;
  title: string;
  meta: string;
  architecture: {
    eyebrow: string;
    rows: ArchRow[];
    footnote: string;
  };
  tags: string[];
  blocks: CaseStudyBlock[];
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    title: "Investors Engine",
    meta: "Founding Software Engineer · Feb 2025 – Jul 2026 · Full-stack investment research platform",
    architecture: {
      eyebrow: "ARCHITECTURE",
      rows: [
        [{ label: "Cloudflare Workers — edge routing", tone: "strong" }],
        [{ label: "NGINX — proxy & TLS" }],
        [{ label: "Next.js · TS" }, { label: "Node API" }],
        [
          { label: "Redis", tone: "dim" },
          { label: "Postgres", tone: "dim" },
          { label: "WS hub", tone: "dim" },
        ],
      ],
      footnote: "Docker Compose orchestrates every box above",
    },
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Redis",
      "Docker Compose",
    ],
    blocks: [
      { kind: "widget", widget: "watchlist" },
      {
        kind: "prose",
        eyebrow: "THE CHALLENGE",
        body: "Retail investors needed institutional-grade research: ten years of ratios for 10,000+ US equities, advanced charting, and portfolio alerts that fire the moment the market moves — on a solo-engineer budget.",
      },
      {
        kind: "list",
        eyebrow: "THE ARCHITECTURE DECISIONS",
        items: [
          "A single WebSocket hub fans out watchlist notifications, with Redis as the shared pub/sub and cache layer, so no client polls for price state.",
          "Docker Compose orchestrates frontend, backend, shared services and Redis behind NGINX; Cloudflare Workers handle edge routing and cache-safe deploys.",
          "Frontend revamp: migrated to Tailwind CSS with design tokens, then route-level code splitting — bundle build time and render cost both came down.",
          "Automated regression + market-news reporting through OpenClaw, posting results into Discord so failures surface before users do.",
        ],
      },
      {
        kind: "metrics",
        items: [
          {
            value: 10,
            suffix: "k+",
            label: "tickers with historical ratios & charts",
            featured: true,
          },
          {
            text: "Sheets API",
            label: "extension surfacing financials inside Google Sheets",
          },
        ],
      },
      { kind: "cta", label: "Read the full write-up", href: "#work" },
    ],
  },
  {
    index: "02",
    title: "PeopleBlox",
    meta: "Senior Software Engineer, LitmusBlox · Jun 2022 – May 2024 · Competency assessment platform",
    architecture: {
      eyebrow: "FRONTEND ARCHITECTURE",
      rows: [
        [{ label: "Next.js app shell · shared UI kit" }],
        [{ label: "Redux + RTK Query cache boundary", tone: "strong" }],
        [{ label: "Node · Express" }, { label: "Prisma · Postgres" }],
      ],
      footnote: "Cypress E2E gates on the hiring & assessment flows",
    },
    tags: ["Next.js", "React", "TypeScript", "Redux", "RTK Query", "Cypress"],
    blocks: [
      {
        kind: "prose",
        eyebrow: "LEADING THE FRONTEND",
        body: "Founding frontend engineer on a new product with five developers, a moving spec, and enterprise customers waiting. My job was the architecture, the conventions, and the people.",
      },
      { kind: "widget", widget: "code" },
      {
        kind: "list",
        eyebrow: "WHAT I PUT IN PLACE",
        items: [
          "One cache boundary: RTK Query owned server state, Redux only owned UI state — cached-data API calls dropped ~30%.",
          "A shared component layer and review conventions so five engineers shipped in parallel without style drift.",
          "Worked with management to define the delivery workflow, lifting efficiency ~25%; ran sprints and mentored interns.",
          "End-to-end ownership when needed — Node, Express, Prisma and Postgres on the backend of the same features.",
        ],
      },
      {
        kind: "metrics",
        items: [
          {
            prefix: "−",
            value: 30,
            suffix: "%",
            label: "API calls for cached data",
            featured: true,
          },
          {
            before: "Team of ",
            value: 5,
            label: "mentored, reviewed, unblocked",
          },
        ],
      },
    ],
  },
];

export const caseStudiesHeading = {
  title: "Deep-dive case studies",
  meta: "SYSTEM DESIGN · ARCHITECTURE · OUTCOMES",
} as const;
