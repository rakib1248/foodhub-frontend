import CartItems from "@/components/CartComponent";
import { cardService } from "@/service/cart.service";
import React from "react";

async function Cardpage() {
  const { data: response } = await cardService.getCard();

 
  const items = response?.data?.items || [];

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-400">
          Your Cart Is Empty 🛒
        </h2>
        <p className="text-slate-500 mt-2">
          Add some delicious meals to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* আমরা ক্লায়েন্ট কন্টেইনারে আইটেমগুলো পাঠাচ্ছি */}
      <CartItems items={items}/>
    </div>
  );
}
export default Cardpage;
