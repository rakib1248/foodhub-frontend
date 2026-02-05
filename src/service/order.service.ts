import { env } from "@/env";
import { cookies } from "next/headers";

export const orderService = {
  getOrder: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/order`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const order = await res.json();

      return { user: true, data: order, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  changeStatus: async (id: string, status: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/order/status/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const order = await res.json();

      return { user: true, data: order, error: null };
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
