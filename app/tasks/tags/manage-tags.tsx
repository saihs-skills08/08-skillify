"use client";
import { Input } from "@/components/ui/input";
import { createTag, deleteTag, getTags, updateTag } from "./actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CornerUpLeft, Edit, Trash } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ManageTags({ originalTags }: { originalTags: Tag[] }) {
  const [tags, setTags] = useState<Tag[]>(originalTags);

  return (
    <div>
      <Link href="/tasks">
        <Button variant="ghost" className="mb-2">
          <CornerUpLeft />
          <span>所有題目</span>
        </Button>
      </Link>
      <h1 className="text-4xl font-bold">管理標籤</h1>
      <ul className="mt-5 border rounded-xl">
        {tags.map((tag, index) => (
          <div key={tag.$id}>
            <li className={`py-3 px-3 flex justify-between items-center`}>
              {tag.name}
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    const newName = prompt("輸入新的標籤名稱", tag.name);
                    if (newName) {
                      const formData = new FormData();
                      formData.append("name", newName);
                      toast.promise(
                        updateTag(tag.$id, formData).then(() =>
                          getTags().then(setTags)
                        ),
                        {
                          loading: "正在更新標籤...",
                          success: "標籤更新成功!",
                          error: "標籤更新失敗!",
                        }
                      );
                    }
                  }}
                >
                  <Edit />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() =>
                    deleteTag(tag.$id).then(() =>
                      toast.promise(getTags().then(setTags), {
                        loading: "正在刪除標籤...",
                        success: "標籤刪除成功!",
                        error: "標籤刪除失敗!",
                      })
                    )
                  }
                >
                  <Trash />
                </Button>
              </div>
            </li>
            {index < tags.length - 1 && <hr />}
          </div>
        ))}
      </ul>
      <form
        action={(formData) => {
          toast.promise(
            createTag(formData).then(() => getTags().then(setTags)),
            {
              loading: "正在新增標籤...",
              success: "標籤新增成功!",
              error: "標籤新增失敗!",
            }
          );
        }}
        className="mt-5"
      >
        <div className="flex gap-2">
          <Input type="text" name="name" placeholder="標籤名稱" />
          <Button type="submit">新增標籤</Button>
        </div>
      </form>
    </div>
  );
}
