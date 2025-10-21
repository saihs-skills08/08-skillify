"use server";

import { db } from "@/appwrite";

export async function editTask(data: FormData, id: string) {
  const results: TaskResult[] = JSON.parse(data.get("taskResults") as string);
  await db.updateDocument("db", "tasks", id, {
    title: data.get("title")?.valueOf(),
    info: data.get("info")?.valueOf(),
    language: data.get("language")?.valueOf(),
    tasksResults: results,
    public: data.get("public") === "on" ? true : false,
  });
}
export async function getTaskById(taskId: string) {
  const task = await db.getDocument("db", "tasks", taskId);
  return task as any as Task;
}
