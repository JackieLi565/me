import { readFileSync } from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { readdirSync, readFile } from "fs";
import { BlogMeta } from "@/types/types";
const asyncReadFile = promisify(readFile);

export const getBlogFile = (blog: string) => {
  try {
    const content = readFileSync(`./_blogs/${blog}.md`, "utf-8");
    const matterResult = matter(content);
    return matterResult;
  } catch (e) {
    console.log(e);
  }
};

export const getBlogTitles = () => {
  const dir = "./_blogs";
  try {
    const blogFiles = readdirSync(dir);
    return blogFiles;
  } catch (e: any) {
    console.log(e);
  }
};

export const getBlogMetaData = async (blogTitles: string[]) => {
  const rootDir = "./_blogs";
  try {
    const metaPromise = blogTitles.map((title) => {
      return asyncReadFile(`${rootDir}/${title}`, { encoding: "utf-8" });
    });

    const metaData = await Promise.all(metaPromise);
    const data = metaData.map((data) => matter(data).data as BlogMeta);

    return data;
  } catch (e: any) {
    console.log(e);
  }
};
