import { env } from "@/env";
import { cookies } from "next/headers";

export const providerService = {
      getAllProvider: async () => {
        // Implementation for setting session
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${env.BACKEND_URL}/api/provider`, {
            headers: {
              Cookie: cookieStore.toString(),
            },
    
            cache: "no-store",
          });
          const provider = await res.json();
    
          return { user: true, data: provider, error: null };
        } catch (error) {
          return {
            user: false,
            data: null,
            error: "something went wrong",
            details: error,
          };
        }
      },
      getSingleProvider: async (id: string) => {
        // Implementation for setting session
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${env.BACKEND_URL}/api/provider/${id}`, {
            headers: {
              Cookie: cookieStore.toString(),
            },
    
            cache: "no-store",
          });
          const provider = await res.json();
    
          return { user: true, data: provider, error: null };
        } catch (error) {
          return {
            user: false,
            data: null,
            error: "something went wrong",
            details: error,
          };
        }
      },
}