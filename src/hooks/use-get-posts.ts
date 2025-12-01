import { useSuspenseQuery } from "@tanstack/react-query";
import { getPosts } from "../services/post";
import type { PostWithAuthor } from "../types/post";

export function useGetPosts() {
  return useSuspenseQuery<PostWithAuthor[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}
