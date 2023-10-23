import { FC } from "react";

type TagProps = {
  name: string;
};

const Tag: FC<TagProps> = ({ name }) => {
  return (
    <li className="text-xs inline-block bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded-md">
      {name}
    </li>
  );
};

export default Tag;
