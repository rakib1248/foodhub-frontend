"use server";

import { authService } from "@/service/auth.service";
import { logineType } from "@/types";

export const logine = async (data: logineType) => {
  const response = await authService.logine(data);
  return response;
};
