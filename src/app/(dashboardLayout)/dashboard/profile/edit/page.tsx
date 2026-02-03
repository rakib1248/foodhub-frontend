import EditForm from "@/components/updateForm";
import { authService } from "@/service/auth.service";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

async function Updatepage() {
  const userdata = await authService.getSession();
  const user = userdata?.data?.user;
  return (
    <div>
      <Link
        href="/dashboard/profile"
        className="flex m-5 items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="size-4" /> Back to Profile
      </Link>
      <EditForm data={user} />
    </div>
  );
}

export default Updatepage;
