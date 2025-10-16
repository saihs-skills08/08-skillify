"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function ReadEditor({
  code,
  language = "javascript",
}: CodeBlockProps) {
  return (
    <div className="m-1 p-1 border-2 border-green-100 rounded-xl">
      <MonacoEditor
        height="150px"
        defaultLanguage={language}
        value={code.trim()}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}
