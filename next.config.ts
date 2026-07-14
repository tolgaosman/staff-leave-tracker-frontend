import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/staff-leave-tracker-frontend",
  assetPrefix: "/staff-leave-tracker-frontend/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
