"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { about } from "@/content/site";
import { skills } from "@/content/skills";

export function About() {
  return (
    // tiltIn leans the section in on a 3D axis, so the parent owns the perspective.
    // No `border-t` here: References is the same `bg-muted` and sits directly
    // above, so a border would draw a stray hairline through what should read as
    // one tinted block — what others say, then who I am.
    <section id="about" className="bg-muted [perspective:1600px]">
      <Reveal
        variant="tiltIn"
        amount={0.1}
        className="shell grid gap-[clamp(36px,5vw,72px)] py-[clamp(72px,10vh,110px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]"
      >
        <div className="min-w-0">
          <div className="font-mono text-xs tracking-[0.08em] text-ink-400">
            {about.eyebrow}
          </div>
          <h2 className="mt-3.5 max-w-[26ch] text-[clamp(24px,2.6vw,38px)] leading-[1.14] font-black tracking-[-0.03em]">
            {about.heading}
          </h2>
          <p className="mt-[22px] max-w-[58ch] text-[clamp(16px,1.2vw,17px)] leading-[1.65] text-ink-300">
            {about.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button
              asChild
              variant="outline"
              size="cta"
              className="text-[15.5px]"
            >
              <Link href="#contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        <div className="grid min-w-0 gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="rounded-2xl border border-white/[0.09] bg-panel p-[22px]"
            >
              <div className="font-mono text-[11px] tracking-[0.08em] text-ink-700">
                {skill.label}
              </div>
              <div className="mt-3 text-[15px] leading-[1.75] text-ink-200">
                {skill.body}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
