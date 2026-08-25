/*
  A Server Component for the same reason case-study-panel.tsx is one: there are
  no hooks here, and keeping the post out of the RSC payload matters more for a
  page of body copy than anywhere else on the site. Interactivity stays in the
  leaves — Reveal carries its own directive.
*/
import * as React from "react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import type { ArticleBlock, Figure, Rich } from "@/content/articles";
import { cn } from "@/lib/utils";

/*
  One width for the whole article — copy, headings and screenshots all run the
  full column. Squared to the nav pill (max-w-[1200px], centred) rather than to
  the shell's own 1288px inner width, so the article's edges line up with the
  one piece of chrome that's on screen the whole way down.

  Exported because the post header has to sit on exactly the same width, and an
  edge that only half the page agrees with is worse than no edge.
*/
export const ARTICLE_COLUMN = "mx-auto w-full max-w-[1200px]";

/*
  ink-200 over the ink-100 used for short blurbs, and 1.75 over their 1.6: a
  thousand words of body copy wants a half-step less contrast and more leading
  than a three-line standfirst does.
*/
const P =
  "mt-6 text-[clamp(16.5px,1.25vw,18px)] leading-[1.75] text-ink-200 first:mt-0";

/*
  Sits a clear step below the page h1 (clamp 32→56) and below the case-study h3
  (clamp 27→44), so the document outline reads by size alone.
*/
const H2 =
  "mt-[clamp(40px,5vw,60px)] text-[clamp(22px,2.2vw,30px)] leading-[1.15] font-black tracking-[-0.025em]";

/* Sub-headings inside a section. Bold rather than black, and close enough to
   body size that they read as labels on the list beneath them. */
const H3 =
  "mt-[clamp(28px,3.5vw,40px)] text-[clamp(17px,1.5vw,20px)] leading-[1.3] font-bold tracking-[-0.015em] text-ink-100";

/* `em` sizing, so an inline token tracks the copy around it instead of
   punching a hole in the line. */
const CODE =
  "rounded-[5px] border border-white/[0.09] bg-panel px-[0.4em] py-[0.1em] font-mono text-[0.86em] text-ink-100";

const LIST = "mt-6 flex flex-col gap-2.5";

/* A hanging em dash instead of a disc: the site already punctuates with · and
   — everywhere, and Tailwind's preflight has stripped list markers anyway. */
const LIST_ITEM =
  "relative pl-[26px] text-[clamp(16.5px,1.25vw,18px)] leading-[1.7] text-ink-200 before:absolute before:left-0 before:text-ink-700 before:content-['—']";

/* Scrolls in its own box rather than widening the page — the commands below
   are longer than the column on a narrow screen. */
const PRE =
  "panel mt-[clamp(28px,4vw,40px)] overflow-x-auto rounded-[14px] border border-white/[0.09] p-[clamp(18px,2.5vw,26px)] font-mono text-[13.5px] leading-[1.7] text-ink-100";

/*
  The image column is min(100vw − 2 × clamp(20px, 5vw, 56px), 1200px). The
  gutter clamp tops out at 56px at 1120px wide, so the column tracks the
  viewport up to there, then runs to a flat 1200px from 1312px upward.
*/
const SIZES =
  "(min-width: 1312px) 1200px, (min-width: 1120px) calc(100vw - 112px), 90vw";

/** Same voice as BrowserFrame's figcaption — the site has one caption style. */
const FIGCAPTION = "mt-3.5 text-[12.5px] leading-snug text-ink-400";

/** Renders body text, expanding the inline runs the few that need them carry. */
function Runs({ text }: { text: Rich }) {
  if (typeof text === "string") return <>{text}</>;

  return (
    <>
      {text.map((run, i) => {
        if (typeof run === "string") {
          return <React.Fragment key={i}>{run}</React.Fragment>;
        }
        if ("code" in run) {
          return (
            <code key={i} className={CODE}>
              {run.code}
            </code>
          );
        }
        if ("strong" in run) {
          return (
            <strong key={i} className="font-bold text-ink-100">
              {run.strong}
            </strong>
          );
        }
        return <em key={i}>{run.em}</em>;
      })}
    </>
  );
}

function Frame({ figure, priority }: { figure: Figure; priority?: boolean }) {
  /*
    Never blown up past its own pixels. Every shot in the first post is wider
    than the column and fills it; the second post's are screenshots of text at
    931–1143px, and stretching those to 1200 just blurs the thing you're meant
    to read. The `sizes` hint is capped to match, so the browser isn't told to
    fetch a candidate wider than the slot.
  */
  const cap = Math.min(figure.width, 1200);
  const sizes =
    figure.width >= 1200
      ? SIZES
      : `(min-width: 1120px) min(calc(100vw - 112px), ${cap}px), min(90vw, ${cap}px)`;

  return (
    // Aspect ratio comes from the file's intrinsic size, so the shot is never
    // cropped whatever the column width.
    <div
      className="relative overflow-hidden rounded-[14px] border border-white/[0.09] bg-panel-alt"
      style={{
        aspectRatio: `${figure.width} / ${figure.height}`,
        maxWidth: cap,
      }}
    >
      <Image
        src={figure.src}
        alt={figure.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "h2":
      return <h2 className={H2}>{block.text}</h2>;

    case "h3":
      return <h3 className={H3}>{block.text}</h3>;

    case "p":
      return (
        <p className={P}>
          <Runs text={block.text} />
        </p>
      );

    case "list":
      return (
        <ul className={LIST}>
          {block.items.map((item, i) => (
            <li key={i} className={LIST_ITEM}>
              <Runs text={item} />
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <pre className={PRE}>
          <code>{block.code}</code>
        </pre>
      );

    case "rule":
      return (
        <hr className="mt-[clamp(40px,5vw,60px)] border-t border-white/[0.08]" />
      );

    case "figure":
      return (
        <Reveal as="figure" className="mt-[clamp(32px,4.5vw,48px)]">
          <Frame figure={block.figure} />
          {block.figure.caption ? (
            <figcaption className={FIGCAPTION}>
              {block.figure.caption}
            </figcaption>
          ) : null}
        </Reveal>
      );
  }
}

/**
 * A post's cover and body.
 *
 * Only the images are revealed on scroll. Wrapping every paragraph would make
 * a page built for reading fight the reader on the way down, and the prose has
 * no entrance to earn — it's the thing you came for.
 */
export function ArticleBody({
  cover,
  blocks,
  className,
}: {
  cover: Figure;
  blocks: ArticleBlock[];
  className?: string;
}) {
  return (
    <div className={cn(ARTICLE_COLUMN, className)}>
      {/* Above the fold on every post, so it opts out of lazy loading. */}
      <Reveal>
        <Frame figure={cover} priority />
      </Reveal>

      <div className="mt-[clamp(36px,5vw,56px)]">
        {blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
