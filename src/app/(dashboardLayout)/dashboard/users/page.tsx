import UserManagementTable from "@/components/adminUserMange";
import { userService } from "@/service/user.service";
import React from "react";

async function userspage() {
  const { data } = await userService.getUser();

  const userData = data?.data;
  return (
    <div>
      <UserManagementTable users={userData} />
    </div>
  );
}

export default userspage;
