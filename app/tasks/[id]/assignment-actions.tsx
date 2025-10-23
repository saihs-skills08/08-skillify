"use server";

import { db } from "@/appwrite";
import { auth } from "@/auth";
import EmailTemplate from "@/emails/email";
import { ID, Query } from "appwrite";
import { Resend } from "resend";

export async function submitAssignment(task: Task, content: string) {
  const session = await auth();
  const userId = session?.user?.id;
  const existingAssignments = await db.listDocuments("db", "assignment", [
    Query.equal("owner", userId!),
    Query.equal("tasks", task.$id),
  ]);
  if (userId) {
    if (existingAssignments.total > 0) {
      const assignmentId = existingAssignments.documents[0].$id;
      return db.updateDocument("db", "assignment", assignmentId, {
        content: content,
      });
    } else {
      const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: "Skillify Notification <skillify@mail.eliaschen.dev>",
        to: ["elias9988110@gmail.com", "sofia0627sofia@gmail.com"],
        subject: `${session?.user?.name || "未知使用者"} 繳交了一份作業`,
        react: (
          <EmailTemplate
            name={session?.user?.name || "未知使用者"}
            title={task.title}
            language={task.language}
            content={content}
          />
        ),
      });
      db.createDocument("db", "assignment", ID.unique(), {
        content: content,
        tasks: task.$id,
        owner: userId,
      });
    }
  }
}
