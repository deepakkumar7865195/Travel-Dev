import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { destinations } from "@/lib/data/destinations";
import { packages } from "@/lib/data/packages";
import { experiences } from "@/lib/data/experiences";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/destinations",
    "/packages",
    "/trip-planner",
    "/experiences",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${siteConfig.url}/destinations#${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const packageRoutes: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${siteConfig.url}/packages#${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map((e) => ({
    url: `${siteConfig.url}/experiences#${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...destinationRoutes, ...packageRoutes, ...experienceRoutes];
}
