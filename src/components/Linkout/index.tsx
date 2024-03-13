import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FC, ReactElement } from "react";
type Props = {
  icon: ReactElement;
  title: string;
  description: string;
  href: string;
  newTab: boolean;
};
const Linkout: FC<Props> = ({ icon, title, description, href, newTab }) => {
  return (
    <Link
      target={newTab ? "_blank" : "_self"}
      href={href}
      className="flex-1 group flex gap-5 p-4 items-center bg-neutral-800 border border-neutral-600 rounded-md"
    >
      {icon}
      <div className="py-1 flex-1">
        <h1 className="text-lg">{title}</h1>
        <p className="text-base text-paragraph">{description}</p>
      </div>
      <LinkOutlined className="group-hover:text-cyan-600 transition-colors duration-150" />
    </Link>
  );
};

export default Linkout;
