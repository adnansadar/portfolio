import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
  images: {
    remotePatterns: [{ hostname: "placehold.co", protocol: "https" }],
  },
};

export default nextConfig;
