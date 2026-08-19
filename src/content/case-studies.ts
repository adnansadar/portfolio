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

/** A screenshot of the shipped product, shown in a fake browser window. */
export type Shot = {
  src: string;
  /** Intrinsic size — drives the frame's aspect ratio so nothing is cropped. */
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type CaseStudyBlock =
  | { kind: "widget"; widget: "watchlist" | "code" }
  | { kind: "shot"; shot: Shot }
  | { kind: "prose"; eyebrow: string; body: string }
  | { kind: "list"; eyebrow: string; items: string[] }
  | { kind: "metrics"; items: Metric[] };

export type CaseStudy = {
  index: string;
  /** Anchor id on /case-studies, and the deep-link target from the homepage. */
  slug: string;
  title: string;
  meta: string;
  /** One source for both the browser title bar and the Visit button. */
  site: { href: string; domain: string };
  architecture: {
    eyebrow: string;
    rows: ArchRow[];
    footnote: string;
  };
  tags: string[];
  blocks: CaseStudyBlock[];
};

/**
 * The blocks the homepage keeps: the screenshot, the live widget and the
 * numbers. The narrative blocks — `prose` and `list` — plus the architecture
 * diagram are left to /case-studies, which renders every study in full.
 */
export const SUMMARY_BLOCK_KINDS = new Set<CaseStudyBlock["kind"]>([
  "shot",
  "widget",
  "metrics",
]);

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    slug: "investors-engine",
    title: "Investors Engine",
    meta: "Founding Software Engineer · Feb 2025 – Jul 2026 · Full-stack investment research platform",
    site: { href: "https://investorsengine.com", domain: "investorsengine.com" },
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
      // The problem, then the real product, then the widget built to
      // illustrate how its live data moves. Both studies open on their prose
      // block so /case-studies pairs it with the architecture diagram; the
      // homepage filters prose out and still leads with the screenshot.
      {
        kind: "prose",
        eyebrow: "THE CHALLENGE",
        body: "Retail investors needed institutional-grade research: ten years of ratios for 10,000+ US equities, advanced charting, and portfolio alerts that fire the moment the market moves — on a solo-engineer budget.",
      },
      {
        kind: "shot",
        shot: {
          src: "/shot-investors-engine.png",
          width: 2552,
          height: 1342,
          alt: "The Investors Engine dashboard for NVIDIA, showing financial health and valuation ratios, five-year returns, CAGR tables and an intraday price chart",
          caption:
            "Ten years of ratios, valuation and intraday charting, on any of 10,000+ tickers.",
        },
      },
      { kind: "widget", widget: "watchlist" },
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
    ],
  },
  {
    index: "02",
    slug: "peopleblox",
    title: "PeopleBlox",
    meta: "Senior Software Engineer, LitmusBlox · Jun 2022 – May 2024 · Competency assessment platform",
    site: { href: "https://peopleblox.io/", domain: "peopleblox.io" },
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
      {
        kind: "shot",
        shot: {
          src: "/shot-peopleblox.png",
          width: 2554,
          height: 1353,
          alt: "The PeopleBlox product site, headed 'Ten Tools — One unified talent management system', with cards for the competency catalog, discovery survey, competency profile and talent readiness dashboard",
          caption:
            "The product site — ten tools spanning the talent-management workflow.",
        },
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

/** The homepage section header. */
export const caseStudiesHeading = {
  title: "Deep-dive case studies",
  meta: "SYSTEM DESIGN · ARCHITECTURE · OUTCOMES",
} as const;

/** The /case-studies page header. */
export const caseStudiesPage = {
  eyebrow: "/ CASE STUDIES",
  title: "Deep-dive case studies",
  blurb:
    "The systems behind both products in full — the architecture, the constraints that shaped it, the decisions I'd defend, and what shipped.",
} as const;
