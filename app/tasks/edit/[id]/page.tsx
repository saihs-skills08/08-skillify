import { auth } from "@/auth";
import { getTaskById } from "./actions";
import EditTaskPage from "./edit";
import { getUserInfo } from "@/components/utils/getUserInfo";
import PageNotFound from "@/components/page/404";
import { getTags } from "../../tags/actions";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  if (user.role !== "expert") {
    return PageNotFound();
  }
  const { id } = await params;
  const task = await getTaskById(id);
  const tags = await getTags();

  return <EditTaskPage task={task} allTags={tags} />;
}
