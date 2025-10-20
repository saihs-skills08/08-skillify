"use server";

import { db } from "@/appwrite";

export async function editTask(data: FormData) {}
export async function deleteTask(taskId: string) {}
export async function getTaskById(taskId: string) {
  const task = await db.getDocument("db", "tasks", taskId);
  return task as any as Task;
}
