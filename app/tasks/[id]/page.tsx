import { db } from "@/appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { taskComponents } from "@/mdx-components";
import { CornerUpLeft, Edit, MoreVertical, Trash } from "lucide-react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { deleteTask } from "../actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { auth } from "@/auth";

export default async function TaskInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = (await db.getDocument("db", "tasks", id)) as any as Task;
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");

  return (
    <section>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>全部題目</span>
        </Button>
      </Link>
      <div className="flex gap-1 items-center mt-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src={task.creator.avatar} />
          <AvatarFallback>{task.creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-gray-500 text-xs">由 {task.creator.name} 創建</p>
      </div>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <div className="flex items-center">
          <Badge variant="secondary">{task.language}</Badge>
          {user.role === "expert" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="ml-2">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="m-2">
                <DropdownMenuItem
                  onClick={async () => {
                    "use server";
                    toast.promise(deleteTask(task.$id), {
                      loading: "刪除題目中...",
                      success: () => {
                        redirect("/tasks");
                        return "題目刪除成功！";
                      },
                      error: "題目刪除失敗，請稍後再試！",
                    });
                  }}
                >
                  <Trash />
                  刪除
                </DropdownMenuItem>
                <Link href={`/tasks/edit/${task.$id}`}>
                  <DropdownMenuItem>
                    <Edit />
                    編輯
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <MDXRemote source={task.info} components={taskComponents} />
      <div className="mt-4">
        {task.tasksResults.map((result, index) => {
          const ResultComponent = `
            # 範例${index + 1}
            ${result.input != "" && `輸入範例`}
            ${
              result.input != "" &&
              `
            \`\`\`java
            ${result.input}
            \`\`\`
            `
            }
            ${result.output != "" && `輸出範例`}
            ${
              result.output != "" &&
              `
            \`\`\`java
            ${result.output}
            \`\`\`
            ---
            `
            }
            `;

          return (
            <div key={result.$id}>
              <MDXRemote source={ResultComponent} components={taskComponents} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
