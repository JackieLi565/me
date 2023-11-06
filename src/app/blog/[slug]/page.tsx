import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { readFileSync } from "fs";
import { ObjectId } from "mongodb";
import { FC } from "react";
import matter from "gray-matter";
import type { Metadata } from "next";
import HighlightedMarkdown from "@/components/Highlight";
import Views from "@/components/View/server";
import { BlogTitle } from "@/components/Blog";
import { getBlogFile } from "@/utils/files";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.slug;
  const client = Database.getInstance();
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

const Page: FC<Props> = async ({ params }) => {
  const blogTitle = params.slug.split("%20").join(" ");
  const blogContent = getBlogFile(blogTitle);
  return (
    <main>
      <article className="prose prose-pre:bg-[#282c34] prose-code:text-white prose-base prose-p:text-lg prose-headings:text-white prose-p:text-paragraph prose-strong:text-cyan-600 prose-a:text-cyan-600 prose-li:text-paragraph prose-table:text-paragraph prose-img:rounded-lg">
        {true ? (
          <div>
            <BlogTitle
              title={blogTitle}
              date={blogContent?.data.publish}
              readTime={blogContent?.data.ttr}
            />
            {blogContent && (
              <HighlightedMarkdown>{blogContent.content}</HighlightedMarkdown>
            )}
          </div>
        ) : (
          <p>No blogs here</p>
        )}
      </article>
    </main>
  );
};

export default Page;
