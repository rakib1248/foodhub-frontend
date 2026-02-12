"use server";

import { categoryService } from "@/service/category.service";
import { revalidatePath } from "next/cache";

export const createCategory = async (name: string) => {
  try {
    return await categoryService.createCategory(name);
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
export const getCategory = async () => {
  try {
    return await categoryService.getAllCategory();
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
export const updateCategory = async (id: string, name: string) => {
  try {
    const result = await categoryService.updateCategory(id, name);
    revalidatePath("/dashboard/category");

    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const result = await categoryService.deleteCategory(id);
    revalidatePath("/dashboard/category");
    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
