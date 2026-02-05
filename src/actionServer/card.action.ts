"use server";

import { cardService } from "@/service/cart.service";
import { updateTag } from "next/cache";

export const addToCard = async (data: {
  mealId: string;
  quantity?: number;
}) => {
  try {
    const result = await cardService.addToCard(data);

    updateTag("quwantity");
    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
export const GetToCard = async () => {
  try {
    const result = await cardService.getCard();

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("SomeTing Is wrong...");
  }
};
export const updateQuwantity = async (
  id: string,
  data: { quantity: number },
) => {
  try {
    const result = await cardService.updateQuwantityCard(id, data);

    updateTag("quwantity");
    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
export const removeToCard = async (id: string) => {
  try {
    const result = await cardService.removeCard(id);

    updateTag("quwantity");
    return result;
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
