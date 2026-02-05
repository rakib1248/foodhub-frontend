import { addToCard } from "@/actionServer/card.action";
import { toast } from "sonner";


function providerOrder( handleAddToCard ) {
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
  return <div></div>;
}

export default providerOrder
