import Link from "next/link";

import { SiteNav } from "@/components/sections/site-nav";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteNav homeHref="/" />
      <main className="shell flex flex-1 flex-col items-start justify-center gap-6 py-[clamp(160px,30vh,280px)]">
        <div className="font-mono text-xs tracking-[0.09em] text-ink-700">
          404 — NOT FOUND
        </div>
        <h1 className="max-w-[18ch] text-[clamp(32px,5vw,64px)] leading-none font-black tracking-[-0.035em]">
          That page doesn&apos;t exist.
        </h1>
        <Button asChild size="cta" variant="outline">
          <Link href="/">← Back to work</Link>
        </Button>
      </main>
    </>
  );
}
