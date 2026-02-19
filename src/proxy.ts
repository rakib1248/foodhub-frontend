// import { Roles } from '@/constants/roles';
import { NextRequest, NextResponse } from "next/server";

import { Roles } from "./constants/roles";

import { authService } from "./service/auth.service";

const providerRestrictedRoutes = [
  "/dashboard/profile/provider",
  "/dashboard/mealcreate",
  "/dashboard/meal",

];
const adminRestrictedRoutes = [
  "/dashboard/profile/admin",

];
const userRestrictedRoutes = ["/card", "/chackout"];

const providerAdminSharedRoutes = [
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
  const isUserRestrictedPath = userRestrictedRoutes.some((path) =>
    pathname.startsWith(path),
  );

    const isSharedPath = providerAdminSharedRoutes.some((path) =>
      pathname.startsWith(path),
    );

  

  const { data } = await authService.getSession();
  const isAuthenticated = !!data;
  const userRole: string | undefined = data?.user?.role;

  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ৩. Role-based access control
  if (isAuthenticated && userRole) {
    // Provider restricted routes
    if (isProviderRestrictedPath && userRole !== Roles.provider) {
      return NextResponse.redirect(new URL("/dashboard/profile", request.url));
    }

    // Admin restricted routes
    if (isAdminRestrictedPath && userRole !== Roles.admin) {
      return NextResponse.redirect(new URL("/dashboard/profile", request.url));
    }

    // Shared routes - শুধু Provider আর Admin access করতে পারবে
    if (
      isSharedPath &&
      userRole !== Roles.provider &&
      userRole !== Roles.admin
    ) {
      return NextResponse.redirect(new URL("/dashboard/profile", request.url));
    }

    // User/Customer restricted routes
    if (isUserRestrictedPath && userRole !== Roles.user) {
      return NextResponse.redirect(new URL("/dashboard/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/card",
    "/chackout",
  ],
};
