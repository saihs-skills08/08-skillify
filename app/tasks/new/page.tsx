import { auth } from "@/auth";
import PageNotFound from "@/components/page/404";
import { getUserInfo } from "@/components/utils/getUserInfo";
import TaskEdit from "@/components/page/task-edit";
import { getTags } from "../tags/actions";

export default async function CreateNewTaskPage() {
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  if (user.role !== "expert") {
    return PageNotFound();
  }
  const tags = await getTags();
  return <TaskEdit task={null} allTags={tags} />;
}
