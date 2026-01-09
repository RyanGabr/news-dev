import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <>
      <div className="mt-14">
        <Skeleton className="h-8 rounded-full w-full" />
      </div>
      <div>
        <Skeleton className="h-4 rounded-full w-40" />
      </div>
    </>
  );
}
