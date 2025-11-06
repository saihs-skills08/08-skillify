import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      ...(appwriteEndpoint
        ? [
            {
              protocol: new URL(appwriteEndpoint).protocol.replace(
                ":",
                "",
              ) as "http" | "https",
              hostname: new URL(appwriteEndpoint).hostname,
            },
          ]
        : []),
    ],
  },
  output: "standalone",
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
