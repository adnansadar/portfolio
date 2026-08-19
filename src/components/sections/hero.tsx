"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ResumeButton } from "@/components/resume-button";
import { hero, site } from "@/content/site";

export function Hero() {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Replaces the mockup's `animation: para` on a view() timeline.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-6%"]);

  return (
    <section
      id="top"
      className="shell relative grid min-h-screen items-center gap-[clamp(32px,4vw,56px)] pt-[clamp(120px,14vh,170px)] pb-[clamp(56px,8vh,88px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,430px),1fr))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[140px] -left-[90px] size-[min(640px,90vw)] rounded-full blur-[18px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.07), transparent 62%)",
        }}
      />

      <div className="relative min-w-0">
        <Reveal
          as="h1"
          delay={0.06}
          className="text-[clamp(38px,5.6vw,84px)] leading-[0.95] font-black tracking-[-0.038em] text-balance"
        >
          {hero.headline.lead}
          <span className="text-ink-800">{hero.headline.joiner}</span>
          <span className="block text-ink-600">{hero.headline.trail}</span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.14}
          className="mt-7 max-w-[56ch] text-[clamp(16px,1.3vw,19px)] leading-[1.62] text-ink-400 text-pretty"
        >
          {hero.blurb}
        </Reveal>

        <Reveal
          delay={0.22}
          className="mt-9 flex flex-wrap items-center gap-3.5"
        >
          <ResumeButton size="xl" meta={site.resume.meta} />
          <Button
            asChild
            variant="outline"
            size="xl"
            className="font-semibold transition-transform hover:-translate-y-0.5"
          >
            <Link href="#work">Read the case studies →</Link>
          </Button>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-[42px] flex flex-wrap gap-x-[clamp(14px,2vw,26px)] gap-y-2 font-mono text-xs text-ink-700"
        >
          <span>{site.location}</span>
          <span>{site.education}</span>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.1} duration={1} className="relative min-w-0">
        <div
          ref={frameRef}
          className="group relative h-[clamp(420px,70vh,640px)] overflow-hidden rounded-[20px] border border-white/[0.09]"
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: reduced ? 0 : y, scale: 1.08 }}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover object-[50%_22%] brightness-105 contrast-[1.34] grayscale transition-[filter] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:brightness-100 group-hover:contrast-110 group-hover:saturate-105 group-hover:grayscale-0 touch:brightness-100 touch:contrast-110 touch:saturate-105 touch:grayscale-0"
            />
          </motion.div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,.22) 64%, rgba(7,8,10,.82) 100%)",
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
