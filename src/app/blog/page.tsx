import type { Metadata } from "next";
import Link from "next/link";

import { ARTICLE_COLUMN } from "@/components/sections/article-body";
import { ArticleRows } from "@/components/sections/article-rows";
import { PageShell } from "@/components/sections/page-shell";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Button } from "@/components/ui/button";
import { articleRows, writing } from "@/content/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: writing.blurb,
};

export default function BlogPage() {
  return (
    <PageShell>
      <SiteNav homeHref="/" />
      {/* `w-full` and the column: see the note in [slug]/page.tsx — without
          them this page's content sits inset from the nav, and a post that ran
          flush beside a listing that didn't would just read as broken. */}
      <main className="shell relative w-full flex-1 pt-[clamp(140px,20vh,200px)] pb-[clamp(72px,10vh,120px)]">
        <div className={ARTICLE_COLUMN}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs tracking-[0.08em] text-ink-400">
                {writing.eyebrow}
              </div>
              <h1 className="mt-3.5 text-[clamp(32px,4vw,56px)] font-black tracking-[-0.035em]">
                {writing.title}
              </h1>
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
              <Link href="/">← Back to work</Link>
            </Button>
          </div>

          <ArticleRows articles={articleRows} className="mt-11" />
        </div>
      </main>
      <SiteFooter />
    </PageShell>
  );
}
