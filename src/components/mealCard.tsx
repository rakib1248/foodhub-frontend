"use client";

import Image from "next/image";
import { Star, ShoppingCart, Store, Utensils } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { meal } from "@/types";
import { addToCard } from "@/actionServer/card.action";
import { toast } from "sonner";
import Link from "next/link";

export function MealCard({ meal }: { meal: meal }) {
  const handleAddToCard = async (mealId: string) => {
    const lodingId = toast.loading("Add To Card");
    try {
      const { data } = await addToCard({ mealId });

      if (!data?.ok) {
        toast.error(data.message ? data.message : "Meal add Faild", {
          id: lodingId,
        });
        return;
      }
      toast.success("Meal add To Card Successfull", { id: lodingId });
    } catch (erro) {
      toast.error("someting went Wron Please Try Again", {
        id: lodingId,
      });
    }
  };
  const avgRating =
    meal.reviews?.length > 0
      ? (
          meal.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
          meal.reviews.length
        ).toFixed(1)
      : "No rating";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-slate-200">
      {/* ইমেজ সেকশন */}
      <Link href={`/meals/${meal.id}`}>
      <div className="relative h-48 w-full bg-slate-100">
        {meal.image ? (
          <Image
            src={meal.image}
            alt={meal.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Utensils size={40} />
            <span className="text-xs mt-2">No Image Available</span>
          </div>
        )}
        <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
          {meal?.category?.name}
        </Badge>
        </div>
        </Link>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-1">{meal.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 font-semibold">
            <Star size={16} fill="currentColor" />
            <span className="text-sm">{avgRating}</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px]">
          {meal.description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Store size={14} className="text-orange-500" />
          <span className="font-medium">{meal.provider?.businessName}</span>
        </div>
        <div className="text-2xl font-bold text-slate-900">৳{meal.price}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleAddToCard(meal.id)}
          className="w-full bg-slate-900 hover:bg-orange-600 text-white gap-2"
          disabled={!meal.isAvailable}>
          <ShoppingCart size={18} />
          {meal.isAvailable ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
