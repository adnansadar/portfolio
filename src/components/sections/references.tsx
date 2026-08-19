"use client";

import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { references, referencesHeading } from "@/content/references";
import { useMediaQuery } from "@/lib/use-media-query";

/** Shared by both arrangements below, which differ only in what drives them. */
const GRID =
  "mt-[34px] grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]";

export function References() {
  /*
   * Stacked, each quote earns its own reveal on the way down. Once they share
   * a row that reads as broken — the two off to the side would sit blank while
   * you look straight at them — so from there up a single <Stagger> brings all
   * three in together.
   *
   * 640px because that is comfortably inside where the grid above collapses:
   * `.shell` eats `clamp(20px, 5vw, 56px)` of gutter per side, so two 280px
   * tracks plus the 20px gap stop fitting at about 645px of viewport. Widening
   * this past that would fire the per-card reveal on a two-column row.
   */
  const perCard = useMediaQuery("(max-width: 640px)");

  const cards = references.map((reference) => (
    <Reveal
      key={reference.name}
      as="figure"
      // Outside a <Stagger> each of these drives its own viewport trigger, so
      // these two props only do anything in the stacked arrangement: hold off
      // until a third of the card is up, then take a beat longer to arrive.
      duration={perCard ? 0.9 : 0.75}
      amount={perCard ? 0.3 : undefined}
      className="rounded-[18px] border border-white/[0.09] bg-panel p-[26px] transition-[transform,border-color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:border-white/[0.22]"
    >
      <div
        aria-hidden
        className="font-mono text-[26px] leading-none text-ink-900"
      >
        &ldquo;
      </div>
      <blockquote className="mt-2.5 text-base leading-[1.62] text-ink-300 italic">
        {reference.quote}
      </blockquote>
      <figcaption className="mt-[22px] border-t border-white/[0.07] pt-[18px]">
        <div className="text-[15px] font-bold">{reference.name}</div>
        <div className="mt-1 text-[13.5px] text-ink-400">{reference.role}</div>
      </figcaption>
    </Reveal>
  ));

  return (
    <Reveal
      as="section"
      variant="wipeUp"
      amount={0.1}
      className="border-t border-white/[0.07] bg-muted"
    >
      <div className="shell py-[clamp(64px,9vh,100px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[clamp(24px,2.6vw,38px)] font-black tracking-[-0.03em]">
            {referencesHeading.title}
          </h2>
          <span className="font-mono text-[11.5px] text-ink-700">
            {referencesHeading.meta}
          </span>
        </div>

        {perCard ? (
          <div className={GRID}>{cards}</div>
        ) : (
          <Stagger amount={0.1} step={0} className={GRID}>
            {cards}
          </Stagger>
        )}
      </div>
    </Reveal>
  );
}
