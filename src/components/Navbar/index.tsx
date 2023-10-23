"use client";
import { usePathname } from "next/navigation";
import { Link as SubLink } from "@/types/types";
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
const Navbar: FC = () => {
  const pathname = usePathname();

  const links: SubLink[] = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ];
  return (
    <nav className="w-full  my-10 flex justify-between items-center">
      <Link href="/">
        <Image className="w-12" src={logo} alt="logo" />
      </Link>
      <div className="space-x-6">
        {links.map((link) => {
          const nameid = link.title.toLowerCase();
          return (
            <Link
              key={link.title}
              href={link.href}
              className={`${
                pathname.split("/").includes(nameid)
                  ? "text-cyan-600"
                  : "text-white"
              } text-lg hover:text-cyan-700 transition-colors duration-200 `}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
