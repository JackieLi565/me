import Project from "@/components/Project";
import { ProjectTitle } from "@/components/Titles";
import { FC } from "react";
import sf from "../../../public/projects/spotifamily.jpg";
import cov from "../../../public/projects/covidify.jpg";
import stre from "../../../public/projects/streamify.jpg";
import Reveal from "@/components/Animation";

const Page: FC = () => {
  return (
    <main className="w-full flex flex-col gap-9">
      <ProjectTitle />
      <Project
        href="https://spotifamily.vercel.app/"
        image={sf}
        name="SpotiFamily"
        description="A Spotify family plan manager created to help me organize and keep track of payments."
        tags={["Next.js 13", "TypeScript", "Cloud Functions", "Spotify OAuth"]}
      />
      <Reveal delay={0.4}>
        <p className="text-paragraph text-lg leading-9">
          I built SpotiFamily as a way to to manage my family plan via a web
          app. The inspiration came from the problem I kept facing every month.
          Members within my Spotify Family plan kept missing payment dates, or I
          would forget to remind them. This project solved both of my issues
          with monthly email reminders via cron jobs and a built in management
          system to visualize who has or hasn&apos;t payed. Building this
          project also brought a sense of community within my friend group as
          everyone can now view eachothers listening data. If you would like to
          try this out yourself visit my Github!
        </p>
      </Reveal>
      <Project
        href="https://github.com/JackieLi565/Streamify"
        image={stre}
        name="Streamify"
        description="A Spotify family plan manager created to help me organize and keep track of payments."
        tags={["Next.js", "TypeScript", "Express.js", "Websockets", "OpenAI"]}
        reverse={true}
      />
      <Reveal delay={0.4}>
        <p className="text-paragraph text-lg leading-9">
          Streamify is still a work in progress but I have many features
          planned. I am currently treating Streamify as a project where I can
          try new things and not be afraid. For example, while building the chat
          and media feedback, I got my hands dirty with websockets and it taught
          me a lot. I am building Streamify with my friend Peter, he&apos;s
          mainly taking care of the frontend stuff while I&apos;m mainly
          backend. If you are intrested in the code you can find the frontend
          repository <a href="">here</a> and the backend can be found on my
          Github!
        </p>
      </Reveal>
      <Project
        href="https://covidify.vercel.app/"
        image={cov}
        name="Covidify"
        description="Download Covid Receipts, Covidify was one of my first React.js projects to build understanding of how to fetch and display data."
        tags={["React.js", "JavaScript", "OpenCovid API"]}
      />
      <Reveal delay={0.4}>
        <p className="text-paragraph text-lg leading-9">
          Covidify was my very first{" "}
          <a href="" className="text-cyan-600 font-semibold">
            React.js
          </a>{" "}
          project I created to get me comfortable with fetching data from
          external APIs in React. I was inspired by a popular web app known as{" "}
          <a
            href="https://receiptify.herokuapp.com/"
            className="text-cyan-600 font-semibold"
          >
            Receiptify
          </a>{" "}
          where you would login with spotify to recieve a little receipt of your
          listening data. I created Covidify to achieve something similar where
          a user can{" "}
          <span className="text-cyan-600 font-semibold">
            download Covid-19 data
          </span>{" "}
          receipts based on an input date. Although the data might not be
          totally accurate you can try it out yourself with the link above. If
          you would like to see the source code you can find it on my Github!
        </p>
      </Reveal>
    </main>
  );
};

export default Page;
