import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <p className="monospace">404</p>
        </EmptyMedia>
        <EmptyTitle>找不到這個頁面</EmptyTitle>
        <EmptyDescription>
          你可能輸入了錯誤的網址或你沒有權限訪問這個頁面
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/">
          <Button>回首頁</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
