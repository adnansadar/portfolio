"use client";

import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { references, referencesHeading } from "@/content/references";

export function References() {
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

        <Stagger
          amount={0.1}
          className="mt-[34px] grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]"
        >
          {references.map((reference) => (
            <Reveal
              key={reference.name}
              as="figure"
              duration={0.75}
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
                <div className="mt-1 text-[13.5px] text-ink-400">
                  {reference.role}
                </div>
              </figcaption>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Reveal>
  );
}
