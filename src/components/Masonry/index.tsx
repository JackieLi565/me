"use client";
import nanaimo from "../../../public/gallery/nanaimo.jpg";
import spybird from "../../../public/gallery/spyBird.jpg";
import squamish from "../../../public/gallery/squam.jpg";
import cne from "../../../public/gallery/cne.jpg";
import bike from "../../../public/gallery/nukeproof.jpg";
import query from "../../../public/gallery/eastvan.jpg";
import riverdale from "../../../public/gallery/riverdale.jpg";
import bike2 from "../../../public/gallery/bike.jpg";

import Image, { StaticImageData } from "next/image";
import { FC } from "react";
const Masonry = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2 md:w-1/3 p-1">
          <ImageCard
            image={nanaimo}
            title="Nanaimo Station"
            description="Vancouver, British Columbia"
          />
        </div>
        <div className="w-1/2 lg:w-1/3 p-1">
          <ImageCard
            image={cne}
            title="Canadian National Exhibition"
            description="Toronto, Ontario"
          />
        </div>
        <div className=" w-1/2 lg:w-1/3 p-1">
          <ImageCard
            image={query}
            title="Cove Forest"
            description="Vancouver, British Columbia"
          />
        </div>
        <div className="w-1/2 md:w-1/3 p-1">
          <ImageCard
            image={squamish}
            title="Mt Habrich"
            description="Squamish, British Columbia"
          />
        </div>
        <div className="w-1/2 md:w-1/3 p-1">
          <ImageCard
            image={bike}
            title="Humber Bay"
            description="Toronto, Ontario"
          />
        </div>
        <div className="w-1/2 md:w-1/3 p-1">
          <ImageCard
            image={riverdale}
            title="Riverdale"
            description="Toronto, Ontario"
          />
        </div>
      </div>
      <p className="text-right italic text-paragraph text-opacity-50">
        not really good at taking pictures
      </p>
    </div>
  );
};

export default Masonry;

type ImageCardProps = {
  image: StaticImageData;
  title: string;
  description: string;
};
const ImageCard: FC<ImageCardProps> = ({ image, title, description }) => {
  const finishLoad = (image: HTMLImageElement) => {
    image.classList.remove("opacity-0");
  };
  return (
    <div className="relative group ">
      <div className="absolute justify-center bg-cyan-950 w-full h-full rounded-lg bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <h1 className="text-xl px-2 mt-4">{title}</h1>
        <p className="text-sm px-2 text-paragraph italic">{description}</p>
      </div>
      <Image
        className="rounded-lg opacity-0 transition-opacity duration-300"
        onLoadingComplete={finishLoad}
        src={image}
        alt=""
      />
    </div>
  );
};
