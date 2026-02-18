import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async headers() {
    return [
      {
        // ব্যাকএন্ডের সাথে কুকি আদান-প্রদান সহজ করতে
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://foodhub-frontend-tau.vercel.app",
          },
        ],
      },
    ];
  },

  images: {
    domains: ["images.unsplash.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://foodhut-backend-k0z2.onrender.com/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
