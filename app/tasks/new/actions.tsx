"use server";
import { db } from "@/appwrite";
import { auth } from "@/auth";
import { ID } from "appwrite";

export async function submitNewTask(data: FormData) {
  "use server";
  const session = await auth();
  const results: TaskResult[] = JSON.parse(data.get("taskResults") as string);
  db.createDocument("db", "tasks", ID.unique(), {
    title: data.get("title")?.valueOf(),
    info: data.get("info")?.valueOf(),
    language: data.get("language")?.valueOf(),
    creator: session?.user?.id as string,
    tasksResults: results,
    public: data.get("public") === "on" ? true : false,
  });
}
