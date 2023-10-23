import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { readFileSync } from "fs";
import { ObjectId } from "mongodb";
import { FC } from "react";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const client = new Database();
  try {
    const db = await client.connect();
    const result = await db
      .collection("blogs")
      .find({}, { projection: { _id: 1 } })
      .toArray();

    return result.map((doc) => doc._id);
  } catch (e) {
    console.log(e);
    throw new Error("Static Generation Error");
  } finally {
    await client.disconnect();
  }
}

const incViewCount = async (id: string) => {
  const client = new Database();
  try {
    const db = await client.connect();

    const result = await db.collection<Blog>("blogs").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $inc: {
          views: 1,
        },
      }
    );

    return result;
  } catch (e) {
  } finally {
    await client.disconnect();
  }
};

const getBlogContent = (blog: string) => {
  try {
    const content = readFileSync(`./_blogs/${blog}.md`, "utf-8");
    const matterResult = matter(content);
    return matterResult.content;
  } catch (e) {
    console.log(e);
  }
};

type PageProps = { params: { slug: string } };
const Page: FC<PageProps> = async ({ params }) => {
  const doc = await incViewCount(params.slug);

  if (!doc) notFound();
  const content = getBlogContent(doc.title);
  return (
    <main>
      <article className="prose prose-lg prose-headings:text-white prose-p:text-paragraph prose-strong:text-cyan-700 prose-a:text-cyan-600 prose-li:text-paragraph prose-table:text-paragraph prose-img:rounded-lg">
        {content ? <Markdown>{content}</Markdown> : <p>No blogs here</p>}
      </article>
    </main>
  );
};

export default Page;
