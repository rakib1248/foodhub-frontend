import { env } from "@/env";

import { cookies } from "next/headers";

export const mealService = {
  mealCreate: async (data: {
    name: string;
    price: number;
    description: string;
    categoryId: string;
  }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/meal`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const meal = await res.json();

      return { user: true, data: meal, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  getAllMeal: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/meal`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const meal = await res.json();

      return { user: true, data: meal, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  getSingleMeal: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/meal/${id}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const meal = await res.json();

      return { user: true, data: meal, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  getUpdateMeal: async (
    id: string,
    data: { name: string; description: string; price: number },
  ) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/meal/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const meal = await res.json();

      return { user: true, data: meal, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  deleteMeal: async (id: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/meal/${id}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const meal = await res.json();

      return { user: true, data: meal, error: null };
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
