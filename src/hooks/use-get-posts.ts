import { useSuspenseQuery } from "@tanstack/react-query";
import { getPosts } from "../services/post";
import type { PostWithAuthor } from "../types/post";

type GetPostsResponse = {
  data: PostWithAuthor[];
  count: number | null;
};

export function useGetPosts({ page }: { page: number }) {
  return useSuspenseQuery<GetPostsResponse>({
    queryKey: ["posts", page],
    queryFn: () => getPosts({ page: page }),
  });
}
