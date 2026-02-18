import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL, //"http://localhost:5050/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
