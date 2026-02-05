import MealUpdateForm from "@/components/mealUpdateForm";
import { mealService } from "@/service/meal.service";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data } = await mealService.getSingleMeal(id);

  return (
    <div>
      <MealUpdateForm data={data?.data} id={id} />
    </div>
  );
}

export default page;
