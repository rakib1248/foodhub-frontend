import ProviderMenuManager from "@/components/providerMeals";
import { providerService } from "@/service/provider.service";
import { userService } from "@/service/user.service";
export const dynamic = "force-dynamic";
async function Mealpage() {
  const profile = await userService.getProfile();
  const providerId = profile?.data?.data?.providerProfile?.id;

  const { data } = await providerService.getSingleProvider(providerId);
  if (!providerId) {
    return (
      <>
      
        <div className="">
           <p>No provider profile found.</p>
        </div>
        
      </>
    );
  }

  return (
    <div className="">
      <ProviderMenuManager data={data} />
    </div>
  );
}

export default Mealpage;
