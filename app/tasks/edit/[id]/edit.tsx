"use client";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "./actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ID } from "appwrite";
import { Card } from "@/components/ui/card";
import { BrushCleaning, CornerUpLeft, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taskComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditTaskPage({ task }: { task: Task }) {
  const router = useRouter();
  const [taskResults, setTaskResults] = useState<TaskResult[]>(
    task.tasksResults,
  );
  const [infoText, setInfoText] = useState<string>(task.info);

  return (
    <div>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>取消</span>
        </Button>
      </Link>
      <h1 className="text-4xl font-bold">編輯題目</h1>
      <form
        className="mt-5 flex flex-col gap-4"
        action={async (data) => {
          toast.promise(editTask(data, task.$id), {
            loading: "套用變更中...",
            success: () => {
              router.push(`/tasks/${task.$id}`);
              return "變更套用成功！";
            },
            error: "變更套用失敗，請稍後再試！",
          });
        }}
      >
        <div className="flex gap-4">
          <Input
            placeholder="標題"
            name="title"
            required
            defaultValue={task.title}
          />
          <Select name="language" required defaultValue={task.language}>
            <SelectTrigger>
              <SelectValue placeholder="平台" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kotlin">Kotlin</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="Android">Android</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Textarea
            placeholder="內容"
            name="info"
            required
            onChange={(x) => setInfoText(x.target.value)}
            defaultValue={task.info}
          />
          <div className="border rounded-lg p-4">
            <ReactMarkdown
              components={taskComponents as any}
              remarkPlugins={[remarkGfm]}
            >
              {infoText}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl">執行解果</p>
          <Button
            onClick={() => {
              setTaskResults([
                ...taskResults,
                {
                  $id: ID.unique(),
                  input: "",
                  output: "",
                },
              ]);
            }}
            variant="outline"
            type="button"
          >
            新增執行結果範例
          </Button>
        </div>
        <ScrollArea className="h-100 border rounded-xl">
          <ul className="m-4">
            {taskResults.length > 0 ? (
              taskResults.map((result, index) => (
                <li key={result.$id}>
                  <Card className="p-4 flex flex-col gap-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>範例 {++index}</Badge>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            onClick={() => {
                              setTaskResults(
                                taskResults.filter((r) => r.$id !== result.$id),
                              );
                            }}
                            variant="destructive"
                            type="button"
                          >
                            <Trash />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>刪除範例</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Label htmlFor="input">輸入範例</Label>
                    <Textarea
                      placeholder="輸入範例"
                      id="input"
                      defaultValue={result.input}
                      onChange={(x) => {
                        setTaskResults((prev) =>
                          prev.map((r) =>
                            r.$id === result.$id
                              ? { ...r, input: x.target.value }
                              : r,
                          ),
                        );
                      }}
                    />
                    <Label htmlFor="output">輸出範例</Label>
                    <Textarea
                      placeholder="輸出範例"
                      id="output"
                      defaultValue={result.output}
                      onChange={(x) => {
                        setTaskResults((prev) =>
                          prev.map((r) =>
                            r.$id === result.$id
                              ? { ...r, output: x.target.value }
                              : r,
                          ),
                        );
                      }}
                    />
                  </Card>
                </li>
              ))
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BrushCleaning />
                  </EmptyMedia>
                  <EmptyTitle>尚無任何執行結果範例</EmptyTitle>
                  <EmptyDescription>
                    點擊上方的按鈕來新增執行結果範例
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </ul>
        </ScrollArea>
        <input
          type="hidden"
          name="taskResults"
          value={JSON.stringify(taskResults)}
        />
        <div className="flex items-center gap-2">
          <Label htmlFor="public">公開</Label>
          <Switch name="public" defaultChecked={task.public} />
        </div>
        <Button type="submit" className="mt-5">
          變更
        </Button>
      </form>
    </div>
  );
}
