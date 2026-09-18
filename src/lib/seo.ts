import type { Metadata } from "next";
import { site } from "@/content/site";

export const absoluteUrl = (path: string) => new URL(path, site.url).href;
export const personId = `${site.url}/#person`;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description, url: path, siteName: site.name, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} · ${site.role}` }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export function headingId(text: string, index: number) {
  return `${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${index + 1}`;
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
}
