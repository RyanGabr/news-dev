import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <>
      <div>
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="mt-10 space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-1/3" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 10 }).map((_, index) => {
          // eslint-disable-next-line react-hooks/purity
          const randomWidth = Math.floor(Math.random() * (90 - 30 + 1)) + 30;

          return (
            <Skeleton
              key={index}
              className="h-4"
              style={{ width: `${randomWidth}%` }}
            />
          );
        })}
      </div>

      <div className="space-y-5">
        {Array.from({ length: 6 }).map((_, index) => {
          // eslint-disable-next-line react-hooks/purity
          const randomWidth = Math.floor(Math.random() * (90 - 30 + 1)) + 30;

          return (
            <Skeleton
              key={index}
              className="h-4"
              style={{ width: `${randomWidth}%` }}
            />
          );
        })}
      </div>
    </>
  );
}
