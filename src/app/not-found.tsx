import Error from "@/components/Error";
import { ErrorTitle } from "@/components/Titles";
import { FC } from "react";

const Page: FC = async () => {
  return (
    <main className="flex flex-col gap-10 justify-center">
      <ErrorTitle />
      <Error message="wanna try again?" />
    </main>
  );
};

export default Page;
