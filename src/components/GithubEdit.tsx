import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FC } from "react";
import Reveal from "./Animation";

type Props = {
  name: string;
};

export const GitHubEdit: FC<Props> = ({ name }) => {
  const file = name + ".md";
  const githubFileLOC =
    "https://github.com/JackieLi565/me/blob/main/src/md/" + file;

  return (
    <Reveal>
      <div className="flex justify-center">
        <Link
          className="inline-flex px-3 py-1.5 items-center gap-2 border-b-2 border-transparent hover:border-cyan-600 rounded-lg transition-all"
          href={githubFileLOC}
          target="_blank"
        >
          <p className="text-white text-lg">
            Somethings wrong? Edit this page on GitHub
          </p>
          <EditOutlined className="text-cyan-600" />
        </Link>
      </div>
    </Reveal>
  );
};
