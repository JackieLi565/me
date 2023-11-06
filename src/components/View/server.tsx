import Database from "@/lib/db";
import { Blog } from "@/types/types";
import { FC } from "react";
import ViewCounter from "./client";

type ViewProps = {
  slug: string;
  count?: boolean;
};

const getBlogViewData = async (slug: string) => {
  const client = new Database();

  const db = await client.connect();
  const projection = { _id: 0 };
  const doc = await db
    .collection<Blog>("blogs")
    .findOne({ title: slug }, { projection });

  if (!doc) throw new Error("Undefined Document");

  return doc;
};

const Views: FC<ViewProps> = async ({ slug, count = false }) => {
  try {
    const doc = await getBlogViewData(slug);
    return <ViewCounter doc={doc} count={count} />;
  } catch (e: any) {
    console.log(e);

    return <span>no</span>;
  }
};

export default Views;
