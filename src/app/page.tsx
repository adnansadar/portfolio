import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Designs } from "@/components/sections/designs";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { PageShell } from "@/components/sections/page-shell";
import { ProofStrip } from "@/components/sections/proof-strip";
import { References } from "@/components/sections/references";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Writing } from "@/components/sections/writing";
import { StructuredData } from "@/components/structured-data";
import { site, about } from "@/content/site";
import { absoluteUrl, pageMetadata, personId } from "@/lib/seo";

export const metadata = pageMetadata(
  `${site.name} · ${site.role}`,
  "Adnan Sadar: frontend and full-stack engineer, technical writer in Pune, India. Explore React, Next.js and TypeScript projects and practical engineering articles.",
  "/",
);
metadata.title = { absolute: `${site.name} · ${site.role}` };

export default function Home() {
  return (
    <PageShell>
      <StructuredData data={{ "@graph": [
        { "@type": "Person", "@id": personId, name: site.name, url: site.url,
          jobTitle: site.role, description: about.body, image: absoluteUrl("/hero.webp"),
          sameAs: site.socials.filter((link) => link.href.startsWith("https://") && new URL(link.href).pathname !== "/").map((link) => link.href),
          knowsAbout: ["React", "Next.js", "TypeScript", "Frontend architecture", "Full-stack development", "Technical writing"],
        },
        { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en", publisher: { "@id": personId } },
        { "@type": "ProfilePage", "@id": `${site.url}/#webpage`, url: site.url, name: `${site.name} · ${site.role}`, mainEntity: { "@id": personId }, isPartOf: { "@id": `${site.url}/#website` } },
      ] }} />
      <SiteNav />
      <main className="relative max-w-full overflow-x-hidden">
        <Hero />
        <ProofStrip />
        <CaseStudies />
        <Designs />
        <Writing />
        <About />
        <References />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
    </PageShell>
  );
}
