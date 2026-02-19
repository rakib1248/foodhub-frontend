import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // FRONTEND_URL: z.url(),
    // BACKEND_URL: z.url(),
    // AUTH_URL: z.url(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
  },

  // client: {
  //   NEXT_PUBLIC_TEST_VALUE: z.string(),
  // },
  client: {
    NEXT_PUBLIC_FRONTEND_URL: z.url(),
    NEXT_PUBLIC_BACKEND_URL: z.url(),
    NEXT_PUBLIC_AUTH_URL: z.url(),
  },

  clientPrefix: "NEXT_PUBLIC_",

  runtimeEnv: {
    // FRONTEND_URL: process.env.FRONTEND_URL,
    // BACKEND_URL: process.env.BACKEND_URL,
    // AUTH_URL: process.env.AUTH_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    // NEXT_PUBLIC_TEST_VALUE: process.env.NEXT_PUBLIC_TEST_VALUE,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
  },
});
