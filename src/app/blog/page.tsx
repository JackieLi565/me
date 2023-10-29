import { BlogCard } from "@/components/Blog";
import { BlogsTitle } from "@/components/Titles";
import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { FC } from "react";
import Error from "@/components/Error";

const getBlogMetaData = async () => {
  const client = new Database();
  try {
    const db = await client.connect();

    // const blog: Blog = {
    //   title: "First Blog",
    //   views: 10,
    //   publish: new Date(),
    //   ttr: 10,
    //   tags: ["First", "New Blogger"],
    // };

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
    <main className="w-full flex flex-col gap-9 text-lg text-paragraph">
      <BlogsTitle />
      <section>
        This is where I like to share what intrests me. Still new to it,
        I&apos;m always open for feedback.
      </section>
      <section className="space-y-3">
        {blogs && blogs.length > 0 ? (
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
          })
        ) : (
          <Error message="Where Did My Blogs Go?" />
        )}
      </section>
    </main>
  );
};

export default Page;
