import { Hash } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import ReadEditor from "./components/utils/ReadEditor";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-extrabold text-5xl bg-gradient-to-tr from-green-500 text-transparent to-green-200 bg-clip-text mb-5">
      {children}
    </h1>
  ),
  h2: ({ children }) => {
    const id = children.toLowerCase().replace(/\s+/g, "-"); // convert text to id
    return (
      <a
        href={`#${id}`}
        className="flex items-center gap-1 hover:text-green-400 transition-colors"
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

  p: ({ children }) => <p className="mx-2 leading-6">{children}</p>,
  img: (props) => (
    <img {...props} className="rounded-xl drop-shadow-xl mx-auto my-3" />
  ),
  hr: () => <hr className="my-5 border-green-200" />,
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-green-600 hover:underline hover:text-green-400 transition-colors break-all"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc my-3 ml-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal my-3 ml-6">{children}</ol>,
  li: ({ children }) => <li className="my-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-green-300 bg-green-50 px-4 py-2 my-4 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <ReadEditor code={String(children)} language="java" />
  ),
  table: ({ children }) => (
    <table className="border-collapse border border-green-300 my-4 mx-auto w-full">
      {children}
    </table>
  ),
  thead: ({ children }) => <thead className="bg-green-100">{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border border-green-200 even:bg-green-50">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="border border-green-200 px-4 py-2 text-left bg-green-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-green-200 px-4 py-2">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
