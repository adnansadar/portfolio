import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { PageShell } from "@/components/sections/page-shell";
import { ProofStrip } from "@/components/sections/proof-strip";
import { References } from "@/components/sections/references";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Writing } from "@/components/sections/writing";

export default function Home() {
  return (
    <PageShell>
      <SiteNav />
      <main className="relative max-w-full overflow-x-hidden">
        <Hero />
        <ProofStrip />
        <CaseStudies />
        <References />
        <About />
        <Writing />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
    </PageShell>
  );
}
