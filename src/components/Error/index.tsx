import { FC } from "react";
import Image from "next/image";
import cat from "../../../public/error.gif";

type ErrorProps = {
  message: string;
};
const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src={cat} alt="sleepy cat" className="md:w-32 w-24 m-0" />
      <h2 className="font-code text-paragraph md:text-2xl text-xl text-center m-0">
        {message}
      </h2>
    </div>
  );
};

export default Error;
