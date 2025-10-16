import Link from "next/link";
import { pages } from "./book-data";

export default function BookPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold bg-gradient-to-tr from-green-500 text-transparent to-[#66C894] bg-clip-text">
        GuideBook
      </h1>
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
