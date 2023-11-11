"use server";
import Database from "./lib/db";
import { Blog } from "./types/types";

export const incViewCount = async (title: string) => {
  const client = Database.getInstance();
  try {
    const db = await client.connect();

    const result = await db.collection<Blog>("blogs").findOneAndUpdate(
      { title },
      {
        $inc: {
          views: 1,
        },
      }
    );

    return result;
  } catch (e) {
    console.log(e);
  } finally {
    await client.disconnect();
  }
};
