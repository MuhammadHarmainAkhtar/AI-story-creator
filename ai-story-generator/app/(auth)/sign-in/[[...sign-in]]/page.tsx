import { SignIn } from "@clerk/nextjs";
import { div } from "framer-motion/client";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Image src={'/login.png'} alt="Login Image" width={1000} height={1000} className="w-full h-screen"/>
      </div>
      <div className="flex justify-center items-center h-screen"><SignIn /></div>
    </div>
  );
}
