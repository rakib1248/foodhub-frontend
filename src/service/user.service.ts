import { env } from "@/env";

import { cookies } from "next/headers";

export const userService = {
  getProfile: async () => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/auth/me`, {
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
  editProfile: async (id: string, data: { name: string }) => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const result = await res.json();

      return { user: true, data: result, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
};
