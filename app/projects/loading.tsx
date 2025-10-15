import { Skeleton } from "@/components/ui/skeleton";
export default function ProjectsLoading() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
      <Skeleton className="h-15" />
    </div>
  );
}
