"use client";

import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/app/tasks/edit/[id]/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ID } from "appwrite";
import { Card } from "@/components/ui/card";
import {
  BrushCleaning,
  CornerUpLeft,
  Plus,
  Trash,
  WandSparkles,
  X,
} from "lucide-react";
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
import { submitNewTask } from "@/app/tasks/new/actions";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type Language = "java" | "kotlin" | "android";

export default function TaskEdit({
  task,
  allTags,
}: {
  task?: Task | null;
  allTags: Tag[];
}) {
  const router = useRouter();
  const [taskResults, setTaskResults] = useState<TaskResult[]>(
    task ? task.tasksResults : [],
  );
  const [infoText, setInfoText] = useState<string>(task ? task.info : "");
  const [tags, setTags] = useState<Tag[]>(task ? task.tags : []);
  const [sample, setSample] = useState<string>(task ? task.sample || "" : "");
  const [seletedTag, setSelectedTag] = useState<string>("");
  const [language, setLanguage] = useState<Language>(
    task ? (task.language as Language) : "java",
  );

  return (
    <div>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>取消</span>
        </Button>
      </Link>
      <h1 className="text-4xl font-bold">{task ? "編輯" : "建立"}題目</h1>
      <form
        className="mt-5 flex flex-col gap-4"
        action={async (data) => {
          if (task) {
            toast.promise(editTask(data, task.$id), {
              loading: "套用變更中...",
              success: () => {
                router.push(`/tasks/${task.$id}`);
                return "變更套用成功！";
              },
              error: "變更套用失敗，請稍後再試！",
            });
          } else {
            toast.promise(submitNewTask(data), {
              loading: "題目建立中...",
              success: () => {
                router.push("/tasks");
                return "題目建立成功！";
              },
              error: "題目建立失敗，請稍後再試！",
            });
          }
        }}
      >
        <div className="flex gap-4">
          <Input
            placeholder="標題"
            name="title"
            required
            defaultValue={task?.title}
          />
          <Select
            name="language"
            required
            defaultValue={language}
            onValueChange={(value: Language) => setLanguage(value)}
            value={language}
          >
            <SelectTrigger>
              <SelectValue placeholder="平台" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kotlin">Kotlin</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="android">Android</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="hidden"
          name="tags"
          value={JSON.stringify(tags.map((tag: Tag) => tag.$id))}
        />
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className=" font-bold text-lg">標籤</p>
            <Button variant="link">
              <Link href="/tasks/tags">編輯標籤</Link>
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tags.map((tag) => (
              <Badge key={tag.$id}>
                {tag.name}
                <button
                  type="button"
                  className="hover:opacity-50 duration-100 ml-1"
                  onClick={() => {
                    setTags(tags.filter((t) => t.$id !== tag.$id));
                  }}
                >
                  <X size={15} />
                </button>
              </Badge>
            ))}
            <div className="flex gap-1">
              <Select onValueChange={setSelectedTag}>
                <SelectTrigger>
                  <SelectValue placeholder="選擇標籤" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map(
                    (tag) =>
                      tag.$id !== tags.find((t) => t.$id === tag.$id)?.$id && (
                        <SelectItem
                          key={tag.$id}
                          value={tag.$id}
                          onSelect={() => {
                            if (!tags.find((t) => t.$id === tag.$id)) {
                              setTags([...tags, tag]);
                            }
                          }}
                        >
                          {tag.name}
                        </SelectItem>
                      ),
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="border-dashed"
                size="icon"
                onClick={() => {
                  if (seletedTag) {
                    const tag: any = allTags.find(
                      (tag) => tag.$id === seletedTag,
                    );
                    if (!tags.find((t) => t.$id === tag.$id)) {
                      setTags([...tags, tag!]);
                    }
                  } else {
                    toast.error("請先選擇標籤！");
                  }
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Textarea
            placeholder="內容"
            name="info"
            required
            onChange={(x) => setInfoText(x.target.value)}
            defaultValue={task?.info}
            className="h-30"
          />
          <div className="border rounded-lg p-4 overflow-y-auto">
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
        <div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-xl">範例程式碼</p>
            <Button
              onClick={async () => {
                const code = await fetch(
                  `${process.env.NODE_ENV == "development" ? "http" : "https"}://${process.env.NEXT_PUBLIC_BACKEND_HOST}/format/${language === "java" ? "java" : "kt"}`,
                  {
                    method: "POST",
                    body: sample,
                  },
                );
                if (code.ok) {
                  const formatted = await code.text();
                  setSample(formatted);
                  toast.success("格式化成功！");
                } else {
                  toast.error("格式化失敗，請稍後再試！");
                }
              }}
              type="button"
            >
              <WandSparkles />
              格式化
            </Button>
          </div>
          <Input type="hidden" name="sample" value={sample} />
          <div className="mt-2 p-1 border rounded-lg">
            <MonacoEditor
              height="200px"
              defaultLanguage={language ?? "plaintext"}
              defaultValue={sample}
              value={sample}
              onChange={(code) => {
                setSample(code || "");
              }}
            />
          </div>
        </div>
        <input
          type="hidden"
          name="taskResults"
          value={JSON.stringify(taskResults)}
        />
        <div className="flex items-center gap-2">
          <Label htmlFor="public">公開</Label>
          <Switch name="public" defaultChecked={task?.public ?? true} />
        </div>
        <Button type="submit" className="mt-5">
          {task ? "變更" : "建立"}
        </Button>
      </form>
    </div>
  );
}
