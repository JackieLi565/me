import { FC, Suspense } from "react";
import type { Metadata } from "next";
import HighlightedMarkdown from "@/components/Highlight";
import { getMdContent, getMdMetaData } from "@/utils/files";
import { default as CatError } from "@/components/Error";
import { BlogTitle } from "@/components/Blog/BlogTitle";
import { GitHubEdit } from "@/components/GithubEdit";
import Loader from "@/components/Loader";

type Props = {
  params: { slug: string };
};

// TODO: add og image generation for each title
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug;
  const blogMeta = await getMdMetaData(title);

  if (!blogMeta) {
    return {
      title: "Blog not found!",
    };
  }

  return {
    title: blogMeta.title,
    description: blogMeta.description,
    keywords: blogMeta.tags,
    publisher: "Jackie Li",
  };
}

const Page: FC<Props> = ({ params }) => {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Content params={params} />
      </Suspense>
    </main>
  );
};

export default Page;

const Content: FC<Props> = async ({ params }) => {
  const blogContent = await getMdContent(params.slug);

  if (!blogContent)
    return (
      <CatError
        message={`Not Sure If I've Ever Written About '${params.slug}' Before`}
      />
    );

  return (
    <>
      <article className="prose prose-pre:bg-[#282c34] prose-code:text-white prose-base prose-p:text-lg prose-headings:text-white prose-p:text-paragraph prose-strong:text-cyan-600 prose-a:text-cyan-600 prose-li:text-paragraph prose-table:text-paragraph prose-img:rounded-lg">
        <div>
          <BlogTitle
            title={blogContent.data.title}
            date={new Date(blogContent.data.publish)}
            readTime={blogContent.data.ttr}
          />
          <HighlightedMarkdown>{blogContent.content}</HighlightedMarkdown>
        </div>
      </article>
      <GitHubEdit name={params.slug} />
    </>
  );
};
