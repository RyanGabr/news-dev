import { getPost } from "@/services/post";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetPost(id: string) {
  return useSuspenseQuery({
    queryKey: ["post", id],
    queryFn: ({ queryKey }) => {
      const [, postId] = queryKey;
      return getPost(postId);
    },
  });
}
