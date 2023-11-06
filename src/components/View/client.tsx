"use client";
import { incViewCount } from "@/actions";
import { Blog } from "@/types/types";
import { FC, useEffect } from "react";

type ViewCountProps = {
  count: boolean;
  doc: Blog;
};

const ViewCounter: FC<ViewCountProps> = ({ count, doc }) => {
  useEffect(() => {
    if (count) {
      incViewCount(doc.title);
    }
  }, []);

  return (
    <span>
      {doc.views} {doc.views > 1 ? "views" : "view"}
    </span>
  );
};

export default ViewCounter;
