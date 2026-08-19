import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { References } from "@/components/sections/references";
import { SectionRule } from "@/components/sections/section-rule";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Writing } from "@/components/sections/writing";
import { statsRule } from "@/content/stats";
import { writing } from "@/content/articles";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="relative max-w-full overflow-x-hidden">
        <Hero />
        <SectionRule label={statsRule} className="pb-[30px]" />
        <ProofStrip />
        <CaseStudies />
        <References />
        <About />
        <SectionRule
          label={writing.rule}
          align="right"
          className="pt-[clamp(40px,6vh,64px)]"
        />
        <Writing />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
