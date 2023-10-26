"use client";
import { StaticImageData } from "next/image";
import { FC, useRef } from "react";
import Image from "next/image";
import Tag from "../Tag";
import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
type ProjectProps = {
  image: StaticImageData;
  name: string;
  description: string;
  tags: string[];
  href: string;
  reverse?: boolean;
};
const Project: FC<ProjectProps> = ({
  image,
  name,
  description,
  tags,
  href,
  reverse = false,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  return (
    <motion.div
      style={{
        scale: scaleProgress,
        opacity: scrollYProgress,
      }}
      ref={ref}
      className="flex flex-col-reverse gap-4 md:grid md:grid-cols-8 md:mb-16"
    >
      <Link
        href={href}
        target="_blank"
        className={`row-span-full group md:translate-y-2/3 ${
          reverse ? "md:col-end-9" : "md:col-start-1 "
        } col-span-5 self-center flex flex-col z-20 bg-neutral-800 border border-neutral-600 rounded-md py-4 px-5 space-y-2`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-cyan-600 ">{name}</h1>
          <LinkOutlined className="group-hover:text-cyan-600 transition-colors duration-150" />
        </div>
        <p className="text-sm md:text-base text-paragraph md:px-2 leading-7">
          {description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            return <Tag key={tag} name={tag} />;
          })}
        </ul>
      </Link>

      <div
        className={`row-span-full col-span-6 ${
          reverse ? "md:col-start-1" : "md:col-end-9"
        } self-center relative group hover:z-20`}
      >
        <div className="md:absolute justify-center md:bg-cyan-900 w-full h-full rounded-lg md:bg-opacity-80 group-hover:bg-opacity-0 transition-opacity"></div>
        <Image
          className="border border-neutral-600 rounded-lg md:opacity-80 md:group-hover:opacity-100 transition-opacity"
          src={image}
          alt=""
        />
      </div>
    </motion.div>
  );
};

export default Project;
