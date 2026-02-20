"use client"

import { authClient } from '@/lib/auth-clint';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';


function Logout() {
    const handleLogout = async () => {
        const router = useRouter();
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/login");
              router.refresh();
            },
          },
        });
      };
  return (
    <div>
     
        <Button
          onClick={handleLogout}
          variant={"outline"}
          className=" w-full cursor-pointer">
          Log Out
        </Button>
     
    </div>
  );
}

export default Logout
