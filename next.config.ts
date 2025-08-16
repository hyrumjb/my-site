import type { NextConfig } from "next";

const nextConfig: NextConfig & { experimental?: { appDir?: boolean } }= {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
