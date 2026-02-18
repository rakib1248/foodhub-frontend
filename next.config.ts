import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://food-hub-back-end.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
