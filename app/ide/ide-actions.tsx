"use server";

import { db } from "@/appwrite";

export async function updateProjectContent(id: string, content: string) {
  await db.updateDocument("db", "projects", id, {
    content: content,
  });
  return true;
}

export async function getProjectInfo(id: string) {
  const document = await db.getDocument("db", "projects", id);
  return document;
}
