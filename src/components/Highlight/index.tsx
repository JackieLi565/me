"use client";
import { useRef, useEffect, FC } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js"; // oh my days the import size for this is so big
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
    <article className="prose-headings:font-light prose-li:text-base prose-ul:text-base prose-ol:text-base">
      <div ref={rootRef}>
        <Markdown>{children}</Markdown>
      </div>
    </article>
  );
};

export default HighlightedMarkdown;
