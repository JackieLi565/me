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
  const images = [
    {
      image: bike,
      title: "Humber Bay",
      location: "Toronto, Ontario",
    },

    {
      image: cne,
      title: "Canadian National Exhibition",
      location: "Toronto, Ontario",
    },
    {
      image: query,
      title: "Cove Forest",
      location: "Vancouver, British Columbia",
    },
    {
      image: squamish,
      title: "Mt Habrich",
      location: "Squamish, British Columbia",
    },
    {
      image: nanaimo,
      title: "Nanaimo Station",
      location: "Vancouver, British Columbia",
    },
    {
      image: riverdale,
      title: "Riverdale",
      location: "Toronto, Ontario",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {images.map((image) => (
          <div className="w-1/2 md:w-1/3 p-1">
            <ImageCard
              image={image.image}
              title={image.title}
              description={image.location}
            />
          </div>
        ))}
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
