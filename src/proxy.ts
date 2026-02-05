import { Roles } from "@/constants/roles";
import { NextRequest, NextResponse } from "next/server";
// import { authService } from "./services/authService";

import { authService } from "./service/auth.service";

const providerRestrictedRoutes = [
  "/dashboard/profile/provider",
  "/dashboard/mealcreate",
  "/dashboard/meal",
  "/dashboard/category",
  "/dashboard/categorycreate",
];
const adminRestrictedRoutes = [
  "/dashboard/profile/admin",
  "/dashboard/category",
  "/dashboard/categorycreate",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProviderRestrictedPath = providerRestrictedRoutes.some((path) =>
    pathname.startsWith(path),
  );
  const isAdminRestrictedPath = adminRestrictedRoutes.some((path) =>
    pathname.startsWith(path),
  );

  // ১. সেশন ডাটা চেক করা
  const { data } = await authService.getSession();
  const isAuthenticated = !!data;
  const isRole: string = data?.user?.role;

  // ২. যদি ইউজার লগইন না থাকে এবং ড্যাশবোর্ড বা প্রটেক্টেড পেজে যেতে চায়
  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isRole !== Roles.provider && isProviderRestrictedPath) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login", "/register"],
};
