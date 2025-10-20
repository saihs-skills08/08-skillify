import { Hash, SquareArrowUpRight } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import ReadEditor from "./components/utils/ReadEditor";
import CodeBlock from "./components/utils/HighlightCode";

export const taskComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
  h2: ({ children }) => {
    return <h2 className="font-bold text-xl">{children}</h2>;
  },
  p: ({ children }) => <p className="leading-7">{children}</p>,
  img: (props) => <img {...props} className="rounded-xl mx-auto my-2" />,
  hr: () => <hr className="my-5 border-green-200" />,
  a: ({ children, href }) => (
    <a
      href={href}
      className="flex items-center gap-1 text-green-600 hover:underline hover:text-green-700 transition-colors break-all"
    >
      {children}
      <SquareArrowUpRight size={20} />
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc my-3 ml-10">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal my-3 ml-6">{children}</ol>,
  li: ({ children }) => <li className="my-2">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-green-300 bg-green-50 px-4 py-2 my-4 rounded-lg">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const language = className ? className.replace("language-", "") : "";
    const codeString = String(children).replace(/^\n+|\n+$/g, "");
    return String(children).includes("\n") ? (
      <CodeBlock code={codeString} language={language} />
    ) : (
      <code className="bg-green-100 text-green-800 px-1 mx-1 py-0.5 rounded-md">
        {children}
      </code>
    );
  },
};

export const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-extrabold text-5xl bg-gradient-to-tr from-green-500 text-transparent to-teal-100 bg-clip-text mb-5">
      {children}
    </h1>
  ),
  h2: ({ children }) => {
    let id = "";
    if (typeof children === "string" || typeof children === "number") {
      id = String(children).toLowerCase().replace(/\s+/g, "-");
    }
    return (
      <a
        href={`#${id}`}
        className="flex items-center gap-1 hover:text-green-600 transition-colors"
      >
        <h2
          id={id}
          className="font-bold text-2xl mb-1 mt-4 flex items-center gap-1 drop-shadow-lg group"
        >
          <Hash className="text-green-400 opacity-70 group-hover:opacity-100" />
          {children}
        </h2>
      </a>
    );
  },
  p: ({ children }) => <p className="mx-2 leading-7">{children}</p>,
  img: (props) => (
    <img {...props} className="rounded-xl drop-shadow-xl mx-auto my-3" />
  ),
  hr: () => <hr className="my-5 border-green-200" />,
  a: ({ children, href }) => (
    <a
      href={href}
      className="flex items-center gap-1 text-green-600 hover:underline hover:text-green-700 transition-colors break-all"
    >
      {children}
      <SquareArrowUpRight size={20} />
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc my-3 ml-10">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal my-3 ml-6">{children}</ol>,
  li: ({ children }) => <li className="my-2">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-green-300 bg-green-50 px-4 py-2 my-4 italic rounded-lg">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const language = className ? className.replace("language-", "") : "";
    const codeString = String(children).replace(/^\n+|\n+$/g, "");

    return String(children).includes("\n") ? (
      // <ReadEditor code={String(children)} language="java" />
      <CodeBlock code={codeString} language={language} />
    ) : (
      <code className="bg-green-100 text-green-800 px-1 mx-1 py-0.5 rounded-md">
        {children}
      </code>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
