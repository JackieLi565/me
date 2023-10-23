"use client";
import { FC } from "react";
import { TypeAnimation } from "react-type-animation";

const Title: FC = () => {
  const seq = [
    "hey, it's jackie i'm a développeur",
    1500,
    "hey, it's jackie i'm a student",
    1500,
    "hey, it's jackie i'm a outdoorist",
    1500,
    "hey, it's jackie i'm a engineer ",
    1500,
  ];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white"
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
  const seq = ["i like to write about intresting tech!"];
  return (
    <TypeAnimation
      className="text-3xl font-semibold text-white"
      sequence={seq}
    />
  );
};

export default Title;
