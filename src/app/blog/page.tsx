import { BlogCard } from "@/components/Blog";
import { BlogsTitle } from "@/components/Titles";
import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { FC } from "react";

const getBlogMetaData = async () => {
  const client = new Database();
  try {
    const db = await client.connect();

    const data = await db.collection<Blog>("blogs").find({}).toArray();

    return data;
  } catch (e) {
    console.log(e);
  } finally {
    await client.disconnect();
  }
};

const Page: FC = async () => {
  const blogs = await getBlogMetaData();
  return (
    <main className="w-full flex flex-col gap-9">
      <section>
        <BlogsTitle />
      </section>
      <section className="space-y-3">
        {blogs &&
          blogs.map((blog) => {
            const key = blog._id.toString();
            return (
              <BlogCard
                key={key}
                title={blog.title}
                views={blog.views}
                date={blog.publish}
                tags={blog.tags}
                readTime={blog.ttr}
                id={key}
              />
            );
          })}
      </section>
    </main>
  );
};

export default Page;
