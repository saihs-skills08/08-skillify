"use server";
import { db } from "@/appwrite";
import { auth } from "@/auth";

export async function getUserInfo(userId?: string) {
  const session = await auth();
  const user = await db.getDocument(
    "db",
    "users",
    userId ? userId : session?.user?.id || "",
  );

  return user as any as User;
}
