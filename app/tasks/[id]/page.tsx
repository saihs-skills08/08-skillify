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
import { CornerUpLeft, Edit, MoreVertical, Send, Trash } from "lucide-react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAssignmentsByUserId } from "../actions";
import Link from "next/link";
import { auth } from "@/auth";
import SubmitAssignment from "./submit-assignment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SampleCode from "./sample-code";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const task = await db.getDocument("db", "tasks", id);
  return {
    title: `${task.title} | 08 Skillify`,
    description: `${task.info?.slice(0, 100) || "練習題目"}`,
  };
}

export default async function TaskInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = (await db.getDocument("db", "tasks", id)) as any as Task;
  const session = await auth();
  const user = await getUserInfo(session?.user?.id || "");
  const allAssignments = await getAssignmentsByUserId(session?.user?.id || "");
  const currentTaskAssignments = allAssignments.findLast(
    (assignment) => assignment.tasks.$id === task.$id,
  );
  const hasSubmitted = !!currentTaskAssignments;

  return (
    <section>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>所有題目</span>
        </Button>
      </Link>
      <div className="flex gap-1 items-center mt-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src={task.creator.avatar} />{" "}
          <AvatarFallback>{task.creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-gray-500 text-xs">由 {task.creator.name} 創建</p>
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="block">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <div className="flex gap-1 mt-2">
            {task.tags.map((tag) => {
              return (
                <Badge key={tag.$id} variant="outline">
                  {tag.name}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{task.language}</Badge>
          {session?.user && (
            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`${
                        hasSubmitted
                          ? currentTaskAssignments.done
                            ? "border-green-300 bg-green-100"
                            : "border-orange-300 bg-orange-100"
                          : ""
                      }`}
                    >
                      <Send />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  {hasSubmitted ? "重新繳交作業" : "繳交作業"}
                </TooltipContent>
              </Tooltip>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {hasSubmitted ? "重新繳交作業" : "繳交作業"}
                  </DialogTitle>
                  <DialogDescription>
                    請在下方的編輯器中貼上並提交你這個作業的程式碼。
                  </DialogDescription>
                  <SubmitAssignment
                    task={task}
                    assignment={currentTaskAssignments || ({} as Assignment)}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
          {user.role === "expert" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="m-2">
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
        {task.language.toLowerCase() === "android" ? (
          // Android platform: show images in flex-wrap layout without 範例 headers
          <>
            <div className="flex flex-wrap gap-4 mb-4">
              {task.tasksResults
                .filter((result) => result.imageUrl)
                .map((result, index) => (
                  <div key={result.$id} className="flex-shrink-0">
                    <Image
                      src={result.imageUrl!}
                      alt={`執行結果 ${index + 1}`}
                      width={300}
                      height={200}
                      className="rounded-md border"
                    />
                  </div>
                ))}
            </div>
            {task.tasksResults.some(
              (result) => result.input || result.output,
            ) && (
              <div className="mt-4">
                {task.tasksResults.map((result, index) => {
                  const hasInput = result.input && result.input.trim() !== "";
                  const hasOutput =
                    result.output && result.output.trim() !== "";

                  if (!hasInput && !hasOutput) return null;

                  const ResultComponent = `
                    ${hasInput ? `輸入範例` : ""}
                    ${
                      hasInput
                        ? `
                    \`\`\`kotlin
                    ${result.input}
                    \`\`\`
                    `
                        : ""
                    }
                    ${hasOutput ? `輸出範例` : ""}
                    ${
                      hasOutput
                        ? `
                    \`\`\`kotlin
                    ${result.output}
                    \`\`\`
                    `
                        : ""
                    }
                    ${index < task.tasksResults.length - 1 ? "---" : ""}
                    `;

                  return (
                    <div key={result.$id}>
                      <MDXRemote
                        source={ResultComponent}
                        components={taskComponents}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          // Non-Android platforms: keep original format
          task.tasksResults.map((result, index) => {
            const displayLanguage =
              task.language === "android" ? "kotlin" : task.language;
            const ResultComponent = `
            # 範例${index + 1}
            ${result.input != "" ? `輸入範例` : ""}
            ${
              result.input != ""
                ? `
            \`\`\`${displayLanguage}
            ${result.input}
            \`\`\`
            `
                : ""
            }
            ${result.output != "" ? `輸出範例` : ""}
            ${
              result.output != ""
                ? `
            \`\`\`${displayLanguage}
            ${result.output}
            \`\`\`
            `
                : ""
            }
            ---
            `;

            return (
              <div key={result.$id}>
                <MDXRemote
                  source={ResultComponent}
                  components={taskComponents}
                />
                {result.imageUrl && (
                  <div className="mt-2 mb-4">
                    <p className="text-sm font-medium mb-2">執行結果圖片：</p>
                    <Image
                      src={result.imageUrl}
                      alt={`範例 ${index + 1} 執行結果`}
                      width={600}
                      height={400}
                      className="rounded-md border"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <div className="my-8">{task.sample && <SampleCode task={task} />}</div>
    </section>
  );
}
