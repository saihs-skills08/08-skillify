import TasksList from "./list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { Metadata } from "next";
import { getAllTasks, getAssignmentsByUserId } from "./actions";
import { getAssignment } from "./assignment/update-assignment-state";

export const metadata: Metadata = {
  title: "練習題目 | 08 Skillify",
};

export default async function TasksPage() {
  const userInfo = await getUserInfo();
  const assignments = await getAssignmentsByUserId(userInfo.$id);
  const tasks = await getAllTasks(userInfo);
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <div>
          <h1 className="text-4xl font-bold ">練習題目</h1>
        </div>
        <div className="flex items-center gap-2">
          {userInfo.role === "expert" && (
            <>
              <Link href="/tasks/assignment">
                <Button variant="ghost">檢視作業</Button>
              </Link>
              <Link href="/tasks/new">
                <Button variant="outline">建立題目</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <TasksList tasksData={tasks.documents as any} assignments={assignments} />
    </div>
  );
}
