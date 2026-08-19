"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Shared by the three rules that fold into an X. */
const BAR =
  "absolute top-1/2 left-0 block h-px w-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]";

/**
 * The floating pill nav. Custom markup rather than a shadcn primitive — it is a
 * one-off composition and Radix adds nothing here.
 *
 * The links sit inline from `sm` up and collapse behind a hamburger below it,
 * where the wordmark plus four links wrapped onto a second line and left the
 * pill looking like a stray paragraph.
 */
export function SiteNav({ homeHref = "#top" }: { homeHref?: string }) {
  const [open, setOpen] = React.useState(false);
  const reduced = useReducedMotion();

  // Escape closes the sheet. Without it the toggle is the only way back out,
  // which is a dead end for anyone driving this from a keyboard.
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-80 flex justify-center px-3 py-[clamp(10px,2vw,18px)] sm:px-6">
      <nav className="w-full max-w-[1200px] rounded-3xl border border-white/[0.09] bg-[rgba(11,12,15,0.66)] py-2.5 pr-3 pl-5 shadow-[0_18px_50px_-28px_rgba(0,0,0,.95)] backdrop-blur-[18px] backdrop-saturate-150">
        <div className="flex items-center gap-x-[clamp(12px,2vw,26px)]">
          <Link
            href={homeHref}
            onClick={() => setOpen(false)}
            className="text-[15px] font-bold tracking-[-0.01em]"
          >
            {site.name}
          </Link>

          <div className="ml-auto hidden items-center gap-x-[clamp(12px,1.6vw,20px)] sm:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-auto grid size-9 shrink-0 place-items-center rounded-xl border border-white/[0.09] text-ink-200 transition-colors hover:text-white sm:hidden"
          >
            <span aria-hidden className="relative block size-4">
              <span
                className={cn(BAR, open ? "rotate-45" : "-translate-y-[5px]")}
              />
              <span className={cn(BAR, open && "opacity-0")} />
              <span
                className={cn(BAR, open ? "-rotate-45" : "translate-y-[5px]")}
              />
            </span>
          </button>
        </div>

        {/*
          Rendered at all times so `aria-controls` always resolves to a real
          element; only its contents come and go.
        */}
        <div id="site-nav-menu" className="sm:hidden">
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="menu"
                initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                animate={
                  reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }
                }
                exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.26, ease: EASE }}
                // Also the block formatting context that keeps the inner
                // margin from collapsing out of the measured height.
                className="overflow-hidden"
              >
                <ul className="mt-2.5 flex flex-col border-t border-white/[0.09] pt-1.5 pr-2">
                  {site.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg py-2.5 text-[15px] font-medium text-ink-300 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
