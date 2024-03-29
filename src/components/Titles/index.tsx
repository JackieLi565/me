"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { TypeAnimation } from "react-type-animation";

const Title: FC = () => {
  const prefix = "hey, it's jackie i'm";
  const seq = [
    `${prefix} a développeur`,
    1500,
    `${prefix} a student`,
    1500,
    `${prefix} an engineer`,
    1500,
  ];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white h-20 sm:h-fit"
      sequence={seq}
      repeat={Infinity}
    />
  );
};

export const ProjectTitle = () => {
  const seq = ["let's build something together!"];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white"
      sequence={seq}
    />
  );
};

export const AboutTitle = () => {
  const seq = ["wanna learn more about me?"];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white"
      sequence={seq}
    />
  );
};

export const BlogsTitle = () => {
  const seq = ["i like to write about interesting tech!"];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white"
      sequence={seq}
    />
  );
};

export const ErrorTitle = () => {
  const path = usePathname();
  const seq = [`${path} doesn't seem to exist`];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white"
      sequence={seq}
    />
  );
};

export default Title;
