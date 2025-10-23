import { Skeleton } from "@/components/ui/skeleton";

export default function TasksLoading() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-15 w-1/3 mb-2" />
      <Skeleton className="h-8 w-1/2" />
      <div className="grid gap-4 grid-cols-1">
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
        <Skeleton className="h-15" />
      </div>
    </div>
  );
}
