import { StaticImageData } from "next/image";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
type TextLogoProps = {
  logo: StaticImageData;
  size: string;
  children?: string;
  href?: string;
};
const TextLogo: FC<TextLogoProps> = ({ logo, size, children, href }) => {
  return (
    <Link
      target="_blank"
      href={href || ""}
      className="inline-flex justify-center items-center   w-fit py-1 px-2 space-x-2 bg-neutral-800 border border-neutral-600 rounded-md"
    >
      <Image src={logo} alt="" className={size} />
      <span className="text-sm text-white">{children}</span>
    </Link>
  );
};

export default TextLogo;
