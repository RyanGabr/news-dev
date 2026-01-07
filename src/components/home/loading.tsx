import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <>
      <div className="flex items-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-24 h-10 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-48 rounded-2xl" />
        ))}
      </div>
    </>
  );
}
