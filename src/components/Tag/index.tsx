import { FC } from "react";

type TagProps = {
  name: string;
};

const Tag: FC<TagProps> = ({ name }) => {
  return (
    <li className="text-xs text-white inline-block bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
      {name}
    </li>
  );
};

export default Tag;
