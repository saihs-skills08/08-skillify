"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinkWrapper({ item }: { item: NavItem }) {
  const pathname = usePathname();
  return (
    <li
      key={item.name}
      className={`text-lg font-medium ${pathname.startsWith(item.href) ? "bg-green-100 ring-green-200 drop-shadow-md nav-link-current" : "nav-link"} hover:bg-green-100 hover:ring ring-green-200 hover:opacity-[80%] hover:drop-shadow-md px-3 py-1 rounded-full duration-200`}
    >
      <Link href={item.href}>{item.name}</Link>
    </li>
  );
}
