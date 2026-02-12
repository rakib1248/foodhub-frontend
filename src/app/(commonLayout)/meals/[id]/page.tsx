

import { MealDetailsClient } from "@/components/MealSinglePage";
import { mealService } from "@/service/meal.service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MealDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const { data } = await mealService.getSingleMeal(id)

  if (!data?.data) {
    notFound();
  }

  return <MealDetailsClient meal={data.data} />;
}