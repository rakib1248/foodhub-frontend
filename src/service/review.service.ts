import { env } from "@/env";
import { cookies } from "next/headers";

export const reviewService = {
  createReview: async (paylode: {
    mealId: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.BACKEND_URL}/api/creat-review`, {
        method: "POST",
        body: JSON.stringify(paylode),
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },

        cache: "no-store",
      });
      const review = await res.json();

      return { user: true, data: review, error: null };
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
