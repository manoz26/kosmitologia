import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/* The 5 pages of the redesign + /nea. The /light/* drafts are deliberately
   absent (noindex previews); /didaskotes, /karieres, /ergastiria redirect. */
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/programma", priority: 0.9 },
  { path: "/eggrafes", priority: 0.9 },
  { path: "/sxetika", priority: 0.7 },
  { path: "/nea", priority: 0.5 },
  { path: "/epikoinonia", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
