import type { Metadata } from "next";
import Link from "next/link";
import { pages } from "./book-data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "GuideBook | 08 Skillify",
};

export default function BookPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">培訓文檔</h1>
        <Badge variant="outline">Work in progress...</Badge>
      </div>
      <div className="flex flex-col mt-4 gap-2">
        {pages.map((page) => (
          <Link
            key={page.order}
            href={page.link}
            className="p-4 hover:bg-gray-100 rounded-xl transition flex items-center gap-4"
          >
            <div className="text-xl bg-green-200 rounded-full h-10 w-10 flex items-center justify-center">
              {page.order}
            </div>
            <h2 className="text-xl font-semibold">{page.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
