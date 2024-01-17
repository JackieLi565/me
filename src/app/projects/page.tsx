import { FC } from "react";
import Project from "@/components/Project";
import { ProjectTitle } from "@/components/Titles";
import sf from "../../../public/projects/spotifamily.jpg";
import cov from "../../../public/projects/covidify.jpg";
import stre from "../../../public/projects/streamify.jpg";
import rim from "../../../public/projects/tmu-rim.jpg";
import Link from "next/link";

const Page: FC = () => {
  return (
    <main className="w-full space-y-6">
      <ProjectTitle />
      <p className="text-lg text-paragraph">
        Hey! I like building things that make a social impact. Here you can find
        some of the latest projects I've worked on. If you have any questions
        regarding my projects or you want to build something together{" "}
        <Link href={"/about"} className="text-cyan-600">
          reach out!
        </Link>
      </p>
      <section className="space-y-12">
        <Project
          image={rim}
          name="TMU Recreation Internal Management (RIM)"
          description="A internal application developed in partnership with my school's recreation department. 
                        The platform has built-in metric tracking tools and also serves as a centralized hub for 
                        operational staff to access internal documents."
          tags={[
            "TypeScript",
            "Next.js",
            "Node.js",
            "Firebase",
            "Google Cloud",
            "Token based Authentication",
          ]}
        />
        <div className="border-b border-neutral-600 w-full"></div>
        <Project
          links={{
            exp: "https://spotifamily.vercel.app/",
          }}
          image={sf}
          name="SpotiFamily"
          description="A Spotify family plan manager created to help me track monthly payments within my family. 
                      the app also doubles as an environment for people to view other members listening history. "
          tags={[
            "Next.js 13",
            "TypeScript",
            "Cloud Functions",
            "Spotify OAuth",
            "noSQL",
          ]}
        />
        <div className="border-b border-neutral-600 w-full"></div>
        <Project
          links={{
            github: "https://github.com/JackieLi565/Streamify",
          }}
          image={stre}
          name="Streamify"
          description="Developed to watch YouTube videos and chat with your friends live! 
                      The development purpose of the application was to experiment with Web Sockets."
          tags={[
            "Next.js",
            "TypeScript",
            "Express.js",
            "Web Sockets",
            "OpenAI",
          ]}
        />
        <div className="border-b border-neutral-600 w-full"></div>
        <Project
          links={{
            exp: "https://covidify.vercel.app/",
          }}
          image={cov}
          name="Covidify"
          description="Inspired by Receiptify, Covidify lets you download current COVID-19 data receipts. 
          By no means the modified data is accurate, but it was a nice project to understand fetching data from an API."
          tags={["React.js", "JavaScript", "OpenCovid API"]}
        />
      </section>
    </main>
  );
};

export default Page;
