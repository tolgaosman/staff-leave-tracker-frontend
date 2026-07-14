import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/izin-takip-projesi",
  assetPrefix: "/izin-takip-projesi/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
