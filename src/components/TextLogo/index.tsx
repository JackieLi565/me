import { StaticImageData } from "next/image";
import { FC } from "react";
import Image from "next/image";
type TextLogoProps = {
  logo: StaticImageData;
  size: string;
  children?: string;
};
const TextLogo: FC<TextLogoProps> = ({ logo, size, children }) => {
  return (
    <span className="inline-flex justify-center items-center   w-fit py-1 px-2 space-x-2 bg-neutral-800 border border-neutral-600 rounded-md">
      <Image src={logo} alt="" className={size} />
      <span className="text-sm text-white">{children}</span>
    </span>
  );
};

export default TextLogo;
