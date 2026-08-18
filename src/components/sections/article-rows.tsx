"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import type { Article } from "@/content/articles";
import { cn } from "@/lib/utils";

const ROW =
  "flex flex-wrap items-center gap-x-[26px] gap-y-2.5 border-b border-white/[0.08] px-2 py-[26px]";

/**
 * Shared between the homepage teaser and /blog so the two lists can never drift.
 * Articles with no `href` render as plain rows rather than dead links.
 */
export function ArticleRows({
  articles,
  className,
}: {
  articles: Article[];
  className?: string;
}) {
  return (
    <Stagger
      amount={0.1}
      className={cn("flex flex-col border-t border-white/[0.08]", className)}
    >
      {articles.map((article) => {
        const body = (
          <>
            <span className="w-[92px] shrink-0 font-mono text-xs text-ink-700">
              {article.date}
            </span>
            <span className="min-w-0 flex-[1_1_320px] text-[clamp(18px,1.8vw,26px)] font-bold tracking-[-0.02em]">
              {article.title}
            </span>
            <span className="shrink-0 text-[13.5px] text-ink-400">
              {article.href ? article.tags : `${article.tags} · Coming soon`}
            </span>
          </>
        );

        return (
          <Reveal key={article.title} variant="rvlL">
            {article.href ? (
              <Link
                href={article.href}
                className={cn(ROW, "transition-colors hover:bg-white/[0.04]")}
              >
                {body}
              </Link>
            ) : (
              <div className={cn(ROW, "text-ink-100")}>{body}</div>
            )}
          </Reveal>
        );
      })}
    </Stagger>
  );
}
