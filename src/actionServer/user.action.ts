"use server";

import { userService } from "@/service/user.service";

export const editProfile = async (value: { id: string; name: string }) => {
  try {
    return await userService.editProfile(value.id, { name: value.name });
  } catch (error) {
    throw new Error("SomeTing Is wrong...");
  }
};
