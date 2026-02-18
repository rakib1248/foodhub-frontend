import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://foodhut-backend-k0z2.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
