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
import { ShieldX, User } from "lucide-react";
import { signIn } from "@/auth";

export default function NotAuthed() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShieldX />
        </EmptyMedia>
        <EmptyTitle>請先登入</EmptyTitle>
        <EmptyDescription>登入以使用這項功能</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          onClick={async () => {
            "use server";
            await signIn("google");
          }}
          variant="outline"
        >
          <User />
          登入
        </Button>
      </EmptyContent>
    </Empty>
  );
}
