"use client";

import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cencelStatus, changhStatus } from "@/actionServer/order.action";
import { toast } from "sonner";
import { createReview } from "@/actionServer/review.action";

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
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const action = userRole === "CUSTOMER" ? cencelStatus : changhStatus;
    try {
      const { data } = await action(orderId, newStatus);
      if (!data.ok) {
        toast.error(data?.message || "Status Update Failed");
        return;
      }
      toast.success("Status Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };



  const submitReview = async () => {
    if (rating === 0) return toast.error("Please select a rating");

    try {
      // Loading toast show করুন
      const loadingToast = toast.loading("Submitting your review...");

    
      const reviewPromises = selectedOrder.items.map(async (i: any) => {
        const payload = {
          rating,
          comment,
          mealId: i.mealId as string,
        };

        const { data } = await createReview(payload);
        return data;
      });

    
      const results = await Promise.all(reviewPromises);

  
      toast.dismiss(loadingToast);

     
      if (results[0]?.message) {
        toast.success(results[0].message);
      } else {
        toast.success("Review submitted successfully!");
      }

   
      setIsReviewModalOpen(false);
      setRating(0);
      setComment("");

      console.log("Review results:", results);
    } catch (error: any) {
     
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit review";

      toast.error(errorMessage);
      console.error("Review submission error:", error);
    }
  };

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Order Info</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
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
            const canGiveReview =
              userRole === "CUSTOMER" && order.status === "DELIVERED";

            return (
              <TableRow key={order.id} className="hover:bg-slate-50/50">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-slate-400">
                      #{order.id.slice(-6)}
                    </span>
                    <span className="font-medium text-slate-900">
                      {order.customer.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {format(new Date(order.createdAt), "dd MMM, p")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[180px]">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="text-xs text-slate-600 truncate">
                        • {item.meal.name} x{item.quantity}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-sm">
                  ৳{order.totalAmount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getStatusStyles(order.status)} text-[10px] uppercase font-bold`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {canGiveReview && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsReviewModalOpen(true);
                        }}>
                        <Star size={14} className="mr-1 fill-orange-600" />{" "}
                        Review
                      </Button>
                    )}

                    {canEditStatus ? (
                      <Select
                        onValueChange={(val) =>
                          handleStatusChange(order.id, val)
                        }>
                        <SelectTrigger className="w-[120px] h-8 text-[10px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PREPARING">Preparing</SelectItem>
                          <SelectItem value="READY">Ready</SelectItem>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="CANCELLED">Cancel</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : canCancel ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() =>
                          handleStatusChange(order.id, "CANCELLED")
                        }>
                        Cancel
                      </Button>
                    ) : (
                      !canGiveReview && (
                        <span className="text-[10px] text-slate-300 italic">
                          No Action
                        </span>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* --- Review Modal --- */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="text-orange-500" /> Rate Your Meal
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4 text-center">
            <p className="text-sm text-slate-500 italic">
              #{selectedOrder?.id.slice(-6)} অর্ডারের খাবারগুলো কেমন ছিল?
            </p>

            {/* Star Rating UI */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90">
                  <Star
                    size={32}
                    className={`${
                      star <= rating
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <Textarea
              placeholder="আপনার অভিজ্ঞতা শেয়ার করুন (ঐচ্ছিক)"
              className="resize-none border-slate-200"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={submitReview}>
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
