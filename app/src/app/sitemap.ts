import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

const pages = ["", "/labo", "/profile", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}

