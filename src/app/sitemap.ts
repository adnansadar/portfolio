import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, priority: 1 },
    { url: `${site.url}/blog`, lastModified, priority: 0.7 },
    // Derived, so a post's slug is written once and can't drift out of step
    // with its route. A published post's lastmod is its date, not today.
    ...articles.flatMap((article) =>
      article.slug
        ? [
            {
              url: `${site.url}/blog/${article.slug}`,
              lastModified: new Date(article.published),
              priority: 0.6,
            },
          ]
        : []
    ),
  ];
}
