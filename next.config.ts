import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Pages merged in the 5-page architecture (docs/protasi-anadiamorfosis.md,
     Αλλαγή 1): the old URLs keep working and land on the new section. */
  async redirects() {
    return [
      { source: "/didaskotes", destination: "/sxetika#didaskontes", permanent: true },
      { source: "/karieres", destination: "/programma#karieres", permanent: true },
      { source: "/ergastiria", destination: "/sxetika#ergastiria", permanent: true },
    ];
  },
};

export default nextConfig;
