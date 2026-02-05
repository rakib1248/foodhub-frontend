import { redirect } from "next/navigation";

function page() {
  redirect("/dashboard/profile");
  return null
}

export default page;
