"use server";

import { db } from "@/appwrite";
import { Query } from "appwrite";

export async function markAssignmentDone(
  assignmentId: string,
  status: boolean,
) {
  await db.updateDocument("db", "assignment", assignmentId, {
    done: status,
  });
}

export async function getAssignment() {
  const assignments = await db.listDocuments("db", "assignment", [
    Query.orderDesc("$createdAt"),
  ]);
  return assignments.documents as any as Assignment[];
}

export async function deleteAssignment(id: string) {
  await db.deleteDocument("db", "assignment", id);
}
