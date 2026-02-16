import { Skeleton } from "../ui/skeleton";

export function Loading() {
  return (
    <div className="px-6 xl:px-0 max-w-5xl mx-auto space-y-10 lg:space-y-20 sm:mt-20">
      <div className="flex flex-col gap-8">
        <strong className="text-3xl lg:text-4xl font-semibold tracking-tight">
          Início
        </strong>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 items-center">
          <Skeleton className="h-64" />

          <div className="space-y-5">
            <Skeleton className="w-1/2 h-5" />

            <Skeleton className="h-8" />
            <Skeleton className="w-1/2 h-8" />

            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-xl lg:text-2xl font-semibold">Postagens recentes</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      </div>
    </div>
  );
}
