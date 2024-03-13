import matter from "gray-matter";
import { promisify } from "util";
import { promises as fs } from "fs";
import { BlogMeta } from "@/types";
import path from "path";
const { readFile, readdir } = fs;

const mdDir = path.join(process.cwd(), "src", "md");

/**
 * @param name Must be name of the file without extension
 */
export const getMdContent = async (name: string) => {
  try {
    const file = `${name}.md`;
    const content = await readFile(path.join(mdDir, file), "utf-8");
    const matterResult = matter(content);
    return matterResult;
  } catch (e) {
    return null;
  }
};

/**
 * @returns { Promise<string[]> } Strings have extensions removed
 * @description Returns a list of known file names therefore getMdMetaData & getMdContent
 * will always return the file data and not null
 */
export const getMdFiles = async (): Promise<string[]> => {
  const blogFiles = await readdir(mdDir);
  return blogFiles.map((file) => file.slice(0, -3));
};

/**
 * @param name Must be name of the file without extension
 */
export const getMdMetaData = async (name: string) => {
  const matterResult = await getMdContent(name);

  return matterResult ? (matterResult.data as BlogMeta) : null;
};
