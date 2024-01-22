import { calculateTimeAgo } from "@/utils/date";
import { FC } from "react";

type BlogTitleProps = {
  title: string;
  date: Date;
  readTime: number;
};

export const BlogTitle: FC<BlogTitleProps> = ({ title, date, readTime }) => {
  const timeAgo = calculateTimeAgo(date);
  return (
    <>
      <h1 className="m-0 font-thin">{title.replaceAll("-", " ")}</h1>
      <p className="italic flex gap-2">
        <span>posted {timeAgo}</span> &#x2022; <span>{readTime} min read </span>
      </p>
      <div className="border-b border-paragraph w-full my-8"></div>
    </>
  );
};
