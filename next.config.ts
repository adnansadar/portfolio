import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.adnansadar.com" }],
      destination: "https://adnansadar.com/:path*",
      permanent: true,
    }];
  },
};

export default nextConfig;
