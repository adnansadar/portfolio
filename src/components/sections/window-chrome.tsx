import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The three-dot title bar shared by the fake editor window in `TypedCode` and
 * the browser frame around each case-study screenshot. Extracted so the two
 * windows can't drift apart — they should always read as the same object with
 * a different label.
 */
export function WindowChrome({
  label,
  trailing,
  className,
}: {
  /** Filename for the editor, domain for the browser. */
  label: React.ReactNode;
  /** Optional right-aligned adornment, e.g. an external-link glyph. */
  trailing?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-b border-white/[0.07] pb-3",
        className
      )}
    >
      <span aria-hidden className="size-[9px] rounded-full bg-white/[0.22]" />
      <span aria-hidden className="size-[9px] rounded-full bg-white/[0.14]" />
      <span aria-hidden className="size-[9px] rounded-full bg-white/10" />
      <span className="ml-2 truncate font-mono text-[10.5px] tracking-[0.06em] text-ink-700">
        {label}
      </span>
      {trailing ? (
        <span className="ml-auto shrink-0 font-mono text-[10.5px] text-ink-700">
          {trailing}
        </span>
      ) : null}
    </div>
  );
}
