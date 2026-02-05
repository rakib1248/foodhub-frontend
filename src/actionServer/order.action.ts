"use server";
import { orderService } from "@/service/order.service";

import { revalidatePath } from "next/cache";

export const changhStatus = async (id: string, status: string) => {
  try {
    const result = await orderService.changeStatus(id, status);
    revalidatePath("/dashboard/order");

    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
