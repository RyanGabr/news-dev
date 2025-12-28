import { getPostsByAuthor } from "@/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";

interface useGetPostsByAuthorProps {
  authorId: string;
  page: number;
}

export function useGetPostsByAuthor({
  authorId,
  page,
}: useGetPostsByAuthorProps) {
  return useSuspenseQuery({
    queryKey: ["posts-by-author", authorId, page],
    queryFn: () => getPostsByAuthor({ authorId, page }),
  });
}
