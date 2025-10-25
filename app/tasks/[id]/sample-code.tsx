"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { taskComponents } from "@/mdx-components";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function SampleCode({ task }: { task: Task }) {
  return (
    <div className="flex gap-2 items-center md:flex-row flex-col justify-center opacity-60">
      <p>真的沒想法？ 參考一下範例程式</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Eye />
            查看範例
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>範例程式碼</DialogTitle>
            <DialogDescription>
              參考完後別忘了自己再試著思考一下、重新練習一次喔
            </DialogDescription>
            <ReactMarkdown components={taskComponents as any}>
              {`
\`\`\`${task.language}
${task.sample || "// 本題目尚未提供範例程式碼"}
\`\`\`
`}
            </ReactMarkdown>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
