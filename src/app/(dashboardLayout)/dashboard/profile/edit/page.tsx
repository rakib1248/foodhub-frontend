import EditForm from "@/components/updateForm";
import { authService } from "@/service/auth.service";
import React from "react";

async function Updatepage() {
  const userdata = await authService.getSession();
  const user = userdata?.data?.user;
  return (
    <div>
      <EditForm data={user} />
    </div>
  );
}

export default Updatepage;
