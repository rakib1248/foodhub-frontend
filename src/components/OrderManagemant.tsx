"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Clock, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns"; // npm install date-fns
import { cencelStatus, changhStatus } from "@/actionServer/order.action";
import { toast } from "sonner";
import { Roles } from "@/constants/roles";

// স্ট্যাটাস অনুযায়ী কালার সেট করা
const getStatusStyles = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "PREPARING":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "READY":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "DELIVERED":
      return "bg-green-100 text-green-700 border-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function OrderManagement({
  orders,
  userRole,
}: {
  orders: any[];
  userRole: "ADMIN" | "PROVIDER" | "CUSTOMER";
}) {
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (userRole === "CUSTOMER") {
      try {
        const { data } = await cencelStatus(orderId, newStatus);

        if (!data.ok) {
          toast.error(data?.message ? data?.message : "Status Update Faild");
          return;
        }
        toast.success("Status Update Successfully");
        return;
      } catch (error) {
        toast.error("someting is Wrong Please Try agaian");
      }
    }

    try {
      const { data } = await changhStatus(orderId, newStatus);

      if (!data.ok) {
        toast.error(data?.message ? data?.message : "Status Update Faild");
        return;
      }
      toast.success("Status Update Successfully");
    } catch (error) {
      toast.error("someting is Wrong Please Try agaian");
    }
  };

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Customer & Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => {
            const isFinalStatus =
              order.status === "DELIVERED" || order.status === "CANCELLED";
            const canEditStatus = userRole === "PROVIDER" && !isFinalStatus;
            const canCancel =
              userRole === "CUSTOMER" && order.status === "PLACED";

            return (
              <TableRow key={order.id} className="hover:bg-slate-50/50">
                <TableCell className="font-mono text-xs text-slate-500">
                  #{order.id.slice(-6)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">
                      {order.customer.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {format(new Date(order.createdAt), "dd MMM yyyy, p")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="text-sm text-slate-600 truncate">
                        • {item.meal.name}{" "}
                        <span className="text-orange-500 font-bold">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-900">
                  ৳{order.totalAmount}
                </TableCell>
                <TableCell className="text-sm text-slate-500 max-w-[150px] truncate">
                  {order.address}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusStyles(order.status)} font-semibold`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {/* ADMIN/PROVIDER STATUS UPDATE */}
                  {canEditStatus ? (
                    <Select
                      onValueChange={(val) =>
                        handleStatusChange(order.id, val)
                      }>
                      <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PREPARING">Preparing</SelectItem>
                        <SelectItem value="READY">Ready</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancel Order</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : canCancel ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleStatusChange(order.id, "CANCELLED")}>
                      Cancel
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      No Actions
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
