import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FC } from "react";
import Tag from "../Tag";

type BlogCardProps = {
  title: string;
  publish: Date;
  ttr: number;
  tags: string[];
  description: string;
};

export const BlogCard: FC<BlogCardProps> = ({
  title,
  publish,
  tags,
  ttr,
  description,
}) => {
  const blogLink = `/blog/${title}`;
  const blogDate = publish.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={blogLink}
      className="block space-y-3 md:space-y-2 group rounded-md"
    >
      <div className="justify-between items-center flex gap-5">
        <h1 className="text-2xl text-cyan-600">{title.replaceAll("-", " ")}</h1>
        <LinkOutlined className="group-hover:text-cyan-600 transition-colors duration-150" />
      </div>
      <p className="text-white italic text-base">
        {blogDate} &#x2022; {ttr} min read
      </p>
      <p>{description}</p>
      <div className="space-x-2">
        {tags.map((tag) => {
          return <Tag key={tag} name={tag} />;
        })}
      </div>
    </Link>
  );
};
