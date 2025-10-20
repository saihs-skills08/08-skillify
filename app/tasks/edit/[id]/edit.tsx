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
import { Badge, BrushCleaning, Trash } from "lucide-react";
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
import { useParams, useRouter } from "next/navigation";

export default function EditTaskPage({ task }: { task: Task }) {
  const router = useRouter();
  const [taskResults, setTaskResults] = useState<TaskResult[]>([]);
  const [infoText, setInfoText] = useState<string>("");

  return (
    <div>
      {task.title}
      <h1 className="text-4xl font-bold">建立題目</h1>
      <form
        className="mt-5 flex flex-col gap-4"
        action={async (data) => {
          toast.promise(editTask(data), {
            loading: "題目建立中...",
            success: () => {
              router.push("/tasks");
              return "題目建立成功！";
            },
            error: "題目建立失敗，請稍後再試！",
          });
        }}
      >
        <div className="flex gap-4">
          {" "}
          <Input placeholder="標題" name="title" required />
          <Select name="language" required>
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
        <ScrollArea className="h-130 border rounded-xl">
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
          <Switch name="public" defaultChecked={true} />
        </div>
        <Button type="submit" className="mt-5">
          變更
        </Button>
      </form>
    </div>
  );
}
