import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
    ];
  },
};


export default nextConfig;
