import { env } from "@/env";

import { cookies } from "next/headers";

export const authService = {
  getSession: async () => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      return { user: true, data: session, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  logOut: async () => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_AUTH_URL}/sign-out`, {
        method: "POST",
        headers: {
          Origin: env.NEXT_PUBLIC_FRONTEND_URL,
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      console.log(await res.json());
    } catch (error) {
      return error;
    }
  },
};
