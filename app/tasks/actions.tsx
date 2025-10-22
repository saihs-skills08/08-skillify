"use server";

import { db } from "@/appwrite";
import { Query } from "appwrite";

export async function deleteTask(id: string) {
  await db.deleteDocument("db", "tasks", id);
}

export async function getAllTasks(userInfo: User) {
  return await db.listDocuments("db", "tasks", [
    Query.orderDesc("$updatedAt"),
    ...(userInfo.role !== "expert" ? [Query.equal("public", true)] : []),
  ]);
}

export async function getAssignmentsByUserId(userId: string) {
  if(!userId) return [];
  const assignments = await db.listDocuments("db", "assignment", [
    Query.equal("owner", userId),
  ]);
  return assignments.documents as any as Assignment[];
}
