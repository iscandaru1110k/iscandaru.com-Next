import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";

// 公開ルートを追加したらここに追記する
const pages = [
  { path: "", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/projects/tiktok-live", priority: 0.9 },
  { path: "/profile", priority: 0.8 },
  { path: "/labo", priority: 0.7 },
  { path: "/labo/birthday", priority: 0.5 },
  { path: "/labo/date-diff", priority: 0.5 },
  { path: "/labo/date-addition", priority: 0.5 },
  { path: "/labo/countdown", priority: 0.5 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
