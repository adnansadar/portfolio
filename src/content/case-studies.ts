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
  | { kind: "metrics"; items: Metric[] };

export type CaseStudy = {
  index: string;
  title: string;
  meta: string;
  /** One source for both the browser title bar and the Visit button. */
  site: { href: string; domain: string };
  tags: string[];
  blocks: CaseStudyBlock[];
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    title: "Investors Engine",
    meta: "Founding Software Engineer · Feb 2025 – Jul 2026 · Full-stack investment research platform",
    site: { href: "https://investorsengine.com", domain: "investorsengine.com" },
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Redis",
      "Docker Compose",
    ],
    blocks: [
      // The real product, then the widget built to illustrate how its live
      // data moves, then the numbers.
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
    title: "PeopleBlox",
    meta: "Senior Software Engineer, LitmusBlox · Jun 2022 – May 2024 · Competency assessment platform",
    site: { href: "https://peopleblox.io/", domain: "peopleblox.io" },
    tags: ["Next.js", "React", "TypeScript", "Redux", "RTK Query", "Cypress"],
    blocks: [
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
