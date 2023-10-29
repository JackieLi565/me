import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { readFileSync } from "fs";
import { ObjectId } from "mongodb";
import { FC } from "react";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import HighlightedMarkdown from "@/components/Highlight";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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

export async function generateMetadata(
  { params }: Props,
  __: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug;
  const client = new Database();
  try {
    const db = await client.connect();

    const blog = await db.collection<Blog>("blogs").findOne(new ObjectId(id));

    if (!blog) throw new Error("No Blog Found");

    const content = readFileSync(`./_blogs/${blog.title}.md`);
    const matterResult = matter(content).data;

    const metaData: Metadata = {
      metadataBase: new URL(
        process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
      ),
      title: matterResult.title,
      description: matterResult.description,
      authors: {
        name: matterResult.name,
      },
      openGraph: {
        images: matterResult.ogImage,
      },
    };

    return metaData;
  } catch (e) {
    return {
      title: `Blog ${id}`,
      description: "Failed to fetch meta data",
    };
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

const Page: FC<Props> = async ({ params }) => {
  const doc = await incViewCount(params.slug);

  if (!doc) notFound();

  const content = getBlogContent(doc.title);

  return (
    <main>
      <article className="prose prose-pre:bg-[#282c34] prose-code:text-white prose-base prose-p:text-lg prose-headings:text-white prose-p:text-paragraph prose-strong:text-cyan-600 prose-a:text-cyan-600 prose-li:text-paragraph prose-table:text-paragraph prose-img:rounded-lg">
        {content ? (
          <HighlightedMarkdown>{content}</HighlightedMarkdown>
        ) : (
          <p>No blogs here</p>
        )}
      </article>
    </main>
  );
};

export default Page;
