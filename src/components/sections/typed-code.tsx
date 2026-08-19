"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import {
  CODE_FILENAME,
  CODE_SAMPLE,
  TYPE_HOLD_CHARS,
  TYPE_INTERVAL_MS,
} from "@/content/code-sample";
import { WindowChrome } from "@/components/sections/window-chrome";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { sliceTokens, tokenize } from "@/lib/highlight";
import { cn } from "@/lib/utils";

/** Tokenized once at module load — the snippet never changes. */
const TOKENS = tokenize(CODE_SAMPLE);

/**
 * Shared by the visible <pre> and the invisible one that sizes it. They must
 * measure identically, so the typography lives in one place.
 */
const PRE =
  "font-mono text-xs leading-[1.65] break-words whitespace-pre-wrap text-[#D4D4D4]";

/**
 * The looping typewriter in the PeopleBlox case study, in a fake editor chrome.
 *
 * Renders the *complete* snippet initially so the server HTML, crawlers and
 * no-JS visitors get real code rather than an empty box — then rewinds to zero
 * before paint and types it out. Hydration compares the first render only, so
 * server and client still agree. Reduced motion keeps the full snippet.
 */
export function TypedCode() {
  const reduced = useReducedMotion();
  const [count, setCount] = React.useState(CODE_SAMPLE.length);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    setCount(0);
  }, [reduced]);

  React.useEffect(() => {
    if (reduced) return;

    const id = setInterval(() => {
      setCount((n) => (n > CODE_SAMPLE.length + TYPE_HOLD_CHARS ? 0 : n + 1));
    }, TYPE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [reduced]);

  const shown = reduced ? TOKENS : sliceTokens(TOKENS, count);

  return (
    <div className="panel rounded-[18px] border border-white/[0.09] px-[clamp(22px,3vw,32px)] py-[clamp(22px,3vw,30px)]">
      <div className="font-mono text-[11px] tracking-[0.08em] text-ink-400">
        THE CACHE BOUNDARY, IN CODE
      </div>

      <div className="mt-3.5 rounded-[14px] border border-white/[0.12] bg-[#0A0B0E] px-[18px] pt-4 pb-[18px]">
        <WindowChrome label={CODE_FILENAME} />

        {/*
          A hidden copy of the finished snippet reserves the exact height the
          typed text will end up needing — including however the lines happen to
          wrap at the current column width — so nothing below shifts while it
          types. A fixed min-height can't do this: the snippet is ~356px tall on
          a wide column and considerably taller once it wraps on a phone.
        */}
        <div className="relative mt-3">
          <pre aria-hidden className={cn(PRE, "invisible")}>{CODE_SAMPLE}</pre>

          <pre className={cn(PRE, "absolute inset-0")}>
            <code>
              {shown.map((token, i) => (
                <span key={i} style={{ color: token.color }}>
                  {token.text}
                </span>
              ))}
            </code>
            {reduced ? null : (
              <span
                aria-hidden
                className="animate-caret ml-px inline-block h-[13px] w-[7px] -translate-y-px bg-foreground align-[-2px]"
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
