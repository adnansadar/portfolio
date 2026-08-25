"use client";

import Link from "next/link";

import { ArticleRows } from "@/components/sections/article-rows";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { articleRows, writing } from "@/content/articles";

export function Writing() {
  return (
    <Reveal
      as="section"
      id="writing"
      variant="wipeUp"
      amount={0.1}
      className="shell relative pt-[clamp(40px,6vh,64px)] pb-[clamp(72px,10vh,120px)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs tracking-[0.08em] text-ink-400">
            {writing.eyebrow}
          </div>
          <h2 className="mt-3.5 text-[clamp(26px,3vw,44px)] font-black tracking-[-0.03em]">
            {writing.title}
          </h2>
          <p className="mt-3 max-w-[52ch] text-base leading-[1.6] text-ink-400">
            {writing.blurb}
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          size="cta"
          className="transition-transform hover:-translate-y-0.5"
        >
          <Link href="/blog">View all on /blog →</Link>
        </Button>
      </div>

      <ArticleRows articles={articleRows} className="mt-11" />
    </Reveal>
  );
}
