import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArticleBody,
  ARTICLE_COLUMN,
} from "@/components/sections/article-body";
import { PageShell } from "@/components/sections/page-shell";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Button } from "@/components/ui/button";
import { articles, findArticle, writing } from "@/content/articles";

/** In Next 16 the route's params arrive as a promise and have to be awaited. */
type Props = { params: Promise<{ slug: string }> };

/** The post set is a hand-authored array — nothing can appear at runtime. */
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.flatMap((article) =>
    article.slug ? [{ slug: article.slug }] : [],
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);

  // Throwing notFound() from here is messier than letting the page do it.
  if (!article) return { title: "Not found" };

  const url = `/blog/${article.slug}`;

  return {
    // The root layout's template appends " · Adnan Sadar".
    title: article.title,
    description: article.blurb,
    keywords: article.keywords,
    /*
      Self-canonical, deliberately — even for a post that ran elsewhere first.
      Pointing this at the original would tell Google to index that copy and
      drop this one, which is the opposite of why the post is hosted here.
      Attribution is the visible credit in the header instead.

      Relative paths resolve against the metadataBase set in layout.tsx.
    */
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.blurb,
      publishedTime: article.published,
      tags: article.keywords,
      // No `images`: app/opengraph-image.tsx is inherited by nested segments,
      // so the post already gets the branded 1200×630 card. The cover is the
      // wrong shape for one and would crop badly.
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.blurb,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);

  // `dynamicParams = false` already turns an unknown slug away at the routing
  // layer; this is what narrows the type for everything below.
  if (!article) notFound();

  return (
    <PageShell>
      <SiteNav homeHref="/" />
      {/*
        Two things worth knowing about this element:

        `w-full` is load-bearing. <main> is a flex item of the column in
        layout.tsx, and .shell's `margin-inline: auto` counts as an auto
        cross-axis margin, which beats the default `stretch` and shrink-to-fits
        the element to its content. Without it the shell never reaches its
        1400px max and the column below can't line up with anything.

        The top padding tracks the nav rather than using the pages' usual
        clamp(140px,20vh,200px): it resolves to the pill's bottom edge + 12px,
        so the Back button tucks under the nav instead of floating a screen away
        from it. The pill is clamp(10px,2vw,18px) of header padding plus its own
        height — 44.5px with the links inline, 58px below `sm` where the
        hamburger makes it taller. Hardcoding those mirrors the
        `scroll-padding-top` in globals.css, which already assumes a nav height.
      */}
      <main className="shell relative w-full flex-1 pt-[calc(clamp(10px,2vw,18px)+58px+12px)] pb-[clamp(72px,10vh,120px)] sm:pt-[calc(clamp(10px,2vw,18px)+44.5px+12px)]">
        <div className={ARTICLE_COLUMN}>
          {/*
            Above the title rather than beside it. The /blog listing pairs the
            button with a two-line header, but a post header runs to four
            stacked lines, and parking a lone button beside them left it
            floating in a hole halfway down. Left edge shared with the eyebrow,
            the title and the body copy below it.
          */}
          <div className="flex">
            <Button
              asChild
              variant="outline"
              size="cta"
              className="transition-transform hover:-translate-y-0.5"
            >
              <Link href="/blog">← Back to blog</Link>
            </Button>
          </div>

          <header className="mt-[clamp(28px,4vh,44px)]">
            <div className="font-mono text-xs tracking-[0.08em] text-ink-400">
              {writing.eyebrow}
            </div>
            {/* Capped at 26ch so a headline still breaks over two or three
                lines rather than running the full 1200px as one. */}
            <h1 className="mt-3.5 max-w-[26ch] text-[clamp(32px,4vw,56px)] leading-[1.05] font-black tracking-[-0.035em]">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-[1.6] text-ink-400">
              {article.blurb}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.06em] text-ink-700">
              <time dateTime={article.published}>{article.date}</time>
              <span aria-hidden>·</span>
              <span>{article.tags}</span>
              {article.origin ? (
                <>
                  <span aria-hidden>·</span>
                  {/* A plain <a>, matching the case-study Visit button — next/link
                      buys nothing for an external URL. */}
                  <a
                    href={article.origin.href}
                    target="_blank"
                    rel="noopener"
                    className="text-ink-400 underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Originally published on {article.origin.label}
                    <span aria-hidden> ↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </>
              ) : null}
            </div>
          </header>

          <ArticleBody
            cover={article.cover}
            blocks={article.body}
            className="mt-[clamp(40px,6vh,64px)]"
          />
        </div>
      </main>
      <SiteFooter />
    </PageShell>
  );
}
