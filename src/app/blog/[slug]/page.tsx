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
import { articles, findArticle } from "@/content/articles";
import { site } from "@/content/site";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl, breadcrumbs, headingId, personId } from "@/lib/seo";

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
      Self-canonical expresses the preferred portfolio URL. Search engines
      may still choose the syndicated original; attribution is not a
      substitute for cross-domain canonical coordination with the publisher.
      Relative paths resolve against metadataBase in layout.tsx.
    */
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.blurb,
      publishedTime: article.published,
      modifiedTime: article.modified,
      authors: [absoluteUrl("/#about")],
      tags: article.keywords,
      // The route's opengraph-image.tsx supplies the article-specific card.
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
      <StructuredData data={{ "@graph": [
        { "@type": "BlogPosting", "@id": absoluteUrl(`/blog/${slug}#article`),
          headline: article.title, description: article.blurb, url: absoluteUrl(`/blog/${slug}`),
          mainEntityOfPage: absoluteUrl(`/blog/${slug}`), datePublished: article.published,
          ...(article.modified ? { dateModified: article.modified } : {}),
          author: { "@type": "Person", "@id": personId, name: site.name, url: absoluteUrl("/#about") },
          image: absoluteUrl(article.cover?.src ?? "/opengraph-image"), inLanguage: "en",
          keywords: article.keywords, ...(article.origin ? { isBasedOn: article.origin.href } : {}),
        },
        breadcrumbs([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: article.title, path: `/blog/${slug}` }]),
      ] }} />
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
        <article className={ARTICLE_COLUMN}>
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
            {/* Capped at 26ch so a headline still breaks over two or three
                lines rather than running the full 1200px as one. */}
            <h1 className="max-w-[26ch] text-[clamp(32px,4vw,56px)] leading-[1.05] font-black tracking-[-0.035em]">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-[1.6] text-ink-400">
              {article.blurb}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.06em] text-ink-700">
              <Link href="/#about" rel="author" className="text-ink-400 underline underline-offset-4">By {site.name}</Link>
              <span aria-hidden>·</span>
              <time dateTime={article.published}>{article.date}</time>
              {article.modified ? <span>Updated <time dateTime={article.modified}>{article.modified}</time></span> : null}
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

          {article.body.some((block) => block.kind === "h2") ? (
            <nav aria-label="On this page" className="mt-8 rounded-xl border border-white/10 p-5">
              <p className="font-semibold">On this page</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-300">
                {article.body.map((block, index) => block.kind === "h2" ? (
                  <li key={index}><a className="underline underline-offset-4 hover:text-white" href={`#${headingId(block.text, index)}`}>{block.text}</a></li>
                ) : null)}
              </ul>
            </nav>
          ) : null}

          <ArticleBody
            cover={article.cover}
            blocks={article.body}
            className="mt-[clamp(40px,6vh,64px)]"
          />
          <aside className="mt-14 border-t border-white/10 pt-6" aria-label="About the author">
            <h2 className="text-xl font-bold">About {site.name}</h2>
            <p className="mt-3 text-ink-300">Frontend and full-stack engineer working with React, Next.js and TypeScript. I write about frontend architecture, AI-assisted workflows, and tools I use in practice.</p>
            <Link href="/#work" className="mt-3 inline-block underline underline-offset-4">Explore my engineering projects</Link>
          </aside>
          <nav aria-label="More articles" className="mt-10">
            <h2 className="text-xl font-bold">More writing</h2>
            <ul className="mt-4 space-y-3">{articles.filter((item) => item.slug && item.slug !== slug).map((item) => (
              <li key={item.slug}><Link className="text-ink-300 underline underline-offset-4 hover:text-white" href={`/blog/${item.slug}`}>{item.title}</Link></li>
            ))}</ul>
          </nav>
        </article>
      </main>
      <SiteFooter />
    </PageShell>
  );
}
