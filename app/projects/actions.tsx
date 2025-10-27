"use server";
import { db } from "@/appwrite";
import { ID, Query } from "appwrite";
import { auth } from "@/auth";

export async function submitForm(data: FormData) {
  const session = await auth();
  const projectName = data.get("projectName")?.valueOf();
  const fileName = data.get("fileName")?.valueOf();
  const language = data.get("language")?.valueOf();
  await db.createDocument("db", "projects", ID.unique(), {
    name: projectName,
    filename: fileName,
    language: language,
    owner: session?.user?.id,
  });
  return true;
}

export async function deleteProject(projectId: string) {
  await db.deleteDocument("db", "projects", projectId);
  return true;
}

export async function renameProject(projectId: string, newProject: Project) {
  await db.updateDocument("db", "projects", projectId, {
    name: newProject.name,
    filename: newProject.filename,
    language: newProject.language,
  });
  return true;
}

export async function getUserProjects(userId?: string) {
  const session = await auth();
  const { documents: projects } = (await db.listDocuments("db", "projects", [
    Query.equal("owner", userId ?? session?.user?.id ?? ("" as string)),
    Query.orderDesc("$updatedAt"),
  ])) as any as { documents: Project[] };
  return projects;
}

export async function getAllUser() {
  const { documents: users } = await db.listDocuments("db", "users");
  return users as any as User[];
}
