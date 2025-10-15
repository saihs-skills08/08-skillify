"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CloudAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorOccurred() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CloudAlert />
        </EmptyMedia>
        <EmptyTitle>發生錯誤</EmptyTitle>
        <EmptyDescription>這個頁面發生了未知的錯誤</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/">
          <Button>回首頁</Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
