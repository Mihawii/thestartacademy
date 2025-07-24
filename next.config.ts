import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src/app', 'src/components', 'src/lib'],
  },
};

export default nextConfig;
