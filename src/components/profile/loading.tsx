import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <div className="md:px-0 max-w-5xl mx-auto space-y-10">
      <div className="space-y-8 p-6 bg-foreground/2 rounded-lg">
        <Skeleton className="w-28 h-28 rounded-full" />

        <div className="space-y-5">
          <Skeleton className="w-1/2 md:w-1/4 h-8" />
          <Skeleton className="w-full md:w-8/12 h-5" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="w-1/4 h-5" />
          <Skeleton className="w-1/8 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-36" />
        ))}
      </div>
    </div>
  );
}
