"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";
import { submitAssignment } from "./assignment-actions";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WandSparkles } from "lucide-react";

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
  function formatCode() {
    toast.promise(
      fetch(
        `${process.env.NODE_ENV === "development" ? "http" : "https"}://${process.env.NEXT_PUBLIC_BACKEND_HOST}/format/${task.language}`,
        {
          method: "POST",
          body: code,
        },
      ).then(async (res) => setCode(await res.text())),
      {
        loading: "格式化程式碼中...",
        success: "程式碼格式化成功!",
        error: "程式碼格式化失敗!",
      },
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="p-2 border rounded-lg">
        <MonacoEditor
          height="400px"
          defaultLanguage={task.language}
          defaultValue={code}
          value={code}
          onChange={(x) => {
            setCode(x as any);
          }}
          options={{
            minimap: { enabled: false },
          }}
        />
      </div>
      <Button
        variant="outline"
        className="border-indigo-200 bg-indigo-100 hover:bg-indigo-200"
        onClick={formatCode}
      >
        <WandSparkles />
        格式化程式碼
      </Button>
      <DialogClose asChild>
        <Button
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
    </div>
  );
}
