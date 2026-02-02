"use server";

import { authClient } from "@/lib/auth-clint";
import { authService } from "@/service/auth.service";
import { redirect } from "next/navigation";

export const logOutServer = async () => {
  try {
    await authService.logOut();

  } catch (error) {
    console.error("Logout failed", error);
  }

  // লগআউট শেষে রিডাইরেক্ট
  redirect("/login");
};
