import MealCreateForm from "@/components/mealCreate";
import { categoryService } from "@/service/category.service";
export const dynamic = "force-dynamic";

async function CreateMealpage() {
  const { data } = await categoryService.getAllCategory();

  return (
    <div className=" flex justify-center mt-7">
      <MealCreateForm meal={data?.data} />
    </div>
  );
}

export default CreateMealpage;
