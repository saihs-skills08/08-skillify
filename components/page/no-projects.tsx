import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BrushCleaning } from "lucide-react";

export default function NoProject() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BrushCleaning />
        </EmptyMedia>
        <EmptyTitle>你還沒有建立任何專案</EmptyTitle>
        <EmptyDescription>請先建立一個專案以開始使用IDE</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
