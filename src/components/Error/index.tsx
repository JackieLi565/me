import { FC } from "react";
import Image from "next/image";
import cat from "../../../public/error.gif";

const Error: FC = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={cat} alt="sleepy cat" className="md:w-32 w-24" />
      <h2 className="font-code md:text-2xl text-xl text-center">
        Where Did My Blogs Go?
      </h2>
    </div>
  );
};

export default Error;
