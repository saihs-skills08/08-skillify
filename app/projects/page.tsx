import { getUserProjects } from "./actions";
import ProjectList from "./list";

export default async function Projects() {
  const projects = await getUserProjects();
  return (
    <div className="">
      <ProjectList projectData={projects} />
    </div>
  );
}
