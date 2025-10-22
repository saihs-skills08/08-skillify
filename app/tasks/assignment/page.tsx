import TaskAssignmentPage from "./assignment";
import { getAssignment } from "./update-assignment-state";

export default async function AssignmentPage() {
  const assignments = await getAssignment();
  return <TaskAssignmentPage originalAssignment={assignments} />;
}
