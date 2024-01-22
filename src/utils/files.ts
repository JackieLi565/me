import { readFileSync } from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { readdirSync, readFile } from "fs";
import { BlogMeta } from "@/types/types";
import path from "path";
const asyncReadFile = promisify(readFile);

const blogDir = path.join(process.cwd(), "public", "blogs");

export const getBlogFile = (title: string) => {
  const content = readFileSync(path.join(blogDir, title, "index.md"), "utf-8");
  const matterResult = matter(content);
  return matterResult;
};

export const getBlogTitles = () => {
  const blogFiles = readdirSync(blogDir);
  return blogFiles;
};

export const getBlogMetaData = async (blogDirs: string[]) => {
  const metaPromise = blogDirs.map((dir) => {
    return asyncReadFile(path.join(blogDir, dir, "index.md"), {
      encoding: "utf-8",
    });
  });

  const metaData = await Promise.all(metaPromise);
  const data = metaData.map((data, idx) => ({
    meta: matter(data).data as BlogMeta,
    dir: blogDirs[idx],
  }));

  return data;
};
