import { getTaskById } from "./actions";
import EditTaskPage from "./edit";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskById(id);
  return <EditTaskPage task={task} />;
}
