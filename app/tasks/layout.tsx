import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

export default function TasksLayout({ children }: { children: ReactNode }) {
  return <div className="p-4 max-w-3xl mx-auto fade-in">{children}</div>;
}
