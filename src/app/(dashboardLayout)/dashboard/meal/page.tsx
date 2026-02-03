import ProviderMenuManager from "@/components/providerMeals";
import { providerService } from "@/service/provider.service";
import { userService } from "@/service/user.service";

async function Mealpage() {
  const profile = await userService.getProfile();
  const providerId = profile?.data?.data?.providerProfile?.id;

  const { data } = await providerService.getSingleProvider(providerId);
  console.log(data);
  return (
    <div className="">
      <ProviderMenuManager />
    </div>
  );
}

export default Mealpage;
