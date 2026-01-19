import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <>
      <div className="mt-10 space-y-3">
        <Skeleton className="h-8 rounded-[2px] w-full" />
        <Skeleton className="h-8 rounded-[2px] w-1/3" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-4 rounded-[2px] w-32" />
        <Skeleton className="h-4 rounded-[2px] w-32" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 rounded-[2px] w-32" />
        <hr className="my-5" />
        <Skeleton className="h-4 rounded-[2px] w-full" />
        <Skeleton className="h-4 rounded-[2px] w-1/2" />
        <Skeleton className="h-4 rounded-[2px] w-1/3" />
      </div>
    </>
  );
}
