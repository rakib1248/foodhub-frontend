"use server";

import { reviewService } from "@/service/review.service";

export const createReview = async (paylode: {
  mealId: string;
  rating: number;
  comment: string;
}) => {
  try {
    return await reviewService.createReview(paylode);
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
