"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { removeToCard, updateQuwantity } from "@/actionServer/card.action";

export default function CartItems({ items }: { items: any[] }) {
  const subTotal = items.reduce(
    (acc, item) => acc + item.meal.price * item.quantity,
    0,
  );

  const onUpdateQuantity = async (id: string, quantity: number) => {
    try {
      const { data } = await updateQuwantity(id, { quantity });

      if (!data.ok) {
        toast.error(data?.message ? data?.message : "Quwantity Update Faild");
        return;
      }
      toast.success(
        data?.message ? data.message : "Quwantity Update  Successfully",
      );
    } catch (error) {
      toast.error("someting is Wrong Please Try agaian");
    }
  };
    const onRemove = async (id: string) => {
        try {
          const { data } = await removeToCard(id);

          if (!data.ok) {
            toast.error(
              data?.message ? data?.message : "Quwantity Removed Faild",
            );
            return;
          }
          toast.success(
            data?.message ? data.message : "Quwantity Removed  Successfully",
          );
        } catch (error) {
          toast.error("someting is Wrong Please Try agaian");
        }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="border-slate-100 shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              {/* Image */}
              <div className="relative h-20 w-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                {item.meal.image ? (
                  <Image
                    src={item.meal.image}
                    alt={item.meal.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[10px] text-slate-300">
                    No Image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h3 className="font-bold text-slate-800 leading-tight mb-1">
                  {item.meal.name}
                </h3>
                <p className="text-sm font-semibold text-orange-600 mb-2">
                  ৳{item.meal.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-md border-slate-200"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}>
                    -
                  </Button>
                  <span className="w-8 text-center text-sm font-bold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-md border-slate-200"
                    onClick={() =>
                      onUpdateQuantity(item.id, item.quantity + 1)
                    }>
                    +
                  </Button>
                </div>
              </div>

              {/* Total & Delete */}
              <div className="text-right flex flex-col justify-between items-end h-20">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                  onClick={() => onRemove(item.id)}>
                  <Trash2 size={16} />
                </Button>
                <p className="font-bold text-slate-900">
                  ৳{item.meal.price * item.quantity}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-slate-50 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="text-xl font-bold text-slate-900">৳{subTotal}</p>
        </div>
        <Button disabled asChild className="bg-slate-900 hover:bg-orange-600">
          <Link href="/chackout"> Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
