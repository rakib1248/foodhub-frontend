"use client";

import { ShoppingCart, Utensils } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { meal } from "@/types";
import { addToCard } from "@/actionServer/card.action";
import { toast } from "sonner";

function ProviderMeal({ meal }: { meal: meal }) {
  const handleAddToCard = async (mealId: string) => {
    const lodingId = toast.loading("Add To Card");
    try {
      const { data } = await addToCard({ mealId });

      if (!data.ok) {
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
  return (
    <div>
      <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {meal.image ? (
            <img
              src={meal.image}
              alt={meal.name}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-primary/5">
              <Utensils className="size-12 text-primary/20" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant={meal.isAvailable ? "default" : "destructive"}>
              {meal.isAvailable ? "Available" : "Sold Out"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {meal.name}
            </h3>
            <span className="text-2xl font-black text-primary">
              ${meal.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meal.description}
          </p>
          <Button
            onClick={() => handleAddToCard(meal.id)}
            className="w-full bg-slate-900 hover:bg-orange-600 text-white gap-2"
            disabled={!meal.isAvailable}>
            <ShoppingCart size={18} />
            {meal.isAvailable ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProviderMeal;
