import { MealCard } from "@/components/mealCard";
import { mealService } from "@/service/meal.service";
import { meal } from "@/types";
export const dynamic = "force-dynamic";

async function MealPage() {
  const { data } = await mealService.getAllMeal();
  const meal = data?.data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
      {meal?.map((item : meal) => {
        return (
          <div key={item.id}>
            <MealCard meal={item} />
          </div>
        );
      })}
    </div>
  );
}

export default MealPage;
