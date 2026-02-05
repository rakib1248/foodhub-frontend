import OrderManagement from "@/components/OrderManagemant";
import { authService } from "@/service/auth.service";
import { orderService } from "@/service/order.service";
import React from "react";

async function Orderpage() {
  const { data } = await orderService.getOrder();
  const res = await authService.getSession();
    const userRole = res.data?.user?.role;
 
  return (
    <div>
      {" "}
      <OrderManagement orders={data?.data } userRole={userRole}  />
    </div>
  );
}

export default Orderpage;
