import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteProject, renameProject } from "../../app/projects/actions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function DeleteProject({
  projectId,
  isOpen,
  setOpen,
}: {
  projectId: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="border-red-500">
        <DialogHeader>
          <DialogTitle>確定要刪除這個專案?</DialogTitle>
          <DialogDescription>
            這個動作無法復原，請確認你真的要刪除這個專案
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={async () => {
                await deleteProject(projectId);
                setOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              確定
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function EditProject({
  project,
  isOpen,
  setOpen,
}: {
  project: Project;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>重新命名</DialogTitle>
          <DialogDescription>修改專案名稱</DialogDescription>
          <form
            action={async (data: FormData) => {
              const newName = data.get("projectName")?.valueOf();
              const newFileName = data.get("fileName")?.valueOf();
              const newLanguage = data.get("language")?.valueOf();
              await renameProject(project.$id, {
                name: newName,
                filename: newFileName,
                language: newLanguage,
              } as Project);
              setOpen(false);
            }}
            className="flex flex-col gap-2 mt-2"
          >
            <Label>專案名稱</Label>
            <Input
              defaultValue={project.name}
              placeholder="專案名稱"
              name="projectName"
              required
              pattern="^[^\s][\s\S]*$"
            />
            <Label>程式檔案名稱</Label>
            <Input
              defaultValue={project.filename}
              placeholder="程式檔案名稱"
              name="fileName"
              pattern="^[^\s][\s\S]*$"
              required
            />
            <Label>程式語言</Label>
            <Select required name="language" defaultValue={project.language}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="程式語言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter className="mt-2">
              <Button type="submit">儲存</Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
