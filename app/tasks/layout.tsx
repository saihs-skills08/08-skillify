import { ReactNode } from "react";

export default function TasksLAyout({ children }: { children: ReactNode }) {
  return <div className="p-4 max-w-3xl mx-auto fade-in">{children}</div>;
}
