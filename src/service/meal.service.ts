import { env } from "@/env";

import { cookies } from "next/headers";
import { object } from "zod";

export interface getMealParams {
  categoryId?: string;
  providerId?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  search?: string;
}

export const mealService = {
  mealCreate: async (data: {
    name: string;
    price: number;
    description: string;
    categoryId: string;
  }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/meal`, {
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
  getAllMeal: async (params?: getMealParams) => {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${env.NEXT_PUBLIC_BACKEND_URL}/api/meal`);

      if (params) {
        Object.entries(params).forEach(([Key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(Key, value);
          }
        });
      }
    

      const res = await fetch(url.toString(), {
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

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/meal/${id}`, {
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

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/meal/${id}`, {
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

      const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/meal/${id}`, {
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
