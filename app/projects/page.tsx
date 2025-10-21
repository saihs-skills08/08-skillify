import { Metadata } from "next";
import { getUserProjects } from "./actions";
import ProjectList from "./list";

export const metadata: Metadata = {
  title: "我的專案 | 08 Skillify",
};

export default async function Projects() {
  const projects = await getUserProjects();
  return <ProjectList projectData={projects} />;
}
