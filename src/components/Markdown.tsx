import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Markdoc, { type Config, type Schema } from "@markdoc/markdoc";

// Footnote component with hover tooltip
function Footnote({
  children,
  note,
}: {
  children: React.ReactNode;
  note: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isHovered && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isHovered]);

  // Convert \n to line breaks
  const noteContent = (note ?? "").split("\n").map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <span
      ref={wrapperRef}
      className="footnote-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="footnote-text">{children}</span>
      <sup className="footnote-marker">*</sup>
      {isHovered &&
        createPortal(
          <span
            className="footnote-tooltip"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {noteContent}
          </span>,
          document.body
        )}
    </span>
  );
}

// Markdoc tag schema for footnotes
const footnoteTag: Schema = {
  render: "Footnote",
  children: ["inline"],
  attributes: {
    note: {
      type: String,
      required: true,
      description: "The footnote content shown on hover",
    },
  },
};

// Markdoc config with custom tags
const config: Config = {
  tags: {
    footnote: footnoteTag,
  },
};

// Custom components for rendering
const components = {
  Footnote,
};

export function Markdown({ content }: { content: string }) {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast, config);

  return (
    <div className="markdown-content">
      {Markdoc.renderers.react(transformed, React, { components })}
    </div>
  );
}
