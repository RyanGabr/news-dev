import { getComments } from "@/services/comment";
import { useSuspenseQuery } from "@tanstack/react-query";

interface useGetCommentsProps {
  postId: string;
}

export function useGetComments({ postId }: useGetCommentsProps) {
  return useSuspenseQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId: postId }),
  });
}
