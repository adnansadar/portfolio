import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, priority: 1 },
    { url: `${site.url}/case-studies`, lastModified, priority: 0.8 },
    { url: `${site.url}/blog`, lastModified, priority: 0.7 },
  ];
}
