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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-4">
          {/** Col 1 */}
          <ImageCard
            image={nanaimo}
            title="Nanaimo Station"
            description="Vancouver, British Columbia"
          />
          <ImageCard image={cne} title="CNE" description="Toronto, Ontario" />
        </div>
        <div className="flex flex-col gap-4">
          {/** Col 2 */}
          <ImageCard
            image={query}
            title="Cove Forest"
            description="Vancouver, British Columbia"
          />

          <ImageCard
            image={squamish}
            title="Mt Habrich"
            description="Squamish, British Columbia"
          />
        </div>
        <div className="flex flex-row md:flex-col gap-4">
          {/** Col 3 */}
          <ImageCard
            image={bike}
            title="Humber Bay"
            description="Toronto, Ontario"
          />

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
