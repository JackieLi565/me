import Masonry from "@/components/Masonry";
import tmu from "../../public/logos/tmu.svg";
import next from "../../public/logos/next.svg";
import Title from "@/components/Titles";
import Reveal from "@/components/Animation";
import TextLogo from "@/components/TextLogo";
import Error from "@/components/Error";
import { getMdMetaData, getMdFiles } from "@/utils/files";
import { BlogCard } from "@/components/Blog/BlogCard";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import { BlogMeta } from "@/types";

const Page = async () => {
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

      <Reveal>
        <section className="space-y-4 text-lg text-paragraph ">
          <h1 className="text-2xl font-semibold text-white">
            What&apos;s Currently Cooking 👩🏻‍🍳
          </h1>
          <p className=" text-paragraph leading-9">
            Hey! Check out what I&apos;ve been recently writing about.
          </p>

          <Suspense fallback={<Loader />}>
            <TopBlogContainer />
          </Suspense>
        </section>
      </Reveal>
    </main>
  );
};

const TopBlogContainer = async () => {
  const mdTitles = await getMdFiles();
  const promises = mdTitles.map((title) => getMdMetaData(title));
  const topBlogData = (await Promise.all(promises)) as BlogMeta[];

  return (
    <div className="space-y-8 mt-5">
      {topBlogData.length > 0 ? (
        topBlogData.map((meta, i) => {
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
    </div>
  );
};

export default Page;
