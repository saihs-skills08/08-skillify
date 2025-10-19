import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrism from "rehype-prism-plus";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: false,
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  experimental: { mdxRs: true },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
});

export default withMDX(nextConfig);
