import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar1 />
      {children}

      <Footer2 />
    </div>
  );
}

export default layout;
