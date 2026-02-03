import * as React from "react";
import { BookUser, GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authService } from "@/service/auth.service";
import Link from "next/link";
import { Button } from "./ui/button";
import { logOutServer } from "@/actionServer/auth.action.server";

// This is sample data.
export const sidebarData: Record<string, any[]> = {
  ADMIN: [
    {
      title: "Admin Panel",
      items: [
        { title: "User Management", url: "/dashboard/users" },
        { title: "System Settings", url: "/dashboard/settings" },
        { title: "Reports", url: "/dashboard/reports" },
        { title: "My Profile", url: "/dashboard/profile" },
      ],
    },
  ],
  CUSTOMER: [
    {
      title: "My Activity",
      items: [
        { title: "Order History", url: "/dashboard/orders" },
        { title: "My Profile", url: "/dashboard/profile" },
        { title: "Wishlist", url: "/dashboard/wishlist" },
        { title: "My Profile", url: "/dashboard/profile" },
      ],
    },
  ],
  PROVIDER: [
    {
      title: "Service Management",
      items: [
        { title: "My Services", url: "/dashboard/my-services" },
        { title: "Create Meal", url: "/dashboard/mealcreate" },
        { title: "my All meal", url: "/dashboard/meal" },
        { title: "My Profile", url: "/dashboard/profile" },
      ],
    },
  ],
};

export async function AppSidebar({
  role,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const userdata = await authService.getSession();
  const user = userdata?.data?.user;
  const navMain = role ? sidebarData[role] : [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookUser className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium"> {user.name} </span>
                  <span className="">{user.email}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item, index) => (
              <SidebarMenuItem key={index + 1}>
                <SidebarMenuButton asChild>
                  <h1 className="font-medium">{item.title}</h1>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map(
                      (item: { title: string; url: string }, index: number) => (
                        <SidebarMenuSubItem key={index + 1}>
                          <SidebarMenuSubButton asChild>
                            <Link href={item.url}>{item.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ),
                    )}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <form action={logOutServer}>
        <Button
          type="submit"
          variant={"outline"}
          className=" w-full cursor-pointer">
          Log Out
        </Button>
      </form>
      <SidebarRail />
    </Sidebar>
  );
}
