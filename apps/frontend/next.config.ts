import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@cadence/design-system"],
  // (any other custom Next.js settings you had)
};

export default nextConfig;
