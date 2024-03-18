"use client";
import { StaticImageData } from "next/image";
import { FC, ReactElement, useRef } from "react";
import Image from "next/image";
import Tag from "../Tag";
import { LinkOutlined, GithubOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
type ProjectProps = {
  image: StaticImageData;
  name: string;
  description: string;
  tags: string[];
  links?: {
    github?: string;
    exp?: string;
  };
};
const Project: FC<ProjectProps> = ({
  image,
  name,
  description,
  tags,
  links,
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
      className="border-neutral-600 border rounded-md group"
    >
      {GenerateLink(
        <>
          <Image className="rounded-t-md" src={image} alt={`${name} image`} />
          <div className="bg-neutral-800 space-y-3 rounded-b-md py-4 px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl group-hover:text-cyan-600 transition-colors">
                {name}
              </h1>
              {links && (
                <div className="text-2xl flex gap-3">
                  {links.github && (
                    <GithubOutlined className="group-hover:text-cyan-600 transition-colors" />
                  )}
                  {links.exp && (
                    <LinkOutlined className="group-hover:text-cyan-600 transition-colors" />
                  )}
                </div>
              )}
            </div>
            <p className="text-lg text-paragraph">{description}</p>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </ul>
          </div>
        </>,
        (links && links?.github) || links?.exp
      )}
    </motion.div>
  );
};

const GenerateLink = (ele: ReactElement, link?: string) => {
  if (!link) return ele;

  return (
    <Link href={link} target="_blank">
      {ele}
    </Link>
  );
};

export default Project;
