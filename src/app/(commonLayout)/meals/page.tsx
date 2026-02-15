import { getMeal } from "@/actionServer/meal.action";
import { MealCard } from "@/components/mealCard";
import { MealFilters } from "@/components/MealFilter";
import { getMealParams } from "@/service/meal.service";
import { meal } from "@/types";

export const dynamic = "force-dynamic";

export interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
    providerId?: string;
    minPrice?: string;
    maxPrice?: string;
    isAvailable?: string;
    search?: string;
  }>;
}

async function MealPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters = {
    categoryId: params.categoryId,
    providerId: params.providerId,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    isAvailable: params.isAvailable === "true" ? true : undefined,
    search: params.search,
  };

  const { data } = await getMeal(filters);
  const meal = data?.data;
  
  return (
    <div className="container mx-auto p-4">
      <MealFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
        {meal?.map((item: meal) => {
          return (
            <div key={item.id}>
              <MealCard meal={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MealPage;
