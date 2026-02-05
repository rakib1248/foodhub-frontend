import { GetToCard } from "@/actionServer/card.action";
import CheckoutForm from "@/components/ChackOut"


async function ChackoutPage() {
      const { data: response } = await GetToCard();
    
      const items = response?.data?.items || [];
  return (
      <div>
          
          <CheckoutForm cartData={response}/>
      
    </div>
  )
}

export default ChackoutPage
