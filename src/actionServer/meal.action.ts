"use server";

import { mealService } from "@/service/meal.service";

import { revalidatePath } from "next/cache";

export const mealCreate = async (data: {
  name: string;
  price: number;
  description: string;
  categoryId: string;
}) => {
  try {
    const result = await mealService.mealCreate(data);
    revalidatePath("dashboard/meal");
    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};

export const deleteMeal = async (id: string) => {
  try {
    const result = await mealService.deleteMeal(id);
    revalidatePath("dashboard/meal");
    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};

export const mealUpdate = async (
  id: string,
  data: { name: string; description: string; price: number },
) => {
  try {
    return await mealService.getUpdateMeal(id, data);
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
