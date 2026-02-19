
import { env } from "@/env";

import { cookies } from "next/headers";

export const userService = {
  getProfile: async () => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
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
  getUser: async () => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
        headers: {
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const users = await res.json();

      return { user: true, data: users, error: null };
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

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/user/${id}`, {
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
  editStatus: async ( data: { status: string  , id: string}) => {
    // Implementation for setting session
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/user/${data.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: data.status }),
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },

          cache: "no-store",
        },
      );
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
