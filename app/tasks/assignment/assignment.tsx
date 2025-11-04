"use client";

import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/utils/HighlightCode";
import {
  Check,
  ClipboardIcon,
  CornerUpLeft,
  ExternalLink,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteAssignment,
  getAssignment,
  markAssignmentDone,
} from "./update-assignment-state";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TaskAssignmentPage({
  originalAssignment,
}: {
  originalAssignment: Assignment[];
}) {
  const [assignments, setAssignments] =
    useState<Assignment[]>(originalAssignment);
  
  const pendingAssignments = assignments.filter((assignment) => !assignment.done);
  const completedAssignments = assignments.filter((assignment) => assignment.done);

  const renderAssignmentList = (assignmentList: Assignment[]) => (
    <ul>
      {assignmentList.map((assignment: Assignment) => (
        <li
          key={assignment.$id}
          className={`my-4 p-4 flex flex-col relative border rounded-xl ${
            assignment.done ? "border-green-400 border-" : ""
          }`}
        >
          {assignment.done && (
            <div className="absolute left-[-10px] top-[-10px] drop-shadow-md bg-green-400 rounded-full p-1">
              <Check size={20} />
            </div>
          )}
          <div className="flex justify-between md:flex-row flex-col">
            <div>
              <h2 className="text-xl font-bold">{assignment.owner.name}</h2>
              <p className="text-xs text-gray-500">{assignment.$createdAt}</p>
              <Button variant="link" className="p-0">
                <Link
                  className="text-lg flex items-center gap-1"
                  href={`/tasks/${assignment.tasks.$id}`}
                >
                  {assignment.tasks.title}
                  <ExternalLink size={15} />
                </Link>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  toast.promise(
                    async () => {
                      return markAssignmentDone(
                        assignment.$id,
                        !assignment.done,
                      ).then(() => {
                        getAssignment().then((data) => {
                          setAssignments(data);
                        });
                      });
                    },
                    {
                      loading: "套用變更中...",
                      success: "完成",
                      error: "操作失敗，請稍後再試",
                    },
                  );
                }}
              >
                <Check />
                標記為{assignment.done ? "未完成" : "完成"}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  if (confirm("確定要刪除這筆作業嗎？")) {
                    toast.promise(
                      async () => {
                        return deleteAssignment(assignment.$id).then(() => {
                          getAssignment().then((data) => {
                            setAssignments(data);
                          });
                        });
                      },
                      {
                        loading: "刪除中...",
                        success: "刪除成功！",
                        error: "刪除失敗，請再試一次。",
                      },
                    );
                  }
                }}
              >
                <Trash />
              </Button>
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="code">
              <AccordionTrigger>程式碼</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  <CodeBlock
                    code={assignment.content}
                    language={assignment.tasks.language}
                    showLineNumbers={true}
                  />
                  <Button
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(assignment.content);
                      toast.success("程式碼已複製到剪貼簿！");
                    }}
                    className="self-end"
                  >
                    <ClipboardIcon />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>所有題目</span>
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">繳交作業</h1>
      
      {pendingAssignments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">待完成作業</h2>
          {renderAssignmentList(pendingAssignments)}
        </div>
      )}
      
      {completedAssignments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">已完成作業</h2>
          {renderAssignmentList(completedAssignments)}
        </div>
      )}
      
      {assignments.length === 0 && (
        <p className="text-gray-500 mt-4">目前沒有任何作業</p>
      )}
    </div>
  );
}
