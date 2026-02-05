import CategoryManager from "@/components/categoryManagment";
import { categoryService } from "@/service/category.service";

export const dynamic = "force-dynamic";

async function Categorypage() {
  const { data } = await categoryService.getAllCategory();
  return (
    <div>
      <CategoryManager categories={data?.data} />
    </div>
  );
}

export default Categorypage;
