import { db } from "@/appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserInfo } from "@/components/utils/getUserInfo";
import { taskComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote-client/rsc";

export default async function TaskInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const task = (await db.getDocument("db", "tasks", id)) as any as Task;
  const user = await getUserInfo(task.creator.$id);
  return (
    <section>
      <div className="flex gap-1 items-center mt-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-gray-500 text-xs">由 {user.name} 創建</p>
      </div>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <Badge>{task.language}</Badge>
      </div>
      <MDXRemote source={task.info} components={taskComponents} />
      <div className="mt-4">
        {task.tasksResults.map((result, index) => {
          const ResultComponent = `
# 範例${index + 1}
${result.input != "" && `輸入範例`}
${
  result.input != "" &&
  `
\`\`\`java
${result.input}
\`\`\`
`
}
${result.output != "" && `輸出範例`}
${
  result.output != "" &&
  `
\`\`\`java
${result.output}
\`\`\`
---
`
}
`;

          return (
            <div key={result.$id}>
              <MDXRemote source={ResultComponent} components={taskComponents} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
