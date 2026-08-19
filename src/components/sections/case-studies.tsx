"use client";

import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { BrowserFrame } from "@/components/sections/browser-frame";
import { TypedCode } from "@/components/sections/typed-code";
import { Watchlist } from "@/components/sections/watchlist";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  caseStudies,
  caseStudiesHeading,
  type CaseStudy,
  type CaseStudyBlock,
  type Metric,
} from "@/content/case-studies";
import { cn } from "@/lib/utils";

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

function Block({
  block,
  site,
}: {
  block: CaseStudyBlock;
  site: CaseStudy["site"];
}) {
  switch (block.kind) {
    case "widget":
      return (
        <Reveal>{block.widget === "watchlist" ? <Watchlist /> : <TypedCode />}</Reveal>
      );

    case "shot":
      return (
        <Reveal>
          <BrowserFrame shot={block.shot} domain={site.domain} />
        </Reveal>
      );

    case "prose":
      return (
        <Reveal className="panel rounded-[18px] border border-white/[0.09] px-[clamp(22px,3vw,32px)] py-[clamp(22px,3vw,30px)]">
          <div className="font-mono text-[11px] tracking-[0.08em] text-ink-400">
            {block.eyebrow}
          </div>
          <p className="mt-3 text-[clamp(16px,1.2vw,17px)] leading-[1.6] text-ink-100">
            {block.body}
          </p>
        </Reveal>
      );

    case "list":
      return (
        <Reveal className="panel rounded-[18px] border border-white/[0.09] px-[clamp(22px,3vw,32px)] py-[clamp(22px,3vw,30px)]">
          <div className="font-mono text-[11px] tracking-[0.08em] text-ink-400">
            {block.eyebrow}
          </div>
          <ul className="mt-3.5 flex list-disc flex-col gap-3 pl-[18px] text-base leading-[1.6] text-ink-300">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      );

    case "metrics":
      return (
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
          {block.items.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.08}>
              <MetricCard metric={metric} />
            </Reveal>
          ))}
        </div>
      );

  }
}

function CaseStudyPanel({ study, first }: { study: CaseStudy; first: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-[clamp(32px,4vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]",
        first
          ? "pt-[clamp(44px,7vh,72px)]"
          : "pt-[clamp(72px,12vh,120px)]"
      )}
    >
      {/* Sticky on wide screens; falls back to normal flow once it wraps. */}
      <div className="sticky top-[110px] min-w-0 self-start">
        <div className="font-mono text-xs tracking-[0.08em]">
          {study.index} / CASE STUDY
        </div>
        <h3 className="mt-4 text-[clamp(27px,3vw,44px)] leading-[1.02] font-black tracking-[-0.03em]">
          {study.title}
        </h3>
        <p className="mt-3 text-[15px] text-ink-400">{study.meta}</p>

        <ArchitectureDiagram {...study.architecture} />

        <div className="mt-5 flex flex-wrap gap-2">
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
          A plain <a>, matching the mailto: and resume anchors — next/link buys
          nothing for an external URL. `noopener` rather than `noreferrer`:
          browsers already imply the former on target=_blank, and the latter
          would strip the referrer from links to Adnan's own products.
        */}
        <Button
          asChild
          variant="outline"
          size="cta"
          className="mt-6 transition-transform hover:-translate-y-0.5"
        >
          <a href={study.site.href} target="_blank" rel="noopener">
            Visit {study.site.domain}
            <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Button>
      </div>

      <div className="flex min-w-0 flex-col gap-5">
        {study.blocks.map((block, i) => (
          <Block key={i} block={block} site={study.site} />
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="shell relative pt-[clamp(72px,10vh,120px)] pb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-[18px] border-b border-white/[0.08] pb-[22px]">
        <h2 className="text-[clamp(26px,3vw,44px)] font-black tracking-[-0.03em]">
          {caseStudiesHeading.title}
        </h2>
        <span className="font-mono text-xs text-ink-700">
          {caseStudiesHeading.meta}
        </span>
      </div>

      {caseStudies.map((study, i) => (
        <CaseStudyPanel key={study.title} study={study} first={i === 0} />
      ))}
    </section>
  );
}
