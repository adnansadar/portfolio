"use client";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The mono marker plus a hairline that draws itself in, e.g.
 * "01 — WHAT THE NUMBERS SAY ————————".
 */
export function SectionRule({
  label,
  align = "left",
  className,
}: {
  label: string;
  /** `right` puts the label after the rule and draws the line inward. */
  align?: "left" | "right";
  className?: string;
}) {
  const rule = (
    <Reveal
      as="span"
      variant="lineDraw"
      className="h-px flex-1 bg-white/[0.14]"
      style={{ transformOrigin: align === "left" ? "left" : "right" }}
      amount={0.5}
    />
  );

  const mark = (
    <Reveal
      as="span"
      variant="markIn"
      className="font-mono text-[10.5px] tracking-[0.09em] text-ink-700"
      amount={0.5}
    >
      {label}
    </Reveal>
  );

  return (
    <div className={cn("shell relative flex items-center gap-[18px]", className)}>
      {align === "left" ? (
        <>
          {mark}
          {rule}
        </>
      ) : (
        <>
          {rule}
          {mark}
        </>
      )}
    </div>
  );
}
