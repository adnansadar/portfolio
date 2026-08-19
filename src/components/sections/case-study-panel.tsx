/*
  Deliberately a Server Component (the `"use client"` this carried when it lived
  in case-studies.tsx bought nothing — there are no hooks here). It matters on
  the homepage: as a client component the whole `study` object, narrative blocks
  included, was serialised into the RSC payload for content the teaser never
  renders. Interactivity stays in the leaves — Reveal, CountUp, Watchlist,
  TypedCode — which carry their own directives.
*/
import Link from "next/link";

import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { BrowserFrame } from "@/components/sections/browser-frame";
import { TypedCode } from "@/components/sections/typed-code";
import { Watchlist } from "@/components/sections/watchlist";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SUMMARY_BLOCK_KINDS,
  type CaseStudy,
  type CaseStudyBlock,
  type Metric,
} from "@/content/case-studies";
import { cn } from "@/lib/utils";

/**
 * The architecture diagram lives on the study rather than in `blocks`, but it
 * lays out as one — so it joins the flow as a synthetic block on the detail
 * page rather than needing a column of its own.
 */
type PanelItem = CaseStudyBlock | { kind: "architecture" };

/** Blocks that only read well across the full width of the shell. */
const FULL_WIDTH = new Set<PanelItem["kind"]>(["shot"]);

/**
 * Which items span both columns.
 *
 * Everything but a screenshot is happy at half width, but a lone half in a row
 * leaves a hole beside it — the imbalance this layout exists to fix. So any run
 * of consecutive halves with an odd length gives its last member the full width
 * instead. Today that promotes exactly one thing: the trailing metrics block on
 * /case-studies, which reads as a results bar rather than a gap.
 */
function spans(items: PanelItem[]): boolean[] {
  const full = items.map((item) => FULL_WIDTH.has(item.kind));

  for (let i = 0; i < full.length; i++) {
    if (full[i]) continue;

    let end = i;
    while (end + 1 < full.length && !full[end + 1]) end++;
    if ((end - i + 1) % 2 === 1) full[end] = true;
    i = end;
  }

  return full;
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div
      className={cn(
        "rounded-[18px] border p-[26px]",
        metric.featured
          ? "border-white/[0.24] bg-white/[0.05]"
          : "border-white/[0.09] bg-panel"
      )}
    >
      <div className="text-[32px] font-black tracking-[-0.03em]">
        {metric.before}
        {metric.prefix}
        {metric.value !== undefined ? <CountUp value={metric.value} /> : null}
        {metric.suffix}
        {metric.text}
      </div>
      <div
        className={cn(
          "mt-2 text-sm",
          metric.featured ? "text-ink-200" : "text-ink-400"
        )}
      >
        {metric.label}
      </div>
    </div>
  );
}

/** The panel chrome shared by the prose, list and architecture blocks. */
const PANEL =
  "panel h-full rounded-[18px] border border-white/[0.09] px-[clamp(22px,3vw,32px)] py-[clamp(22px,3vw,30px)]";

/** The little mono label every panel opens with. */
const EYEBROW = "font-mono text-[11px] tracking-[0.08em] text-ink-400";

function Block({
  item,
  study,
  className,
}: {
  item: PanelItem;
  study: CaseStudy;
  className?: string;
}) {
  switch (item.kind) {
    // These two wrap a panel rather than being one, so the height has to be
    // passed through for them to end level with their row neighbour.
    case "widget":
      return (
        <Reveal className={cn("h-full [&>*]:h-full", className)}>
          {item.widget === "watchlist" ? <Watchlist /> : <TypedCode />}
        </Reveal>
      );

    case "shot":
      return (
        <Reveal className={cn("h-full [&>*]:h-full", className)}>
          <BrowserFrame shot={item.shot} domain={study.site.domain} />
        </Reveal>
      );

    case "architecture":
      return (
        <Reveal className={cn(PANEL, className)}>
          <ArchitectureDiagram {...study.architecture} />
        </Reveal>
      );

    case "prose":
      return (
        <Reveal className={cn(PANEL, className)}>
          <div className={EYEBROW}>{item.eyebrow}</div>
          <p className="mt-3 text-[clamp(16px,1.2vw,17px)] leading-[1.6] text-ink-100">
            {item.body}
          </p>
        </Reveal>
      );

    case "list":
      return (
        <Reveal className={cn(PANEL, className)}>
          <div className={EYEBROW}>{item.eyebrow}</div>
          <ul className="mt-3.5 flex list-disc flex-col gap-3 pl-[18px] text-base leading-[1.6] text-ink-300">
            {item.items.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </Reveal>
      );

    case "metrics":
      return (
        // `self-start`, unlike the panels: stretching a pair of stat cards to
        // the height of a watchlist beside them just inflates them with air.
        <div
          className={cn(
            "grid gap-5 self-start [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]",
            className
          )}
        >
          {item.items.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08}>
              <MetricCard metric={metric} />
            </Reveal>
          ))}
        </div>
      );

  }
}

