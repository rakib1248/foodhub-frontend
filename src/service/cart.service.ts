import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { env } from "@/env";
import { cookies } from "next/headers";

export const cardService = {
  getCard: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/card`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const card = await res.json();

      return { user: true, data: card, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  addToCard: async (data: { mealId: string; quantity?: number }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/card`, {
        method: "POST",
        body: JSON.stringify({
          mealId: data.mealId,
          quantity: data.quantity ?? 1,
        }),

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const card = await res.json();

      return { user: true, data: card, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  updateQuwantityCard: async (id: string, data: { quantity: number }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/card/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
        next: { tags: ["quwantity"] },
      });
      const card = await res.json();

      return { user: true, data: card, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  removeCard: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/card/${id}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const card = await res.json();

      return { user: true, data: card, error: null };
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
