import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",      // optional
        pathname: "/**" // allow all paths
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  }

};

export default nextConfig;
