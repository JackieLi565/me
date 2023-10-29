import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FC } from "react";
import Tag from "../Tag";

type BlogCardProps = {
  title: string;
  views: number;
  date: Date;
  tags: string[];
  readTime: number;
  id: string;
};

export const BlogCard: FC<BlogCardProps> = ({
  title,
  views,
  date,
  tags,
  readTime,
  id,
}) => {
  return (
    <Link
      href={`/blog/${id}`}
      className="flex p-4 group justify-between items-center bg-neutral-800 border border-neutral-600 rounded-md"
    >
      <div className="space-y-2">
        <h1 className="text-xl text-cyan-600">{title}</h1>
        <p className="text-paragraph italic text-base">
          {date.toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          &#x2022; {readTime} min &#x2022; {views} views
        </p>
        <div className="space-x-2">
          {tags.map((tag) => {
            return <Tag key={tag} name={tag} />;
          })}
        </div>
      </div>
      <LinkOutlined className="group-hover:text-cyan-600 transition-colors duration-150" />
    </Link>
  );
};
