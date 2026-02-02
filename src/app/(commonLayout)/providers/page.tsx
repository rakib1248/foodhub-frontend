import ProviderList from "@/components/getProvider"
import { providerService } from "@/service/provider.service"


async function ProviderPage() {
  const {data} = await providerService.getAllProvider()
  const provider = data?.data
  console.log(provider)
  return (
    <div>
     <ProviderList providers={provider}/>
     
    </div>
  )
}

export default ProviderPage
