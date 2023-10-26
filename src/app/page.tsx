import Masonry from "@/components/Masonry";
import tmu from "../../public/svg/tmu.svg";
import next from "../../public/svg/next.svg";
import Linkout from "@/components/Linkout";
import Title from "@/components/Titles";
import { BlogCard } from "@/components/Blog";
import Reveal from "@/components/Animation";
import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { WithId } from "mongodb";
import { GithubOutlined, HighlightOutlined } from "@ant-design/icons";
import TextLogo from "@/components/TextLogo";
import Error from "@/components/Error";

const getTopBlogs = async () => {
  const client = new Database();
  try {
    const db = await client.connect();

    const results = await db
      .collection<Blog>("blogs")
      .aggregate<WithId<Blog>>([
        {
          $sort: { views: -1 },
        },
        {
          $limit: 3,
        },
      ])
      .toArray();

    return results;
  } catch (e) {
    console.log(e);
  } finally {
    await client.disconnect();
  }
};

const Page = async () => {
  const topBlogs = await getTopBlogs();
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
          Toronto Metropolitain University
        </TextLogo>
        . I currently work for my school&apos;s recreational department as a
        lead developer for the internal managment software built using{" "}
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
        <section className="space-y-4">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-lg text-paragraph leading-9">
            Sitting down and{" "}
            <span className="text-cyan-600 font-semibold">
              learning the fundamentals
            </span>{" "}
            via text or videos is very important. It&apos;s like if you try to{" "}
            <span className="text-cyan-600 italic">
              run without learning how to walk
            </span>
            . But I also believe having hands-on experience is equally as
            valuable. Building projects even if it&apos;s as simple as a todo
            list is my bread and butter, you can check out some of my favourites
            below.
          </p>
        </section>
      </Reveal>
      <Reveal>
        <section className="flex flex-col md:flex-row gap-4">
          <Linkout
            newTab={true}
            icon={
              <GithubOutlined className="text-[42px] flex text-slate-400" />
            }
            title="Sources"
            description="7 Cool People"
            href="https://github.com/JackieLi565"
          />
          <Linkout
            newTab={false}
            icon={
              <HighlightOutlined className="text-[42px] flex text-slate-400" />
            }
            title="Projects Section"
            description="My Top Picks"
            href="/projects"
          />
        </section>
      </Reveal>
      <Reveal delay={0.7}>
        <section className="space-y-4">
          <h1 className="text-2xl font-semibold">Jackie Writes Blogs ???</h1>
          <p className="text-lg text-paragraph leading-9">
            While English wasn&apos;t my first language, I believe practice is
            crucial. Blogs are beneficial for both readers and writers.
            Explaining concepts{" "}
            <span className="text-cyan-600 font-semibold">
              {" "}
              reinforces my understanding
            </span>
            . I&apos;m always committed to providing accurate information. If
            you&apos;d like to explore more, you can find my popular blogs
            below.
          </p>

          {topBlogs && topBlogs.length > 0 ? (
            topBlogs.map((blog) => {
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
      </Reveal>
    </main>
  );
};

export default Page;
