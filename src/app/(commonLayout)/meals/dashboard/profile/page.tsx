import { redirect } from 'next/navigation';
import React from 'react'

function page() {
  redirect("/dashboard/profile");
  return null
}

export default page
