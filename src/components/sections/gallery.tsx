"use client";

import * as React from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import {
  GALLERY_INTERVAL_MS,
  gallery,
  galleryEyebrow,
} from "@/content/gallery";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export function Gallery() {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced || paused) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % gallery.length),
      GALLERY_INTERVAL_MS
    );

    return () => clearInterval(id);
  }, [reduced, paused]);

  const current = gallery[index];

  return (
    <Reveal
      as="section"
      variant="splitIn"
      duration={1.2}
      amount={0.1}
      className="relative h-screen overflow-hidden bg-background"
      aria-roledescription="carousel"
      aria-label="Photos from Buffalo and Niagara"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {gallery.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(.4,0,.2,1)]",
            i === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className={cn(
              "object-cover transition-transform duration-[4600ms] ease-linear",
              i === index && !reduced ? "scale-[1.06]" : "scale-100"
            )}
          />
        </div>
      ))}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,8,10,.74) 0%, rgba(7,8,10,.14) 38%, rgba(7,8,10,.92) 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 flex flex-wrap justify-between gap-2.5 px-[clamp(20px,5vw,56px)] pt-[clamp(80px,12vh,110px)] font-mono text-[11.5px] tracking-[0.09em] text-foreground/70">
        <span>{galleryEyebrow}</span>
        <span>
          {pad(index + 1)} / {pad(gallery.length)}
        </span>
      </div>

      <div className="absolute right-[clamp(20px,5vw,56px)] bottom-[clamp(28px,6vh,56px)] left-[clamp(20px,5vw,56px)] flex flex-wrap items-end justify-between gap-[22px]">
        {/* Announces the slide change to screen readers without stealing focus. */}
        <div className="max-w-[44ch]" aria-live="polite">
          <div className="text-[clamp(20px,2.2vw,32px)] leading-[1.15] font-bold tracking-[-0.02em]">
            {current.title}
          </div>
          <div className="mt-2 text-[14.5px] text-foreground/[0.66]">
            {current.caption}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {gallery.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${gallery.length}: ${slide.title}`}
              aria-current={i === index}
              className={cn(
                "h-1 cursor-pointer rounded-full transition-[width,background-color] duration-500",
                i === index
                  ? "w-[34px] bg-foreground"
                  : "w-2.5 bg-foreground/30 hover:bg-foreground/60"
              )}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
