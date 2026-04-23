import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
      },

      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      }
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;