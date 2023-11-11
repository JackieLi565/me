import Masonry from "@/components/Masonry";
import tmu from "../../public/svg/tmu.svg";
import next from "../../public/svg/next.svg";
import Title from "@/components/Titles";
import Reveal from "@/components/Animation";
import Database from "@/lib/db";
import { Blog } from "@/types/types";
import TextLogo from "@/components/TextLogo";
import Error from "@/components/Error";
import { getBlogMetaData } from "@/utils/files";
import { BlogCard } from "@/components/Blog";

const getTopBlogs = async () => {
  const client = Database.getInstance();
  try {
    const db = await client.connect();

    const results = await db
      .collection<Blog>("blogs")
      .aggregate<Blog>([
        {
          $sort: { views: -1 },
        },
        {
          $limit: 3,
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray();

    return results.map((doc) => doc.title);
  } catch (e) {
    console.log(e);
  } finally {
    await client.disconnect();
  }
};

const Page = async () => {
  const blogTitles = await getTopBlogs();

  if (!blogTitles) return <></>;

  const topBlogData = await getBlogMetaData(
    blogTitles.map((title) => title + ".md")
  );

  return (
    <main className="w-full flex flex-col gap-9">
      <Title />
      <p className="text-lg text-paragraph leading-9">
        Studying{" "}
        <span className="text-cyan-600 font-semibold">
          software engineering 👩🏻‍💻
        </span>{" "}
        at{" "}
        <TextLogo href="https://www.torontomu.ca/" logo={tmu} size="w-10">
          Toronto Metropolitan University
        </TextLogo>
        . I currently work for my school&apos;s recreational department as a
        lead developer for the internal management software built using{" "}
        <TextLogo
          href="https://nextjs.org/"
          logo={next}
          size="w-4 bg-white rounded-full"
        >
          Next.js
        </TextLogo>
      </p>
      <Masonry />

      <Reveal delay={0.7}>
        <section className="space-y-4 text-lg text-paragraph ">
          <h1 className="text-2xl font-semibold text-white">
            What&apos;s Currently Cooking 👩🏻‍🍳
          </h1>
          <p className=" text-paragraph leading-9">
            Hey! Checkout some of my blogs that are currently trending!
          </p>

          <div className="space-y-8 mt-5">
            {topBlogData && topBlogData.length > 0 ? (
              topBlogData.map((blog) => {
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
          </div>
        </section>
      </Reveal>
    </main>
  );
};

export default Page;
