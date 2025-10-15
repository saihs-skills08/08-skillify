import { LoaderIcon } from "lucide-react";

export default function IdeLoading() {
  return (
    <div className="fade-in absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex gap-2">
        <LoaderIcon className="animate-spin h-6 w-6" />
        <p className="font-bold">專案載入中</p>
      </div>
    </div>
  );
}
