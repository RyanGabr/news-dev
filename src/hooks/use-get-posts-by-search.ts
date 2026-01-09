import { getPostsBySearch } from "@/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";

interface useGetPostsBySearchProps {
  search: string;
}

export function useGetPostsBySearch({ search }: useGetPostsBySearchProps) {
  return useSuspenseQuery({
    queryKey: ["search-posts", search],
    queryFn: () =>
      getPostsBySearch({
        search: search,
      }),
  });
}
