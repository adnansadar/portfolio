"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { useMagnetic } from "@/lib/use-magnetic";

type Size = "pill" | "xl" | "2xl" | "cta";

const GLOW: Record<Size, string> = {
  pill: "shadow-[0_12px_34px_-14px_rgba(255,255,255,.5)] hover:shadow-[0_18px_46px_-12px_rgba(255,255,255,.75)]",
  cta: "shadow-[0_14px_38px_-16px_rgba(255,255,255,.5)]",
  xl: "shadow-[0_22px_60px_-22px_rgba(255,255,255,.6)]",
  "2xl": "shadow-[0_30px_70px_-26px_rgba(255,255,255,.7)]",
};

/**
 * The white download CTA, which appears four times across the page. Carries the
 * magnetic pull and the outward glow that make it the loudest element on a
 * page with no accent colour.
 */
export function ResumeButton({
  size = "xl",
  children = "Download Resume",
  meta,
  className,
}: {
  size?: Size;
  children?: React.ReactNode;
  /** Dim trailing text, e.g. "PDF · 126 KB". */
  meta?: React.ReactNode;
  className?: string;
}) {
  const magnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <Button
      asChild
      size={size}
      className={cn("transition-transform duration-200", GLOW[size], className)}
    >
      <a
        href={site.resume.href}
        download={site.resume.filename}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
      >
        {children}
        {meta ? (
          <span className="font-mono text-[0.8em] opacity-55">{meta}</span>
        ) : null}
      </a>
    </Button>
  );
}
