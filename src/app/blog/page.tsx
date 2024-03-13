import { BlogsTitle } from "@/components/Titles";
import { FC, Suspense } from "react";
import Error from "@/components/Error";
import { getMdMetaData, getMdFiles } from "@/utils/files";
import { BlogCard } from "@/components/Blog/BlogCard";
import Loader from "@/components/Loader";
import { BlogMeta } from "@/types";

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
  const mdTitles = await getMdFiles();
  const promises = mdTitles.map((title) => getMdMetaData(title));
  const blogs = (await Promise.all(promises)) as BlogMeta[];

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((meta, i) => {
          return (
            <BlogCard
              key={meta.title}
              path={mdTitles[i]}
              title={meta.title}
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
