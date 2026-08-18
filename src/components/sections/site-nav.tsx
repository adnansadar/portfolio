import Link from "next/link";

import { ResumeButton } from "@/components/resume-button";
import { site } from "@/content/site";

/**
 * The floating pill nav. Custom markup rather than a shadcn primitive — it is a
 * one-off composition and Radix adds nothing here.
 */
export function SiteNav({ homeHref = "#top" }: { homeHref?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-80 flex justify-center px-3 py-[clamp(10px,2vw,18px)] sm:px-6">
      <nav className="flex w-full max-w-[1200px] flex-wrap items-center gap-x-[clamp(12px,2vw,26px)] gap-y-2 rounded-3xl border border-white/[0.09] bg-[rgba(11,12,15,0.66)] py-2.5 pr-3 pl-5 shadow-[0_18px_50px_-28px_rgba(0,0,0,.95)] backdrop-blur-[18px] backdrop-saturate-150">
        <Link
          href={homeHref}
          className="text-[15px] font-bold tracking-[-0.01em]"
        >
          {site.name}
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-x-[clamp(12px,1.6vw,20px)] gap-y-2">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <ResumeButton size="pill" meta={undefined}>
            <span aria-hidden className="font-mono text-[13px]">
              ↓
            </span>
            Download Resume
          </ResumeButton>
        </div>
      </nav>
    </header>
  );
}
