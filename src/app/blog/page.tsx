import { BlogCard } from "@/components/Blog";
import { BlogsTitle } from "@/components/Titles";
import { FC } from "react";
import Error from "@/components/Error";
import { getBlogMetaData, getBlogTitles } from "@/utils/files";

export const dynamic = "force-dynamic";

const Page: FC = async () => {
  const blogTitles = getBlogTitles() as string[];
  const blogs = await getBlogMetaData(blogTitles);
  return (
    <main className="w-full flex flex-col gap-9 text-lg text-paragraph">
      <BlogsTitle />
      <section>
        This is where I like to share what interests me. Still new to it,
        I&apos;m always open for feedback.
      </section>
      <section className="space-y-10">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <BlogCard
                key={blog.title}
                title={blog.title}
                date={blog.publish}
                tags={blog.tags}
                readTime={blog.ttr}
                description={blog.description}
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
