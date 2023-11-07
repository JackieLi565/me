import Project from "@/components/Project";
import { ProjectTitle } from "@/components/Titles";
import { FC } from "react";
import sf from "../../../public/projects/spotifamily.jpg";
import cov from "../../../public/projects/covidify.jpg";
import stre from "../../../public/projects/streamify.jpg";

const Page: FC = () => {
  return (
    <main className="w-full space-y-6">
      <ProjectTitle />
      <p className="text-lg text-paragraph">
        I always try to incorporate technology that I find really cool and
        exciting. Checkout some of the stuff I've been working on!
      </p>
      <section className="space-y-12">
        <Project
          links={{
            exp: "https://spotifamily.vercel.app/",
          }}
          image={sf}
          name="SpotiFamily"
          description="A Spotify family plan manager created to help me organize and keep track of payments."
          tags={[
            "Next.js 13",
            "TypeScript",
            "Cloud Functions",
            "Spotify OAuth",
          ]}
        />
        <div className="border-b border-neutral-600 w-full"></div>
        <Project
          links={{
            github: "https://github.com/JackieLi565/Streamify",
          }}
          image={stre}
          name="Streamify"
          description="A Spotify family plan manager created to help me organize and keep track of payments."
          tags={["Next.js", "TypeScript", "Express.js", "Websockets", "OpenAI"]}
        />
        <div className="border-b border-neutral-600 w-full"></div>

        <Project
          links={{
            exp: "https://covidify.vercel.app/",
          }}
          image={cov}
          name="Covidify"
          description="Download Covid Receipts, Covidify was one of my first React.js projects to build understanding of how to fetch and display data."
          tags={["React.js", "JavaScript", "OpenCovid API"]}
        />
      </section>
    </main>
  );
};

export default Page;
