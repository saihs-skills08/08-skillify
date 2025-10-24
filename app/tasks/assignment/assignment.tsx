"use client";

import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/utils/HighlightCode";
import { Check, CornerUpLeft, ExternalLink, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteAssignment,
  getAssignment,
  markAssignmentDone,
} from "./update-assignment-state";
import { useEffect, useState } from "react";
import { client } from "@/appwrite";

export default function TaskAssignmentPage({
  originalAssignment,
}: {
  originalAssignment: Assignment[];
}) {
  const [assignments, setAssignments] =
    useState<Assignment[]>(originalAssignment);
  // useEffect(() => {
  //   const realtime = client.subscribe(["documents"], (response) => {
  //     if (
  //       response.channels.includes(
  //         "databases.db.collections.assignment.documents"
  //       )
  //     ) {
  //       getAssignment().then((data) => {
  //         setAssignments(data);
  //       });
  //     }
  //   });
  //   return () => {
  //     realtime();
  //   };
  // }, []);
  return (
    <div>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>所有題目</span>
        </Button>
      </Link>
      <h1 className="text-3xl font-bold">繳交作業</h1>
      <ul>
        {assignments.map((assignment: Assignment) => (
          <li
            key={assignment.$id}
            className={`my-4 p-4 border rounded-xl ${
              assignment.done ? "border-green-500 border-" : ""
            }`}
          >
            <div className="flex justify-between mb-2 md:flex-row flex-col">
              <div>
                <h2 className="text-xl font-bold">{assignment.owner.name}</h2>
                <p className="text-xs text-gray-500">{assignment.$createdAt}</p>
                <Button variant="link" className="p-0 mb-2">
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
            <CodeBlock
              code={assignment.content}
              language={assignment.tasks.language}
              showLineNumbers={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
