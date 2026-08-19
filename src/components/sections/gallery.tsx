"use client";

import * as React from "react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import {
  MARQUEE_SECONDS,
  gallery,
  galleryEyebrow,
  type Slide,
} from "@/content/gallery";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

/** Trailing margin, not a flex gap — see the `tape` keyframe comment. */
const CARD_GAP = "me-5";

function Card({ slide, hidden }: { slide: Slide; hidden?: boolean }) {
  return (
    <figure
      // Height comes from the track; width follows the photo's own ratio, so
      // portrait and landscape shots sit side by side with nothing cropped.
      style={{ aspectRatio: `${slide.width} / ${slide.height}` }}
      className={cn(
        "group relative h-full shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.09] bg-panel",
        CARD_GAP
      )}
      aria-hidden={hidden}
    >
      <Image
        src={slide.src}
        alt={hidden ? "" : slide.alt}
        fill
        sizes="(max-width: 700px) 70vw, 30vw"
        className="object-cover brightness-105 contrast-110 grayscale transition-[filter] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:brightness-100 group-hover:contrast-100 group-hover:grayscale-0 touch:brightness-100 touch:contrast-100 touch:grayscale-0"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,8,10,0) 42%, rgba(7,8,10,.62) 74%, rgba(7,8,10,.94) 100%)",
        }}
      />

      <figcaption className="absolute inset-x-0 bottom-0 p-4">
        <div className="text-[15px] leading-tight font-bold tracking-[-0.01em]">
          {slide.title}
        </div>
        <div className="mt-1 text-[12.5px] leading-snug text-ink-200">
          {slide.caption}
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * A continuously drifting strip of photos — the personality break between the
 * case studies and the writing.
 *
 * Replaces the mockup's full-bleed 100vh slideshow, which assumed landscape
 * photos; these are mostly 3:4 portraits and a 16:9 cover crop threw away well
 * over half of each frame.
 *
 * Server-renders as a plain scroll-snap row, then upgrades to the marquee once
 * JS confirms motion is welcome. That order keeps the no-JS and reduced-motion
 * paths on the usable, swipeable strip.
 */
export function Gallery() {
  /*
   * Touch devices drift too. This used to also require `(pointer: fine)`, which
   * a phone never reports, so the strip sat motionless there — reduced motion
   * is the only thing that holds it still now.
   */
  const marquee = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const [paused, setPaused] = React.useState(false);

  return (
    <Reveal
      as="section"
      variant="splitIn"
      duration={1.2}
      amount={0.1}
      className="relative overflow-hidden py-[clamp(56px,8vh,88px)]"
      aria-label="Photos from Buffalo, Niagara and in between"
    >
      <div className="shell flex flex-wrap items-baseline justify-between gap-3 pb-6 font-mono text-[11.5px] tracking-[0.09em] text-ink-700">
        <span>{galleryEyebrow}</span>
        <span>{gallery.length} PHOTOS</span>
      </div>

      <div
        className={cn(
          "h-[clamp(280px,42vh,440px)]",
          marquee
            ? "overflow-hidden"
            : "snap-x snap-mandatory overflow-x-auto px-[clamp(20px,5vw,56px)]"
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className={cn(
            "flex h-full w-max",
            marquee && "animate-tape",
            marquee && paused && "[animation-play-state:paused]"
          )}
          style={
            marquee
              ? ({
                  "--tape-duration": `${MARQUEE_SECONDS}s`,
                } as React.CSSProperties)
              : undefined
          }
        >
          {gallery.map((slide) => (
            <Card key={slide.src} slide={slide} />
          ))}

          {/*
            Second copy makes the -50% loop seamless. Hidden from assistive tech
            so the photos aren't announced twice.
          */}
          {marquee
            ? gallery.map((slide) => (
                <Card key={`dup-${slide.src}`} slide={slide} hidden />
              ))
            : null}
        </div>
      </div>
    </Reveal>
  );
}
