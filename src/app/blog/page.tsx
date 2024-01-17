import { BlogContainer } from "@/components/Blog";
import { BlogsTitle } from "@/components/Titles";
import { FC, Suspense } from "react";
import loadingIcon from "../../../public/loader.svg";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Page: FC = () => {
  return (
    <main className="w-full flex flex-col gap-9 text-lg text-paragraph">
      <BlogsTitle />
      <section>
        This is where I like to share what interests me. Still new to it,
        I&apos;m always open for feedback.
      </section>
      <section className="space-y-10">
        <Suspense fallback={<Loader />}>
          <BlogContainer />
        </Suspense>
      </section>
    </main>
  );
};

const Loader: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={loadingIcon} alt="loading bars" className="w-[80px]"></Image>
    </div>
  );
};

export default Page;
