export type Article = {
  date: string;
  title: string;
  tags: string;
  /** Rows without an href render as static list items rather than dead links. */
  href?: string;
};

export const articles: Article[] = [
  {
    date: "2026 · 06",
    title: "Designing a WebSocket layer that survives 10,000 tickers",
    tags: "Real-time · Redis pub/sub",
  },
  {
    date: "2026 · 03",
    title: "Migrating a mature Next.js app to Tailwind without a feature freeze",
    tags: "Design tokens · Bundling",
  },
  {
    date: "2025 · 11",
    title: "RTK Query cache patterns that cut our API calls by a third",
    tags: "State · Team conventions",
  },
];

export const writing = {
  eyebrow: "/ BLOG",
  rule: "02 — WRITTEN WORK",
  title: "Latest writing",
  blurb:
    "Notes on frontend architecture, real-time data, and leading teams through migrations.",
} as const;
