"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { submitForm } from "./actions";
import { Label } from "@/components/ui/label";

export default function NewProjectDialog() {
  const [open, setOpen] = useState(false);
  const submit = async (e: FormData) => {
    const res = await submitForm(e);
    if (res) {
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus />
          新增
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>建立新專案</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" action={submit}>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="mb-1">專案名稱</Label>
              <Input placeholder="專案名稱" name="projectName" required />
            </div>
            <div className="flex-1">
              <Label className="mb-1">程式檔案名稱</Label>
              <Input placeholder="程式檔案名稱" name="fileName" required />
            </div>
          </div>
          <div>
            <Label className="mb-1">程式語言</Label>
            <Select required name="language">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="程式語言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter className="mt-5">
              <Button type="submit">建立</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
