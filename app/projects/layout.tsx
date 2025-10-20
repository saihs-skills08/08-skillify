import React from "react";
import NewProjectDialog from "./new-project";
import { auth } from "@/auth";
import NotAuthed from "@/components/page/not-authed";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return session?.user ? (
    <div className="p-4 max-w-3xl mx-auto fade-in">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-4xl font-bold ">我的專案</h1>
        <NewProjectDialog />
      </div>
      <div className="">{children}</div>
    </div>
  ) : (
    <NotAuthed />
  );
}
