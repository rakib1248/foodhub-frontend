"use client";

import { useState } from "react";
import {
  MapPin,
  ShoppingBag,
  CreditCard,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { placeOrder } from "@/actionServer/order.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Props type definition based on your data structure
interface CartItem {
  id: string;
  quantity: number;
  meal: {
    name: string;
    price: number;
  };
}

interface CheckoutProps {
  cartData: {
    data: {
      items: CartItem[];
    };
  };
  onBack?: () => void;
}

export default function CheckoutForm({ cartData, onBack }: CheckoutProps) {
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = cartData?.data?.items || [];

  const subTotal = items.reduce(
    (acc, item) => acc + item.meal.price * item.quantity,
    0,
  );

  const grandTotal = subTotal;

  const router = useRouter();
  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("দয়া করে আপনার ডেলিভারি অ্যাড্রেস লিখুন!");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await placeOrder(address);

      if (!data.ok) {
        toast.error(
          data?.message ? data?.message : "your Order Complete Faild",
        );
        router.push("/card");
        setIsSubmitting(false);
        return;
      }
      toast.success("your Order Complete Successfully");
      router.push("/dashboard/order");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button */}
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-slate-500 hover:text-orange-600">
          <ArrowLeft size={18} className="mr-2" /> কার্টে ফিরে যান
        </Button>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* ১. অর্ডার সামারি কার্ড */}
        <Card className="border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-100">
            <h2 className="font-bold flex items-center gap-2 text-slate-700">
              <ShoppingBag size={18} className="text-orange-500" /> Order
              Summary
            </h2>
          </div>
          <CardContent className="p-4">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">
                    {item.meal.name}{" "}
                    <span className="text-xs font-bold">x{item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    ৳{item.meal.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-dashed pt-3 mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span>৳{subTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span>Free Shipment</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-orange-600 pt-1">
                  <span>Grand Total</span>
                  <span>৳{grandTotal}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ২. অ্যাড্রেস ইনপুট ও পেমেন্ট কার্ড */}
        <Card className="border-orange-100 shadow-md ring-1 ring-orange-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1 mb-2">
                  <MapPin size={16} className="text-orange-500" /> Delivery
                  Address
                </label>
                <Textarea
                  placeholder="আপনার সঠিক ঠিকানা দিন (বাসা নং, রোড, এরিয়া...)"
                  className="min-h-[100px] border-slate-200 focus:ring-orange-500 focus:border-orange-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                <CreditCard size={20} className="text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-bold text-blue-800">
                    Payment Method
                  </p>
                  <p className="text-xs text-blue-600">
                    Cash on Delivery (ডেলিভারি পেয়ে টাকা দিন)
                  </p>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || !address.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-7 text-lg shadow-lg shadow-orange-200">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                    Processing...
                  </>
                ) : (
                  "Confirm Order"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
