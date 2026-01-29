import { Navbar1 } from "@/components/navbar1";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    
      <Navbar1 />
      {children}
    </div>
  );
}

export default layout;
