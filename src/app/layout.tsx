import type { Metadata } from "next";
import logo from "./favicon.ico";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  GithubOutlined,
  LinkedinOutlined,
  MediumOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jackie Li",
  description: "first in first out",
  icons: [{ rel: "icon", url: logo.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-main-background max-w-3xl px-5 md:px-0 m-auto font-rubik text-white scrollbar-thumb-cyan-700 scrollbar-thin">
        <Navbar />
        {children}
        <footer className="mt-16 mb-28 flex justify-between items-center">
          <p>&copy; Jackie Li</p>
          <div className="space-x-4">
            <Link href={"https://www.linkedin.com/in/jackie-li-725944175/"}>
              <LinkedinOutlined className="text-2xl " />
            </Link>
            <Link href={"https://github.com/JackieLi565"}>
              <GithubOutlined className="text-2xl" />
            </Link>
            <Link href={"https://medium.com/@li.jackie565"}>
              <MediumOutlined className="text-2xl" />
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
