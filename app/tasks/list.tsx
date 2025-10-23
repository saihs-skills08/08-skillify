"use client";

import { client } from "@/appwrite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Edit, Eye, Lock, MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteTask, getAllTasks } from "./actions";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { toast } from "sonner";

async function fetchTasks(userInfo: User) {
  const tasks = await getAllTasks(userInfo);
  return tasks.documents as any as Task[];
}

export default function TasksList({
  tasksData,
  assignments,
  allTags,
}: {
  tasksData: Task[];
  assignments: Assignment[];
  allTags: Tag[];
}) {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [userInfo, setUserInfo] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    getUserInfo().then((info) => {
      setUserInfo(info);
    });
    const realtime = client.subscribe(["documents"], (response) => {
      if (
        response.channels.includes(`databases.db.collections.tasks.documents`)
      ) {
        toast.promise(
          fetchTasks(userInfo!).then((newTasks) => {
            setTasks(newTasks);
          }),
          {
            success: "題目列表已更新！",
            loading: "更新題目列表中...",
            error: "更新題目列表失敗！",
          }
        );
      }
    });
    return () => {
      realtime();
    };
  }, []);

  const [filterTag, setFilterTag] = useState<Tag[]>([]);

  return (
    <div>
      <div className="flex mb-2 flex-warp">
        {allTags.map((tag) => (
          <button
            key={tag.$id}
            onClick={() => {
              if (filterTag.find((t) => t.$id === tag.$id)) {
                setFilterTag(filterTag.filter((t) => t.$id !== tag.$id));
              } else {
                setFilterTag([...filterTag, tag]);
              }
            }}
          >
            <Badge
              className={`mr-2 mb-2 py-2 ${
                filterTag.find((t) => t.$id === tag.$id)
                  ? "bg-blue-100 border-blue-300 drop-shadow-md"
                  : ""
              }`}
              variant="outline"
            >
              {tag.name}
            </Badge>
          </button>
        ))}
      </div>
      <ul>
        <div className="grid grid-cols-1 gap-4 mb-5">
          {tasks.map((task) => {
            if (
              filterTag.length > 0 &&
              !filterTag.every((tag) =>
                task.tags.find((t) => t.$id === tag.$id)
              )
            ) {
              return null;
            }
            return (
              <li key={task.$id}>
                <div className="px-2 border rounded-lg flex items-center gap-2 hover:bg-green-50 duration-100 justify-between">
                  <Link href={`/tasks/${task.$id}`} className="w-full py-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg pb-1">{task.title}</h2>
                      {!task.public && <Lock size={15} />}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag.$id} variant="outline">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                      {assignments.find((a) => a.tasks.$id === task.$id) ? (
                        assignments.find((a) => a.tasks.$id === task.$id)
                          ?.done ? (
                          <Badge
                            className=" rounded-full bg-green-100 border-green-300"
                            variant="outline"
                          >
                            <Check />
                            已完成
                          </Badge>
                        ) : (
                          <Badge
                            className="mt-2 rounded-full bg-orange-100 border-orange-300"
                            variant="outline"
                          >
                            <Eye /> 待檢視
                          </Badge>
                        )
                      ) : null}
                    </div>
                  </Link>
                  <div className="flex items-center">
                    <Badge variant="secondary">{task.language}</Badge>
                    {userInfo?.role === "expert" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-2"
                          >
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="m-2">
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm("確定要刪除此題目嗎？")) {
                                deleteTask(task.$id);
                              }
                            }}
                          >
                            <Trash />
                            刪除
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/tasks/edit/${task.$id}`)
                            }
                          >
                            <Edit />
                            編輯
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}
