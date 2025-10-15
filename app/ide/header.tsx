"use client";

import { useSearchParams } from "next/navigation";

export default function IdeHeader() {
  const searchParams = useSearchParams();
  const hasProject = searchParams.has("project");
  const project = searchParams.get("project");
  return <div className="flex items-center">file: {project}</div>;
}
