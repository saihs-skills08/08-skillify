"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  code,
  language = "java",
  showLineNumbers = true,
}: {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}) {
  return (
    <SyntaxHighlighter
      language={language == "android" ? "kotlin" : language}
      style={oneDark}
      showLineNumbers={showLineNumbers}
      customStyle={{
        borderRadius: "0.8rem",
        padding: "1rem",
        backgroundColor: "#282c34",
        fontSize: "0.9rem",
      }}
      className="overflow-auto max-h-[60vh]"
    >
      {code}
    </SyntaxHighlighter>
  );
}
