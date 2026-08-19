import type { Metadata } from "next";
import Link from "next/link";

import { CaseStudyPanel } from "@/components/sections/case-study-panel";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Button } from "@/components/ui/button";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description: caseStudiesPage.blurb,
};

export default function CaseStudiesPage() {
  return (
    <>
      <SiteNav homeHref="/" />
      <main className="shell relative flex-1 pt-[clamp(140px,20vh,200px)] pb-[clamp(72px,10vh,120px)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs tracking-[0.08em] text-ink-400">
              {caseStudiesPage.eyebrow}
            </div>
            <h1 className="mt-3.5 text-[clamp(32px,4vw,56px)] font-black tracking-[-0.035em]">
              {caseStudiesPage.title}
            </h1>
            <p className="mt-3 max-w-[62ch] text-base leading-[1.6] text-ink-400">
              {caseStudiesPage.blurb}
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            size="cta"
            className="transition-transform hover:-translate-y-0.5"
          >
            <Link href="/#work">← Back to work</Link>
          </Button>
        </div>

        {caseStudies.map((study, i) => (
          <CaseStudyPanel key={study.title} study={study} first={i === 0} detail />
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
