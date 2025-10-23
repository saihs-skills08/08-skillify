"use server";
import { db } from "@/appwrite";
import { ID } from "appwrite";

export async function createTag(data: FormData) {
  const name = data.get("name") as string;
  await db.createDocument("db", "tags", ID.unique(), { name });
}

export async function getTags() {
  const { documents } = await db.listDocuments("db", "tags");
  return documents as any as Tag[];
}

export async function deleteTag(tagId: string) {
  await db.deleteDocument("db", "tags", tagId);
}

export async function updateTag(tagId: string, data: FormData) {
  const name = data.get("name") as string;
  await db.updateDocument("db", "tags", tagId, { name });
}
