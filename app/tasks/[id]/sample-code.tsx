"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CodeBlock from "@/components/utils/HighlightCode";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";

export default function SampleCode({ task }: { task: Task }) {
  return (
    <div className="flex gap-2 items-center md:flex-row flex-col justify-center">
      <p>真的沒想法？ 參考一下範例程式</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
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
          </DialogHeader>
          <CodeBlock
            code={task.sample || "// 本題目尚未提供範例程式碼"}
            language={task.language}
            showLineNumbers={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
