import { BlogsTitle } from "@/components/Titles";
import { FC, Suspense } from "react";
import Error from "@/components/Error";
import { getBlogMetaData, getBlogTitles } from "@/utils/files";
import { BlogCard } from "@/components/Blog/BlogCard";
import Loader from "@/components/Loader";

const Page: FC = () => {
  return (
    <main className="w-full flex flex-col gap-9 text-lg text-paragraph">
      <BlogsTitle />
      <section className="space-y-10">
        <Suspense fallback={<Loader />}>
          <BlogContainer />
        </Suspense>
      </section>
    </main>
  );
};

const BlogContainer: FC = async () => {
  const blogTitles = getBlogTitles();
  const blogs = await getBlogMetaData(blogTitles);

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map(({ meta, dir }) => {
          return (
            <BlogCard
              key={dir}
              title={dir}
              publish={meta.publish}
              tags={meta.tags}
              ttr={meta.ttr}
              description={meta.description}
            />
          );
        })
      ) : (
        <Error message="Where Did My Blogs Go?" />
      )}
    </>
  );
};

export default Page;
