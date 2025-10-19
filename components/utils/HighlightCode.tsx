"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  code,
  language = "java",
}: {
  code: string;
  language?: string;
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      customStyle={{
        borderRadius: "0.8rem",
        padding: "1rem",
        backgroundColor: "#282c34",
        fontSize: "0.9rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
