import { Metadata } from "next";
import { getAllUser, getUserProjects } from "./actions";
import ProjectList from "./list";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "我的專案 | 08 Skillify",
};

export default async function Projects() {
  const projects = await getUserProjects();
  const userInfo = await getUserInfo();
  const allUsers = await getAllUser();
  return (
    <ProjectList
      projectData={projects}
      userInfo={userInfo}
      allUsers={allUsers}
    />
  );
}
