import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adnansadar.com";

  // Add all your static routes
  const routes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/contact",
    "/projects/investors-engine",
  ].map((route) => {
    const isHome = route === "";
    const isCaseStudy = route.includes("/projects/");

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: (isHome ? "monthly" : "weekly") as "monthly" | "weekly",
      priority: isHome ? 1 : isCaseStudy ? 0.9 : 0.8,
    };
  });

  return routes;
}
