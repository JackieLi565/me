import { FC } from "react";
import type { Metadata } from "next";
import HighlightedMarkdown from "@/components/Highlight";
import { getBlogFile, getBlogMetaData } from "@/utils/files";
import { default as CatError } from "@/components/Error";
import { BlogTitle } from "@/components/Blog/BlogTitle";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug;
  try {
    const blogMeta = await getBlogMetaData([title]);

    if (blogMeta.length > 0) {
      const { meta } = blogMeta[0];

      const metaData: Metadata = {
        title: title.replace("-", " "),
        description: meta.description,
      };

      return metaData;
    }

    return {
      title: title.replace("-", " "),
    };
  } catch (e) {
    return {
      title: title.replace("-", " "),
    };
  }
}

const Page: FC<Props> = ({ params }) => {
  const blogContent = getBlogFile(params.slug);

  if (!blogContent)
    return (
      <main>
        <CatError
          message={`Not Sure If I've Ever Written About ${params.slug.replaceAll(
            "%20",
            " "
          )} Before`}
        />
      </main>
    );

  return (
    <main>
      <article className="prose prose-pre:bg-[#282c34] prose-code:text-white prose-base prose-p:text-lg prose-headings:text-white prose-p:text-paragraph prose-strong:text-cyan-600 prose-a:text-cyan-600 prose-li:text-paragraph prose-table:text-paragraph prose-img:rounded-lg">
        <div>
          <BlogTitle
            title={params.slug}
            date={new Date(blogContent.data.publish)}
            readTime={blogContent.data.ttr}
          />
          {blogContent && (
            <HighlightedMarkdown>{blogContent.content}</HighlightedMarkdown>
          )}
        </div>
      </article>
    </main>
  );
};

export default Page;
