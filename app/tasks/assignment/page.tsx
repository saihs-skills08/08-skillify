import TaskAssignmentPage from "./assignment";
import { getAssignment } from "./update-assignment-state";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { auth } from "@/auth";
import PageNotFound from "@/components/page/404";

export default async function AssignmentPage() {
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  if (user.role !== "expert") {
    return PageNotFound();
  }
  const assignments = await getAssignment();

  return <TaskAssignmentPage originalAssignment={assignments} />;
}
