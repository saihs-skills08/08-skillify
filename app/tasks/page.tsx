import { db } from "@/appwrite";
import TasksList from "./list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { Query } from "appwrite";

export default async function TasksPage() {
  const userInfo = await getUserInfo();
  const tasks = await db.listDocuments("db", "tasks", [
    Query.orderDesc("$updatedAt"),
    ...(userInfo.role !== "expert" ? [Query.equal("public", true)] : []),
  ]);
  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <div>
          <h1 className="text-4xl font-bold ">練習題目</h1>
        </div>
        {userInfo.role === "expert" && (
          <Link href="/tasks/new">
            <Button variant="outline">建立題目</Button>
          </Link>
        )}
      </div>
      <TasksList tasksData={tasks.documents as any} />
    </div>
  );
}
