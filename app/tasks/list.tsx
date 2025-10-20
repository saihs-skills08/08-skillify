"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TasksList({ tasksData }: { tasksData: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  return (
    <ul>
      <div className="grid grid-cols-2 gap-4">
        {tasks.map((task) => (
          <li key={task.$id}>
            <Link href={`/tasks/${task.$id}`}>
              <div className="px-2 py-4 border rounded-lg flex items-center gap-2 hover:bg-green-50 duration-100 justify-between">
                <h2 className="text-lg">{task.title}</h2>
                <Badge variant="secondary">{task.language}</Badge>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </ul>
  );
}
