import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-0 pb-10 space-y-8">
      <div className="flex flex-col gap-5 items-center justify-center">
        <div>
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-1/3" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-5">
          {Array.from({ length: 10 }).map((_, index) => {
            // eslint-disable-next-line react-hooks/purity
            const randomWidth = Math.floor(Math.random() * (90 - 20 + 1)) + 40;

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
            const randomWidth = Math.floor(Math.random() * (90 - 20 + 1)) + 40;

            return (
              <Skeleton
                key={index}
                className="h-4"
                style={{ width: `${randomWidth}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
