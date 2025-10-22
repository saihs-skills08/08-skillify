import { auth } from "@/auth";
import CreateNewTasks from "./create-new-tasks";
import PageNotFound from "@/components/page/404";
import { getUserInfo } from "@/components/utils/getUserInfo";

export default async function CreateNewTaskPage() {
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  if (user.role !== "expert") {
    return PageNotFound();
  }
  return <CreateNewTasks />;
}
