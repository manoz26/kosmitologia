/* Canonical origin for absolute URLs (metadata, sitemap, robots). The Vercel
   deployment is the live site today; when the programme moves to its own
   domain (e.g. cosm.ihu.gr), set NEXT_PUBLIC_SITE_URL there instead of
   touching code. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kosmitologia.vercel.app";
