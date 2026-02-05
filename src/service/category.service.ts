import { env } from "@/env";
import { cookies } from "next/headers";

export const categoryService = {
  getAllCategory: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/category`, {
        headers: {
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const category = await res.json();

      return { user: true, data: category, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  createCategory: async (name: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/category`, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const category = await res.json();

      return { user: true, data: category, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  updateCategory: async (id: string , name: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/category/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const category = await res.json();

      return { user: true, data: category, error: null };
    } catch (error) {
      return {
        user: false,
        data: null,
        error: "something went wrong",
        details: error,
      };
    }
  },
  deleteCategory: async (id: string ) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/category/${id}`, {
        method: "DELETE",
      
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const category = await res.json();

      return { user: true, data: category, error: null };
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
