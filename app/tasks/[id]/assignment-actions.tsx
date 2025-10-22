"use server";

import { db } from "@/appwrite";
import { auth } from "@/auth";
import { ID, Query } from "appwrite";

export async function submitAssignment(taskId: string, content: string) {
  const session = await auth();
  const userId = session?.user?.id;
  const existingAssignments = await db.listDocuments("db", "assignment", [
    Query.equal("owner", userId!),
    Query.equal("tasks", taskId),
  ]);
  if (userId) {
    if (existingAssignments.total > 0) {
      const assignmentId = existingAssignments.documents[0].$id;
      return db.updateDocument("db", "assignment", assignmentId, {
        content: content,
      });
    } else {
      db.createDocument("db", "assignment", ID.unique(), {
        content: content,
        tasks: taskId,
        owner: userId,
      });
    }
  }
}