/**
 * One case study, in either of two depths.
 *
 * `detail` is the /case-studies page: every block, plus the architecture
 * diagram. Without it this is the homepage teaser — the screenshot, the live
 * widget and the numbers only, with the narrative a click away. Both read from
 * the same `caseStudies` entry, so the two can't drift.
 *
 * The identity — index, title, meta, tags, links — is a full-width band, not a
 * side column. A column only balances against body copy of comparable height,
 * which the teaser doesn't have; the band lets the screenshot run the full width
 * of the shell on both routes instead.
 */
export function CaseStudyPanel({
  study,
  first,
  detail = false,
}: {
  study: CaseStudy;
  first: boolean;
  detail?: boolean;
}) {
  const items: PanelItem[] = detail
    ? [{ kind: "architecture" }, ...study.blocks]
    : study.blocks.filter((block) => SUMMARY_BLOCK_KINDS.has(block.kind));

  const full = spans(items);

  // The page carries the <h1> and the homepage section an <h2>, so the study
  // title sits one level below whichever is above it.
  const Heading = detail ? "h2" : "h3";

  return (
    <div
      // Only an anchor target on the page it is linked to; the homepage would
      // otherwise duplicate the id in the document.
      id={detail ? study.slug : undefined}
      className={cn(
        first ? "pt-[clamp(44px,7vh,72px)]" : "pt-[clamp(72px,12vh,120px)]"
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div className="min-w-0">
          <div className="font-mono text-xs tracking-[0.08em]">
            {study.index} / CASE STUDY
          </div>
          <Heading className="mt-4 text-[clamp(27px,3vw,44px)] leading-[1.02] font-black tracking-[-0.03em]">
            {study.title}
          </Heading>
          <p className="mt-3 max-w-[62ch] text-[15px] text-ink-400">
            {study.meta}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {/*
            A plain <a>, matching the mailto: and resume anchors — next/link buys
            nothing for an external URL. `noopener` rather than `noreferrer`:
            browsers already imply the former on target=_blank, and the latter
            would strip the referrer from links to Adnan's own products.
          */}
          <Button
            asChild
            variant="outline"
            size="cta"
            className="transition-transform hover:-translate-y-0.5"
          >
            <a href={study.site.href} target="_blank" rel="noopener">
              Visit {study.site.domain}
              <span aria-hidden>↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>

          {detail ? null : (
            <Link
              href={`/case-studies#${study.slug}`}
              className="text-sm font-medium text-ink-300 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Read the full case study
              <span aria-hidden> →</span>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-white/[0.07] pb-[clamp(22px,3vw,30px)]">
        {study.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="h-auto rounded-md border-white/[0.12] px-3 py-[7px] text-[12.5px] font-normal text-ink-200"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/*
        Two tracks at most inside the 1400px shell — a third would need
        3×440 + 2×20 = 1360px against the 1288px available. That ceiling is what
        keeps a half-width block wide enough for the watchlist's fixed columns
        and for assessments.ts to hold its longest line unwrapped.
      */}
      <div className="mt-[clamp(26px,3.5vw,40px)] grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        {items.map((item, i) => (
          <Block
            key={i}
            item={item}
            study={study}
            // `1 / -1` rather than `col-span-2`: spanning two would conjure an
            // implicit second track once the grid has collapsed to one column.
            className={full[i] ? "[grid-column:1/-1]" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
