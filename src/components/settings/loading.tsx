import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <div className="px-6 md:px-0 max-w-2xl mx-auto pt-8 py-10 space-y-10">
      <Skeleton className="w-12 h-3 rounded-[2px]" />

      <div className="space-y-5">
        <Skeleton className="w-full h-8 rounded-[2px]" />
        <Skeleton className="w-1/3 h-3 rounded-[2px]" />
      </div>

      <hr />

      <div className="space-y-5">
        <Skeleton className="w-40 h-5 rounded-[2px]" />
        <Skeleton className="w-1/2 h-3 rounded-[2px]" />

        <div className="flex items-center gap-4">
          <div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>

          <div className="w-full space-y-3 mt-5">
            <Skeleton className="w-40 h-3 rounded-[2px]" />
            <Skeleton className="w-1/2 h-3 rounded-[2px]" />
            <Skeleton className="w-20 h-3 rounded-[2px]" />
          </div>
        </div>
      </div>

      <hr />

      <div className="space-y-3">
        <Skeleton className="w-20 h-3 rounded-[2px]" />
        <Skeleton className="w-1/3 h-3 rounded-[2px]" />
      </div>
    </div>
  );
}
