import { LinkOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FC, Suspense } from "react";
import Tag from "../Tag";
import Views from "../View/server";
import { calculateTimeAgo } from "@/utils/date";

type BlogCardProps = {
  title: string;
  date: Date;
  tags: string[];
  readTime: number;
  description: string;
};

export const BlogCard: FC<BlogCardProps> = ({
  title,
  date,
  tags,
  readTime,
  description,
}) => {
  return (
    <Link
      href={`/blog/${title}`}
      className="flex group justify-between items-center rounded-md"
    >
      <div className="space-y-2">
        <h1 className="text-2xl text-cyan-600">{title}</h1>
        <p className="text-paragraph italic text-base">
          {date.toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          &#x2022; {readTime} min read &#x2022;{" "}
          <Suspense fallback={<span>fetching</span>}>
            <Views slug={title} />
          </Suspense>{" "}
        </p>
        <p>{description}</p>
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

type BlogTitleProps = {
  title: string;
  date: Date;
  readTime: number;
};

export const BlogTitle: FC<BlogTitleProps> = ({ title, date, readTime }) => {
  const timeAgo = calculateTimeAgo(date);
  return (
    <>
      <h1 className="m-0">{title}</h1>
      <p className="italic flex gap-2">
        <span>published {timeAgo}</span> &#x2022;{" "}
        <span>{readTime} min read </span>&#x2022;
        <Views count={true} slug={title} />
      </p>
      <div className="border-b border-paragraph w-full my-8"></div>
    </>
  );
};
