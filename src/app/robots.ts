import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Draft "light" variants — noindex'd individually too, but keeping
         crawlers out entirely avoids duplicate-content signals. */
      disallow: "/light",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
