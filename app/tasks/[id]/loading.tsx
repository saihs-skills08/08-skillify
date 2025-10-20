import { Skeleton } from "@/components/ui/skeleton";

export default function TaskInfoLoadingPage() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-1/3 mb-4" />
      <Skeleton className="h-40" />
    </div>
  );
}
