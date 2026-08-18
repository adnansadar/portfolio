"use client";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { stats } from "@/content/stats";

/**
 * The four-up numbers band. The 1px gaps are the parent's background showing
 * through, which keeps the hairlines crisp at any column count.
 */
export function ProofStrip() {
  return (
    <Reveal as="section" variant="splitIn" amount={0.15} className="relative">
      <Stagger
        amount={0.15}
        className="flex flex-wrap gap-px border-b border-white/[0.07] bg-white/[0.07]"
      >
        {stats.map((stat) => (
          <Reveal
            key={stat.label}
            duration={0.7}
            className="flex-1 basis-60 bg-background px-[clamp(20px,3vw,32px)] py-[clamp(28px,4vw,44px)]"
          >
            <div className="text-[clamp(32px,3.4vw,50px)] font-black tracking-[-0.03em]">
              {stat.prefix}
              <CountUp value={stat.value} />
              {stat.suffix ? (
                <span className="text-ink-600">{stat.suffix}</span>
              ) : null}
            </div>
            <div className="mt-2.5 text-sm leading-normal text-ink-400">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </Stagger>
    </Reveal>
  );
}
