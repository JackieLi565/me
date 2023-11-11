"use client";
import { useRef, useEffect, FC } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

interface HighlightedMarkdownProps {
  children: string;
}

const HighlightedMarkdown: FC<HighlightedMarkdownProps> = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.querySelectorAll("pre code").forEach((block) => {
        // @ts-ignore
        hljs.highlightBlock(block);
      });
    }
  }, [children]);

  return (
    <div ref={rootRef}>
      <Markdown>{children}</Markdown>
    </div>
  );
};

export default HighlightedMarkdown;
