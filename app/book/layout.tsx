"use client";

import { usePathname } from "next/navigation";
import { pages } from "./book-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBookPage = pages.some((page) => pathname.startsWith(page.link));
  return (
    <section className="p-4 max-w-3xl mx-auto fade-in">
      {isBookPage && (
        <div className="mb-4">
          <Link href="/book">
            <ArrowLeft className="duration-100 inline-block mr-2 hover:-translate-x-1" />
          </Link>
        </div>
      )}
      <div className="mt-10 mb-20">{children}</div>
    </section>
  );
}
