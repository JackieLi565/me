import { FC } from "react";
import loadingIcon from "../../../public/loader.svg";
import Image from "next/image";

const Loader: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={loadingIcon} alt="loading bars" className="w-[80px]"></Image>
    </div>
  );
};

export default Loader;
