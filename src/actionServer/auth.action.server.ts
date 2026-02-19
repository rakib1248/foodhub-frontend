"use server";

import { authClient } from "@/lib/auth-clint";
import { authService } from "@/service/auth.service";
import { redirect } from "next/navigation";

export const logOutServer = async () => {
  try {
    const result = await authService.logOut();
    console.log(result);
  } catch (error) {
    console.error("Logout failed", error);
  }

  // লগআউট শেষে রিডাইরেক্ট
  redirect("/login");
};
