"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import { submitAssignment } from "./assignment-actions";
import { DialogClose } from "@radix-ui/react-dialog";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function SubmitAssignment({
  task,
  assignment,
}: {
  task: Task;
  assignment: Assignment;
}) {
  const [code, setCode] = useState(assignment.content || "");
  return (
    <>
      <MonacoEditor
        height="400px"
        defaultLanguage={task.language}
        defaultValue={code}
        onChange={(x) => {
          setCode(x as any);
        }}
      />
      <DialogClose asChild>
        <Button
          className="mt-4"
          onClick={() => {
            toast.promise(submitAssignment(task, code), {
              loading: "繳交作業中...",
              success: "作業繳交成功！",
              error: "作業繳交失敗，請再試一次。",
            });
          }}
        >
          {assignment?.$id ? "重新繳交作業" : "繳交作業"}
        </Button>
      </DialogClose>
    </>
  );
}
