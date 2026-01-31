// import { NextRequest, NextResponse } from "next/server";
// import { authService } from "./services/authService";
// import { Roles } from "./constants/roles";

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // ১. সেশন ডাটা চেক করা
//   const { data } = await authService.getSession();
//   const isAuthenticated = !!data;
//   const isAdmin = data?.user?.role === Roles.admin;

//   // ২. যদি ইউজার লগইন না থাকে এবং ড্যাশবোর্ড বা প্রটেক্টেড পেজে যেতে চায়
//   if (
//     (!isAuthenticated && pathname.startsWith("/dashboard")) ||
//     pathname.startsWith("/admin-dashboard")
//   ) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   //  chack admin user route
//   if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   if (isAdmin && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/dashboard/:path*",
//     "/admin-dashboard",
//     "/admin-dashboard/:path*",
//     "/login",
//     "/register",
//   ],
// };
