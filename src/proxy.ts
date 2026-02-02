import { Roles } from "@/constants/roles";
import { NextRequest, NextResponse } from "next/server";
// import { authService } from "./services/authService";

import { authService } from "./service/auth.service";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ১. সেশন ডাটা চেক করা
  const { data } = await authService.getSession();
  const isAuthenticated = !!data;
  const isRole: string = data?.user?.role;

  // ২. যদি ইউজার লগইন না থাকে এবং ড্যাশবোর্ড বা প্রটেক্টেড পেজে যেতে চায়
    if (!isAuthenticated && pathname.startsWith("/dashboard"))
    {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/register"],
};
