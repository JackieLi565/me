import { AboutTitle } from "@/components/Titles";
import { FC } from "react";
import me from "../../../public/headshot.jpg";
import Image from "next/image";
import Reveal from "@/components/Animation";
import TextLogo from "@/components/TextLogo";
import tmu from "../../../public/svg/tmu.svg";
import java from "../../../public/svg/java.svg";
import react from "../../../public/svg/react.svg";
import tmr from "../../../public/svg/tmr.png";
import js from "../../../public/svg/js.svg";

const Page: FC = () => {
  return (
    <main className="w-full text-lg text-paragraph flex flex-col gap-9">
      <AboutTitle />
      <Reveal delay={0.4}>
        <div className="flex gap-8 items-center">
          <div className="bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 rounded-full p-0.5 ">
            <Image src={me} alt="Jump Scare" className="w-96 rounded-full" />
          </div>
          <p className=" leading-9">
            So you probably know by now, but for those who don&apos;t my name is
            <span className="text-cyan-600 font-semibold"> Jackie Li</span>. I
            have been learning{" "}
            <span className="text-cyan-600 font-semibold">web development</span>{" "}
            for about a year and I&apos;ve enjoyed every single minute of it.
          </p>
        </div>
      </Reveal>
      <Reveal>
        <p className="leading-9">
          It all started during my second year at{" "}
          <TextLogo logo={tmu} size="w-10">
            Toronto Metropolitain University
          </TextLogo>{" "}
          where I took an introduction to{" "}
          <TextLogo logo={java} size="w-3.5">
            Java
          </TextLogo>{" "}
          course. At first, like many, I didn&apos;t enjoy it, but during this
          time I also joined my school&apos;s robotics team{" "}
          <TextLogo logo={tmr} size="rounded">
            Toronto Met Robotics
          </TextLogo>
          . Joining the team gave me a lot of insight into how I could apply
          code to{" "}
          <span className="text-cyan-600 font-semibold">
            real-world applications
          </span>
          , and not just simple Java games. At the time I was tasked with fixing
          some code in an existing{" "}
          <TextLogo logo={react} size="w-3.5">
            React.js
          </TextLogo>{" "}
          project. I&apos;m not going to lie it was really hard at first,
          jumping from Java to JSX syntax, but I truly believe this step was
          where I experienced something refreshing in programming. Fast forward
          a little I started from square one with{" "}
          <TextLogo logo={js} size="w-3.5">
            Javascript
          </TextLogo>{" "}
          where I taught myself the basics via online tutorials, and now I am
          mainly focused on{" "}
          <span className="text-cyan-600 font-semibold">
            continuous development
          </span>{" "}
          on the athletics management system for my school&apos;s recreational
          department.
        </p>
      </Reveal>
      <Reveal delay={0.6}>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Matcha time? 🍵</h2>
          <p className="leading-9">
            I&apos;m not too big on coffee but that&apos;s really where my
            journey started. But if you&apos;d like to learn more I&apos;m happy
            to to get in{" "}
            <a
              className="text-cyan-600 font-semibold italic"
              href="mailto:li.jackie565@gmail.com"
            >
              touch
            </a>
            . I love talking dev and exploring blazingly fast technology.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Resume</h2>
          <p className="leading-9">
            Click for my{" "}
            <a
              target="_blank"
              className="text-cyan-600 font-semibold italic"
              href="/Jackie_Li_CV.pdf"
            >
              resume
            </a>
            , if you have an suggestions of improvement I would love to listen.
            If not your&apos;re welcome to take a look!
          </p>
        </section>
      </Reveal>
    </main>
  );
};

export default Page;
