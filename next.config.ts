import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol:"https",
        hostname:"lh3.googleusercontent.com",
        port:""
      }
    ],
  },
};

export default nextConfig;
