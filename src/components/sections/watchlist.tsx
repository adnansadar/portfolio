"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SPARK_BARS,
  WATCHLIST_TICK_MS,
  sparkHeights,
  watchlist,
} from "@/content/watchlist";
import { cn } from "@/lib/utils";

type Drift = Record<string, number>;

/**
 * The "live" watchlist from the Investors Engine case study.
 *
 * Drift starts empty so the first paint is the exact base data from the content
 * layer — the server and the client agree, and the randomness only begins in
 * the effect below. Randomising during render would mismatch on hydration.
 */
export function Watchlist() {
  const [drift, setDrift] = React.useState<Drift>({});
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;

    const id = setInterval(() => {
      setDrift(
        Object.fromEntries(
          watchlist.map((t) => [t.sym, (Math.random() - 0.45) * 0.9])
        )
      );
    }, WATCHLIST_TICK_MS);

    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="panel rounded-[18px] border border-white/10 p-[clamp(18px,2.4vw,24px)]">
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/[0.08] pb-3">
        <div className="text-[15px] font-bold">Watchlist — live</div>
      </div>

      <ul className="list-none">
        {watchlist.map((row, i) => {
          const d = drift[row.sym] ?? 0;
          const change = row.chg + d;
          const price = (row.px * (1 + d / 100)).toFixed(2);
          const up = change >= 0;
          const isOpen = openIndex === i;

          return (
            <li key={row.sym}>
              <Collapsible
                open={isOpen}
                onOpenChange={(next) => setOpenIndex(next ? i : null)}
              >
                <div
                  className={cn(
                    "border-b border-white/[0.055] transition-colors",
                    isOpen && "bg-white/[0.05]"
                  )}
                >
                  <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-3 px-1 py-[13px] text-left hover:bg-white/[0.03]">
                    <span className="w-[58px] shrink-0 font-mono text-[12.5px] font-medium">
                      {row.sym}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-ink-400">
                      {row.name}
                    </span>

                    <span
                      aria-hidden
                      className="flex h-[22px] items-end gap-[2px]"
                    >
                      {sparkHeights(i, d).map((h, k) => (
                        <span
                          key={k}
                          className={cn(
                            "w-[3px] rounded-[1px]",
                            k > SPARK_BARS - 3
                              ? "bg-foreground"
                              : "bg-white/[0.24]"
                          )}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </span>

                    <span
                      className={cn(
                        "w-[70px] shrink-0 text-right font-mono text-[12.5px]",
                        up ? "text-up" : "text-down"
                      )}
                    >
                      {price}
                    </span>
                    <span
                      className={cn(
                        "w-14 shrink-0 text-right font-mono text-[11.5px]",
                        up ? "text-up" : "text-down"
                      )}
                    >
                      {up ? "+" : "−"}
                      {Math.abs(change).toFixed(2)}%
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <dl className="mt-3 flex flex-wrap gap-x-[18px] gap-y-2 border-t border-dashed border-white/10 px-1 pt-3 pb-0.5 font-mono text-[11px] text-ink-400">
                      {(
                        [
                          ["P/E", row.pe],
                          ["MKT CAP", row.cap],
                          ["ROE", row.roe],
                          ["ALERT", row.alert],
                        ] as const
                      ).map(([term, value]) => (
                        <div key={term} className="flex gap-1.5">
                          <dt>{term}</dt>
                          <dd className="text-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </li>
          );
        })}
      </ul>

      <p className="pt-3 font-mono text-[10.5px] text-ink-700">
        PUSHED VIA REDIS PUB/SUB · NO POLLING · CLICK A ROW FOR RATIOS
      </p>
    </div>
  );
}
